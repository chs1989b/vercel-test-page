import { NextResponse } from "next/server";
import { getAnalysisReport } from "./openai";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url") || "";

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

  return NextResponse.json({
    url,
    performanceScore,
    seoScore,
    accessibilityScore,
    bestPracticesScore,
    totalScore,
    analyzedAt: new Date().toLocaleString("ko-KR"),
    report,
  });
}
