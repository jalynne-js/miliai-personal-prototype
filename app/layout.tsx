import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILI AI | Mission Base",
  description: "우주 탐사 콘셉트의 게이미피케이션 LXP 프로토타입",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
