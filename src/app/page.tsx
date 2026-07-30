"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  Bookmark,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Compass,
  Code2,
  Check,
  Clock3,
  Building2,
  FileText,
  Gift,
  Gauge,
  FileCheck2,
  Flame,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LayoutPanelTop,
  Menu,
  MessageCircleQuestion,
  MessageSquareText,
  Medal,
  Play,
  Radar,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Network,
  Target,
  Trophy,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { type MouseEvent, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PersonalHome from "./components/personal-home/PersonalHome";
import PersonalMyPage from "./components/personal-my/PersonalMyPage";

type PageKey =
  | "home"
  | "courses"
  | "projects"
  | "learning"
  | "classrooms"
  | "ranking"
  | "showcase"
  | "team"
  | "community"
  | "search"
  | "my"
  | "guide"
  | "diagnosis"
  | "journey"
  | "about";

const navigation: Array<{ key: PageKey; label: string; icon: typeof LayoutDashboard }> = [
  { key: "home", label: "홈", icon: LayoutDashboard },
  { key: "courses", label: "강의", icon: GraduationCap },
  { key: "projects", label: "프로젝트", icon: Target },
  { key: "showcase", label: "쇼케이스", icon: LayoutPanelTop },
  { key: "community", label: "커뮤니티", icon: Network },
  { key: "my", label: "마이페이지", icon: ShieldCheck },
  { key: "about", label: "서비스 소개", icon: FileText },
];

const pagePaths: Record<PageKey, string> = {
  home: "/",
  courses: "/courses",
  projects: "/projects",
  learning: "/learning",
  classrooms: "/classrooms",
  ranking: "/ranking",
  showcase: "/showcase",
  team: "/team-projects",
  community: "/community",
  search: "/search",
  my: "/my",
  guide: "/guide",
  diagnosis: "/diagnosis",
  journey: "/journey",
  about: "/about",
};

const vodCourses = [
  { title: "생성 AI 업무 활용 기초", detail: "프롬프트 설계 / 2단계", time: "예상 38분", label: "추천 강의", percent: 64 },
  { title: "보안 AI 활용 수칙", detail: "정보보호 / 입문", time: "예상 18분", label: "필수 이수", percent: 0 },
  { title: "데이터 시각화의 첫걸음", detail: "데이터 분석 / 입문", time: "예상 42분", label: "다음 단계", percent: 0 },
];

const projectCards = [
  { title: "작전 보고서 요약 프롬프트 작성", meta: "개인 프로젝트 / 2단계", description: "핵심 현황과 후속 조치를 구조화하는 실무 프롬프트를 설계합니다.", status: "진행 중", action: "이어서 학습하기" },
  { title: "체력 기록 관리 시스템", meta: "PBL 프로젝트 / 팀 구성", description: "현장 기록을 더 빠르게 확인할 수 있는 간단한 업무 도구를 만듭니다.", status: "모집 중", action: "프로젝트 보기" },
  { title: "보급 현황 데이터 시각화", meta: "PBL 프로젝트 / 3단계", description: "보급 흐름 데이터를 읽기 쉬운 보고 화면으로 바꿔봅니다.", status: "예정", action: "상세 보기" },
];

const roadmapSteps = [
  { title: "AI 개념 이해", state: "완료", detail: "기초 과정 4개 수료" },
  { title: "생성 AI 활용", state: "진행 중", detail: "프롬프트 과정 64%" },
  { title: "AI 결과 개선", state: "다음 단계", detail: "선행 강의 2개 남음" },
  { title: "실무 적용", state: "잠김", detail: "프로젝트 1개 완료 필요" },
  { title: "인증서 발급", state: "목표", detail: "핵심 역량 5개 달성" },
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function ActionButton({ children, onClick, subtle = false, fullWidth = false }: { children: React.ReactNode; onClick?: () => void; subtle?: boolean; fullWidth?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mili-control inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#b7ff31] focus:ring-offset-2 focus:ring-offset-[#050806] ${fullWidth ? "w-full" : ""} ${subtle ? "border border-white/15 bg-white/[0.04] text-white hover:bg-white/[0.1]" : "bg-[#b7ff31] text-[#0b1205] hover:bg-[#c8ff4a]"}`}
    >
      {children}
    </button>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`mili-entry-card mili-frame rounded-2xl border border-[#273128] bg-[#0b110d]/95 ${className}`}>{children}</section>;
}

function PageHeading({ eyebrow, title, copy, aside }: { eyebrow: string; title: string; copy: string; aside?: React.ReactNode }) {
  return (
    <div className="mili-entry-heading mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b7ff31]">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-bold tracking-[-0.045em] text-white md:text-4xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">{copy}</p>
      </div>
      {aside}
    </div>
  );
}

function TutorChatDialog({ onClose }: { onClose: () => void }) {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "assistant" | "user"; text: string }>>([
    { role: "assistant", text: "김철수 상병님, AI 교관입니다. 현재 학습 중인 생성 AI 활용 과정에서 막힌 부분을 바로 물어보세요." },
  ]);
  const send = (content = draft) => {
    const question = content.trim();
    if (!question) return;
    const answer = question.includes("프롬프트")
      ? "좋습니다. 목표 / 맥락 / 제약 조건 / 원하는 결과 형식 순서로 작성해 보세요. 지금 과제에서는 결과 형식을 먼저 명확히 지정하는 것이 핵심입니다."
      : "확인했습니다. 현재 학습 목표와 연결해서 안내할게요. 먼저 지금까지 시도한 방법과 기대한 결과를 한 문장으로 적어주시면 더 정확하게 도와드릴 수 있습니다.";
    setMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: answer }]);
    setDraft("");
  };
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="AI 교관 상담"><Panel className="mili-tutor-chat flex h-[min(680px,calc(100vh-32px))] w-full max-w-2xl flex-col overflow-hidden border-[#b7ff31]/45 p-0 shadow-2xl"><header className="flex items-center justify-between border-b border-white/10 bg-[#101610] px-5 py-4"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center border border-[#b7ff31]/45 bg-[#b7ff31]/10 text-[#b7ff31]"><Sparkles size={18} /></span><div><p className="text-sm font-bold text-white">AI 교관</p><p className="mt-0.5 text-xs text-white/50">학습 맥락을 바탕으로 바로 답변합니다</p></div></div><button type="button" onClick={onClose} aria-label="AI 교관 상담 닫기" className="grid size-9 place-items-center border border-white/15 text-white/65 hover:border-[#b7ff31] hover:text-[#b7ff31]"><X size={18} /></button></header><div className="flex-1 space-y-4 overflow-y-auto bg-[#070b08] p-5">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><div className={`max-w-[84%] border px-4 py-3 text-sm leading-6 ${message.role === "user" ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/10 bg-white/[0.06] text-white/82"}`}>{message.text}</div></div>)}</div><div className="border-t border-white/10 bg-[#101610] p-4"><div className="mb-3 flex flex-wrap gap-2">{["프롬프트를 더 잘 쓰려면?", "현재 미션의 핵심은 무엇인가요?", "결과 검증 방법을 알려주세요"].map((question) => <button type="button" key={question} onClick={() => send(question)} className="border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white/72 hover:border-[#b7ff31]/60 hover:text-[#b7ff31]">{question}</button>)}</div><div className="flex gap-2"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") send(); }} className="min-w-0 flex-1 border border-white/15 bg-black/35 px-3 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#b7ff31]" placeholder="AI 교관에게 질문을 입력하세요" aria-label="AI 교관에게 질문 입력" /><button type="button" onClick={() => send()} className="mili-control grid size-11 shrink-0 place-items-center bg-[#b7ff31] text-black hover:bg-[#c8ff4a]" aria-label="질문 전송"><ArrowRight size={18} /></button></div></div></Panel></div>;
}

function HomeView({ goTo, isLightMode }: { goTo: (page: PageKey) => void; isLightMode: boolean }) {
  const rankSnapshots = [
    [{ unit: "1대대", score: "1,284" }, { unit: "3대대", score: "1,246" }, { unit: "2대대", score: "1,208" }, { unit: "5대대", score: "1,173" }, { unit: "4대대", score: "1,116" }],
    [{ unit: "1대대", score: "1,284" }, { unit: "2대대", score: "1,252" }, { unit: "3대대", score: "1,246" }, { unit: "5대대", score: "1,173" }, { unit: "4대대", score: "1,116" }],
    [{ unit: "2대대", score: "1,301" }, { unit: "1대대", score: "1,284" }, { unit: "3대대", score: "1,246" }, { unit: "5대대", score: "1,173" }, { unit: "4대대", score: "1,116" }],
  ];
  const [rankStep, setRankStep] = useState(0);
  const rankings = rankSnapshots[rankStep];
  return <div className="mili-home-layout space-y-5 pb-4">
    <section className="relative min-h-[390px] px-7 pb-8 pt-7 md:px-12 lg:min-h-[510px] lg:pt-[4.75rem]">
      <div className="relative z-10 max-w-[650px]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b7ff31]">학습 미션 맵</p>
        <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.055em] text-white [text-shadow:0_4px_22px_rgba(0,0,0,.72)] md:text-5xl xl:text-[54px]">김철수 상병님,<br />오늘의 작전을 이어가 보세요.</h1>
        <p className="mt-5 max-w-md text-base leading-7 text-white/65">현재 학습 단계와 새롭게 도전할 프로젝트를 확인해 보세요.</p>
      </div>
      <Image src={isLightMode ? assetPath("/assets/home-roadmap-sample-light.svg") : assetPath("/assets/home-roadmap-sample.svg")} alt="" width={1525} height={538} priority className="pointer-events-none absolute left-[3%] top-0 z-0 hidden h-auto w-[94%] min-[1440px]:block" />
    </section>

    <div className="grid gap-5 lg:ml-[10px] xl:grid-cols-[minmax(0,1.85fr)_minmax(330px,.75fr)]">
      <Panel className="mili-profile-frame relative overflow-hidden p-5 md:p-6"><div className="grid h-full gap-5 lg:grid-cols-[230px_minmax(0,1fr)]"><div className="relative mx-auto aspect-square min-h-0 w-full max-w-[230px] self-center overflow-hidden rounded-full border-2 border-[#b7ff31]/70 bg-[#050806]"><Image src={isLightMode ? assetPath("/assets/soldier-profile-reference-light.png") : assetPath("/assets/soldier-profile-reference.png")} alt="김철수 상병 프로필" fill className="object-contain object-bottom" /></div><div className="flex min-w-0 flex-col"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl">김철수 상병</h2><span className="border border-[#54c7ff]/40 bg-[#54c7ff]/10 px-2 py-1 text-xs font-bold text-[#54c7ff]">AI 탐사대원</span></div><div className="flex items-center gap-2.5"><span className="text-xs font-bold text-white/55">연속 학습</span><div className="flex gap-1.5">{["월", "화", "수", "목", "금"].map((day, index) => <span key={day} aria-label={`${day} ${index < 3 ? "학습 완료" : "예정"}`} className={`grid size-8 place-items-center border text-[10px] font-bold ${index < 3 ? "border-[#ffb84d] bg-[#ffb84d] text-black" : "border-white/15 bg-white/[0.04] text-white/42"}`}>{index < 3 ? <Flame size={13} fill="currentColor" /> : day}</span>)}</div><b className="text-xs text-[#ffb84d]">3일</b></div></div><p className="mt-2 text-sm text-white/55">상병 / 비전공 장병 / 체력 기록 관리 시스템 진행 중</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[["탐사 경험치", "184", "XP"], ["탐사 Lv", "Lv.3", ""], ["탐사 뱃지", "6", "개"], ["오늘 받은 XP", "125", "XP"]].map(([label, value, detail]) => <article key={label} className="border border-white/10 bg-black/70 p-3"><p className="text-[11px] text-white/46">{label}</p><b className="mt-2 block text-2xl leading-none text-white">{value}</b><small className="mt-2 block min-h-3 text-[10px] text-white/38">{detail}</small></article>)}</div><Link href="/my/credits" className="mt-4 flex items-center justify-between gap-3 border border-[#54c7ff]/35 bg-[#54c7ff]/[0.05] p-3 hover:border-[#54c7ff]/70"><div><p className="text-xs font-bold text-[#54c7ff]">보유 탐사 뱃지</p><p className="mt-1 text-xs text-white/52">AI 도구 활용 / 업무 분석 / Lv.3</p></div><div className="flex items-center -space-x-3"><Image src={assetPath("/assets/badges/ai-tool-level-3.png")} alt="AI 도구 활용 Lv.3 뱃지" width={54} height={54} className="size-14 object-contain" /><Image src={assetPath("/assets/badges/work-analysis-level-3.png")} alt="업무 분석 Lv.3 뱃지" width={54} height={54} className="size-14 object-contain" /></div></Link><div className="mt-4 border border-white/10 bg-black/75 p-3"><div className="flex items-center justify-between"><b className="font-mono text-lg text-white">탐사 Lv.3</b><b className="text-sm text-white">67%</b></div><div className="mt-2 h-2 bg-white/10"><i className="block h-full w-[67%] bg-[#b7ff31]" /></div><p className="mt-2 text-xs text-white/45">다음 탐사 Lv까지 41 XP</p></div><div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm"><span className="text-white/52">다음 보상 / 연속 학습 7일 뱃지</span><b className="text-[#b7ff31]">4일 남음</b></div></div></div></Panel>
      <Panel className="flex min-h-[360px] flex-col p-5 md:p-6"><div className="flex items-center justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">최근 프로젝트</p><h2 className="mt-3 text-2xl font-bold tracking-[-0.04em] text-white">최근 프로젝트</h2></div><Link href="/my/learning" aria-label="내 학습으로 이동" className="grid size-10 place-items-center border border-white/15 text-[#b7ff31] hover:bg-[#b7ff31]/10"><ChevronRight size={22} /></Link></div><span className="mt-4 w-fit bg-[#b7ff31]/10 px-2 py-1 text-xs font-bold text-[#b7ff31]">진행 중 / 내 프로젝트</span><h3 className="mt-3 text-xl font-bold text-white">체력 기록 관리 시스템</h3><p className="mt-2 text-sm text-white/54">3일차 / 여러 기록 목록 관리하기</p><div className="mt-5"><div className="flex justify-between text-xs text-white/45"><span>진행률</span><b className="text-white">38%</b></div><div className="mt-2 h-2 bg-white/10"><i className="block h-full w-[38%] bg-[#b7ff31]" /></div></div><div className="mt-4 border border-white/10 bg-white/[0.04] p-3"><div className="flex items-center justify-between gap-3"><div><p className="text-xs text-white/45">현재 단계</p><p className="mt-1 text-sm font-bold text-white">여러 기록 목록 관리하기</p></div><span className="shrink-0 bg-[#b7ff31]/10 px-2 py-1 text-xs font-bold text-[#b7ff31]">3일차</span></div></div><div className="mt-auto pt-4"><Link href="/my/learning"><ActionButton fullWidth>내 학습에서 이어가기 <ArrowRight size={16} /></ActionButton></Link></div></Panel>
    </div>
    <div className="hidden grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(420px,.9fr)]">
      <Panel className="flex min-h-[172px] flex-col justify-between p-5 md:flex-row md:items-center md:p-6"><div className="flex items-center gap-4"><span className="grid size-14 shrink-0 place-items-center border border-[#b7ff31]/35 bg-[#b7ff31]/10 text-[#b7ff31]"><UsersRound size={25} /></span><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b7ff31]">동료 평가</p><h2 className="mt-2 text-xl font-bold text-white">동료 리뷰 요청 <span className="text-[#b7ff31]">5건</span></h2><p className="mt-1 text-sm text-white/55">대기 중인 동료 평가를 완료하면 탐사 기록에 반영됩니다.</p></div></div><div className="mt-5 flex items-center gap-3 md:mt-0"><button onClick={() => goTo("projects")} className="text-sm font-bold text-white/58 hover:text-white">전체 보기 <ChevronRight className="inline size-4" /></button><ActionButton onClick={() => goTo("projects")}>바로가기 <ArrowRight size={16} /></ActionButton></div></Panel>
      <Panel className="overflow-hidden p-5 md:p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b7ff31]">부대 랭킹</p><h2 className="mt-2 text-xl font-bold text-white">부대별 학습 순위</h2><p className="mt-1 text-xs text-white/48">AI 역량·참여율·단계 달성률 기준</p></div><button onClick={() => setRankStep((step) => (step + 1) % rankSnapshots.length)} className="mili-control inline-flex items-center gap-2 border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-bold text-white hover:border-[#b7ff31]/50 hover:text-[#b7ff31]"><RefreshCw size={14} /> 순위 갱신</button></div><div className="mt-4 border-t border-white/10">{rankings.map((rank, index) => <div key={`${rankStep}-${rank.unit}`} className={`flex items-center gap-3 border-b border-white/[0.08] px-1 py-3 last:border-0 ${index === 0 ? "bg-[#b7ff31]/10" : ""}`}><span className={`grid size-8 place-items-center text-sm font-black ${index === 0 ? "bg-[#b7ff31] text-black" : "bg-white/[0.07] text-white/72"}`}>{index === 0 ? <Trophy size={16} /> : index + 1}</span><b className="flex-1 text-sm text-white">{rank.unit}</b><span className="text-xs text-white/46">{rank.score} XP</span></div>)}</div><p className="mt-3 text-xs text-[#b7ff31]">{rankStep === 0 ? "실시간 집계 대기 중" : rankStep === 1 ? "2대대가 3위에서 2위로 상승했습니다." : "2대대가 이번 주 1위에 올랐습니다."}</p></Panel>
    </div>
  </div>;
}

