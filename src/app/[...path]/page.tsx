import HomePage from "../page";

// The portal shell resolves the current pathname. This catch-all makes every
// IA path directly addressable while preserving the existing client UI state.
// Static export requires each direct URL to be known at build time.
const portalRoutes = [
  ["courses"],
  ["courses", "생성-ai-업무-활용-기초"],
  ["courses", "생성-ai-업무-활용-기초", "learn"],
  ["courses", "보안-ai-활용-수칙"],
  ["courses", "데이터-시각화의-첫걸음"],
  ["projects"],
  ["projects", "작전-보고서-요약-프롬프트-작성"],
  ["projects", "체력-기록-관리-시스템"],
  ["projects", "체력-기록-관리-시스템", "mission"],
  ["projects", "보급-현황-데이터-시각화"],
  ["projects", "동료-평가"],
  ["learning"],
  ["classrooms"],
  ["classrooms", "vod-ai"],
  ["classrooms", "pbl-fitness"],
  ["ranking"],
  ["showcase"],
  ["showcase", "write"],
  ["showcase", "report-prompt"],
  ["showcase", "fitness-record"],
  ["showcase", "supply-visual"],
  ["team-projects"],
  ["community"],
  ["community", "write"],
  ["search"],
  ["my"],
  ["my", "learning"],
  ["my", "onboarding"],
  ["my", "level-test"],
  ["my", "wishlist"],
  ["my", "certificates"],
  ["my", "credit"],
  ["my", "posts"],
  ["my", "notifications"],
  ["my", "profile"],
  ["my", "withdraw"],
  ["diagnosis"],
  ["journey"],
  ["about"],
  ["guide"],
  ["guide", "roadmap"],
  ["guide", "about"],
  ["legacy-learning-player"],
];

export function generateStaticParams() {
  return portalRoutes.map((path) => ({ path }));
}

export default function MiliAiRoutePage() {
  return <HomePage />;
}
