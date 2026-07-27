import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILI AI | 대화형 화면 정의서",
  description: "메뉴 구조와 ERD를 기반으로 한 사용자 서비스 와이어프레임 및 기능 명세",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
