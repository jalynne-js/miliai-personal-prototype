import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MILI AI — Learning Mission Control",
  description: "VOD, PBL, community, diagnosis, and learning journey in one AI learning platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body>{children}</body></html>;
}
