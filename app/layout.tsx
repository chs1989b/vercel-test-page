import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vercel 테스트 페이지",
  description: "Next.js와 Vercel로 배포한 간단한 테스트 페이지입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
