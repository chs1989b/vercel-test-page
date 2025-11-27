import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") || "";

  // 실제 분석 대신 예시 점수 반환
  // (실제 분석은 Lighthouse 등 외부 API 필요)
  const performanceScore = Math.floor(Math.random() * 41) + 60; // 60~100
  const seoScore = Math.floor(Math.random() * 41) + 60;
  const accessibilityScore = Math.floor(Math.random() * 41) + 60;
  const bestPracticesScore = Math.floor(Math.random() * 41) + 60;
  const totalScore = Math.round((performanceScore + seoScore + accessibilityScore + bestPracticesScore) / 4);

  return NextResponse.json({
    url,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    totalScore,
    analyzedAt: new Date().toLocaleString("ko-KR"),
  });
}
