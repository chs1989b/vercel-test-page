import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getAnalysisReport({ url, performanceScore, seoScore, accessibilityScore, bestPracticesScore, totalScore }: {
  url: string;
  performanceScore: number;
  seoScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  totalScore: number;
}) {
  const prompt = `당신은 웹사이트 성능과 성장(트래픽/매출) 개선을 돕는 전문가 컨설턴트입니다. 아래 점수와 항목을 바탕으로, 고객을 설득해 컨설팅 요청(유료 작업)을 유도할 수 있는 고품질의 분석 리포트를 한국어로 작성해 주세요.

요구사항:
- 구조화된 마크다운으로 작성할 것(제목, 소제목, 불릿리스트 사용).
- "요약/전체 평가", "핵심 문제(우선순위)", "권장 개선사항(우선순위별)", "예상 효과(트래픽·전환·매출 향상 추정)", "예상 작업 난이도(간단/중간/고급)", "빠른 실행(Quick wins)" 및 "다음 단계(컨설팅 제안)"을 포함할 것.
- 권장 개선사항은 구체적으로 제안(예: 이미지 최적화, 캐시 정책, 메타 태그/구조화 데이터, 접근성 수정, 보안 헤더 등).
- 예상 효과는 보수적 추정치를 퍼센트(예: 트래픽 +10~30%, 전환율 +5~15%, 매출 +10~25%)로 제시하고, 근거(예: 로딩속도 개선 시 이탈률 감소 → 전환율 상승 가정)를 한 문장으로 덧붙일 것.
- 마지막에 고객이 바로 연락하도록 유도하는 콜투액션(간단한 문의 안내 및 무료 진단 제안)을 포함할 것.
- 길이는 약 300~500단어 내외로 전문적이고 설득력 있게 작성할 것.

입력 데이터:
사이트: ${url}
- 로딩속도: ${performanceScore}
- SEO: ${seoScore}
- 접근성: ${accessibilityScore}
- Best Practices: ${bestPracticesScore}
- 총점: ${totalScore}

출력은 한국어 마크다운으로 주세요.`;

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "당신은 웹사이트 분석 전문가입니다." },
      { role: "user", content: prompt },
    ],
    max_tokens: 700,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content || "분석 리포트 생성 실패";
}
