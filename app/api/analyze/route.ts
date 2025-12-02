import { NextResponse } from "next/server";
import { getAnalysisReport } from "./openai";
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") || "";
  const email = searchParams.get("email") || null;

  // 예시 점수 생성
  const performanceScore = Math.floor(Math.random() * 41) + 60; // 60~100
  const seoScore = Math.floor(Math.random() * 41) + 60;
  const accessibilityScore = Math.floor(Math.random() * 41) + 60;
  const bestPracticesScore = Math.floor(Math.random() * 41) + 60;
  const totalScore = Math.round((performanceScore + seoScore + accessibilityScore + bestPracticesScore) / 4);

  // OpenAI로 리포트 생성
  let report = "";
  try {
    report = await getAnalysisReport({ url, performanceScore, seoScore, accessibilityScore, bestPracticesScore, totalScore });
  } catch (e) {
    report = "리포트 생성 중 오류가 발생했습니다.";
  }
  // 간단한 파싱 로직: 리포트에서 개선 항목을 추출하고 우선순위 지정
  function parseReportToItems(text: string) {
    if (!text) return [];
    const lines = text.split(/\n|\r/).map(l => l.trim()).filter(Boolean);
    const candidates: string[] = [];

    // 1) '-' 로 시작하는 라인 또는 숫자 리스트 항목 추출
    for (const line of lines) {
      if (/^[-•\d]/.test(line) || line.includes(':')) {
        // '-' 또는 '1.' 또는 ' - 설명' 등
        // 제거할 접두부
        const cleaned = line.replace(/^[-•\d\.\)\s]+/, '').trim();
        if (cleaned.length > 10) candidates.push(cleaned);
      }
    }

    // 2) 후보가 적으면 문장 단위로 분리
    if (candidates.length === 0) {
      const sentences = text.split(/[\.\n]\s*/).map(s => s.trim()).filter(Boolean);
      for (const s of sentences) {
        if (s.length > 20) candidates.push(s);
      }
    }

    const highKeywords = ['로딩', '이미지', '캐싱', '속도', '지연', '렌더', '지연', '대기'];
    const medKeywords = ['SEO', '메타', '키워드', '검색', '구조화', '검색엔진', 'title', 'description'];
    const accessibilityKeywords = ['접근성', '스크린', '키보드', '대체텍스트', 'alt'];
    const securityKeywords = ['보안', 'SSL', '인증', '헤더', '취약점', '취약'];

    function decidePriority(item: string) {
      const t = item.toLowerCase();
      for (const k of highKeywords) if (t.includes(k)) return 'high';
      for (const k of securityKeywords) if (t.includes(k)) return 'high';
      for (const k of medKeywords) if (t.includes(k.toLowerCase())) return 'medium';
      for (const k of accessibilityKeywords) if (t.includes(k)) return 'medium';
      return 'low';
    }

    const items = candidates.map(i => ({ text: i, priority: decidePriority(i) }));
    // 중복 제거
    const unique = Array.from(new Map(items.map(it => [it.text, it])).values());
    return unique;
  }

  const reportItems = parseReportToItems(report);

  const analyzedAt = new Date().toISOString();

  // Supabase에 이력 저장 (환경변수에 SUPABASE_URL 및 SUPABASE_KEY 설정 필요)
  let insertionStatus = 'skipped';
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      insertionStatus = 'skipped-missing-env';
    } else {
      const supabase = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      });

      // 테이블명: analyze_history (정의된 스키마 참조)
      // 클라이언트 IP 추출 (Vercel, 프록시 환경에서 X-Forwarded-For 사용)
      const xff = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip');
      const clientIp = xff ? xff.split(',')[0].trim() : 'unknown';

      // 기본 페이로드(모든 필드 포함)
      const payloadFull: any = {
        url,
        email,
        client_ip: clientIp,
        performance_score: performanceScore,
        seo_score: seoScore,
        accessibility_score: accessibilityScore,
        best_practices_score: bestPracticesScore,
        total_score: totalScore,
        report,
        report_items: JSON.stringify(reportItems || []),
        analyzed_at: analyzedAt,
      };

      // 시도 1: 전체 필드로 삽입
      let { error } = await supabase.from('analyze_history').insert([payloadFull]);
      if (error) {
        const msg = String(error.message || error);
        // eslint-disable-next-line no-console
        console.warn('Initial Supabase insert error, attempting fallback insert without client fields:', msg);

        // 항상 client/email 필드 제외 후 재시도 (스키마 불일치에 관대하게 대응)
        const payloadFallback = { ...payloadFull };
        delete payloadFallback.client_ip;
        delete payloadFallback.email;
        const { error: err2 } = await supabase.from('analyze_history').insert([payloadFallback]);
        if (err2) {
          insertionStatus = `error: ${err2.message}`;
          // eslint-disable-next-line no-console
          console.error('Fallback Supabase insert error:', err2);
        } else {
          insertionStatus = 'inserted-fallback-no-client-fields';
        }
      } else {
        insertionStatus = 'inserted';
      }
    }
  } catch (e: any) {
    insertionStatus = `exception: ${e?.message || String(e)}`;
    // eslint-disable-next-line no-console
    console.error('Failed to insert analyze history to Supabase', e);
  }

  return NextResponse.json({
    url,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    totalScore,
    analyzedAt: new Date().toLocaleString("ko-KR"),
    report,
    reportItems,
    insertionStatus,
  });
}
