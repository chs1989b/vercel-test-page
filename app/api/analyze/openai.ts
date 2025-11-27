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
  const prompt = `다음 쇼핑몰 사이트의 시스템 점수와 항목별 점수를 기반으로 상세 분석 리포트와 개선점 추천을 작성해줘.\n\n사이트: ${url}\n\n- 로딩속도: ${performanceScore}\n- SEO: ${seoScore}\n- 접근성: ${accessibilityScore}\n- Best Practices: ${bestPracticesScore}\n- 총점: ${totalScore}\n\n[리포트 예시]\n1. 전체적인 평가\n2. 각 항목별 상세 분석\n3. 개선점 및 추천\n\n한국어로 500자 내외로 작성해줘.`;

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
