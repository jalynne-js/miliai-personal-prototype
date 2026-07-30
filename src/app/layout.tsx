import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILI AI — Learning Mission Control",
  description: "VOD, PBL, community, diagnosis, and learning journey in one AI learning platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Script
          id="mili-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.miliTheme=localStorage.getItem("mili-theme")==="light"?"light":"dark"}catch(e){document.documentElement.dataset.miliTheme="dark"}`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