function VodView({ openCourse }: { openCourse: (title: string) => void }) {
  const [filter, setFilter] = useState("전체");
  return <><PageHeading eyebrow="영상 학습" title="VOD 콘텐츠 목록" copy="강의 상세에서 영상·자료·코딩·퀴즈·AI 채팅을 한 흐름으로 이어갈 수 있습니다." aside={<span className="text-sm text-white/45">전체 강의 <b className="text-white">48개</b></span>} />
    <div className="grid gap-5 xl:grid-cols-[230px_1fr]"><Panel className="h-fit p-4"><p className="px-2 text-xs font-bold text-white/60">카테고리</p><div className="mt-3 grid gap-1">{["전체", "생성 AI", "코딩", "데이터 분석", "보안"].map(item => <button key={item} onClick={() => setFilter(item)} className={`rounded-lg px-3 py-2.5 text-left text-sm ${filter === item ? "bg-[#b7ff31] font-bold text-[#0b1205]" : "text-white/58 hover:bg-white/5 hover:text-white"}`}>{item}</button>)}</div><div className="my-4 border-t border-white/10" /><p className="px-2 text-xs font-bold text-white/60">학습 상태</p><div className="mt-3 space-y-2 px-2 text-sm text-white/54"><label className="flex gap-2"><input type="checkbox" defaultChecked /> 진행 중</label><label className="flex gap-2"><input type="checkbox" /> 수료 가능</label></div></Panel>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{vodCourses.concat([{ title: "업무용 문서 작성 자동화", detail: "코딩 / 중급", time: "예상 36분", label: "인기 강의", percent: 0 }, { title: "AI 결과 검증과 개선", detail: "생성 AI / 중급", time: "예상 51분", label: "추천 강의", percent: 0 }, { title: "팀 협업을 위한 AI 워크플로", detail: "실무 적용 / 중급", time: "예상 28분", label: "신규 강의", percent: 0 }]).map((course) => <button type="button" key={course.title} onClick={() => openCourse(course.title)} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b110d] text-left transition hover:-translate-y-1 hover:border-[#b7ff31]/50"><div className="flex h-28 items-start justify-between bg-[#142114] p-4"><span className="rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold text-[#b7ff31]">{course.label}</span><Play className="size-8 rounded-full border border-white/25 p-2 text-white" /></div><div className="p-5"><p className="text-xs text-white/46">{course.detail}</p><h2 className="mt-2 min-h-12 text-lg font-bold leading-6 tracking-[-0.03em] text-white">{course.title}</h2><p className="mt-3 text-xs text-white/46">{course.time}</p><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#b7ff31]">강의 보기 <ArrowRight size={15} /></span></div></button>)}</div>
    </div></>;
}

function VodDetailView({ title, backToList }: { title: string; backToList: () => void }) {
  const [activeTab, setActiveTab] = useState("강의 소개");
  const [enrolled, setEnrolled] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const sections = ["강의 소개", "커리큘럼", "자료", "학습 후기"];
  return <><div className="mb-6 flex items-center gap-2 text-sm text-white/52"><button onClick={backToList} className="hover:text-[#b7ff31]">VOD 콘텐츠</button><ChevronRight size={16} /><b className="max-w-[260px] truncate text-white">{title}</b></div>
    <Panel className="overflow-hidden"><div className="grid lg:grid-cols-[1.05fr_.95fr]"><div className="flex min-h-[330px] flex-col justify-between bg-[linear-gradient(135deg,#162916,#060a07)] p-7 md:p-10"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b7ff31]">VOD 강의</p><span className="mt-6 inline-flex border border-[#b7ff31]/30 bg-[#b7ff31]/10 px-2 py-1 text-xs font-bold text-[#b7ff31]">생성 AI / 2단계</span><h1 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-[-0.05em] text-white md:text-5xl">{title}</h1><p className="mt-4 max-w-lg text-sm leading-6 text-white/62">업무에서 바로 활용할 수 있는 핵심 개념을 이해하고, 짧은 실습으로 나만의 결과물을 완성하는 강의입니다.</p></div><div className="mt-8 flex flex-wrap gap-4 text-sm text-white/62"><span>총 38분</span><span>영상 6개</span><span>실습 1개</span><span>퀴즈 3문항</span></div></div><div className="border-t border-white/10 bg-black/45 p-7 lg:border-l lg:border-t-0 md:p-10"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#54c7ff]">강의 안내</p><h2 className="mt-3 text-2xl font-bold text-white">이 강의에서 얻는 것</h2><ul className="mt-6 space-y-4 text-sm leading-6 text-white/62">{["업무 상황에 맞는 프롬프트 구조화 방법", "AI 결과를 검증하고 개선하는 체크포인트", "작전 보고서 요약 실습 결과물 1개"].map((item) => <li className="flex gap-3" key={item}><BadgeCheck className="mt-0.5 size-5 shrink-0 text-[#b7ff31]" />{item}</li>)}</ul><div className="mt-8 flex flex-wrap gap-3">{enrolled ? <Link href="/courses/생성-ai-업무-활용-기초/learn"><ActionButton><Play size={16} /> 학습하기</ActionButton></Link> : <><ActionButton onClick={() => setBlocked(true)} subtle>학습하기 <Play size={16} /></ActionButton><ActionButton onClick={() => { setEnrolled(true); setBlocked(false); }}>수강 신청하기 <ArrowRight size={16} /></ActionButton></> }</div>{blocked && <p className="mt-4 text-sm text-[#ffb84d]">수강 신청 후 학습할 수 있습니다.</p>}{enrolled && <p className="mt-4 text-sm text-[#4ed58a]">수강 신청이 완료되었습니다. 학습하기를 눌러 VOD 학습기로 이동하세요.</p>}</div></div></Panel>
    <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_310px]"><Panel className="p-5 md:p-7"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{sections.map((tab) => <button onClick={() => setActiveTab(tab)} key={tab} className={`shrink-0 px-3 py-2 text-sm font-bold ${activeTab === tab ? "border-b-2 border-[#b7ff31] text-[#b7ff31]" : "text-white/52 hover:text-white"}`}>{tab}</button>)}</div>{activeTab === "강의 소개" ? <div className="py-7"><h2 className="text-xl font-bold text-white">강의 소개</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-white/62">AI를 안전하게 활용하기 위한 기본 원칙을 이해하고, 실제 업무 문서를 요약·정리하는 과정을 따라 합니다. 영상 시청 후 바로 실습과 퀴즈로 학습을 확인할 수 있습니다.</p></div> : <div className="py-5 space-y-3">{["1. AI가 이해하는 업무 맥락", "2. 원하는 답을 얻는 프롬프트 설계", "3. 결과 검증과 개선 실습"].map((chapter, index) => <button key={chapter} className="flex w-full items-center gap-4 border border-white/10 bg-white/[0.025] p-4 text-left hover:border-[#b7ff31]/45"><span className="grid size-8 place-items-center bg-[#b7ff31]/10 text-xs font-bold text-[#b7ff31]">{index + 1}</span><span className="flex-1 text-sm font-bold text-white">{chapter}</span><span className="text-xs text-white/46">{index === 1 ? "14분" : "12분"}</span><Play className="size-4 text-[#b7ff31]" /></button>)}</div>}</Panel><Panel className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b7ff31]">학습 현황</p><h2 className="mt-3 text-xl font-bold text-white">학습 진행 현황</h2><p className="mt-5 text-4xl font-black text-white">64%</p><div className="mt-3 h-2 bg-white/10"><div className="h-full w-[64%] bg-[#b7ff31]" /></div><div className="mt-7 border-t border-white/10 pt-5 text-sm"><p className="text-white/46">다음 학습</p><b className="mt-2 block text-white">2. 프롬프트 구조 설계</b><button className="mt-4 text-sm font-bold text-[#b7ff31]">이어서 보기 <ArrowRight className="inline size-4" /></button></div></Panel></div></>;
}

function ProjectView({ openProject }: { openProject: (title: string) => void }) {
  return <><PageHeading eyebrow="프로젝트 기반 학습" title="프로젝트" copy="문제를 이해하고, 팀과 함께 결과물을 만들며, 피드백을 성장의 증거로 쌓아갑니다." aside={<ActionButton onClick={() => openProject("체력 기록 관리 시스템")}>프로젝트 둘러보기 <ArrowRight size={16} /></ActionButton>} />
    <div className="grid gap-5 lg:grid-cols-3">{projectCards.map((project, index) => <Panel key={project.title} className="flex min-h-[300px] flex-col p-6"><div className="flex items-center justify-between"><span className={`rounded-full px-3 py-1 text-xs font-bold ${index === 0 ? "bg-[#b7ff31]/15 text-[#b7ff31]" : "bg-white/10 text-white/65"}`}>{project.status}</span><FolderKanban className="text-white/28" /></div><p className="mt-8 text-xs text-white/45">{project.meta}</p><h2 className="mt-2 text-xl font-bold leading-7 tracking-[-0.04em] text-white">{project.title}</h2><p className="mt-3 text-sm leading-6 text-white/56">{project.description}</p><div className="mt-auto pt-7"><ActionButton subtle onClick={() => openProject(project.title)}>{project.action} <ArrowRight size={16} /></ActionButton></div></Panel>)}</div>
    <Panel className="mt-5 p-6"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#54c7ff]">팀 / 피드백</p><h2 className="mt-2 text-xl font-bold text-white">이번 주, 동료 평가 2건이 기다리고 있어요.</h2><p className="mt-2 text-sm text-white/55">평가를 완료하면 프로젝트 최종 제출과 역량 증명에 반영됩니다.</p></div><ActionButton onClick={() => openProject("동료 평가")}>동료 평가하기 <ClipboardCheck size={16} /></ActionButton></div></Panel>
  </>;
}

function PeerReviewView() {
  const teammates = [
    { name: "박민수 일병", role: "데이터 구조 정리", status: "평가 대기" },
    { name: "이수진 하사", role: "사용자 흐름 설계", status: "평가 대기" },
    { name: "최도윤 상병", role: "화면 구현", status: "평가 완료" },
  ];
  const [selected, setSelected] = useState(0);
  const [score, setScore] = useState(4);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const teammate = teammates[selected];
  return <><PageHeading eyebrow="PBL 프로젝트 / 동료 평가" title="우리 팀의 기여를 평가해 주세요" copy="역할 수행, 협업, 문제 해결 과정을 바탕으로 동료에게 구체적인 피드백을 남깁니다." aside={<span className="border border-[#b7ff31]/35 bg-[#b7ff31]/10 px-3 py-2 text-sm font-bold text-[#b7ff31]">평가 2건 남음</span>} />
    <div className="grid gap-5 xl:grid-cols-[320px_minmax(0,1fr)]"><Panel className="p-4"><p className="px-2 text-xs font-bold text-white/50">체력 기록 관리 시스템 팀</p><div className="mt-3 space-y-2">{teammates.map((member, index) => <button key={member.name} onClick={() => { setSelected(index); setSubmitted(false); }} className={`w-full border p-4 text-left ${selected === index ? "border-[#b7ff31] bg-[#b7ff31]/10" : "border-white/10 bg-black/20"}`}><div className="flex items-center justify-between"><b className="text-sm text-white">{member.name}</b><span className={`text-xs font-bold ${member.status === "평가 완료" ? "text-[#4ed58a]" : "text-[#ffb84d]"}`}>{member.status}</span></div><p className="mt-2 text-xs text-white/50">{member.role}</p></button>)}</div></Panel><Panel className="p-6 md:p-8"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-xs font-bold text-[#b7ff31]">평가 대상</p><h2 className="mt-2 text-2xl font-bold text-white">{teammate.name}</h2><p className="mt-2 text-sm text-white/55">담당 역할 / {teammate.role}</p></div><span className="border border-white/10 px-3 py-2 text-sm text-white/60">익명 피드백</span></div><div className="mt-8"><p className="text-sm font-bold text-white">역할 수행과 협업 기여도</p><div className="mt-3 flex gap-2">{[1, 2, 3, 4, 5].map(value => <button key={value} onClick={() => setScore(value)} aria-label={`${value}점`} className={`grid size-11 place-items-center border text-lg ${score >= value ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/15 text-white/35"}`}>★</button>)}</div><p className="mt-3 text-sm text-[#b7ff31]">{score}점 / {score >= 4 ? "기대 이상으로 기여했어요." : "구체적인 개선점을 함께 남겨주세요."}</p></div><label className="mt-7 block text-sm font-bold text-white">구체적인 피드백</label><textarea value={comment} onChange={event => setComment(event.target.value)} className="mt-3 min-h-40 w-full border border-white/10 bg-black/30 p-4 text-sm text-white outline-none focus:border-[#b7ff31]" placeholder="잘한 점과 다음 프로젝트에서 기대하는 점을 작성하세요" /><div className="mt-5 flex flex-wrap items-center gap-3"><ActionButton onClick={() => setSubmitted(true)}>평가 제출하기 <ClipboardCheck size={16} /></ActionButton>{submitted && <p className="text-sm font-bold text-[#4ed58a]">{teammate.name}님에 대한 평가를 제출했습니다.</p>}</div></Panel></div></>;
}

function CommunityView() {
  const [tab, setTab] = useState("Q&A");
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const board: Record<string, Array<{ title: string; meta: string; author: string; summary: string }>> = {
    "공지사항": [
      { title: "7월 신규 PBL 프로젝트 공개", meta: "운영공지 / 2026.07.25", author: "운영교관", summary: "체력 기록 관리와 보급 현황 데이터 시각화 프로젝트를 공개합니다. 공개 과정은 로그인 없이 미션까지 체험할 수 있습니다." },
      { title: "학습 서비스 정기 점검 안내", meta: "서비스 안내 / 2026.07.23", author: "MiliAI 운영팀", summary: "학습 기록과 탐사 보상 반영을 위한 정기 점검 일정을 안내합니다." },
      { title: "탐사 보상 정책 업데이트", meta: "보상 안내 / 2026.07.21", author: "MiliAI 운영팀", summary: "VOD 완료와 PBL 문제 완료는 100 XP, 동료평가 제출은 10 XP로 반영됩니다." },
    ],
    "Q&A": [
      { title: "작전 보고서 요약에서 정보 누락을 줄이는 방법이 있나요?", meta: "프로젝트 / 2시간 전", author: "박민수 일병", summary: "필수 보고 항목을 먼저 체크리스트로 정의한 뒤, 프롬프트의 출력 형식을 표로 고정해 보세요." },
      { title: "Python 모듈을 불러올 때 import와 from의 차이", meta: "VOD 강의 / 4시간 전", author: "김철수 상병", summary: "가져올 범위와 호출 방법의 차이를 예제 코드와 함께 확인할 수 있습니다." },
      { title: "생성 AI 보안 수칙 퀴즈 2번 문항 관련 질문", meta: "VOD 강의 / 오늘", author: "이수진 하사", summary: "군 내부 정보는 승인된 도구와 범위 안에서만 다루어야 합니다." },
    ],
    "FAQ": [
      { title: "인증서는 어떻게 발급받나요?", meta: "자주 묻는 질문", author: "MiliAI 안내", summary: "인증서는 VOD와 PBL의 완료 이력이 충족되면 마이페이지에서 발급 상태를 확인할 수 있습니다." },
      { title: "탐사 경험치는 언제 반영되나요?", meta: "자주 묻는 질문", author: "MiliAI 안내", summary: "완료 이벤트에서 즉시 반영됩니다. 3일 연속 학습부터는 VOD와 PBL 완료 XP에 10%가 더해집니다." },
      { title: "팀 프로젝트 동료평가는 익명인가요?", meta: "자주 묻는 질문", author: "MiliAI 안내", summary: "평가 대상에게는 제출자의 이름 대신 구체적인 피드백 내용과 점수만 전달됩니다." },
    ],
    "뉴스": [
      { title: "AI 교관이 알려주는 보고서 구조화 3단계", meta: "학습 소식 / 2026.07.28", author: "AI 교관", summary: "목표, 근거, 다음 조치 순으로 보고서를 정리하면 핵심 판단을 빠르게 전달할 수 있습니다." },
      { title: "이번 주 추천 실습: 체력 기록 관리 화면 설계", meta: "학습 소식 / 2026.07.26", author: "학습 큐레이터", summary: "장병이 현장에서 바로 사용할 수 있는 기록 관리 화면의 우선순위를 살펴봅니다." },
      { title: "7일 연속 학습 챌린지 진행 중", meta: "학습 소식 / 2026.07.24", author: "탐사 보상센터", summary: "연속 학습을 이어가면 탐사 뱃지 획득 조건에 한 걸음 더 가까워집니다." },
    ],
  };
  const posts = board[tab];
  const selected = posts.find((post) => post.title === selectedTitle) || Object.values(board).flat().find((post) => post.title === selectedTitle);
  return <><PageHeading eyebrow="커뮤니티" title="함께 배우는 공간" copy="질문, 공지, 자주 묻는 질문과 학습 소식을 학습 흐름 속에서 확인하세요." aside={<Link href="/community/write"><ActionButton>질문 작성 <MessageCircleQuestion size={16} /></ActionButton></Link>} />
    <div className="grid gap-5 xl:grid-cols-[1fr_310px]"><Panel className="p-5 md:p-7"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{["공지사항", "Q&A", "FAQ", "뉴스"].map((item) => <button onClick={() => { setTab(item); setSelectedTitle(null); }} key={item} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/52 hover:bg-white/5"}`}>{item}</button>)}</div><label className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-white/50"><Search size={17} /><input className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-white/35" placeholder={`${tab}에서 검색`} /></label>{selected ? <article className="mt-5 border border-[#b7ff31]/40 bg-[#b7ff31]/[0.05] p-6"><button type="button" onClick={() => setSelectedTitle(null)} className="text-xs font-bold text-[#b7ff31]">목록으로 돌아가기</button><p className="mt-5 text-xs text-white/45">{selected.meta} / {selected.author}</p><h2 className="mt-3 text-2xl font-bold text-white">{selected.title}</h2><p className="mt-5 text-sm leading-7 text-white/68">{selected.summary}</p></article> : <div className="mt-3">{posts.map((post, index) => <button key={post.title} type="button" onClick={() => setSelectedTitle(post.title)} className="flex w-full items-center gap-4 border-b border-white/[0.08] py-5 text-left hover:bg-white/[0.025]"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-[#b7ff31]">{post.author.slice(0, 1)}</span><span className="min-w-0 flex-1"><strong className="block text-sm text-white">{post.title}</strong><small className="mt-2 block text-xs text-white/42">{post.meta}</small></span><span className="rounded-full bg-white/[0.07] px-2 py-1 text-xs text-white/55">{tab === "Q&A" ? `답변 ${index + 2}` : "보기"}</span></button>)}</div>}</Panel>
      <Panel className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">안내</p><h2 className="mt-2 text-xl font-bold text-white">학습 소식</h2><div className="mt-5 space-y-2">{board["공지사항"].map((notice) => <button key={notice.title} type="button" onClick={() => { setTab("공지사항"); setSelectedTitle(notice.title); }} className="w-full border-b border-white/10 pb-4 text-left last:border-0"><h3 className="text-sm font-bold text-white">{notice.title}</h3><p className="mt-2 text-xs text-white/42">{notice.meta} / 자세히 보기</p></button>)}</div><div className="mt-7 rounded-xl bg-white/[0.05] p-4"><p className="text-xs text-white/45">자주 묻는 질문</p><button type="button" onClick={() => { setTab("FAQ"); setSelectedTitle("인증서는 어떻게 발급받나요?"); }} className="mt-3 text-left text-sm font-bold text-[#b7ff31]">인증서는 어떻게 발급받나요? <ChevronRight className="inline size-4" /></button></div></Panel>
    </div></>;
}

function DiagnosisView({ goTo }: { goTo: (page: PageKey) => void }) {
  const skills = [["문제 정의", 78], ["프롬프트 설계", 84], ["정보 구조화", 62], ["결과 검증", 48], ["AI 도구 활용", 72], ["협업 설계", 66]] as const;
  return <><PageHeading eyebrow="역량 진단" title="역량진단" copy="현재 역량과 목표 사이의 차이를 확인하고, 그 이유를 설명하는 맞춤 학습 경로를 제안합니다." aside={<ActionButton onClick={() => goTo("guide")}>추천 여정 보기 <ArrowRight size={16} /></ActionButton>} />
    <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><Panel className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#54c7ff]/15 text-[#54c7ff]"><Radar /></span><div><p className="text-xs text-white/45">최근 진단 / 2026.07.26</p><h2 className="text-2xl font-bold text-white">AI 실무 역량: 성장 중</h2></div></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{skills.map(([label, value]) => <article key={label} className="relative grid min-h-40 place-items-center overflow-hidden border border-[#54c7ff]/35 bg-[#54c7ff]/[0.055] p-4 text-center" style={{ clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)" }}><div className="grid size-[104px] place-items-center border border-[#54c7ff]/50 bg-[#071116]/85 px-3" style={{ clipPath: "polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)" }}><div><b className="block text-2xl text-[#54c7ff]">{value}</b><span className="mt-1 block text-[10px] font-bold text-white/76">{label}</span></div></div></article>)}</div><p className="mt-7 text-xs leading-5 text-white/48">육각형별 수치는 최근 진단, 학습 완료, PBL 미션과 동료평가 결과를 종합해 표시합니다.</p></Panel>
      <Panel className="p-6 md:p-8"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#ffb84d]">다음 학습</p><h2 className="mt-2 text-2xl font-bold text-white">결과 검증 역량을<br />한 단계 올려볼까요?</h2><p className="mt-4 text-sm leading-6 text-white/56">현재 프로젝트의 검증 미션과 VOD 실습을 완료하면, 실무 적용 단계로 진입할 수 있어요.</p><div className="mt-7 rounded-xl border border-[#ffb84d]/25 bg-[#ffb84d]/[0.07] p-4"><p className="text-xs text-white/45">추천 학습</p><p className="mt-1 text-sm font-bold text-white">AI 결과 검증과 개선 / 51분</p></div><ActionButton onClick={() => goTo("courses")}><Play size={16} /> 학습 시작하기</ActionButton></Panel></div>
  </>;
}

function JourneyView({ goTo }: { goTo: (page: PageKey) => void }) {
  return <><PageHeading eyebrow="나의 학습 여정" title="나의 학습 여정" copy="이수한 강의와 프로젝트가 다음 역량 단계, 인증서 발급 조건으로 어떻게 연결되는지 보여드립니다." aside={<span className="rounded-full border border-[#b7ff31]/35 bg-[#b7ff31]/10 px-3 py-2 text-sm font-bold text-[#b7ff31]">현재 진행률 42%</span>} />
    <Panel className="overflow-hidden p-6 md:p-10"><div className="grid gap-5 md:grid-cols-5">{roadmapSteps.map((step, index) => <article key={step.title} className="relative min-h-44 rounded-2xl border border-white/10 bg-black/20 p-5"><span className={`grid size-10 place-items-center rounded-xl border ${index === 1 ? "border-[#b7ff31] bg-[#b7ff31] text-black" : index === 0 ? "border-[#4ed58a]/35 bg-[#4ed58a]/10 text-[#4ed58a]" : "border-white/15 text-white/45"}`}>{index === 0 ? <FileCheck2 size={18} /> : index === 1 ? <Compass size={18} /> : <Target size={18} />}</span><p className="mt-6 text-xs font-semibold text-white/42">{step.state}</p><h2 className="mt-2 text-lg font-bold text-white">{index + 1}단계 / {step.title}</h2><p className="mt-2 text-xs leading-5 text-white/55">{step.detail}</p>{index < roadmapSteps.length - 1 && <span className="absolute -right-4 top-10 hidden text-[#b7ff31] md:block"><ArrowRight /></span>}</article>)}</div>
      <div className="mt-8 flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:flex-row md:items-center"><div><p className="text-xs text-white/45">다음 체크포인트</p><h2 className="mt-1 text-lg font-bold text-white">생성 AI 활용 단계를 완료하려면 실습 1개가 남아 있어요.</h2></div><ActionButton onClick={() => goTo("courses")}>실습 이어가기 <ArrowRight size={16} /></ActionButton></div></Panel>
  </>;
}

type MyPageSection = "dashboard" | "courses" | "posts" | "badges";

const badgeLevels = [
  { level: 1, color: "#e6b746", label: "입문", description: "AI 기본 개념과 첫 학습을 완료한 단계" },
  { level: 2, color: "#62df78", label: "기초", description: "기본 도구와 업무 흐름을 익히는 단계" },
  { level: 3, color: "#4fc8ff", label: "실전", description: "직접 수행하고 결과를 검증하는 단계" },
  { level: 4, color: "#a98aff", label: "심화", description: "복합 과제를 설계하고 개선하는 단계" },
  { level: 5, color: "#ff8a67", label: "전문", description: "현장 혁신을 주도하는 탐사 단계" },
];

function RewardCenter({ goTo }: { goTo: (page: PageKey) => void }) {
  const [selectedLevel, setSelectedLevel] = useState(3);
  const [savedCertificate, setSavedCertificate] = useState<string | null>(null);
  const selected = badgeLevels[selectedLevel - 1];
  const activity = [
    ["VOD 완료", "생성 AI 업무 활용 기초 / 02. 프롬프트 설계", "+100 XP"],
    ["연속 학습 가산", "3일 연속 학습 달성 / VOD 완료 보상 10%", "+10 XP"],
    ["탐사 뱃지", "호기로운 입문자 / 첫 VOD 완료", "획득 완료"],
    ["학습 출석", "오늘의 첫 학습 완료 / 출석 보너스", "+15 XP"],
    ["동료 평가", "체력 기록 관리 시스템 / 동료 평가 제출", "+10 XP"],
  ];

  return <>
    <PageHeading eyebrow="탐사 보상 센터" title="김철수 상병의 성장 기록" copy="수행을 완료하면 탐사 경험치가 쌓이고, 탐사 Lv와 뱃지, 인증서, 연속 학습 기록으로 성장 과정이 남습니다." aside={<Link href="/my"><ActionButton subtle>마이페이지로 돌아가기 <ChevronRight size={16} /></ActionButton></Link>} />
    <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
      <Panel className="overflow-hidden p-0"><div className="bg-[radial-gradient(circle_at_16%_12%,rgba(79,200,255,.26),transparent_38%),linear-gradient(135deg,#101820,#080d10)] p-6 md:p-8"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="text-xs font-semibold tracking-[0.18em] text-[#4fc8ff]">탐사 경험치 / 현재 성장</p><h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-white">탐사 Lv.3</h2><p className="mt-2 text-sm text-white/58">누적 탐사 경험치 <b className="text-white">184점</b></p></div><span className="grid size-16 place-items-center border-2 border-[#4fc8ff] bg-[#4fc8ff]/10 text-xl font-black text-[#4fc8ff]">Lv.3</span></div><div className="mt-8"><div className="flex justify-between text-sm"><span className="text-white/55">다음 탐사 Lv까지</span><b className="text-white">41점 남음</b></div><div className="mt-3 h-3 bg-white/10"><i className="block h-full w-[67%] bg-[#4fc8ff] shadow-[0_0_18px_rgba(79,200,255,.72)]" /></div><p className="mt-3 text-xs text-white/45">Lv.4 도달 기준 / 누적 225점</p></div></div><div className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">{[["탐사 뱃지", "6개"], ["탐사 인증서", "2개"], ["연속 학습", "3일"], ["최고 기록", "21일"]].map(([label, value]) => <div className="border-r border-white/10 p-4 last:border-r-0" key={label}><p className="text-[11px] text-white/45">{label}</p><b className="mt-2 block text-xl text-white">{value}</b></div>)}</div></Panel>
      <Panel className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center border border-[#ffb84d]/45 bg-[#ffb84d]/10 text-[#ffb84d]"><Flame size={21} /></span><div><p className="text-xs font-semibold tracking-[0.17em] text-[#ffb84d]">연속 학습</p><h2 className="mt-1 text-xl font-bold text-white">3일째 작전 수행 중</h2></div></div><div className="mt-7 grid grid-cols-7 gap-2">{["월", "화", "수", "목", "금", "토", "일"].map((day, index) => <div key={day} className={`grid aspect-square place-items-center border text-xs font-bold ${index < 3 ? "border-[#ffb84d] bg-[#ffb84d] text-black" : index === 3 ? "border-[#ffb84d]/45 bg-[#ffb84d]/10 text-[#ffb84d]" : "border-white/10 bg-black/20 text-white/35"}`}>{index < 3 ? <Flame size={15} fill="currentColor" /> : day}</div>)}</div><div className="mt-6 border border-[#ffb84d]/25 bg-[#ffb84d]/[0.07] p-4"><p className="text-xs font-bold text-[#ffb84d]">가산 적용 중</p><p className="mt-2 text-sm leading-6 text-white/70">VOD 완료와 PBL 문제 완료 시 탐사 경험치가 <b className="text-white">10% 추가</b>됩니다.</p></div></Panel>
    </div>

    <Panel className="mt-5 overflow-hidden p-0"><div className="border-b border-white/10 p-6 md:p-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="text-xs font-semibold tracking-[0.18em] text-[#4fc8ff]">AI SKILL BADGE COLLECTION</p><h2 className="mt-3 text-2xl font-bold text-white">탐사 뱃지 컬렉션</h2><p className="mt-2 text-sm text-white/55">3개 역량군 / 15종 뱃지 / 레벨 1~5</p></div><div className="border border-white/10 bg-black/25 p-3 text-sm"><span className="text-white/45">현재 등급</span><b className="ml-3" style={{ color: selected.color }}>Lv.{selected.level} / {selected.label}</b></div></div><div className="mt-6 flex flex-wrap gap-2">{badgeLevels.map(item => <button key={item.level} onClick={() => setSelectedLevel(item.level)} style={selectedLevel === item.level ? { borderColor: item.color, color: item.color, boxShadow: `0 0 18px ${item.color}45` } : undefined} className={`min-w-16 border px-4 py-2 text-sm font-black transition ${selectedLevel === item.level ? "bg-white/[0.06]" : "border-white/12 text-white/42 hover:text-white"}`}>LV{item.level}</button>)}</div></div><div className="grid gap-6 bg-[#050806] p-4 md:p-8 xl:grid-cols-[minmax(0,1fr)_260px]"><div className="overflow-hidden border border-white/10 bg-black"><Image src={assetPath(`/assets/badges/collection-level-${selectedLevel}.png`)} alt={`탐사 뱃지 컬렉션 레벨 ${selectedLevel}`} width={1512} height={2048} className="h-auto w-full" /></div><aside className="flex flex-col justify-between border border-white/10 bg-white/[0.025] p-5"><div><span className="inline-flex border px-2 py-1 text-xs font-bold" style={{ borderColor: selected.color, color: selected.color }}>Lv.{selected.level} {selected.label}</span><h3 className="mt-5 text-xl font-bold text-white">{selected.description}</h3><p className="mt-3 text-sm leading-6 text-white/56">AI 활용역량, AI 업무혁신역량, AI 사업창출역량을 수행 결과에 따라 수집합니다.</p><dl className="mt-7 space-y-4 border-t border-white/10 pt-5 text-sm"><div className="flex justify-between"><dt className="text-white/48">획득</dt><dd className="font-bold text-white">6 / 15</dd></div><div className="flex justify-between"><dt className="text-white/48">다음 목표</dt><dd className="font-bold text-white">프롬프트 설계</dd></div><div className="flex justify-between"><dt className="text-white/48">남은 조건</dt><dd className="font-bold" style={{ color: selected.color }}>실습 2개</dd></div></dl></div><ActionButton onClick={() => goTo("projects")}>다음 미션 보기 <ArrowRight size={16} /></ActionButton></aside></div></Panel>

    <div className="mt-5 grid gap-5 xl:grid-cols-[1.12fr_.88fr]">
      <Panel className="p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold tracking-[0.17em] text-[#b7ff31]">성장 이력</p><h2 className="mt-2 text-xl font-bold text-white">최근 보상 획득</h2></div><span className="text-xs text-white/45">최근 5건</span></div><div className="mt-5 divide-y divide-white/10">{activity.map(([type, detail, reward], index) => <article key={detail} className="flex items-center gap-3 py-4"><span className={`grid size-10 place-items-center border ${index === 2 ? "border-[#4fc8ff]/45 bg-[#4fc8ff]/10 text-[#4fc8ff]" : "border-[#b7ff31]/35 bg-[#b7ff31]/10 text-[#b7ff31]"}`}>{index === 2 ? <Award size={18} /> : <Sparkles size={18} />}</span><div className="min-w-0 flex-1"><p className="text-xs text-white/45">{type}</p><b className="mt-1 block truncate text-sm text-white">{detail}</b></div><span className={`shrink-0 text-sm font-bold ${index === 2 ? "text-[#4fc8ff]" : "text-[#b7ff31]"}`}>{reward}</span></article>)}</div></Panel>
      <Panel className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center border border-[#54c7ff]/45 bg-[#54c7ff]/10 text-[#54c7ff]"><FileCheck2 size={20} /></span><div><p className="text-xs font-semibold tracking-[0.17em] text-[#54c7ff]">탐사 인증서</p><h2 className="mt-1 text-xl font-bold text-white">완료한 수강 이력</h2></div></div><p className="mt-3 text-xs leading-5 text-white/45">VOD 또는 PBL 수강 완료 후 발급되며, 보상 팝업이 아닌 수강 이력에서 확인합니다.</p><div className="mt-6 space-y-3">{[["생성 AI 업무 활용 기초", "VOD / 2026.07.29"], ["체력 기록 관리 시스템", "PBL / 2026.07.26"]].map(([title, date]) => <article key={title} className="border border-white/10 bg-black/20 p-4"><p className="text-xs text-white/45">{date}</p><b className="mt-2 block text-sm text-white">{title}</b><button onClick={() => setSavedCertificate(title)} className="mt-4 text-xs font-bold text-[#54c7ff]">카드 이미지 저장 <ChevronRight className="inline size-3" /></button></article>)}</div>{savedCertificate && <p className="mt-4 text-xs font-bold text-[#4ed58a]">{savedCertificate} 인증서 카드를 저장했습니다.</p>}</Panel>
    </div>
  </>;
}

function MyPageView({ goTo, section, setSection, openCourse }: { goTo: (page: PageKey) => void; section: MyPageSection; setSection: (section: MyPageSection) => void; openCourse: (title: string) => void }) {
  const [postTab, setPostTab] = useState("전체");
  if (section === "courses") return <><PageHeading eyebrow="내 학습" title="내 강의" copy="최근 학습 중인 강의와 관심 강의를 한 곳에서 관리합니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><div className="grid gap-5 xl:grid-cols-2"><Panel className="p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">수강 중</p><h2 className="mt-2 text-xl font-bold text-white">최근 수강 강의</h2></div><BookOpenCheck className="text-[#b7ff31]" /></div><div className="mt-5 space-y-3">{[{ title: "생성 AI 업무 활용 기초", percent: 64 }, { title: "보안 AI 활용 수칙", percent: 22 }].map(course => <button key={course.title} onClick={() => openCourse(course.title)} className="w-full border border-white/10 bg-black/30 p-4 text-left hover:border-[#b7ff31]/45"><div className="flex justify-between gap-3"><b className="text-sm text-white">{course.title}</b><span className="text-xs font-bold text-[#b7ff31]">{course.percent}%</span></div><div className="mt-3 h-1.5 bg-white/10"><div className="h-full bg-[#b7ff31]" style={{ width: `${course.percent}%` }} /></div><span className="mt-3 block text-xs text-white/46">이어서 보기 <ArrowRight className="inline size-3" /></span></button>)}</div></Panel><Panel className="p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#54c7ff]">보관한 강의</p><h2 className="mt-2 text-xl font-bold text-white">관심 강의</h2></div><Award className="text-[#54c7ff]" /></div><div className="mt-5 space-y-3">{["AI 결과 검증과 개선", "데이터 시각화의 첫걸음", "업무용 문서 작성 자동화"].map((title, index) => <button key={title} onClick={() => openCourse(title)} className="flex w-full items-center gap-4 border border-white/10 bg-white/[0.025] p-4 text-left hover:border-[#54c7ff]/55"><span className="grid size-9 place-items-center bg-[#54c7ff]/10 text-sm font-black text-[#54c7ff]">{index + 1}</span><span className="min-w-0 flex-1"><b className="block truncate text-sm text-white">{title}</b><small className="mt-1 block text-xs text-white/45">관심 목록에 저장됨</small></span><ChevronRight className="size-4 text-white/40" /></button>)}</div></Panel></div></>;
  if (section === "posts") { const postGroups: Record<string, string[]> = { "전체": ["생성 AI 보안 수칙 퀴즈 2번 문항 관련 질문", "체력 기록 관리 시스템 동료 평가를 완료했습니다.", "작전 보고서 요약에 대한 AI 교관 답변"], "내 댓글": ["Python 모듈 질문에 댓글을 남겼습니다.", "데이터 시각화 차트 선택 답변"], "동료 평가": ["체력 기록 관리 시스템 / 동료 평가", "보급 현황 데이터 시각화 / 동료 피드백"], "게시판 질의": ["정보 누락을 줄이는 방법이 있나요?", "AI 보안 수칙 퀴즈 관련 질문"], "AI 교관": ["보고서 요약 프롬프트 상담", "결과 검증 체크리스트 대화"] }; return <><PageHeading eyebrow="내 활동" title="작성한 게시글" copy="내가 남긴 댓글, 동료 평가, 게시판 질의와 AI 교관 대화를 분류해 확인합니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><Panel className="p-5 md:p-7"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{Object.keys(postGroups).map(tab => <button key={tab} onClick={() => setPostTab(tab)} className={`shrink-0 px-3 py-2 text-sm font-bold ${postTab === tab ? "bg-[#b7ff31] text-black" : "text-white/55 hover:bg-white/5 hover:text-white"}`}>{tab}</button>)}</div><div className="mt-2">{postGroups[postTab].map((post, index) => <article key={post} className="flex items-center gap-4 border-b border-white/[0.08] py-5 last:border-0"><span className="grid size-10 shrink-0 place-items-center bg-white/[0.07] text-[#b7ff31]">{postTab === "AI 교관" ? <Sparkles size={17} /> : postTab === "동료 평가" ? <UsersRound size={17} /> : <MessageSquareText size={17} />}</span><div className="min-w-0 flex-1"><h2 className="truncate text-sm font-bold text-white">{post}</h2><p className="mt-2 text-xs text-white/46">{postTab === "AI 교관" ? "AI 교관 상담 / " : postTab === "동료 평가" ? "프로젝트 피드백 / " : "커뮤니티 활동 / "}2026.07.{25-index}</p></div><button className="text-xs font-bold text-[#b7ff31]">보기 <ChevronRight className="inline size-3" /></button></article>)}</div></Panel></> }
  if (section === "badges") return <><PageHeading eyebrow="보상 모음" title="뱃지 달성 현황" copy="다음 획득 예정 뱃지와 지금까지 획득한 뱃지 컬렉션입니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><Panel className="p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">뱃지 진행 현황</p><h2 className="mt-2 text-xl font-bold text-white">다음 뱃지까지 2개 미션</h2></div><span className="border border-white/12 bg-white/[0.05] px-3 py-2 text-sm font-bold text-white">획득 6/8</span></div><div className="mt-7 grid gap-6 border border-white/10 bg-[linear-gradient(135deg,#1a211c,#0c100d)] p-6 md:grid-cols-[170px_1fr_auto] md:items-center"><div className="relative mx-auto grid size-36 place-items-center border-[14px] border-[#b7ff31]/30"><span className="text-center text-3xl font-black text-white">3<small className="text-base text-white/52">/5</small><small className="mt-1 block text-xs font-normal text-white/52">진행</small></span></div><div><p className="text-sm text-white/52">다음 뱃지</p><h3 className="mt-2 text-2xl font-bold text-white">프롬프트 실전 뱃지</h3><p className="mt-3 text-sm text-white/58">남은 조건 / 생성 AI 실습 프로젝트 2개 완료</p><span className="mt-4 inline-block bg-[#b7ff31]/15 px-3 py-2 text-sm font-bold text-[#b7ff31]">XP +150 / 3단계 진입 조건 반영</span></div><ActionButton onClick={() => goTo("projects")}>남은 프로젝트 보기</ActionButton></div><div className="mt-8 flex items-center justify-between"><h2 className="text-lg font-bold text-white">획득한 뱃지 컬렉션</h2><span className="text-xs text-white/48">전체 보기 <ChevronRight className="inline size-3" /></span></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{["AI 기초 이해", "프롬프트 입문", "보안 수칙 통과", "생성 AI 활용", "바이브코딩 입문", "동료 리뷰 참여", "프롬프트 실전", "데이터 분석 입문"].map((badge, index) => <article key={badge} className={`p-3 text-center ${index < 6 ? "border border-[#b7ff31]/35 bg-[#b7ff31]/[0.07]" : "border border-white/10 bg-white/[0.03] opacity-45"}`}><Award className={`mx-auto size-8 ${index < 6 ? "text-[#b7ff31]" : "text-white/45"}`} /><p className="mt-3 text-xs font-bold text-white">{badge}</p></article>)}</div></Panel></>;
  return <><PageHeading eyebrow="내 대시보드" title="김철수 상병의 성장 기록" copy="학습 시간보다 실제 수행한 활동과 증거를 기준으로 성장을 확인합니다." />
    <Link href="/my/credits" className="mili-frame mb-5 flex items-center justify-between border border-[#4fc8ff]/35 bg-[#4fc8ff]/[0.07] p-4 text-sm"><span className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-[#4fc8ff]/45 text-[#4fc8ff]"><Award size={17} /></span><span><b className="block text-white">탐사 보상 센터</b><small className="mt-1 block text-white/52">탐사 경험치 / Lv / 뱃지 / 인증서 / 연속 학습 확인</small></span></span><span className="font-bold text-[#4fc8ff]">성장 기록 보기 <ChevronRight className="inline size-4" /></span></Link>
    <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]"><Panel className="mili-profile-frame relative overflow-hidden p-6 md:p-8"><div className="grid gap-6 lg:grid-cols-[250px_1fr]"><div className="relative min-h-[260px] overflow-hidden border border-[#b7ff31]/70 bg-black/55"><Image src={assetPath("/assets/soldier-profile-reference.png")} alt="김철수 상병 프로필" fill priority className="object-contain object-bottom" /><span className="absolute bottom-3 left-0 right-0 text-center font-mono text-xl font-black text-[#b7ff31]"></span></div><div className="relative"><div className="flex items-center justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-3xl font-bold tracking-[-0.045em] text-white">김철수 상병</h2><span className="border border-[#54c7ff]/40 bg-[#54c7ff]/10 px-2 py-1 text-xs font-bold text-[#54c7ff]">AI 탐사대원</span></div><p className="mt-3 text-sm text-white/52">이병 / 비전공 장병 / 체력 기록 관리 시스템 진행 중</p></div><Award className="size-9 text-[#b7ff31]" /></div><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["탐사 경험치", "184 XP"], ["탐사 Lv", "Lv.3"], ["탐사 뱃지", "6개"], ["연속 학습", "3일"]].map(([label, value]) => <div key={label} className="border border-white/10 bg-black/65 p-3"><p className="text-[11px] text-white/45">{label}</p><b className="mt-2 block text-xl text-white">{value}</b></div>)}</div><Link href="/my/credits" className="mt-4 flex items-center justify-between gap-3 border border-[#54c7ff]/30 bg-[#54c7ff]/[0.05] p-3 hover:border-[#54c7ff]/70"><div><p className="text-xs font-bold text-[#54c7ff]">보유 탐사 뱃지</p><p className="mt-1 text-xs text-white/52">AI 도구 활용 / 업무 분석 / Lv.3</p></div><div className="flex items-center -space-x-3"><Image src={assetPath("/assets/badges/ai-tool-level-3.png")} alt="AI 도구 활용 Lv.3 뱃지" width={54} height={54} className="size-14 object-contain" /><Image src={assetPath("/assets/badges/work-analysis-level-3.png")} alt="업무 분석 Lv.3 뱃지" width={54} height={54} className="size-14 object-contain" /></div></Link><div className="mt-6 border border-white/10 bg-black/65 p-4"><div className="flex justify-between text-sm"><b className="font-mono text-lg text-white">탐사 Lv.3</b><span className="text-[#b7ff31]">67%</span></div><div className="mt-3 h-2 bg-white/10"><div className="h-full w-[67%] bg-[#b7ff31]" /></div></div><p className="mt-2 text-xs text-white/45">다음 탐사 Lv까지 41 XP</p></div></div></Panel>
      <Panel className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">최근 프로젝트</p><h2 className="mt-2 text-xl font-bold text-white">체력 기록 관리 시스템</h2><p className="mt-2 text-sm text-white/55">3일차 / 여러 기록 목록 관리하기</p><div className="mt-8 h-2 rounded-full bg-white/10"><div className="h-full w-[38%] rounded-full bg-[#b7ff31]" /></div><p className="mt-2 text-right text-xs text-white/45">진행률 38%</p><ActionButton onClick={() => goTo("projects")}>이어서 학습하기 <ArrowRight size={16} /></ActionButton></Panel>
    </div><div className="mt-5 grid gap-5 md:grid-cols-3">{[["내 강의", "최근 수강 강의 / 관심 강의", "courses"], ["작성한 게시글", "댓글 / 동료 평가 / 질의 / AI 교관", "posts"], ["뱃지 달성 현황", "획득 6/8 / 다음 뱃지 진행 중", "badges"]].map(([title, detail, target]) => <Panel className="p-5" key={title}><h2 className="text-lg font-bold text-white">{title}</h2><p className="mt-2 text-sm text-white/52">{detail}</p><button onClick={() => setSection(target as MyPageSection)} className="mt-5 text-sm font-bold text-[#b7ff31]">확인하기 <ChevronRight className="inline size-4" /></button></Panel>)}</div>
  </>;
}

function AboutView({ goTo }: { goTo: (page: PageKey) => void }) {
  return <><PageHeading eyebrow="MiliAI 소개" title="배운 것을 수행하고, 수행한 것을 역량으로 증명합니다." copy="MiliAI는 영상 시청에서 끝나지 않고 실습·프로젝트·피드백·인증으로 이어지는 AI 학습 운영 시스템입니다." aside={<ActionButton onClick={() => goTo("courses")}>학습 시작하기 <ArrowRight size={16} /></ActionButton>} />
    <div className="grid gap-5 lg:grid-cols-3">{[["Guided", "다음 행동을 잃지 않는 학습", "현재 단계와 선수 지식을 바탕으로 다음 학습을 추천합니다."], ["Applied", "직접 해보며 완성하는 학습", "VOD, 코딩, 퀴즈, PBL 결과물을 한 흐름으로 연결합니다."], ["Evidenced", "성장을 증명하는 학습", "수료·피드백·배지·역량진단이 학습의 증거로 축적됩니다."]].map(([label, title, copy]) => <Panel className="p-7" key={label}><span className="text-sm font-bold text-[#b7ff31]">{label}</span><h2 className="mt-5 text-2xl font-bold leading-8 text-white">{title}</h2><p className="mt-4 text-sm leading-6 text-white/55">{copy}</p></Panel>)}</div>
    <Panel className="mt-5 p-7 md:p-10"><h2 className="text-2xl font-bold text-white">학습 구조</h2><div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-bold">{["역량진단", "VOD로 이해", "퀴즈·코딩으로 확인", "PBL로 적용", "동료·AI 피드백", "역량·로드맵 갱신"].map((item, index) => <span key={item} className="flex items-center gap-3"><span className="rounded-xl border border-white/12 bg-white/[0.04] px-3 py-2 text-white">{item}</span>{index < 5 && <ArrowRight className="size-4 text-[#b7ff31]" />}</span>)}</div></Panel>
  </>;
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "") || "course";
}

function routeGroup(pathname: string): PageKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/courses")) return "courses";
  if (pathname.startsWith("/projects")) return "projects";
  if (pathname.startsWith("/learning")) return "learning";
  if (pathname.startsWith("/classrooms")) return "classrooms";
  if (pathname.startsWith("/ranking")) return "ranking";
  if (pathname.startsWith("/showcase")) return "showcase";
  if (pathname.startsWith("/team-projects")) return "team";
  if (pathname.startsWith("/community")) return "community";
  if (pathname.startsWith("/search")) return "search";
  if (pathname.startsWith("/my")) return "my";
  if (pathname.startsWith("/diagnosis")) return "diagnosis";
  if (pathname.startsWith("/journey")) return "journey";
  if (pathname.startsWith("/about")) return "about";
  return "guide";
}

function EmptyState({ title, copy, action }: { title: string; copy: string; action?: React.ReactNode }) {
  return <Panel className="grid min-h-[300px] place-items-center p-8 text-center"><div className="max-w-md"><span className="mx-auto grid size-14 place-items-center border border-[#b7ff31]/35 bg-[#b7ff31]/10 text-[#b7ff31]"><Search size={24} /></span><h2 className="mt-5 text-xl font-bold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-white/55">{copy}</p>{action && <div className="mt-6">{action}</div>}</div></Panel>;
}

function RewardOverlay({ onClaim, eventLabel = "VOD 학습 완료" }: { onClaim: () => void; eventLabel?: string }) {
  const rewards = [
    { label: "VOD 완료", value: "+100 XP", icon: <Sparkles size={28} /> },
    { label: "연속 학습 가산", value: "+10 XP", icon: <Flame size={28} /> },
    { label: "출석 보너스", value: "+15 XP", icon: <Gift size={28} /> },
    { label: "탐사 뱃지", value: "호기로운 입문자", icon: <Award size={28} /> },
  ];
  return <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="mission-complete-title"><div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url('${assetPath("/assets/home-mission-map-background.png")}')` }} /><div aria-hidden="true" className="mili-reward-scan absolute inset-0" /><section className="mili-reward-modal relative w-full max-w-[840px] overflow-hidden border border-[#b7ff31]/55 bg-[#070b08]/95 px-5 py-7 shadow-[0_0_80px_rgba(183,255,49,.18)] sm:px-9 sm:py-10"><div className="mili-reward-corner mili-reward-corner-tl" /><div className="mili-reward-corner mili-reward-corner-tr" /><div className="mili-reward-corner mili-reward-corner-bl" /><div className="mili-reward-corner mili-reward-corner-br" /><div className="relative text-center"><div className="mili-report-label"><span /> 임무 보고 <span /></div><div className="mili-complete-stage mt-10 px-4 py-9 sm:py-12"><p className="text-xs font-bold tracking-[0.24em] text-[#b7ff31]">{eventLabel}</p><h2 id="mission-complete-title" className="mili-mission-complete mt-3 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">Mission Complete</h2><p className="mt-4 text-base font-medium text-white/80 sm:text-xl">완료 검증 후 보상이 반영되었습니다.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2">{rewards.map((reward, index) => <article key={reward.label} className="mili-reward-item border border-[#b7ff31]/25 bg-[#101610]/80 p-4 text-left" style={{ animationDelay: `${.35 + index * .12}s` }}><span className="grid size-12 place-items-center border border-[#b7ff31] bg-[#b7ff31]/10 text-[#b7ff31]">{reward.icon}</span><p className="mt-4 text-sm font-bold text-[#b7ff31]">{reward.label}</p><b className="mt-1 block text-2xl text-white">{reward.value}</b></article>)}</div><ActionButton fullWidth onClick={onClaim}><Check size={17} /> 확인</ActionButton><p className="mt-3 text-xs text-white/45">보상은 완료 이벤트 기준으로 이미 확정되었으며, 인증서는 내 수강 이력에서 확인할 수 있습니다.</p></div></section></div>;
}

function LearningPlayerView() {
  const [tab, setTab] = useState("목차");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [ideOpen, setIdeOpen] = useState(false);
  const [seconds, setSeconds] = useState(872);
  const [playing, setPlaying] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const duration = 1080;
  const completed = seconds >= duration;
  const showReward = completed && !rewardClaimed;
  useEffect(() => { if (!playing || completed) return; const timer = window.setInterval(() => setSeconds(current => Math.min(duration, current + 6)), 300); return () => window.clearInterval(timer); }, [playing, completed]);
  const time = (value: number) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
  const progress = Math.round((seconds / duration) * 100);
  return <><PageHeading eyebrow="VOD 학습기" title="생성 AI 업무 활용 기초" copy="수강 중인 강의입니다. 목차, 노트, 답벗과 실습 도구를 한 흐름으로 사용할 수 있습니다." aside={<span className={`border px-3 py-2 text-sm font-bold ${completed ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-[#4ed58a]/35 bg-[#4ed58a]/10 text-[#4ed58a]"}`}>{completed ? "수강 완료" : `수강 중 / ${progress}%`}</span>} />
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><Panel className="overflow-hidden"><div className="relative flex min-h-[410px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#294521,#050806_70%)] p-6"><div aria-hidden="true" className={`absolute inset-0 opacity-30 ${playing ? "animate-pulse" : ""}`} style={{ backgroundImage: "linear-gradient(90deg, transparent 49%, rgba(183,255,49,.12) 50%, transparent 51%), linear-gradient(transparent 49%, rgba(183,255,49,.1) 50%, transparent 51%)", backgroundSize: "42px 42px" }} /><div className="relative text-center"><span className={`mx-auto grid size-20 place-items-center rounded-full border-2 ${completed ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-[#b7ff31] bg-black/45 text-[#b7ff31]"}`}>{completed ? <Check size={32} /> : <Play size={30} fill="currentColor" />}</span><p className="mt-5 text-sm text-white/50">02 / 원하는 답을 얻는 프롬프트 설계</p><h2 className="mt-2 text-2xl font-bold text-white">{completed ? "이번 영상을 완료했습니다." : playing ? "AI 교관의 설명을 재생하고 있습니다." : "학습 영상을 재생할 준비가 되었습니다."}</h2><p className="mt-3 text-sm text-white/55">{completed ? "수료 보상이 자동으로 준비되었습니다." : "재생 버튼을 누르면 영상 진행도가 올라갑니다."}</p></div></div><div className="border-t border-white/10 p-4"><div className="flex flex-wrap items-center gap-3"><button onClick={() => setPlaying(value => !value)} disabled={completed} className="grid size-11 place-items-center border border-[#b7ff31] bg-[#b7ff31] text-black disabled:opacity-45" aria-label={playing ? "일시 정지" : "영상 재생"}>{playing ? <span className="flex gap-1"><i className="h-4 w-1 bg-black" /><i className="h-4 w-1 bg-black" /></span> : <Play size={18} fill="currentColor" />}</button><span className="text-sm text-white/70">{time(seconds)} / 18:00</span><div className="h-1.5 min-w-32 flex-1 bg-white/10"><i className="block h-full bg-[#b7ff31] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div><button onClick={() => setSeconds(duration)} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">학습 완료 처리</button><button onClick={() => setIdeOpen(true)} className="text-sm font-bold text-[#b7ff31]">Python / SQL 실습 열기 <Code2 className="inline size-4" /></button></div>{completed && rewardClaimed && <div className="mt-4 border border-[#4ed58a]/45 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">완료 보상이 반영되었습니다 / VOD 완료 +100 XP / 연속 학습 가산 +10 XP / 출석 보너스 +15 XP</div>}</div></Panel>
      <Panel className="p-5"><div className="flex gap-2 border-b border-white/10 pb-3">{["목차", "노트", "답벗"].map(item => <button key={item} onClick={() => setTab(item)} className={`px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div>{tab === "목차" && <div className="mt-4 space-y-2">{["AI가 이해하는 업무 맥락", "원하는 답을 얻는 프롬프트 설계", "결과 검증과 개선 실습"].map((item, index) => <button key={item} className={`flex w-full gap-3 border p-3 text-left text-sm ${index === 1 ? "border-[#b7ff31]/50 bg-[#b7ff31]/10 text-white" : "border-white/10 text-white/60"}`}><span className="text-[#b7ff31]">0{index + 1}</span>{item}</button>)}</div>}{tab === "노트" && <div className="mt-4"><textarea value={note} onChange={event => setNote(event.target.value)} className="min-h-48 w-full border border-white/10 bg-black/30 p-3 text-sm text-white outline-none focus:border-[#b7ff31]" placeholder="학습 내용을 기록하세요" /><p className="mt-3 text-xs text-white/45">노트는 이 학습 화면에서만 임시로 보관됩니다.</p></div>}{tab === "답벗" && <div className="mt-4"><p className="border border-[#54c7ff]/30 bg-[#54c7ff]/10 p-3 text-sm leading-6 text-white/75">답벗입니다. 지금 재생 중인 프롬프트 구조 설계 내용을 바탕으로 질문에 답할게요.</p><button onClick={() => setSent(true)} className="mt-3 w-full border border-white/10 p-3 text-left text-sm text-white/55">프롬프트를 더 구체적으로 만드는 방법은? <ArrowRight className="float-right size-4 text-[#b7ff31]" /></button>{sent && <p className="mt-3 text-sm text-[#b7ff31]">예시 요청, 조건, 출력 형식을 차례로 적어 보세요.</p>}</div>}</Panel></div>
    {ideOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5"><Panel className="w-full max-w-3xl p-5"><div className="flex justify-between"><div><p className="text-xs font-bold text-[#b7ff31]">실습 도구</p><h2 className="mt-2 text-xl font-bold text-white">Python / SQL IDE</h2></div><button onClick={() => setIdeOpen(false)} aria-label="실습 도구 닫기"><X /></button></div><pre className="mt-5 min-h-56 overflow-auto bg-black p-4 text-sm text-[#b7ff31]">{`prompt = "부대 일일 현황을 3줄로 요약해줘"\nprint(prompt)`}</pre><div className="mt-4 flex justify-end"><ActionButton onClick={() => setIdeOpen(false)}>실습 저장</ActionButton></div></Panel></div>}
    {showReward && <RewardOverlay onClaim={() => setRewardClaimed(true)} />}
  </>;
}

function LearningPlayerWorkspace() {
  const [tab, setTab] = useState("목차");
  const [note, setNote] = useState("");
  const [answer, setAnswer] = useState("");
  const [buddyDraft, setBuddyDraft] = useState("");
  const [buddyMessages, setBuddyMessages] = useState([
    { role: "assistant", text: "답벗입니다. 현재 영상의 프롬프트 설계와 실습 코드를 바탕으로 바로 도와드릴게요." },
  ]);
  const [ran, setRan] = useState(false);
  const [seconds, setSeconds] = useState(872);
  const [playing, setPlaying] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const duration = 1080;
  const completed = seconds >= duration;
  const progress = Math.round((seconds / duration) * 100);
  useEffect(() => { if (!playing || completed) return; const timer = window.setInterval(() => setSeconds(value => Math.min(duration, value + 6)), 300); return () => window.clearInterval(timer); }, [playing, completed]);
  const time = (value: number) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
  const sendBuddy = (message = buddyDraft) => {
    const prompt = message.trim();
    if (!prompt) return;
    setBuddyMessages(current => [...current, { role: "user", text: prompt }, { role: "assistant", text: "요청의 목적, 필요한 조건, 원하는 출력 형식을 순서대로 적어 보세요. 현재 실습에서는 부대 일일 현황을 3줄로 요약하도록 조건을 고정하면 좋습니다." }]);
    setBuddyDraft("");
  };
  return <><PageHeading eyebrow="VOD 학습기" title="생성 AI 업무 활용 기초" copy="영상 시청, 실습, 학습 기록을 한 화면에서 연결합니다." aside={<span className="border border-[#4ed58a]/35 bg-[#4ed58a]/10 px-3 py-2 text-sm font-bold text-[#4ed58a]">수강 중 / {progress}%</span>} />
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,.82fr)_300px]">
      <Panel className="overflow-hidden"><div className="relative grid min-h-[520px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,#294521,#050806_72%)] p-6"><div aria-hidden="true" className={`absolute inset-0 opacity-30 ${playing ? "animate-pulse" : ""}`} style={{ backgroundImage: "linear-gradient(90deg,transparent 49%,rgba(183,255,49,.12) 50%,transparent 51%),linear-gradient(transparent 49%,rgba(183,255,49,.1) 50%,transparent 51%)", backgroundSize: "42px 42px" }} /><div className="relative text-center"><span className={`mx-auto grid size-20 place-items-center border-2 ${completed ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-[#b7ff31] bg-black/45 text-[#b7ff31]"}`}>{completed ? <Check size={32} /> : <Play size={30} fill="currentColor" />}</span><p className="mt-5 text-sm text-white/50">02 / 원하는 답을 얻는 프롬프트 설계</p><h2 className="mt-2 text-2xl font-bold text-white">{completed ? "이번 영상을 완료했습니다." : playing ? "AI 교관의 설명을 재생하고 있습니다." : "학습 영상을 재생할 준비가 되었습니다."}</h2></div></div><div className="border-t border-white/10 p-4"><div className="flex items-center gap-3"><button onClick={() => setPlaying(value => !value)} disabled={completed} className="grid size-11 place-items-center border border-[#b7ff31] bg-[#b7ff31] text-black" aria-label={playing ? "일시 정지" : "영상 재생"}>{playing ? "Ⅱ" : <Play size={18} fill="currentColor" />}</button><span className="text-sm text-white/70">{time(seconds)} / 18:00</span><div className="h-1.5 flex-1 bg-white/10"><i className="block h-full bg-[#b7ff31]" style={{ width: `${progress}%` }} /></div><button onClick={() => setSeconds(duration)} className="text-xs font-bold text-white/60 hover:text-[#b7ff31]">학습 완료 처리</button></div></div></Panel>
      <Panel className="flex min-h-[600px] flex-col p-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-xs font-bold text-[#b7ff31]">실습 공간</p><h2 className="mt-1 text-lg font-bold text-white">프롬프트 결과 보기</h2></div><span className="border border-[#b7ff31]/30 px-2 py-1 text-xs font-bold text-[#b7ff31]">Python</span></div><label className="mt-5 text-sm font-bold text-white">실습 코드</label><textarea className="mt-3 min-h-52 w-full bg-black/55 p-4 font-mono text-sm leading-7 text-[#b7ff31] outline-none" defaultValue={'prompt = "부대 일일 현황을 3줄로 요약해줘"\nprint(prompt)'} /><label className="mt-4 text-sm font-bold text-white">입력값</label><textarea value={answer} onChange={event => setAnswer(event.target.value)} className="mt-3 min-h-20 w-full border border-white/10 bg-black/35 p-3 text-sm text-white outline-none" placeholder="예: 경계 근무 3명 / 장비 점검 완료" /><ActionButton fullWidth onClick={() => setRan(true)}><Play size={16} /> 실행하기</ActionButton><div className="mt-4 min-h-28 border border-white/10 bg-black/50 p-4"><p className="text-xs text-white/45">실행 결과</p><p className="mt-3 text-sm leading-6 text-white/80">{ran ? "1. 경계 근무 인원 3명 정상 배치\n2. 장비 점검 완료\n3. 이상 사항 없음" : "실행을 누르면 결과가 이곳에 표시됩니다."}</p></div></Panel>
      <Panel className="flex min-h-[600px] flex-col p-4"><div className="flex gap-1 border-b border-white/10 pb-3">{["목차", "노트", "답벗"].map(item => <button key={item} onClick={() => setTab(item)} className={`flex-1 px-2 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div>{tab === "목차" && <div className="mt-4 space-y-2">{["AI가 이해하는 업무 맥락", "원하는 답을 얻는 프롬프트 설계", "결과 검증과 개선 실습"].map((item, index) => <button key={item} className={`w-full border p-3 text-left text-sm ${index === 1 ? "border-[#b7ff31]/55 bg-[#b7ff31]/10 text-white" : "border-white/10 text-white/60"}`}><b className="mr-2 text-[#b7ff31]">0{index + 1}</b>{item}</button>)}</div>}{tab === "노트" && <div className="mt-4"><textarea value={note} onChange={event => setNote(event.target.value)} className="min-h-72 w-full border border-white/10 bg-black/30 p-3 text-sm text-white outline-none" placeholder="학습 내용을 기록하세요" /><p className="mt-3 text-xs text-white/45">노트는 이 학습 화면에서 임시로 보관됩니다.</p></div>}{tab === "답벗" && <div className="mt-4 flex min-h-0 flex-1 flex-col"><div className="flex items-center gap-2 border-b border-white/10 pb-3"><Sparkles className="size-4 text-[#b7ff31]" /><div><b className="text-sm text-white">답벗</b><p className="text-[11px] text-white/45">현재 강의 맥락을 반영한 학습 도우미</p></div></div><div className="mt-3 flex-1 space-y-3 overflow-y-auto pr-1">{buddyMessages.map((message, index) => <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}><p className={`max-w-[92%] border p-3 text-xs leading-5 ${message.role === "user" ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/10 bg-white/[0.06] text-white/78"}`}>{message.text}</p></div>)}</div><button onClick={() => sendBuddy("프롬프트를 더 구체적으로 만드는 방법은?")} className="mt-3 border border-white/10 p-3 text-left text-xs text-white/70">프롬프트를 더 구체적으로 만드는 방법은? <ArrowRight className="float-right size-4 text-[#b7ff31]" /></button><div className="mt-2 flex gap-2"><input value={buddyDraft} onChange={event => setBuddyDraft(event.target.value)} onKeyDown={event => { if (event.key === "Enter") sendBuddy(); }} className="min-w-0 flex-1 border border-white/10 bg-black/30 px-3 py-2 text-xs text-white outline-none" placeholder="답벗에게 질문하기" /><button onClick={() => sendBuddy()} className="grid size-9 place-items-center bg-[#b7ff31] text-black" aria-label="답벗 질문 전송"><ArrowRight size={16} /></button></div></div>}</Panel>
    </div>{completed && rewardClaimed && <div className="mt-4 border border-[#4ed58a]/45 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">완료 보상이 반영되었습니다 / VOD 완료 +100 XP / 연속 학습 가산 +10 XP / 출석 보너스 +15 XP</div>}{completed && !rewardClaimed && <RewardOverlay onClaim={() => setRewardClaimed(true)} />}</>;
}

function ProjectDetailView() {
  const [enrolled, setEnrolled] = useState(false);
  return <><PageHeading eyebrow="PBL 프로젝트" title="체력 기록 관리 시스템" copy="장병의 체력 기록을 더 빠르게 확인할 수 있는 업무 도구를 팀과 함께 설계합니다." aside={enrolled ? <Link href="/projects/체력-기록-관리-시스템/mission"><ActionButton>학습맵 보기 <ArrowRight size={16} /></ActionButton></Link> : <ActionButton onClick={() => setEnrolled(true)}>수강 신청하기 <ArrowRight size={16} /></ActionButton>} />
    {enrolled && <div className="mb-5 border border-[#4ed58a]/40 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">수강 신청이 완료되었습니다. 학습맵의 첫 미션으로 이동할 수 있습니다.</div>}<div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Panel className="p-6"><p className="text-xs font-bold text-[#b7ff31]">학습맵</p><div className="mt-6 grid gap-3 sm:grid-cols-4">{["문제 이해", "데이터 설계", "화면 구현", "제출 / 피드백"].map((step, index) => <Link key={step} href={index === 0 ? "/projects/체력-기록-관리-시스템/mission" : "/projects/체력-기록-관리-시스템"} className={`min-h-32 border p-4 text-left ${index === 0 ? "border-[#b7ff31] bg-[#b7ff31]/10" : "border-white/10 bg-black/20"}`}><span className="text-xs text-[#b7ff31]">0{index + 1}</span><b className="mt-5 block text-sm text-white">{step}</b></Link>)}</div><div className="mt-6 border border-white/10 bg-black/25 p-4"><p className="text-xs text-white/45">첫 미션</p><h2 className="mt-2 text-lg font-bold text-white">여러 기록 목록 관리하기</h2><p className="mt-2 text-sm text-white/55">현장 사용자가 빠르게 찾을 수 있는 기록 목록의 기준을 정리합니다.</p><Link href="/projects/체력-기록-관리-시스템/mission"><ActionButton>미션 시작하기 <ArrowRight size={16} /></ActionButton></Link></div></Panel><Panel className="p-6"><p className="text-xs font-bold text-[#54c7ff]">프로젝트 정보</p><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/50">기간</dt><dd className="font-bold text-white">4주</dd></div><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/50">유형</dt><dd className="font-bold text-white">PBL / 팀 프로젝트</dd></div><div className="flex justify-between"><dt className="text-white/50">모집 상태</dt><dd className="font-bold text-[#b7ff31]">모집 중</dd></div></dl></Panel></div></>;
}

function MissionView() {
  const [submitted, setSubmitted] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const submitMission = () => {
    setSubmitted(true);
    setRewardClaimed(false);
  };
  return <><PageHeading eyebrow="프로젝트 미션" title="여러 기록 목록 관리하기" copy="문제 요구사항을 확인하고, 해결 방향을 작성해 제출하세요." aside={<span className="text-sm font-bold text-[#b7ff31]">학습맵 1 / 4</span>} /><Panel className="p-6 md:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_.85fr]"><div><h2 className="text-xl font-bold text-white">문제</h2><p className="mt-4 text-sm leading-7 text-white/60">장병의 체력 기록이 날짜별로 흩어져 있어 현황을 빠르게 확인하기 어렵습니다. 날짜, 종목, 결과, 특이사항을 한 화면에서 볼 수 있는 목록 구조를 설계하세요.</p><h2 className="mt-8 text-xl font-bold text-white">제출 기준</h2><ul className="mt-4 space-y-3 text-sm text-white/60">{["사용자와 문제 상황 정의", "목록에 필요한 핵심 정보", "검색 또는 정렬 기준"].map(item => <li key={item} className="flex gap-2"><ShieldCheck className="size-5 text-[#b7ff31]" />{item}</li>)}</ul></div><div className="border border-white/10 bg-black/30 p-5"><label className="text-sm font-bold text-white">해결 방향</label><textarea className="mt-3 min-h-44 w-full border border-white/10 bg-black p-3 text-sm text-white outline-none focus:border-[#b7ff31]" placeholder="문제 해결 방향을 작성하세요" /><ActionButton fullWidth onClick={submitMission}>미션 제출하기 <FileCheck2 size={16} /></ActionButton>{submitted && rewardClaimed && <p className="mt-4 text-sm text-[#4ed58a]">제출과 보상 반영이 완료되었습니다. 교관 피드백을 기다리는 중입니다.</p>}</div></div></Panel>{submitted && !rewardClaimed && <RewardOverlay eventLabel="PBL 미션 제출 완료" onClaim={() => setRewardClaimed(true)} />}</>;
}

function LearningView({ openCourse, goTo }: { openCourse: (title: string) => void; goTo: (page: PageKey) => void }) {
  const [tab, setTab] = useState("수강 중인 강의");
  const courseItems = [
    ["실무자를 위한 Claude Design 기반 보고서용 PPT 만들기", 64, "Data / AI"],
    ["영상 제작을 위한 Google Flow 입문: 실무 보고서용 영상 제작 실습", 52, "Cloud / AI"],
    ["chatGPT와 Gemini를 이용한 보고서 시각화 실무", 46, "Python / Data"],
    ["LLM 할루시네이션 줄이는 방법 실무", 37, "AI / 검증"],
    ["Claude Skills 작동 원리와 실전 활용", 31, "AI / Claude"],
    ["실무에 바로 쓰는 프롬프트 엔지니어링", 28, "Data / Prompt"],
    ["인공지능 기초", 24, "Cloud / 기초"],
    ["소프트웨어 개발환경과 협업방법", 18, "Python / 협업"],
    ["생성 AI 업무 활용 기초", 64, "생성 AI / 실무"],
    ["보안 AI 활용 수칙", 22, "보안 / 필수"],
  ] as const;
  const projects = [["체력 기록 관리 시스템", "여러 기록 목록 관리하기", 38], ["작전 보고서 요약 프롬프트", "결과 검증과 개선", 72], ["보급 현황 데이터 시각화", "차트 기준 정의", 18]] as const;
  const saved = courseItems.slice(1, 5);
  const tabs = ["수강 중인 강의", "프로젝트", "보관함"] as const;
  return <><PageHeading eyebrow="내 학습" title="내 학습" copy="수강 중인 강의 10개, 프로젝트와 보관함을 한 곳에서 관리합니다." />
    <Panel className="p-5 md:p-7"><div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">{tabs.map(item => <button key={item} onClick={() => setTab(item)} className={`px-4 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "border border-white/10 text-white/55 hover:text-white"}`}>{item}{item === "수강 중인 강의" ? " (10)" : item === "프로젝트" ? " (3)" : " (4)"}</button>)}</div>
      {tab === "수강 중인 강의" && <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{courseItems.map(([title, progress, tags]) => <button key={title} onClick={() => openCourse(title)} className="border border-white/10 bg-black/25 p-5 text-left hover:border-[#b7ff31]/50"><div className="flex items-center justify-between gap-3"><span className="text-xs text-white/45">VOD 강의</span><b className="text-sm text-[#b7ff31]">{progress}%</b></div><h2 className="mt-3 min-h-12 text-base font-bold leading-6 text-white">{title}</h2><p className="mt-2 text-xs text-white/45">{tags}</p><div className="mt-5 h-1.5 bg-white/10"><i className="block h-full bg-[#b7ff31]" style={{ width: `${progress}%` }} /></div><span className="mt-4 block text-sm font-bold text-[#b7ff31]">이어서 학습하기 <ArrowRight className="inline size-4" /></span></button>)}</div>}
      {tab === "프로젝트" && <div className="mt-5 grid gap-4 lg:grid-cols-3">{projects.map(([title, mission, progress]) => <button key={title} onClick={() => goTo("projects")} className="border border-white/10 bg-black/25 p-5 text-left hover:border-[#b7ff31]/50"><span className="text-xs font-bold text-[#54c7ff]">PBL 프로젝트</span><h2 className="mt-3 text-lg font-bold text-white">{title}</h2><p className="mt-2 text-sm text-white/52">현재 미션 / {mission}</p><div className="mt-5 h-1.5 bg-white/10"><i className="block h-full bg-[#54c7ff]" style={{ width: `${progress}%` }} /></div><span className="mt-2 block text-right text-xs text-white/50">{progress}% 진행</span><span className="mt-4 block text-sm font-bold text-[#b7ff31]">프로젝트 열기 <ArrowRight className="inline size-4" /></span></button>)}</div>}
      {tab === "보관함" && <div className="mt-5 grid gap-4 md:grid-cols-2">{saved.map(([title, progress, tags]) => <button key={title} onClick={() => openCourse(title)} className="flex items-center justify-between gap-4 border border-white/10 bg-black/25 p-5 text-left hover:border-[#b7ff31]/50"><div><span className="text-xs font-bold text-[#ffb84d]">보관한 강의</span><h2 className="mt-2 text-base font-bold text-white">{title}</h2><p className="mt-2 text-xs text-white/45">{tags} / 이전 진도 {progress}%</p></div><ChevronRight className="shrink-0 text-[#b7ff31]" /></button>)}</div>}
    </Panel></>;
}

function ClassroomView({ pathname }: { pathname: string }) {
  const isDetail = pathname !== "/classrooms";
  const [tab, setTab] = useState("출석 현황");
  const [questioned, setQuestioned] = useState(false);
  if (!isDetail) return <><PageHeading eyebrow="클래스룸" title="소속 클래스룸" copy="담당 강의와 프로젝트의 출석, 공지, 질문, 테스트를 확인합니다." /><div className="grid gap-5 md:grid-cols-2">{[{ name: "생성 AI 업무 활용 기초", type: "VOD 클래스룸", path: "/classrooms/vod-ai" }, { name: "체력 기록 관리 시스템", type: "PBL 클래스룸", path: "/classrooms/pbl-fitness" }].map(room => <a key={room.path} href={room.path} className="mili-frame border border-white/10 bg-[#0b110d] p-6 hover:border-[#b7ff31]/50"><p className="text-xs font-bold text-[#b7ff31]">{room.type}</p><h2 className="mt-3 text-xl font-bold text-white">{room.name}</h2><p className="mt-3 text-sm text-white/55">교관 공지 2건 / 새 헬프센터 답변 1건</p><span className="mt-7 block text-sm font-bold text-[#b7ff31]">클래스룸 입장 <ArrowRight className="inline size-4" /></span></a>)}</div></>;
  return <><PageHeading eyebrow="클래스룸" title={pathname.includes("pbl") ? "체력 기록 관리 시스템" : "생성 AI 업무 활용 기초"} copy="학습 참여 기록과 교관 지원을 확인하세요." /><div className="grid gap-5 lg:grid-cols-[1fr_.75fr]"><Panel className="p-6"><div className="flex gap-2 border-b border-white/10 pb-4">{["출석 현황", "헬프센터", "테스트"].map(item => <button key={item} onClick={() => setTab(item)} className={`px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div>{tab === "출석 현황" && <div className="mt-5 grid grid-cols-5 gap-2">{["월", "화", "수", "목", "금"].map((day, i) => <div key={day} className={`border p-4 text-center ${i < 3 ? "border-[#4ed58a]/40 bg-[#4ed58a]/10 text-[#4ed58a]" : "border-white/10 text-white/45"}`}><b>{day}</b><small className="mt-2 block">{i < 3 ? "출석" : "예정"}</small></div>)}</div>}{tab === "헬프센터" && <div className="mt-5"><p className="text-sm text-white/60">궁금한 점을 교관과 동료에게 남겨보세요.</p><ActionButton onClick={() => setQuestioned(true)}>질문 작성 <MessageCircleQuestion size={16} /></ActionButton>{questioned && <p className="mt-4 text-sm text-[#4ed58a]">질문이 등록되었습니다. 답변 알림을 보내드릴게요.</p>}</div>}{tab === "테스트" && <EmptyState title="예정된 테스트가 없습니다" copy="다음 테스트 일정은 클래스룸 공지에서 안내됩니다." />}</Panel><Panel className="p-6"><p className="text-xs font-bold text-[#54c7ff]">클래스 알림</p><div className="mt-5 space-y-4">{["이번 주 학습 목표를 확인하세요", "교관 피드백이 등록되었습니다", "금요일 테스트 안내"].map(item => <p key={item} className="border-b border-white/10 pb-4 text-sm text-white/65">{item}</p>)}</div></Panel></div></>;
}

function RankingView() {
  const [tab, setTab] = useState("누적 크레딧");
  const scores: Record<string, string[]> = { "누적 크레딧": ["1대대 / 1,284", "3대대 / 1,246", "2대대 / 1,208"], "평균 진도율": ["2대대 / 74%", "1대대 / 71%", "3대대 / 69%"], "문제 해결": ["3대대 / 128건", "1대대 / 121건", "2대대 / 117건"] };
  return <><PageHeading eyebrow="랭킹" title="함께 만드는 학습 성과" copy="개인 정보는 노출하지 않고 부대 단위의 학습 성과를 확인합니다." /><Panel className="p-6"><div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">{Object.keys(scores).map(item => <button key={item} onClick={() => setTab(item)} className={`px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div><ol className="mt-5 space-y-3">{scores[tab].map((item, index) => <li key={item} className="flex items-center gap-4 border border-white/10 p-4"><b className="grid size-8 place-items-center bg-[#b7ff31] text-black">{index + 1}</b><span className="flex-1 font-bold text-white">{item}</span><Medal className="text-[#b7ff31]" /></li>)}</ol></Panel></>;
}

function ShowcaseView({ pathname }: { pathname: string }) {
  const [saved, setSaved] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  if (pathname.endsWith("/write")) return <><PageHeading eyebrow="쇼케이스" title="프로젝트 전시 글쓰기" copy="성과와 배운 점을 동료에게 공유하세요." /><Panel className="p-6"><input className="w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="전시 제목" /><textarea className="mt-4 min-h-52 w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="프로젝트의 문제, 해결 과정, 배운 점을 작성하세요" /><ActionButton onClick={() => setSaved(true)}>전시 글 등록</ActionButton>{saved && <p className="mt-4 text-sm text-[#4ed58a]">전시 글이 등록되었습니다.</p>}</Panel></>;
  const projects = [
    { title: "작전 보고서 요약 프롬프트", slug: "report-prompt", type: "생성 AI", team: "제3학습분대" },
    { title: "체력 기록 관리 시스템", slug: "fitness-record", type: "PBL", team: "체력 데이터 1팀" },
    { title: "보급 현황 데이터 시각화", slug: "supply-visual", type: "데이터 분석", team: "보급 혁신팀" },
    { title: "장비 점검 보고 자동화", slug: "equipment-report", type: "생성 AI", team: "정비 지원팀" },
    { title: "경계 근무 인수인계 보드", slug: "guard-handover", type: "업무 혁신", team: "경계 운영팀" },
    { title: "훈련 성과 대시보드", slug: "training-dashboard", type: "데이터 분석", team: "교육 기획팀" },
  ];
  const selected = projects.find(project => pathname.endsWith(project.slug));
  if (selected) return <><div className="mb-6 text-sm text-white/50"><Link href="/showcase" className="hover:text-[#b7ff31]">쇼케이스</Link> <ChevronRight className="inline size-4" /> <b className="text-white">{selected.title}</b></div><PageHeading eyebrow="쇼케이스 / 프로젝트 결과물" title={selected.title} copy="현장의 반복 업무를 줄이기 위해 팀이 설계하고 완성한 결과물입니다." /><div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px]"><Panel className="overflow-hidden p-0"><div className="relative min-h-[380px] overflow-hidden bg-[linear-gradient(135deg,#101f14,#050806_62%)] p-7 md:p-10"><div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg,rgba(183,255,49,.18)_1px,transparent_1px),linear-gradient(rgba(183,255,49,.13)_1px,transparent_1px)", backgroundSize: "44px 44px" }} /><div className="relative"><span className="border border-[#b7ff31]/45 bg-[#b7ff31]/10 px-3 py-2 text-xs font-bold text-[#b7ff31]">{selected.type} 결과물</span><h2 className="mt-7 max-w-xl text-3xl font-bold tracking-[-0.05em] text-white md:text-4xl">현장 기록을<br />한눈에 읽는 작전 화면</h2><p className="mt-4 max-w-lg text-sm leading-6 text-white/62">날짜별 기록, 상태 요약, 주의 항목을 한 화면에 배치해 지휘관과 장병이 같은 정보를 빠르게 확인하도록 만들었습니다.</p></div><div className="absolute bottom-7 left-7 right-7 grid gap-3 sm:grid-cols-3"><div className="border border-[#b7ff31]/30 bg-black/55 p-4"><p className="text-xs text-white/45">기록 처리</p><b className="mt-2 block text-2xl text-[#b7ff31]">-42%</b></div><div className="border border-white/10 bg-black/55 p-4"><p className="text-xs text-white/45">사용 화면</p><b className="mt-2 block text-2xl text-white">3개</b></div><div className="border border-white/10 bg-black/55 p-4"><p className="text-xs text-white/45">검증 완료</p><b className="mt-2 block text-2xl text-white">12건</b></div></div></div><div className="grid gap-px bg-white/10 sm:grid-cols-3"><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">문제</p><p className="mt-2 text-sm font-bold text-white">기록이 흩어져 확인이 느림</p></div><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">해결</p><p className="mt-2 text-sm font-bold text-white">핵심 정보를 한 화면으로 통합</p></div><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">배운 점</p><p className="mt-2 text-sm font-bold text-white">현장 업무 기준의 화면 설계</p></div></div></Panel><Panel className="p-6"><p className="text-xs font-bold text-[#b7ff31]">함께 만든 팀</p><h2 className="mt-2 text-xl font-bold text-white">{selected.team}</h2><div className="mt-6 space-y-4">{[["김철수 상병", "문제 정의 / 화면 흐름"], ["박민수 일병", "데이터 구조 / 검증"], ["이수진 하사", "사용성 검토 / 피드백"]].map(([name, role]) => <div key={name} className="flex gap-3 border-b border-white/10 pb-4"><span className="grid size-9 place-items-center bg-[#b7ff31]/10 text-xs font-black text-[#b7ff31]">{name.slice(0, 1)}</span><div><b className="block text-sm text-white">{name}</b><small className="mt-1 block text-xs text-white/48">{role}</small></div></div>)}</div><button type="button" onClick={() => setResultOpen(true)} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#b7ff31]">프로젝트 결과물 보러가기 <Code2 size={16} /></button></Panel></div>{resultOpen && <div className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="프로젝트 결과물"><Panel className="w-full max-w-4xl overflow-hidden p-0 shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 bg-[#101610] px-6 py-5"><div><p className="text-xs font-bold tracking-[.18em] text-[#b7ff31]">PROJECT OUTPUT / LIVE PREVIEW</p><h2 className="mt-2 text-xl font-bold text-white">{selected.title}</h2></div><button type="button" onClick={() => setResultOpen(false)} aria-label="결과물 닫기" className="grid size-10 place-items-center border border-white/15 text-white/70 hover:text-[#b7ff31]"><X size={18} /></button></div><div className="grid gap-0 md:grid-cols-[.9fr_1.1fr]"><div className="border-b border-white/10 bg-[#07110a] p-6 md:border-b-0 md:border-r"><p className="text-xs font-bold text-[#54c7ff]">CODE / data-summary.ts</p><pre className="mt-5 overflow-x-auto text-xs leading-6 text-[#b7ff31]">const dailyRecords = records.filter((record) =&gt; record.status !== &quot;제외&quot;);{"\n\n"}export const missionSummary = {"{"}{"\n"}  total: dailyRecords.length,{"\n"}  alert: dailyRecords.filter((record) =&gt; record.score &lt; 60),{"\n"}  updatedAt: &quot;2026-07-29&quot;,{"\n"}{"}"};</pre></div><div className="bg-[#0b110d] p-6"><p className="text-xs font-bold text-[#ffb84d]">RESULT / 체력 기록 요약</p><div className="mt-5 grid grid-cols-3 gap-3"><div className="border border-[#b7ff31]/40 bg-[#b7ff31]/[0.06] p-4"><p className="text-xs text-white/45">오늘 기록</p><b className="mt-2 block text-3xl text-[#b7ff31]">24</b></div><div className="border border-white/10 p-4"><p className="text-xs text-white/45">주의 항목</p><b className="mt-2 block text-3xl text-[#ffb84d]">3</b></div><div className="border border-white/10 p-4"><p className="text-xs text-white/45">완료율</p><b className="mt-2 block text-3xl text-[#54c7ff]">92%</b></div></div><div className="mt-4 border border-white/10 bg-black/20 p-4 text-sm leading-6 text-white/65">날짜별 체력 기록과 주의 항목을 한 화면에서 검토해, 담당자가 다음 조치를 빠르게 결정할 수 있도록 만든 결과물입니다.</div></div></div></Panel></div>}</>;
  return <><PageHeading eyebrow="쇼케이스" title="프로젝트 전시" copy="동료 장병이 완성한 AI 활용 결과물과 배운 점을 살펴보세요." aside={<Link href="/showcase/write"><ActionButton>전시 글쓰기 <FileText size={16} /></ActionButton></Link>} /><div className="grid gap-5 md:grid-cols-3">{projects.map((project, index) => <Link href={`/showcase/${project.slug}`} key={project.title} className="mili-showcase-card mili-frame mili-hover-target border border-white/10 bg-[#0b110d] p-6"><span className="text-xs font-bold text-[#b7ff31]">프로젝트 {index + 1} / {project.type}</span><h2 className="mt-3 text-lg font-bold text-white">{project.title}</h2><p className="mt-3 text-sm text-white/55">{project.team}이 현장의 반복 업무를 줄이기 위해 설계한 결과물입니다.</p><span className="mt-6 block text-sm font-bold text-[#b7ff31]">프로젝트 자세히 보기 <ChevronRight className="inline size-4" /></span></Link>)}</div></>;
}

function TeamProjectView() {
  const teams = [
    { name: "체력 데이터 1팀", project: "체력 기록 관리 시스템", role: "화면 흐름 설계", progress: 38, members: 3 },
    { name: "제3학습분대", project: "작전 보고서 요약 프롬프트", role: "프롬프트 검증", progress: 72, members: 4 },
    { name: "보급 혁신팀", project: "보급 현황 데이터 시각화", role: "차트 기준 정의", progress: 18, members: 3 },
  ];
  const [selected, setSelected] = useState(0);
  const active = teams[selected];
  return <><PageHeading eyebrow="팀프로젝트" title="참여 중인 프로젝트 팀" copy="여러 프로젝트 팀에서 맡은 역할과 협업 현황을 한 번에 확인하세요." aside={<span className="border border-[#b7ff31]/35 bg-[#b7ff31]/10 px-3 py-2 text-sm font-bold text-[#b7ff31]">참여 팀 {teams.length}개</span>} /><div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]"><Panel className="p-4"><p className="px-2 text-xs font-bold text-white/50">내 프로젝트 팀</p><div className="mt-3 space-y-2">{teams.map((team, index) => <button key={team.name} onClick={() => setSelected(index)} className={`w-full border p-4 text-left ${selected === index ? "border-[#b7ff31] bg-[#b7ff31]/10" : "border-white/10 bg-black/20"}`}><div className="flex justify-between gap-3"><b className="text-sm text-white">{team.name}</b><span className="text-xs font-bold text-[#b7ff31]">{team.progress}%</span></div><p className="mt-2 text-xs text-white/50">{team.project}</p><small className="mt-3 block text-xs text-white/45">내 역할 / {team.role}</small></button>)}</div></Panel><div className="space-y-5"><Panel className="p-6 md:p-8"><p className="text-xs font-bold text-[#b7ff31]">현재 선택한 팀</p><div className="mt-3 flex flex-col justify-between gap-5 md:flex-row"><div><h2 className="text-2xl font-bold text-white">{active.name}</h2><p className="mt-2 text-sm text-white/55">{active.project} / 내 역할 {active.role}</p></div><Link href="/projects/동료-평가"><ActionButton subtle>동료 평가하기 <ClipboardCheck size={16} /></ActionButton></Link></div><div className="mt-7 h-2 bg-white/10"><i className="block h-full bg-[#b7ff31]" style={{ width: `${active.progress}%` }} /></div><p className="mt-2 text-right text-xs text-white/45">프로젝트 진행률 {active.progress}%</p></Panel><Panel className="p-6"><div className="flex justify-between"><h2 className="text-lg font-bold text-white">함께하는 팀원</h2><span className="text-sm text-white/50">{active.members}명</span></div><div className="mt-5 grid gap-3 md:grid-cols-3">{[["김철수 상병", "화면 흐름 설계"], ["박민수 일병", "데이터 구조"], ["이수진 하사", "사용성 검토"]].map(([name, role]) => <div key={name} className="border border-white/10 bg-black/25 p-4"><span className="grid size-9 place-items-center bg-[#b7ff31]/10 text-xs font-black text-[#b7ff31]">{name.slice(0, 1)}</span><b className="mt-4 block text-sm text-white">{name}</b><small className="mt-1 block text-xs text-white/50">{role}</small></div>)}</div></Panel></div></div></>;
}

function SearchView({ pathname }: { pathname: string }) {
  const [term, setTerm] = useState("");
  const [submitted, setSubmitted] = useState(pathname.includes("result"));
  const [tab, setTab] = useState("전체");
  const results = ["생성 AI 업무 활용 기초", "체력 기록 관리 시스템", "AI 결과 검증과 개선", "작전 보고서 요약 Q&A"];
  const faqs = ["수료증은 어떻게 발급받나요?", "VOD 수강 신청 후 바로 학습할 수 있나요?", "동료 평가는 언제까지 해야 하나요?", "프로젝트 팀은 여러 개 참여할 수 있나요?"];
  if (!submitted) return <><PageHeading eyebrow="통합검색" title="무엇을 찾고 있나요?" copy="강의, 콘텐츠, 프로젝트, 로드맵, 게시글을 한 번에 검색합니다." /><Panel className="p-7"><label className="flex border border-white/10 bg-black/30"><Search className="m-3.5 text-[#b7ff31]" /><input value={term} onChange={e => setTerm(e.target.value)} className="h-12 flex-1 bg-transparent text-white outline-none" placeholder="예: 프롬프트, 체력 기록, 보안" onKeyDown={e => e.key === "Enter" && setSubmitted(true)} /><button onClick={() => setSubmitted(true)} className="bg-[#b7ff31] px-5 text-sm font-bold text-black">검색</button></label><div className="mt-7 border-t border-white/10 pt-6"><div className="flex items-center gap-2"><CircleHelp className="size-4 text-[#b7ff31]" /><h2 className="text-sm font-bold text-white">자주 묻는 질문</h2></div><div className="mt-4 grid gap-2 md:grid-cols-2">{faqs.map(faq => <button key={faq} onClick={() => { setTerm(faq); setSubmitted(true); }} className="mili-hover-target flex items-center justify-between border border-white/10 bg-black/20 p-4 text-left text-sm text-white/70 hover:text-white"><span>{faq}</span><ChevronRight className="size-4 text-[#b7ff31]" /></button>)}</div></div></Panel></>;
  if (!term.trim() && !pathname.includes("result")) return <><PageHeading eyebrow="통합검색" title="검색 결과" copy="검색어를 확인해 주세요." /><EmptyState title="검색 결과가 없습니다" copy="다른 검색어를 입력하거나 강의와 프로젝트 목록을 둘러보세요." /></>;
  return <><PageHeading eyebrow="통합검색" title={`“${term || "AI"}” 검색 결과`} copy="강의, 콘텐츠, 프로젝트, 로드맵, 게시글 결과를 유형별로 확인할 수 있습니다." /><Panel className="p-6"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{["전체", "강의", "콘텐츠", "프로젝트", "로드맵", "게시글"].map(item => <button key={item} onClick={() => setTab(item)} className={`shrink-0 px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div><div className="mt-3">{results.map((item, index) => <article key={item} className="border-b border-white/10 py-5"><p className="text-xs text-[#b7ff31]">{["강의", "프로젝트", "콘텐츠", "게시글"][index]}</p><h2 className="mt-2 text-lg font-bold text-white">{item}</h2><p className="mt-2 text-sm text-white/55">학습에 필요한 관련 정보를 확인하세요.</p></article>)}</div></Panel></>;
}

function ReferenceProjectCatalog({ openProject }: { openProject: (title: string) => void }) {
  const [query, setQuery] = useState("");
  const projects = [
    { title: "체력 기록 관리 시스템", category: "PBL PROJECT", duration: "4주 과정", workload: "8시간 이수", color: "bg-[#107b54]" },
    { title: "작전 보고서 요약 프롬프트", category: "PBL PROJECT", duration: "2주 과정", workload: "4시간 이수", color: "bg-[#176db2]" },
    { title: "보급 현황 데이터 시각화", category: "PBL PROJECT", duration: "3주 과정", workload: "6시간 이수", color: "bg-[#4f48a9]" },
  ].filter(project => project.title.includes(query.trim()) || !query.trim());
  return <><section className="mili-reference-hero border border-white/10 px-6 py-12 text-center md:px-10 md:py-16"><p className="text-xs font-bold tracking-[.24em] text-[#b7ff31]">PROJECT BASED LEARNING</p><h1 className="mt-4 text-3xl font-black tracking-[-.06em] text-white md:text-5xl">PBL 프로젝트 학습</h1><p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/65 md:text-base">현장에서 마주하는 문제를 분석하고, 팀과 함께 설계·개발해 해결하는 프로젝트 중심 실습 과정입니다.</p></section><div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><p className="text-sm text-white/62">총 <b className="text-[#b7ff31]">3개</b>의 프로젝트 과정이 준비되어 있습니다.</p><label className="flex border border-white/15 bg-black/25 p-1 md:w-[420px]"><input value={query} onChange={event => setQuery(event.target.value)} className="h-10 min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-white/35" placeholder="프로젝트 명 또는 키워드 입력" /><button className="bg-[#b7ff31] px-5 text-sm font-bold text-black">검색</button></label></div><div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{projects.map((project, index) => <button key={project.title} onClick={() => openProject(project.title)} className="mili-project-card mili-frame overflow-hidden border border-white/10 bg-[#0b110d] text-left"><div className={`flex h-36 items-end p-5 ${project.color}`}><span className="border border-white/35 bg-black/20 px-2 py-1 text-xs font-bold text-white">{project.category}</span></div><div className="p-6"><h2 className="text-xl font-bold text-white">{project.title}</h2><p className="mt-3 text-sm leading-6 text-white/56">{index === 0 ? "장병의 체력 기록을 빠르게 확인하는 업무 화면을 팀과 함께 만듭니다." : "프로젝트 안내 가이드를 바탕으로 현장 과제를 단계적으로 완수합니다."}</p><div className="mt-5 flex justify-between border-t border-white/10 pt-4 text-xs text-white/48"><span>{project.duration}</span><span>{project.workload}</span></div><span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#b7ff31]">프로젝트 보기 <ArrowRight size={15} /></span></div></button>)}</div>{projects.length === 0 && <EmptyState title="검색 결과가 없습니다" copy="다른 프로젝트명 또는 키워드로 다시 검색해 주세요." />}</>;
}

function ReferenceLearningCatalog({ openCourse, goTo }: { openCourse: (title: string) => void; goTo: (page: PageKey) => void }) {
  const [tab, setTab] = useState("VOD 강의");
  const vod = [
    { title: "생성 AI 업무 활용 기초", cover: "생성 AI", detail: "Google Flow의 기본 개념과 실무 활용 흐름을 익힙니다.", code: "00000034", time: "1시간", progress: 64 },
    { title: "실무자를 위한 Claude Design 기반 보고서용 PPT 만들기", cover: "실무", detail: "보고서용 슬라이드 구성과 검토 흐름을 연습합니다.", code: "00000033", time: "1시간", progress: 22 },
    { title: "빅데이터 처리 1", cover: "빅데", detail: "수집 데이터의 크기와 생성 속도에 따른 처리 전략을 학습합니다.", code: "00000017", time: "15시간", progress: 0 },
  ];
  const pbl = [{ title: "체력 기록 관리 시스템", cover: "체력", detail: "기록 조회와 관리가 쉬운 현장 업무 화면을 설계합니다.", progress: 38 }];
  const items = tab === "VOD 강의" ? vod : pbl;
  return <><PageHeading eyebrow="내 학습" title="내 학습" copy="수강 신청한 VOD 강의와 PBL 프로젝트를 한 곳에서 이어갑니다." /><div className="mb-7 flex justify-center gap-3"><button onClick={() => setTab("VOD 강의")} className={`border px-6 py-3 text-sm font-bold ${tab === "VOD 강의" ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/20 text-white/65"}`}>VOD 강의 (3)</button><button onClick={() => setTab("PBL 프로젝트")} className={`border px-6 py-3 text-sm font-bold ${tab === "PBL 프로젝트" ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/20 text-white/65"}`}>PBL 프로젝트 (1)</button></div><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{items.map((item, index) => <button key={item.title} onClick={() => tab === "VOD 강의" ? openCourse(item.title) : goTo("projects")} className="mili-frame overflow-hidden border border-white/10 bg-[#0b110d] text-left"><div className={`flex h-44 items-center justify-center p-5 text-4xl font-black text-white ${index === 0 ? "bg-[#35d03f]" : index === 1 ? "bg-[#aebd28]" : "bg-[#344ec9]"}`}>{item.cover}</div><div className="p-5"><h2 className="min-h-12 text-lg font-bold leading-6 text-white">{item.title}</h2><p className="mt-3 min-h-10 text-sm leading-5 text-white/52">{item.detail}</p><div className="mt-4 flex gap-2 text-xs"><span className="bg-[#b7ff31]/12 px-2 py-1 text-[#b7ff31]">{tab === "VOD 강의" ? (item as typeof vod[number]).code : "PBL PROJECT"}</span><span className="bg-white/8 px-2 py-1 text-white/55">{tab === "VOD 강의" ? (item as typeof vod[number]).time : "4주 과정"}</span></div><div className="mt-5 h-1.5 bg-white/10"><i className="block h-full bg-[#b7ff31]" style={{ width: `${item.progress}%` }} /></div><div className="mt-1 text-right text-xs text-white/45">{item.progress}% 완료</div><span className="mt-4 block bg-[#b7ff31] px-4 py-3 text-center text-sm font-bold text-black">학습하기</span></div></button>)}</div></>;
}

function ReferenceClassroomCatalog() {
  const rooms = [
    { type: "PBL", title: "은행의 신용카드 사기 거래 탐지(Fraud Detection) 운영 과정", period: "2026-07-22 ~ 2026-09-20", tone: "text-[#b18cff] bg-[#8a5cff]/12" },
    { type: "VOD", title: "빅데이터 처리 1", period: "2026-01-01 ~ 2026-12-31", tone: "text-[#4ed58a] bg-[#4ed58a]/10" },
    { type: "VOD", title: "영상 제작을 위한 Google Flow 입문: 실무 보고서용 영상 제작 실습", period: "2026-01-01 ~ 2026-12-31", tone: "text-[#4ed58a] bg-[#4ed58a]/10" },
    { type: "VOD", title: "실무자를 위한 Claude Design 기반 보고서용 PPT 만들기", period: "2026-01-01 ~ 2026-12-31", tone: "text-[#4ed58a] bg-[#4ed58a]/10" },
  ];
  return <><PageHeading eyebrow="클래스룸" title="내 클래스룸" copy="수강 중인 과정의 출석과 평가를 확인합니다." /><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{rooms.map(room => <Link href={room.type === "PBL" ? "/classrooms/pbl-fitness" : "/classrooms/vod-ai"} key={room.title} className="mili-frame flex min-h-[210px] flex-col border border-white/10 bg-[#0b110d] p-6"><span className={`w-fit px-3 py-1 text-xs font-black ${room.tone}`}>{room.type}</span><h2 className="mt-5 text-xl font-bold leading-7 text-white">{room.title}</h2><p className="mt-auto pt-6 text-sm text-white/52">학습 {room.period}</p></Link>)}</div></>;
}

function ReferenceRankingView() {
  const [tab, setTab] = useState("누적 크레딧");
  const [unit, setUnit] = useState("전체 부대");
  const [rank, setRank] = useState("전체 계급");
  const metrics: Record<string, { value: string; label: string; rows: [string, string, string, string, string][] }> = {
    "누적 크레딧": { value: "5 CR", label: "내 누적 크레딧", rows: [["1", "김철수 상병", "-", "-", "5 CR"], ["1", "테스트02", "준장", "공군검찰단", "5 CR"]] },
    "평균 진도율": { value: "25.0 %", label: "내 평균 진도율", rows: [["1", "김철수 상병", "-", "-", "25.0 %"], ["1", "테스트02", "준장", "공군검찰단", "25.0 %"]] },
    "문제 해결": { value: "4 문제", label: "내 문제 해결", rows: [["1", "테스트02", "준장", "공군검찰단", "5 문제"], ["2", "김철수 상병", "-", "-", "4 문제"]] },
  };
  const current = metrics[tab];
  return <><PageHeading eyebrow="랭킹" title="랭킹보드" copy={`${tab} 기준 상위 20명입니다.`} /><div className="flex flex-wrap gap-3">{Object.keys(metrics).map(item => <button key={item} onClick={() => setTab(item)} className={`border px-5 py-3 text-sm font-bold ${tab === item ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/20 text-white/65"}`}>{item}</button>)}</div><Panel className="mt-6 p-5"><div className="grid gap-3"><select value={unit} onChange={event => setUnit(event.target.value)} className="h-10 border border-white/15 bg-black/25 px-3 text-sm text-white outline-none"><option>전체 부대</option><option>1대대</option><option>2대대</option></select><select value={rank} onChange={event => setRank(event.target.value)} className="h-10 border border-white/15 bg-black/25 px-3 text-sm text-white outline-none"><option>전체 계급</option><option>상병</option><option>일병</option></select></div></Panel><Panel className="mt-6 border-[#4ed58a]/55 bg-[#4ed58a]/10 p-6"><div className="flex flex-wrap items-end gap-x-6 gap-y-2"><b className="text-4xl font-black text-white">1위</b><b className="text-3xl font-black text-[#b7ff31]">{current.value}</b></div><div className="mt-2 flex gap-6 text-sm text-white/64"><span>2명 중</span><span>{current.label}</span></div></Panel><Panel className="mt-6 overflow-x-auto p-5"><table className="w-full min-w-[660px] text-left text-sm"><thead className="border-b border-white/10 text-white/48"><tr><th className="p-4">순위</th><th className="p-4">이름</th><th className="p-4">계급</th><th className="p-4">부대</th><th className="p-4 text-right">{tab}</th></tr></thead><tbody>{current.rows.map((row, index) => <tr key={row[1]} className={row[1] === "김철수 상병" ? "bg-[#4ed58a]/10" : "border-b border-white/10"}><td className="p-4"><span className="grid size-9 place-items-center bg-[#b7ff31] font-black text-black">{row[0]}</span></td><td className="p-4 font-bold text-white">{row[1]}{row[1] === "김철수 상병" && <small className="ml-2 bg-[#b7ff31]/15 px-2 py-1 text-[#b7ff31]">나</small>}</td><td className="p-4 text-white/64">{row[2]}</td><td className="p-4 text-white/64">{row[3]}</td><td className="p-4 text-right font-bold text-[#b7ff31]">{row[4]}</td></tr>)}</tbody></table><p className="mt-5 text-xs text-white/42">정상 상태 회원만 집계하며, 동점자는 같은 순위로 표기합니다. 필터 / {unit} / {rank}</p></Panel></>;
}

const publicCourses = [
  { title: "실무자를 위한 Claude Design 기반 보고서용 PPT 만들기", field: "Data", level: "Basic(초급)", code: "00000033", time: "1시간", students: 28, palette: "violet" },
  { title: "영상 제작을 위한 Google Flow 입문: 실무 보고서용 영상 제작 실습", field: "Cloud", level: "Basic(초급)", code: "00000034", time: "1시간", students: 19, palette: "sky" },
  { title: "chatGPT와 Gemini를 이용한 보고서 시각화 실무", field: "Python", level: "Basic(초급)", code: "00000035", time: "4시간", students: 34, palette: "ocean" },
  { title: "LLM 할루시네이션 줄이는 방법 실무", field: "Deep Learning", level: "Intermediate(중급)", code: "00000036", time: "3시간", students: 16, palette: "violet" },
  { title: "Claude Skills 작동 원리와 실전 활용", field: "AI", level: "Intermediate(중급)", code: "00000037", time: "2시간", students: 24, palette: "violet" },
  { title: "실무에 바로 쓰는 프롬프트 엔지니어링", field: "Data", level: "Basic(초급)", code: "00000038", time: "2시간", students: 31, palette: "teal" },
  { title: "인공지능 기초", field: "Cloud", level: "Basic(초급)", code: "00000039", time: "10시간", students: 42, palette: "sky" },
  { title: "소프트웨어 개발환경과 협업방법", field: "Python", level: "Advanced(고급)", code: "00000040", time: "6시간", students: 12, palette: "teal" },
];

const courseDescriptions: Record<string, string> = {
  "00000033": "생성형 AI를 활용해 PPT 보고서를 자동으로 작성하고 나만의 포트폴리오로 만드는 방법을 배워보세요.",
  "00000034": "Google Flow를 활용해 실무 보고서용 영상을 기획하고 완성하는 과정을 실습합니다.",
  "00000035": "chatGPT와 Gemini를 비교하며 업무 데이터의 핵심 내용을 더 명확하게 전달하는 방법을 익힙니다.",
  "00000036": "LLM 결과를 검증하고 더 신뢰도 높은 답변으로 개선하는 실무 흐름을 다룹니다.",
  "00000037": "Claude Skills의 원리와 반복 업무에 바로 적용할 수 있는 활용 방식을 배웁니다.",
  "00000038": "업무 맥락에 맞는 프롬프트를 설계하고 결과를 다듬는 실전 방법을 연습합니다.",
  "00000039": "인공지능의 기본 개념부터 실제 활용 사례까지 차근차근 살펴봅니다.",
  "00000040": "개발 환경과 협업 도구를 연결해 팀의 작업 흐름을 안정적으로 만드는 방법을 익힙니다.",
};

function PublicCourseCatalog({ openCourse }: { openCourse: (title: string) => void }) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("전체");
  const visible = publicCourses.filter((course) => (course.title.includes(query.trim()) || !query.trim()) && (level === "전체" || course.level === level));
  return <>
    <div className="text-center">
      <h1 className="text-3xl font-black tracking-[-.06em] text-white md:text-4xl">전체 강의 <span className="text-[#b7ff31]">50개</span></h1>
      <p className="mt-3 text-sm text-white/55">원하는 AI 기술을 선택하고 학습을 시작하세요.</p>
      <label className="mx-auto mt-9 flex max-w-xl border border-white/15 bg-black/25 p-1"><Search className="m-3 text-white/45" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="강의명, 과정코드로 검색" className="h-11 min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/35" /></label>
    </div>
    <div className="mt-9 flex flex-wrap items-center justify-between gap-4"><div className="flex flex-wrap gap-2">{["전체", "Basic(초급)", "Intermediate(중급)", "Advanced(고급)"].map(item => <button key={item} onClick={() => setLevel(item)} className={`border px-5 py-3 text-sm font-bold ${level === item ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-white/15 text-white/58"}`}>{item}</button>)}</div><span className="border border-white/15 px-3 py-2 text-xs text-white/55">최신순</span></div>
    <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{visible.map(course => {
      return <button key={course.code} data-palette={course.palette} onClick={() => openCourse(course.title)} className="mili-course-card mili-frame flex flex-col overflow-hidden border border-white/10 bg-[#161719] p-0 text-left transition hover:-translate-y-1 hover:border-white/25 hover:bg-[#1a1b1d]">
        <div className="mili-course-header relative flex h-[80px] items-center justify-between px-5">
          <span className="mili-course-bookmark grid size-10 place-items-center bg-[#111216] text-white"><Bookmark size={18} /></span>
          <span className="mili-course-students inline-flex items-center gap-1 bg-[#111216] px-3 py-2 text-xs font-bold text-white"><UserRound size={15} /> {course.students}명 수강중</span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <h2 className="min-h-[52px] text-lg font-semibold leading-[1.35] text-white">{course.title}</h2>
          <p className="min-h-12 text-sm leading-6 text-white/52">{courseDescriptions[course.code]}</p>
          <div className="flex flex-wrap gap-1.5 text-xs"><span className="mili-course-tag border px-2 py-1">{course.field}</span><span className="mili-course-tag border px-2 py-1">AI</span><span className="mili-course-tag border px-2 py-1">HCP</span></div>
          <dl className="space-y-2 pt-1 text-sm text-[#c8c8cb]"><div className="flex items-center gap-2"><Gauge size={17} className="text-white/45" /><dt>강의레벨</dt><dd className="mili-course-accent font-bold">{course.level}</dd></div><div className="flex items-center gap-2"><Clock3 size={17} className="text-white/45" /><dt>이수시간</dt><dd>{course.time}</dd></div><div className="flex items-center gap-2"><Building2 size={17} className="text-white/45" /><dt>제공기관</dt><dd>MiliAI 교육센터</dd></div><div className="flex items-center gap-2"><BadgeCheck size={17} className="text-white/45" /><dt>수료증</dt><dd>제공</dd></div></dl>
          <div className="mt-auto flex justify-end pt-1"><span className="border border-[var(--mili-primary-border)] px-4 py-2 text-sm font-semibold text-[var(--mili-primary)] transition-colors hover:bg-[var(--mili-primary)] hover:text-[var(--mili-primary-on)]">신청하기</span></div>
        </div>
      </button>;
    })}</div>
    {visible.length === 0 && <EmptyState title="검색 결과가 없습니다" copy="다른 강의명 또는 과정코드로 다시 검색해 주세요." />}
  </>;
}

function PublicCourseDetail({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);
  const [chapterOpen, setChapterOpen] = useState(true);
  return <><section className="border border-white/10 bg-[#7a315f] px-6 py-10 md:px-10 md:py-14"><div className="max-w-5xl"><p className="text-sm text-white/70">강의 / 입문 과정</p><h1 className="mt-5 max-w-4xl text-3xl font-black leading-tight tracking-[-.06em] text-white md:text-5xl">{title}</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-white/80">Claude AI를 활용해 텍스트 보고서를 전문적인 결과물로 정리하고, 실제 업무 흐름에서 재사용할 수 있는 방식으로 완성합니다.</p><div className="mt-6 flex flex-wrap gap-2 text-sm font-bold text-white"><span className="bg-white/15 px-3 py-2">입문</span><span className="bg-white/15 px-3 py-2">1일 과정</span><span className="bg-white/15 px-3 py-2">1시간</span><span className="bg-white/15 px-3 py-2">00000033</span></div></div></section><div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]"><div className="space-y-5"><Panel className="p-6 md:p-8"><h2 className="text-2xl font-bold text-white">강의 소개</h2><p className="mt-5 text-sm leading-7 text-white/62">텍스트 보고서를 고품질 PPT 슬라이드로 전환하고 편집하는 실무 노하우를 배웁니다. 슬라이드 구성부터 디자인 편집까지 전체 과정을 따라 하며, 바로 적용 가능한 결과물을 만듭니다.</p></Panel><Panel className="p-6 md:p-8"><h2 className="flex items-center gap-2 text-2xl font-bold text-white"><BookOpenCheck className="text-[#b7ff31]" /> 학습 콘텐츠</h2><article className="mt-5 border border-white/10 bg-black/20 p-5"><div className="flex flex-wrap items-center justify-between gap-4"><div><h3 className="text-lg font-bold text-white">{title}</h3><p className="mt-2 text-xs text-white/45">콘텐츠 ID / 57</p></div><Link href="/courses/생성-ai-업무-활용-기초/learn"><ActionButton><Play size={16} /> 학습하기</ActionButton></Link></div><p className="mt-5 text-sm leading-6 text-white/55">실습 자료와 예제를 따라 하며 보고서 구성, 메시지 정리, 디자인 검토 순서로 결과물을 완성합니다.</p></article></Panel><Panel className="p-6 md:p-8"><button onClick={() => setChapterOpen(value => !value)} className="flex w-full items-center justify-between text-left"><span className="text-xl font-bold text-white">학습 목차 <small className="text-sm font-normal text-white/45">(1개 챕터)</small></span><ChevronRight className={`transition ${chapterOpen ? "rotate-90 text-[#b7ff31]" : "text-white/45"}`} /></button>{chapterOpen && <div className="mt-5 border border-white/10 bg-black/20 p-5"><span className="mr-3 bg-[#b7ff31]/12 px-2 py-1 text-sm font-black text-[#b7ff31]">1</span><b className="text-sm text-white">{title}</b></div>}</Panel></div><Panel className="h-fit p-6 md:p-8"><span className="bg-[#4ed58a]/12 px-3 py-2 text-sm font-bold text-[#4ed58a]">입문 과정</span><dl className="mt-6 space-y-4 text-sm"><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/48">학습기간</dt><dd className="font-bold text-white">2026-01-01 ~ 2026-12-31</dd></div><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/48">교육일수</dt><dd className="font-bold text-white">1일</dd></div><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/48">학습시간</dt><dd className="font-bold text-white">1시간</dd></div></dl><Link href="/courses/생성-ai-업무-활용-기초/learn" className="mt-7 block"><ActionButton fullWidth><Play size={16} /> 바로 학습하기</ActionButton></Link><button onClick={() => setSaved(value => !value)} className="mt-3 w-full border border-[#b7ff31]/55 px-4 py-3 text-sm font-bold text-[#b7ff31]">{saved ? "보관함에 저장됨" : "보관함에 담기"}</button><p className="mt-4 text-center text-xs text-white/42">과정 코드 / 00000033 / 로그인 없이 이용 가능</p></Panel></div></>;
}

function PublicProjectDetail() {
  const [joined, setJoined] = useState(false);
  const missions = ["현장 문제와 사용자 정의", "핵심 데이터와 화면 흐름 설계", "AI 활용안 검증과 개선"];
  return <><Link href="/projects" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-white/58 hover:text-[#b7ff31]"><ChevronRight className="rotate-180" size={16} /> 전체 PBL 프로젝트 목록으로 돌아가기</Link><Panel className="p-7 md:p-10"><div className="flex flex-col justify-between gap-8 lg:flex-row"><div><p className="text-xs font-bold tracking-[.18em] text-[#b7ff31]">PBL PROJECT / 공개 과정</p><h1 className="mt-4 text-4xl font-black tracking-[-.06em] text-white">체력 기록 관리 시스템</h1><p className="mt-5 max-w-3xl text-sm leading-7 text-white/62">실무형 업무 과제를 기반으로 기록 관리의 문제를 분석하고, 더 빠르게 확인할 수 있는 화면과 업무 흐름을 설계합니다.</p><div className="mt-7 flex flex-wrap gap-5 text-sm font-bold text-white/70"><span>실습 일수 / 4주</span><span>이수 시간 / 8시간</span><span>배정 임무 수 / 3개</span></div></div><div className="shrink-0"><Link href="/projects/체력-기록-관리-시스템/mission"><ActionButton onClick={() => setJoined(true)}><Play size={17} /> {joined ? "첫 미션 이어가기" : "바로 학습하기"}</ActionButton></Link><p className="mt-3 text-center text-xs text-white/45">로그인 없이 모든 미션을 열람할 수 있습니다.</p></div></div></Panel><Panel className="mt-6 p-7 md:p-8"><div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[.18em] text-[#ffb84d]">CURRENT PROJECT TEAM</p><h2 className="mt-3 text-2xl font-bold text-white">체력 데이터 1팀</h2><p className="mt-2 text-sm text-white/55">현재 함께 미션을 수행하고 있는 팀원입니다.</p></div><Link href="/projects/동료-평가"><ActionButton subtle>동료평가 바로가기 <ClipboardCheck size={16} /></ActionButton></Link></div><div className="mt-6 grid gap-3 md:grid-cols-3">{[["김철수 상병", "화면 흐름 설계", "나"], ["박민수 일병", "데이터 구조 / 검증", "진행 중"], ["이수진 하사", "사용성 검토 / 피드백", "진행 중"]].map(([name, role, status]) => <article key={name} className="border border-white/10 bg-black/20 p-4"><span className="grid size-9 place-items-center bg-[#ffb84d]/10 text-xs font-black text-[#ffb84d]">{name.slice(0, 1)}</span><b className="mt-4 block text-sm text-white">{name}</b><p className="mt-1 text-xs text-white/50">{role}</p><span className="mt-4 inline-block border border-white/10 px-2 py-1 text-[11px] text-white/55">{status}</span></article>)}</div></Panel><Panel className="mt-6 p-7 md:p-10"><p className="text-xs font-bold tracking-[.18em] text-[#54c7ff]">MISSION MAP</p><h2 className="mt-3 text-2xl font-bold text-white">프로젝트 학습 미션</h2><p className="mt-3 text-sm text-white/55">각 미션을 완료하면 PBL 문제 완료 XP와 연속 학습 상태가 반영됩니다.</p><div className="mt-7 grid gap-4 md:grid-cols-3">{missions.map((mission, index) => <Link href="/projects/체력-기록-관리-시스템/mission" key={mission} className="mili-frame border border-white/10 bg-black/20 p-5"><span className="text-sm font-black text-[#b7ff31]">0{index + 1}</span><h3 className="mt-5 text-lg font-bold text-white">{mission}</h3><p className="mt-3 text-sm leading-6 text-white/50">요구사항을 확인하고, 해결 방향을 작성한 뒤 교관 피드백으로 다음 단계에 연결합니다.</p><span className="mt-6 block text-sm font-bold text-[#b7ff31]">미션 열기 <ArrowRight className="inline size-4" /></span></Link>)}</div></Panel></>;
}

function MyHubView({ pathname, goTo, openCourse }: { pathname: string; goTo: (page: PageKey) => void; openCourse: (title: string) => void }) {
  const last = pathname.split("/").filter(Boolean).at(-1) || "";
  if (last === "learning") return <LearningView openCourse={openCourse} goTo={goTo} />;
  if (last === "credits") return <RewardCenter goTo={goTo} />;
  const sections: Record<string, { title: string; copy: string; action?: React.ReactNode }> = {
    onboarding: { title: "온보딩 설문", copy: "현재 보직과 학습 경험을 바탕으로 추천 경로를 정교하게 만들어요." },
    "level-test": { title: "역량 진단", copy: "AI 활용 역량을 진단하고 맞춤 학습 경로를 추천합니다." },
    wishlist: { title: "보관함", copy: "나중에 학습할 강의와 프로젝트를 보관합니다." },
    certificates: { title: "수료증", copy: "완료한 학습과 인증서를 확인합니다." },
    credits: { title: "크레딧 / 보상", copy: "미션과 학습 활동으로 쌓은 보상을 확인합니다." },
    posts: { title: "작성한 게시글", copy: "커뮤니티와 프로젝트에서 남긴 활동 기록입니다." },
    notifications: { title: "알림", copy: "학습, 피드백, 공지 관련 새 소식을 확인합니다." },
    settings: { title: "계정 설정", copy: "프로필과 알림 환경을 관리합니다." },
    withdraw: { title: "회원 탈퇴", copy: "탈퇴 전 학습 기록과 수료증 보관 여부를 확인하세요." },
  };
  if (last && last !== "my" && sections[last]) return <><PageHeading eyebrow="마이페이지" title={sections[last].title} copy={sections[last].copy} /><Panel className="p-6">{last === "wishlist" ? <div className="space-y-3">{["AI 결과 검증과 개선", "데이터 시각화의 첫걸음"].map(title => <button key={title} onClick={() => openCourse(title)} className="flex w-full justify-between border border-white/10 p-4 text-left text-sm font-bold text-white"><span>{title}</span><ChevronRight className="text-[#b7ff31]" /></button>)}</div> : last === "level-test" ? <DiagnosisView goTo={goTo} /> : last === "certificates" ? <div className="grid gap-4 sm:grid-cols-2">{[["생성 AI 업무 활용 기초", "2026.07.30", "AI 활용 기초"], ["보고서 시각화 실무", "2026.07.25", "데이터 분석"], ["Claude Design PPT 만들기", "2026.07.19", "생성 AI 실무"], ["프롬프트 엔지니어링", "2026.07.12", "AI 활용 심화"]].map(([course, date, category], index) => <article key={course} className="relative overflow-hidden border border-[#b7ff31]/25 bg-[linear-gradient(135deg,#121b13,#070a08)] p-6"><p className="text-[10px] font-bold tracking-[.16em] text-[#b7ff31]">MILI AI / CERTIFICATE</p><span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full border border-[#b7ff31]/45 text-lg font-black text-[#b7ff31]">0{index + 1}</span><h2 className="mt-10 max-w-[75%] text-lg font-bold leading-6 text-white">{course}</h2><p className="mt-3 text-sm text-white/55">수료자 / 김철수 상병</p><div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs"><span className="text-white/45">발급일 / {date}</span><span className="font-bold text-[#b7ff31]">{category}</span></div><button onClick={() => window.print()} className="mt-5 border border-[#b7ff31]/55 px-3 py-2 text-xs font-bold text-[#b7ff31]">수료증 보기 <ArrowRight className="inline size-3" /></button></article>)}</div> : last === "withdraw" ? <div><p className="text-sm leading-6 text-white/60">탈퇴하면 학습 기록과 진행 중인 프로젝트에 접근할 수 없습니다.</p><ActionButton subtle>탈퇴 절차 확인</ActionButton></div> : <div className="grid gap-4 md:grid-cols-2">{["학습 목표를 설정하세요", "알림을 최신 상태로 유지하세요"].map(item => <div key={item} className="border border-white/10 bg-black/25 p-5 text-sm text-white/70">{item}</div>)}</div>}</Panel></>;
  return <MyPageView goTo={goTo} section="dashboard" setSection={() => undefined} openCourse={openCourse} />;
}

function GuideView({ pathname, goTo }: { pathname: string; goTo: (page: PageKey) => void }) {
  return pathname === "/guide/roadmap" ? <JourneyView goTo={goTo} /> : pathname === "/guide/about" ? <AboutView goTo={goTo} /> : <><PageHeading eyebrow="안내" title="MiliAI 이용 안내" copy="학습 로드맵과 서비스 소개를 확인하세요." /><div className="grid gap-5 md:grid-cols-2"><Link href="/guide/roadmap" className="mili-frame border border-white/10 bg-[#0b110d] p-7"><Compass className="text-[#b7ff31]" /><h2 className="mt-5 text-xl font-bold text-white">학습 로드맵</h2><p className="mt-3 text-sm text-white/55">기초 이해부터 실무 적용과 수료증까지의 경로입니다.</p></Link><Link href="/guide/about" className="mili-frame border border-white/10 bg-[#0b110d] p-7"><CircleHelp className="text-[#54c7ff]" /><h2 className="mt-5 text-xl font-bold text-white">서비스 소개</h2><p className="mt-3 text-sm text-white/55">국군 장병을 위한 AI 교육 플랫폼의 학습 방식입니다.</p></Link></div></>;
}

function CommunityWriteView() {
  const [posted, setPosted] = useState(false);
  return <><PageHeading eyebrow="커뮤니티 / Q&A" title="질문 작성" copy="학습 맥락과 함께 궁금한 점을 남겨보세요." /><Panel className="p-6"><input className="w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="질문 제목" /><textarea className="mt-4 min-h-52 w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="현재 학습 중인 내용과 질문을 작성하세요" /><ActionButton onClick={() => setPosted(true)}>질문 등록</ActionButton>{posted && <p className="mt-4 text-sm text-[#4ed58a]">질문이 등록되었습니다. 답변이 달리면 알림으로 알려드릴게요.</p>}</Panel></>;
}

function RouteContent({ pathname, goTo, openCourse, openProject, isLightMode }: { pathname: string; goTo: (page: PageKey) => void; openCourse: (title: string) => void; openProject: (title: string) => void; isLightMode: boolean }) {
  pathname = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (pathname === "/legacy-learning-player") return <LearningPlayerView />;
  if (pathname === "/") return <PersonalHome goTo={goTo} isLightMode={isLightMode} />;
  if (pathname === "/courses") return <PublicCourseCatalog openCourse={openCourse} />;
  if (pathname.endsWith("/learn") && pathname.startsWith("/courses/")) return <LearningPlayerWorkspace />;
  if (pathname.startsWith("/courses/")) return <PublicCourseDetail title={decodeURIComponent(pathname.split("/").at(-1)?.replaceAll("-", " ") || "생성 AI 업무 활용 기초")} />;
  if (pathname === "/projects") return <ReferenceProjectCatalog openProject={openProject} />;
  if (decodeURIComponent(pathname) === "/projects/동료-평가") return <PeerReviewView />;
  if (pathname.endsWith("/mission") && pathname.startsWith("/projects/")) return <MissionView />;
  if (pathname.startsWith("/projects/")) return <PublicProjectDetail />;
  if (pathname === "/learning") return <ReferenceLearningCatalog openCourse={openCourse} goTo={goTo} />;
  if (pathname.startsWith("/learning")) return <LearningView openCourse={openCourse} goTo={goTo} />;
  if (pathname === "/classrooms") return <ReferenceClassroomCatalog />;
  if (pathname.startsWith("/classrooms")) return <ClassroomView pathname={pathname} />;
  if (pathname.startsWith("/ranking")) return <ReferenceRankingView />;
  if (pathname.startsWith("/showcase")) return <ShowcaseView pathname={pathname} />;
  if (pathname.startsWith("/team-projects")) return <TeamProjectView />;
  if (pathname === "/community/write") return <CommunityWriteView />;
  if (pathname.startsWith("/community")) return <CommunityView />;
  if (pathname.startsWith("/search")) return <SearchView pathname={pathname} />;
  if (pathname === "/my") return <PersonalMyPage isLightMode={isLightMode} onGoTo={goTo} onOpenLearning={() => window.location.assign("/my/learning")} />;
  if (pathname.startsWith("/my")) return <MyHubView pathname={pathname} goTo={goTo} openCourse={openCourse} />;
  if (pathname.startsWith("/diagnosis")) return <DiagnosisView goTo={goTo} />;
  if (pathname.startsWith("/journey")) return <JourneyView goTo={goTo} />;
  if (pathname.startsWith("/about")) return <AboutView goTo={goTo} />;
  if (pathname.startsWith("/guide")) return <GuideView pathname={pathname} goTo={goTo} />;
  return <><PageHeading eyebrow="오류" title="요청한 페이지를 찾을 수 없습니다" copy="주소를 확인하거나 홈에서 다시 시작해 주세요." /><EmptyState title="잘못된 접근입니다" copy="입력한 주소에 해당하는 학습 화면이 없습니다." action={<ActionButton onClick={() => goTo("home")}>홈으로 이동</ActionButton>} /></>;
}

export default function HomePage() {
  const pathname = usePathname();
  const router = useRouter();
  const activePage = routeGroup(pathname);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);
  const [isThemeReady, setIsThemeReady] = useState(false);
  const [isThemeSettled, setIsThemeSettled] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isSceneFading, setIsSceneFading] = useState(false);
  const pendingPathRef = useRef<string | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    setIsLightMode(document.documentElement.dataset.miliTheme === "light");
    setIsThemeReady(true);
    let settleFrame = 0;
    const paintFrame = window.requestAnimationFrame(() => {
      settleFrame = window.requestAnimationFrame(() => setIsThemeSettled(true));
    });
    return () => {
      window.cancelAnimationFrame(paintFrame);
      window.cancelAnimationFrame(settleFrame);
    };
  }, []);
  useEffect(() => {
    if (!isThemeReady) return;
    const theme = isLightMode ? "light" : "dark";
    document.documentElement.dataset.miliTheme = theme;
    window.localStorage.setItem("mili-theme", theme);
  }, [isLightMode, isThemeReady]);
  useEffect(() => () => {
    if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
  }, []);
  const navigateTo = useCallback((href: string) => {
    if (href === pathname || transitionTimerRef.current !== null) return;
    pendingPathRef.current = href;
    setMobileOpen(false);
    setIsSceneFading(true);
    transitionTimerRef.current = window.setTimeout(() => {
      transitionTimerRef.current = null;
      router.push(href);
    }, 170);
  }, [pathname, router]);
  const reloadHome = () => {
    if (pathname === "/") {
      window.location.reload();
      return;
    }
    window.location.assign("/");
  };
  useEffect(() => {
    if (!pendingPathRef.current) return;
    pendingPathRef.current = null;
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "auto" });
      setIsSceneFading(false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  useLayoutEffect(() => {
    if (activePage === "home") return;
    const root = pageContentRef.current;
    if (!root) return;

    const targets = [
      root.querySelector<HTMLElement>(".mili-entry-heading"),
      ...Array.from(root.querySelectorAll<HTMLElement>(".mili-entry-card, .mili-course-card, .mili-project-card, .mili-showcase-card, button.group, .mili-entry-page > section, .mili-entry-page > section > article")),
    ].filter((element): element is HTMLElement => Boolean(element));

    targets.forEach((element, index) => {
      element.classList.add("mili-page-card-reveal");
      element.style.setProperty("--mili-entry-delay", `${80 + Math.min(index, 8) * 70}ms`);
    });

    return () => {
      targets.forEach((element) => {
        element.classList.remove("mili-page-card-reveal");
        element.style.removeProperty("--mili-entry-delay");
      });
    };
  }, [activePage, pathname]);
  const handleInternalNavigation = (event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest<HTMLAnchorElement>('a[href]');
    const href = anchor?.getAttribute("href");
    if (!anchor || !href || !href.startsWith("/") || href.startsWith("//") || anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    event.preventDefault();
    navigateTo(href);
  };
  const goTo = (page: PageKey) => navigateTo(pagePaths[page]);
  const openCourse = (title: string) => navigateTo(`/courses/${slugify(title)}`);
  const openProject = (title: string) => navigateTo(`/projects/${slugify(title)}`);
  const activeItem = navigation.find((item) => item.key === activePage);
  const pageContent = <RouteContent pathname={pathname} goTo={goTo} openCourse={openCourse} openProject={openProject} isLightMode={isLightMode} />;
  const isImmersive = !isLightMode;
  return <main onClickCapture={handleInternalNavigation} className={`mili-app-transition ${!isThemeReady ? "mili-theme-pending" : ""} ${!isThemeSettled ? "mili-theme-initializing" : ""} ${isSceneFading ? "mili-app-leaving" : ""} ${activePage === "home" ? `h-screen overflow-hidden ${isImmersive ? "bg-[#090e0a]" : "bg-[#f7f7f7]"}` : "min-h-screen"} ${isImmersive ? "mili-dark text-white" : "mili-light text-slate-900"}`}>
    {isImmersive && activePage !== "home" && <div className="fixed inset-0 z-0 bg-black" />}
    {!isImmersive && activePage !== "home" && <div className="fixed inset-0 z-0 bg-[#F7F7F7]" />}
    <aside className="mili-frame mili-lnb fixed inset-y-0 left-0 z-30 hidden w-[271px] flex-col border-0 bg-black lg:flex">
      <div className="px-6 pb-4 pt-8"><button type="button" onClick={reloadHome} aria-label="홈 새로고침" className="flex h-[41px] items-center text-left"><Image src={assetPath("/assets/mili-logo.png")} alt="MiliAI" width={112} height={41} priority className="h-auto w-[112px] object-contain" /></button></div>
      <nav className="flex flex-1 flex-col gap-[5px] overflow-y-auto px-[17px] py-2" aria-label="학습 서비스 메뉴">{navigation.map((item) => { const Icon = item.icon; const active = activePage === item.key; return <button type="button" key={item.key} onClick={() => goTo(item.key)} className={`mili-nav-item flex w-full items-center gap-3 px-3 py-[11px] text-left text-sm transition-all ${active ? "mili-nav-item-active font-semibold" : "font-normal"}`}><Icon size={17} strokeWidth={1.8} /><span>{item.label}</span></button>; })}</nav>
    </aside>

    <header className={`${activePage === "home" ? "mili-home-header absolute inset-x-0 top-0 lg:left-[271px]" : "sticky top-0 lg:ml-[271px]"} z-20 bg-transparent px-5 py-3 lg:px-8`}><div className="mx-auto flex max-w-[1460px] items-center justify-between gap-3"><button type="button" onClick={() => setMobileOpen(true)} className="grid size-11 place-items-center rounded-xl border border-current/15 lg:hidden" aria-label="메뉴 열기"><Menu size={20} /></button><div className="hidden items-center gap-2 text-sm opacity-60 sm:flex"><Compass className="size-4 text-[#78a921]" /><span>학습 베이스</span><ChevronRight className="size-4" /><b className="font-semibold opacity-100">{activeItem?.label}</b></div><div className="ml-auto flex items-center gap-2"><button type="button" onClick={() => setIsLightMode(value => !value)} className="mili-gnb-item grid size-10 place-items-center rounded-xl border border-current/15 opacity-75 hover:opacity-100" aria-label={isLightMode ? "다크 모드로 전환" : "라이트 모드로 전환"} title={isLightMode ? "다크 모드" : "라이트 모드"}>{isLightMode ? <Moon size={18} /> : <Sun size={18} />}</button><button type="button" onClick={() => goTo("search")} className="mili-gnb-item grid size-10 place-items-center rounded-xl border border-current/15 opacity-75 hover:opacity-100" aria-label="통합검색"><Search size={18} /></button><button type="button" className="mili-gnb-item relative grid size-10 place-items-center rounded-xl border border-current/15 opacity-75" aria-label="알림"><Bell size={18} /><i className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#b7ff31]" /></button><button type="button" onClick={() => goTo("my")} className="mili-gnb-item mili-control flex items-center gap-2 rounded-xl border border-current/15 bg-white/10 px-2.5 py-1.5 text-left"><Image src={assetPath("/assets/soldier-profile-reference.png")} alt="" width={30} height={30} className="size-8 object-contain object-bottom" /><span className="hidden pr-1 text-xs font-bold sm:inline">김철수 상병</span></button></div></div></header>


    {mobileOpen && <div className="fixed inset-0 z-50 bg-black/70 lg:hidden"><aside className="mili-mobile-lnb flex h-full w-[230px] flex-col bg-black"><div className="flex items-center justify-between px-6 pb-2 pt-7"><button type="button" onClick={reloadHome} aria-label="홈 새로고침" className="text-left"><Image src={assetPath("/assets/mili-logo.png")} alt="MiliAI" width={112} height={41} className="h-auto w-[112px]" /></button><button onClick={() => setMobileOpen(false)} aria-label="메뉴 닫기"><X /></button></div><nav className="flex flex-1 flex-col gap-[5px] overflow-y-auto px-[17px] py-2">{navigation.map(item => { const Icon = item.icon; const active = activePage === item.key; return <button key={item.key} onClick={() => goTo(item.key)} className={`mili-nav-item flex w-full items-center gap-3 px-3 py-[11px] text-left text-sm ${active ? "mili-nav-item-active font-semibold" : "font-normal"}`}><Icon size={17} />{item.label}</button>})}</nav></aside></div>}
    <div ref={pageContentRef} key={pathname} className={activePage === "home"
      ? "relative z-10 h-screen overflow-y-auto lg:ml-[271px] xl:overflow-hidden"
      : "relative z-10 w-full px-5 py-7 lg:ml-[271px] lg:w-[calc(100%-271px)] lg:px-8 lg:py-10"
    }>{activePage === "home" ? pageContent : <div className="mx-auto w-full max-w-[1180px]">{pageContent}</div>}</div>
    {selectedItem && <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5" role="dialog" aria-modal="true" aria-label="학습 상세"><Panel className="w-full max-w-lg p-6 shadow-2xl"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold tracking-[0.16em] text-[#b7ff31]">학습 상세</p><h2 className="mt-3 text-2xl font-bold leading-8 text-white">{selectedItem}</h2></div><button aria-label="닫기" onClick={() => setSelectedItem(null)} className="text-white/60 hover:text-white"><X /></button></div><p className="mt-5 text-sm leading-6 text-white/58">학습 목표, 진행 현황, 자료와 퀴즈를 한 화면에서 이어갈 수 있는 상세 학습 공간입니다.</p><div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">영상<br /><b className="mt-1 block text-white">18분</b></span><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">실습<br /><b className="mt-1 block text-white">1개</b></span><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">퀴즈<br /><b className="mt-1 block text-white">3문항</b></span></div><div className="mt-6 flex gap-3"><ActionButton onClick={() => { setSelectedItem(null); goTo(selectedItem.includes("프로젝트") || selectedItem === "동료 평가" ? "projects" : "courses"); }}><Play size={16} /> 시작하기</ActionButton><ActionButton subtle onClick={() => setSelectedItem(null)}>나중에 보기</ActionButton></div></Panel></div>}
  </main>;
}
