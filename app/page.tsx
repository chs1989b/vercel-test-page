
"use client";
import React, { useState } from "react";
import BarChart from "../components/BarChart";
import ReactMarkdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  async function analyzeSite(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const start = performance.now();
      // 프록시 서버 필요: CORS 우회. 여기선 fetch만 예시로 사용
      const res = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError("사이트 분석 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🛒 쇼핑몰 사이트 분석기</h1>
        <p style={styles.subtitle}>URL을 입력하면 해당 쇼핑몰의 시스템 상태(로딩속도, SEO 등)를 분석해 점수로 보여줍니다.</p>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <form onSubmit={analyzeSite} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="쇼핑몰 URL을 입력하세요 (예: https://store.com)"
              style={{ flex: 1, padding: "0.75rem", borderRadius: "0.375rem", border: "1px solid #0d9488", fontSize: "1rem" }}
              required
            />
            <button
              type="submit"
              style={{ padding: "0.75rem 1.5rem", backgroundColor: "#0f766e", color: "#a7f3d0", border: "none", borderRadius: "0.375rem", cursor: "pointer", fontWeight: "bold" }}
              disabled={loading}
            >
              {loading ? "분석 중..." : "분석하기"}
            </button>
          </form>
        </section>

        {error && (
          <section style={styles.section}>
            <p style={{ color: "#f87171" }}>{error}</p>
          </section>
        )}

        {result && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>분석 결과</h2>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0 }}><strong>사이트:</strong> {result.url}</p>
                    <p style={{ margin: 0 }}><strong>분석 시간:</strong> {result.analyzedAt}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: result.totalScore > 80 ? '#34d399' : result.totalScore > 60 ? '#fbbf24' : '#f87171' }}>
                      {result.totalScore}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>총점 /100</div>
                  </div>
                </div>

                  <div style={{ marginTop: '1rem' }}>
                    {/* Chart.js Bar 차트 */}
                    <div style={{ background: '#071029', padding: '0.75rem', borderRadius: 8 }}>
                      <BarChart
                        scores={{
                          labels: ['로딩속도', 'SEO', '접근성', 'Best Practices'],
                          values: [result.performanceScore, result.seoScore, result.accessibilityScore, result.bestPracticesScore],
                        }}
                      />
                    </div>
                  </div>
              </div>

              <div style={{ flex: 1, minWidth: 300 }}>
                <h3 style={{ marginTop: 0, color: '#a7f3d0' }}>상세 리포트</h3>
                <div style={{ background: '#071029', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #23303f', color: '#e2e8f0' }}>
                  {/* Markdown 렌더링 (bold 등 마크업 처리) */}
                  <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={{
                    p: ({node, ...props}) => <p style={{ margin: '0 0 0.5rem', color: '#e2e8f0' }} {...props} />,
                    strong: ({node, ...props}) => <strong style={{ color: '#fff' }} {...props} />,
                    li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                  }}>{result.report}</ReactMarkdown>
                </div>

                <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem', color: '#a7f3d0' }}>추천 항목 (요약)</h4>
                {(() => {
                  const items = result.reportItems || [];
                  const keywords = /최적화|캐시|이미지|메타|SEO|접근성|보안|Best Practices|보안|캐싱|CDN|모바일|응답속도|로딩속도|속도/i;
                  const actionable = items.filter((it: any) => it.priority === 'high' || keywords.test(it.text));

                  if (actionable.length > 0) {
                    return (
                      <ul style={{ marginTop: 0, color: '#cbd5e1' }}>
                        {actionable.map((it: any, i: number) => {
                          const color = it.priority === 'high' ? '#f87171' : it.priority === 'medium' ? '#fbbf24' : '#60a5fa';
                          return (
                            <li key={i} style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                              <div style={{ width: 10, height: 10, borderRadius: 6, background: color, marginTop: 6 }} />
                              <div>
                                <div style={{ fontWeight: 600, color: '#e2e8f0' }}>
                                  <ReactMarkdown rehypePlugins={[rehypeSanitize]} components={{strong: ({node, ...props}) => <strong style={{color: '#fff'}} {...props} />}}>{it.text}</ReactMarkdown>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>우선순위: {it.priority}</div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    );
                  }

                  return (
                    <ul style={{ marginTop: 0, color: '#cbd5e1' }}>
                      <li>이미지 최적화 및 CDN 적용으로 로딩속도 개선</li>
                      <li>메타 태그 및 구조화된 데이터로 SEO 향상</li>
                      <li>접근성 검사 도구로 키보드/스크린리더 지원 강화</li>
                      <li>보안 헤더 및 코드 품질 검토로 Best Practices 개선</li>
                    </ul>
                  );
                })()}
              </div>
            </div>
          </section>
        )}

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>분석 안내</h2>
          <ul style={styles.list}>
            <li>사이트의 <strong>로딩속도</strong>, <strong>SEO</strong>, <strong>접근성</strong>, <strong>Best Practices</strong>를 점수로 분석합니다.</li>
            <li>점수는 0~100점 기준으로 표시됩니다.</li>
            <li>실제 분석은 Lighthouse API 또는 서버에서 처리해야 합니다.</li>
            <li>프론트엔드에서는 예시 결과만 표시합니다.</li>
          </ul>
        </section>
      </main>

      <footer style={styles.footer}>
        <p>© 2025 쇼핑몰 사이트 분석기 - vercel 배포</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: '#0f172a',
    color: '#e2e8f0',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    background: 'linear-gradient(135deg, #0f766e 0%, #0d9488 100%)',
    padding: '3rem 1rem',
    textAlign: 'center' as const,
    borderBottom: '2px solid #0d9488',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 0 0.5rem 0',
    color: '#fff',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#d1fae5',
    margin: 0,
  },
  main: {
    flex: 1,
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem 1rem',
    width: '100%',
  },
  section: {
    marginBottom: '2rem',
    padding: '1.5rem',
    backgroundColor: '#1e293b',
    borderRadius: '0.5rem',
    border: '1px solid #334155',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginTop: 0,
    marginBottom: '1rem',
    color: '#a7f3d0',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: '0.5rem 0',
    fontSize: '1rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  },
  link: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0f766e',
    color: '#a7f3d0',
    textDecoration: 'none',
    borderRadius: '0.375rem',
    transition: 'all 0.3s ease',
    border: '1px solid #0d9488',
    cursor: 'pointer',
  },
  info: {
    fontSize: '1rem',
    lineHeight: '1.8',
  },
  footer: {
    backgroundColor: '#0f172a',
    borderTop: '1px solid #334155',
    padding: '1.5rem',
    textAlign: 'center' as const,
    color: '#94a3b8',
    marginTop: 'auto',
  },
};
