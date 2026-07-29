"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Bell,
  BookOpenCheck,
  ChevronRight,
  CircleHelp,
  ClipboardCheck,
  Compass,
  Code2,
  Check,
  FileText,
  Gift,
  FileCheck2,
  Flame,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
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
  Target,
  Trophy,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  { key: "projects", label: "프로젝트", icon: FolderKanban },
  { key: "showcase", label: "쇼케이스", icon: Award },
  { key: "community", label: "커뮤니티", icon: UsersRound },
  { key: "diagnosis", label: "역량진단", icon: Radar },
  { key: "journey", label: "학습여정", icon: Compass },
  { key: "my", label: "마이페이지", icon: UserRound },
  { key: "about", label: "서비스소개", icon: CircleHelp },
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
  return <section className={`mili-frame rounded-2xl border border-[#273128] bg-[#0b110d]/95 ${className}`}>{children}</section>;
}

function PageHeading({ eyebrow, title, copy, aside }: { eyebrow: string; title: string; copy: string; aside?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
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
      <Panel className="mili-profile-frame relative overflow-hidden p-5 md:p-6"><div className="grid h-full gap-5 lg:grid-cols-[230px_minmax(0,1fr)]"><div className="relative mx-auto aspect-square min-h-0 w-full max-w-[230px] self-center overflow-hidden rounded-full border-2 border-[#b7ff31]/70 bg-[#050806]"><Image src={isLightMode ? assetPath("/assets/soldier-profile-reference-light.png") : assetPath("/assets/soldier-profile-reference.png")} alt="김철수 상병 프로필" fill className="object-contain object-bottom" /></div><div className="flex min-w-0 flex-col"><div className="flex flex-wrap items-start justify-between gap-3"><div className="flex flex-wrap items-center gap-3"><h2 className="text-2xl font-bold tracking-[-0.04em] text-white md:text-3xl">김철수 상병</h2><span className="border border-[#54c7ff]/40 bg-[#54c7ff]/10 px-2 py-1 text-xs font-bold text-[#54c7ff]">AI 탐사대원</span></div><div className="flex items-center gap-2.5"><span className="text-xs font-bold text-white/55">연속 학습</span><div className="flex gap-1.5">{["월", "화", "수", "목", "금"].map((day, index) => <span key={day} aria-label={`${day} ${index < 3 ? "학습 완료" : "예정"}`} className={`grid size-8 place-items-center border text-[10px] font-bold ${index < 3 ? "border-[#ffb84d] bg-[#ffb84d] text-black" : "border-white/15 bg-white/[0.04] text-white/42"}`}>{index < 3 ? <Flame size={13} fill="currentColor" /> : day}</span>)}</div><b className="text-xs text-[#ffb84d]">3일</b></div></div><p className="mt-2 text-sm text-white/55">상병 / 비전공 장병 / 체력 기록 관리 시스템 진행 중</p><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{[["연속 학습", "21", "일"], ["강의 완료", "15", "개"], ["프로젝트 완료", "3", "건"], ["누적 학습", "16h", ""]].map(([label, value, detail]) => <article key={label} className="border border-white/10 bg-black/70 p-3"><p className="text-[11px] text-white/46">{label}</p><b className="mt-2 block text-2xl leading-none text-white">{value}</b><small className="mt-2 block min-h-3 text-[10px] text-white/38">{detail}</small></article>)}</div><div className="mt-4 border border-white/10 bg-black/75 p-3"><div className="flex items-center justify-between"><b className="font-mono text-lg text-white">LV.23</b><b className="text-sm text-white">84%</b></div><div className="mt-2 h-2 bg-white/10"><i className="block h-full w-[84%] bg-[#b7ff31]" /></div></div><div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3 text-sm"><span className="text-white/52">다음 보상 / 프롬프트 실전 뱃지</span><b className="text-[#b7ff31]">미션 2개 남음</b></div></div></div></Panel>
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
  const posts = ["작전 보고서 요약에서 정보 누락을 줄이는 방법이 있나요?", "Python 모듈을 불러올 때 import와 from의 차이", "생성 AI 보안 수칙 퀴즈 2번 문항 관련 질문", "병력 현황 데이터 시각화, 차트 선택이 어렵습니다"];
  return <><PageHeading eyebrow="커뮤니티" title="함께 배우는 공간" copy="질문, 공지, 자주 묻는 질문과 뉴스까지 학습 맥락 속에서 확인하세요." aside={<Link href="/community/write"><ActionButton>질문 작성 <MessageCircleQuestion size={16} /></ActionButton></Link>} />
    <div className="grid gap-5 xl:grid-cols-[1fr_310px]"><Panel className="p-5 md:p-7"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{["공지사항", "Q&A", "FAQ", "뉴스"].map(item => <button onClick={() => setTab(item)} key={item} className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/52 hover:bg-white/5"}`}>{item}</button>)}</div><label className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 text-white/50"><Search size={17} /><input className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-white/35" placeholder="궁금한 내용을 검색해보세요" /></label><div className="mt-3">{posts.map((post, index) => <button key={post} type="button" className="flex w-full items-center gap-4 border-b border-white/[0.08] py-5 text-left hover:bg-white/[0.025]"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-bold text-[#b7ff31]">{["박", "이", "최", "정"][index]}</span><span className="min-w-0 flex-1"><strong className="block text-sm text-white">{post}</strong><small className="mt-2 block text-xs text-white/42">{index % 2 === 0 ? "프로젝트 / " : "VOD 강의 / "}{index + 2}시간 전</small></span><span className="rounded-full bg-white/[0.07] px-2 py-1 text-xs text-white/55">답변 {index + 2}</span></button>)}</div></Panel>
      <Panel className="p-6"><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">안내</p><h2 className="mt-2 text-xl font-bold text-white">학습 소식</h2><div className="mt-5 space-y-4">{["7월 신규 PBL 프로젝트 공개", "학습 서비스 정기 점검 안내", "7일 연속 학습 챌린지"].map((notice, index) => <article key={notice} className="border-b border-white/10 pb-4 last:border-0"><h3 className="text-sm font-bold text-white">{notice}</h3><p className="mt-2 text-xs text-white/42">2026.07.{25-index * 2} / 자세히 보기</p></article>)}</div><div className="mt-7 rounded-xl bg-white/[0.05] p-4"><p className="text-xs text-white/45">자주 묻는 질문</p><button className="mt-3 text-left text-sm font-bold text-[#b7ff31]">인증서는 어떻게 발급받나요? <ChevronRight className="inline size-4" /></button></div></Panel>
    </div></>;
}

function DiagnosisView({ goTo }: { goTo: (page: PageKey) => void }) {
  return <><PageHeading eyebrow="역량 진단" title="역량진단" copy="현재 역량과 목표 사이의 차이를 확인하고, 그 이유를 설명하는 맞춤 학습 경로를 제안합니다." aside={<ActionButton onClick={() => goTo("guide")}>추천 여정 보기 <ArrowRight size={16} /></ActionButton>} />
    <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><Panel className="p-6 md:p-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-[#54c7ff]/15 text-[#54c7ff]"><Radar /></span><div><p className="text-xs text-white/45">최근 진단 / 2026.07.26</p><h2 className="text-2xl font-bold text-white">AI 실무 역량: 성장 중</h2></div></div><div className="mt-9 space-y-5">{[["문제 정의", 78], ["프롬프트 설계", 84], ["정보 구조화", 62], ["결과 검증", 48]].map(([label, value]) => <div key={String(label)}><div className="flex justify-between text-sm"><b className="text-white">{label}</b><span className="text-[#b7ff31]">{value}%</span></div><div className="mt-2 h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-[#b7ff31]" style={{ width: `${value}%` }} /></div></div>)}</div></Panel>
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

function MyPageView({ goTo, section, setSection, openCourse }: { goTo: (page: PageKey) => void; section: MyPageSection; setSection: (section: MyPageSection) => void; openCourse: (title: string) => void }) {
  const [postTab, setPostTab] = useState("전체");
  if (section === "courses") return <><PageHeading eyebrow="내 학습" title="내 강의" copy="최근 학습 중인 강의와 관심 강의를 한 곳에서 관리합니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><div className="grid gap-5 xl:grid-cols-2"><Panel className="p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">수강 중</p><h2 className="mt-2 text-xl font-bold text-white">최근 수강 강의</h2></div><BookOpenCheck className="text-[#b7ff31]" /></div><div className="mt-5 space-y-3">{[{ title: "생성 AI 업무 활용 기초", percent: 64 }, { title: "보안 AI 활용 수칙", percent: 22 }].map(course => <button key={course.title} onClick={() => openCourse(course.title)} className="w-full border border-white/10 bg-black/30 p-4 text-left hover:border-[#b7ff31]/45"><div className="flex justify-between gap-3"><b className="text-sm text-white">{course.title}</b><span className="text-xs font-bold text-[#b7ff31]">{course.percent}%</span></div><div className="mt-3 h-1.5 bg-white/10"><div className="h-full bg-[#b7ff31]" style={{ width: `${course.percent}%` }} /></div><span className="mt-3 block text-xs text-white/46">이어서 보기 <ArrowRight className="inline size-3" /></span></button>)}</div></Panel><Panel className="p-6"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#54c7ff]">보관한 강의</p><h2 className="mt-2 text-xl font-bold text-white">관심 강의</h2></div><Award className="text-[#54c7ff]" /></div><div className="mt-5 space-y-3">{["AI 결과 검증과 개선", "데이터 시각화의 첫걸음", "업무용 문서 작성 자동화"].map((title, index) => <button key={title} onClick={() => openCourse(title)} className="flex w-full items-center gap-4 border border-white/10 bg-white/[0.025] p-4 text-left hover:border-[#54c7ff]/55"><span className="grid size-9 place-items-center bg-[#54c7ff]/10 text-sm font-black text-[#54c7ff]">{index + 1}</span><span className="min-w-0 flex-1"><b className="block truncate text-sm text-white">{title}</b><small className="mt-1 block text-xs text-white/45">관심 목록에 저장됨</small></span><ChevronRight className="size-4 text-white/40" /></button>)}</div></Panel></div></>;
  if (section === "posts") { const postGroups: Record<string, string[]> = { "전체": ["생성 AI 보안 수칙 퀴즈 2번 문항 관련 질문", "체력 기록 관리 시스템 동료 평가를 완료했습니다.", "작전 보고서 요약에 대한 AI 교관 답변"], "내 댓글": ["Python 모듈 질문에 댓글을 남겼습니다.", "데이터 시각화 차트 선택 답변"], "동료 평가": ["체력 기록 관리 시스템 / 동료 평가", "보급 현황 데이터 시각화 / 동료 피드백"], "게시판 질의": ["정보 누락을 줄이는 방법이 있나요?", "AI 보안 수칙 퀴즈 관련 질문"], "AI 교관": ["보고서 요약 프롬프트 상담", "결과 검증 체크리스트 대화"] }; return <><PageHeading eyebrow="내 활동" title="작성한 게시글" copy="내가 남긴 댓글, 동료 평가, 게시판 질의와 AI 교관 대화를 분류해 확인합니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><Panel className="p-5 md:p-7"><div className="flex gap-2 overflow-x-auto border-b border-white/10 pb-4">{Object.keys(postGroups).map(tab => <button key={tab} onClick={() => setPostTab(tab)} className={`shrink-0 px-3 py-2 text-sm font-bold ${postTab === tab ? "bg-[#b7ff31] text-black" : "text-white/55 hover:bg-white/5 hover:text-white"}`}>{tab}</button>)}</div><div className="mt-2">{postGroups[postTab].map((post, index) => <article key={post} className="flex items-center gap-4 border-b border-white/[0.08] py-5 last:border-0"><span className="grid size-10 shrink-0 place-items-center bg-white/[0.07] text-[#b7ff31]">{postTab === "AI 교관" ? <Sparkles size={17} /> : postTab === "동료 평가" ? <UsersRound size={17} /> : <MessageSquareText size={17} />}</span><div className="min-w-0 flex-1"><h2 className="truncate text-sm font-bold text-white">{post}</h2><p className="mt-2 text-xs text-white/46">{postTab === "AI 교관" ? "AI 교관 상담 / " : postTab === "동료 평가" ? "프로젝트 피드백 / " : "커뮤니티 활동 / "}2026.07.{25-index}</p></div><button className="text-xs font-bold text-[#b7ff31]">보기 <ChevronRight className="inline size-3" /></button></article>)}</div></Panel></> }
  if (section === "badges") return <><PageHeading eyebrow="보상 모음" title="뱃지 달성 현황" copy="다음 획득 예정 뱃지와 지금까지 획득한 뱃지 컬렉션입니다." aside={<button onClick={() => setSection("dashboard")} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">마이페이지로 돌아가기 <ChevronRight className="inline size-4" /></button>} /><Panel className="p-6 md:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.17em] text-[#b7ff31]">뱃지 진행 현황</p><h2 className="mt-2 text-xl font-bold text-white">다음 뱃지까지 2개 미션</h2></div><span className="border border-white/12 bg-white/[0.05] px-3 py-2 text-sm font-bold text-white">획득 6/8</span></div><div className="mt-7 grid gap-6 border border-white/10 bg-[linear-gradient(135deg,#1a211c,#0c100d)] p-6 md:grid-cols-[170px_1fr_auto] md:items-center"><div className="relative mx-auto grid size-36 place-items-center border-[14px] border-[#b7ff31]/30"><span className="text-center text-3xl font-black text-white">3<small className="text-base text-white/52">/5</small><small className="mt-1 block text-xs font-normal text-white/52">진행</small></span></div><div><p className="text-sm text-white/52">다음 뱃지</p><h3 className="mt-2 text-2xl font-bold text-white">프롬프트 실전 뱃지</h3><p className="mt-3 text-sm text-white/58">남은 조건 / 생성 AI 실습 프로젝트 2개 완료</p><span className="mt-4 inline-block bg-[#b7ff31]/15 px-3 py-2 text-sm font-bold text-[#b7ff31]">XP +150 / 3단계 진입 조건 반영</span></div><ActionButton onClick={() => goTo("projects")}>남은 프로젝트 보기</ActionButton></div><div className="mt-8 flex items-center justify-between"><h2 className="text-lg font-bold text-white">획득한 뱃지 컬렉션</h2><span className="text-xs text-white/48">전체 보기 <ChevronRight className="inline size-3" /></span></div><div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">{["AI 기초 이해", "프롬프트 입문", "보안 수칙 통과", "생성 AI 활용", "바이브코딩 입문", "동료 리뷰 참여", "프롬프트 실전", "데이터 분석 입문"].map((badge, index) => <article key={badge} className={`p-3 text-center ${index < 6 ? "border border-[#b7ff31]/35 bg-[#b7ff31]/[0.07]" : "border border-white/10 bg-white/[0.03] opacity-45"}`}><Award className={`mx-auto size-8 ${index < 6 ? "text-[#b7ff31]" : "text-white/45"}`} /><p className="mt-3 text-xs font-bold text-white">{badge}</p></article>)}</div></Panel></>;
  return <><PageHeading eyebrow="내 대시보드" title="김철수 상병의 성장 기록" copy="학습 시간보다 실제 수행한 활동과 증거를 기준으로 성장을 확인합니다." />
    <div className="grid gap-5 xl:grid-cols-[1.25fr_.75fr]"><Panel className="mili-profile-frame relative overflow-hidden p-6 md:p-8"><div className="grid gap-6 lg:grid-cols-[250px_1fr]"><div className="relative min-h-[260px] overflow-hidden border border-[#b7ff31]/70 bg-black/55"><Image src={assetPath("/assets/soldier-profile-reference.png")} alt="김철수 상병 프로필" fill priority className="object-contain object-bottom" /><span className="absolute bottom-3 left-0 right-0 text-center font-mono text-xl font-black text-[#b7ff31]">LV.23</span></div><div className="relative"><div className="flex items-center justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-3xl font-bold tracking-[-0.045em] text-white">김철수 상병</h2><span className="border border-[#54c7ff]/40 bg-[#54c7ff]/10 px-2 py-1 text-xs font-bold text-[#54c7ff]">AI 탐사대원</span></div><p className="mt-3 text-sm text-white/52">이병 / 비전공 장병 / 체력 기록 관리 시스템 진행 중</p></div><Award className="size-9 text-[#b7ff31]" /></div><div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">{[["연속 학습", "21일"], ["탐사 배지", "3"], ["완료 미션", "4/10"], ["누적 학습", "16h"]].map(([label, value]) => <div key={label} className="border border-white/10 bg-black/65 p-3"><p className="text-[11px] text-white/45">{label}</p><b className="mt-2 block text-xl text-white">{value}</b></div>)}</div><div className="mt-6 border border-white/10 bg-black/65 p-4"><div className="flex justify-between text-sm"><b className="font-mono text-lg text-white">LV.23</b><span className="text-[#b7ff31]">84%</span></div><div className="mt-3 h-2 bg-white/10"><div className="h-full w-[84%] bg-[#b7ff31]" /></div></div></div></div></Panel>
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

function RewardOverlay({ onClaim }: { onClaim: () => void }) {
  const rewards = [
    { label: "크레딧", value: "150", icon: <Sparkles size={28} /> },
    { label: "AI 도구 활용", value: "Lv.1", icon: <Award size={28} /> },
    { label: "학습 연속 기록", value: "2일째", icon: <Trophy size={28} /> },
  ];
  return <div className="fixed inset-0 z-[80] grid place-items-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-labelledby="mission-complete-title"><div aria-hidden="true" className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url('${assetPath("/assets/home-mission-map-background.png")}')` }} /><div aria-hidden="true" className="mili-reward-scan absolute inset-0" /><section className="mili-reward-modal relative w-full max-w-[840px] overflow-hidden border border-[#b7ff31]/55 bg-[#070b08]/95 px-5 py-7 shadow-[0_0_80px_rgba(183,255,49,.18)] sm:px-9 sm:py-10"><div className="mili-reward-corner mili-reward-corner-tl" /><div className="mili-reward-corner mili-reward-corner-tr" /><div className="mili-reward-corner mili-reward-corner-bl" /><div className="mili-reward-corner mili-reward-corner-br" /><div className="relative text-center"><div className="mili-report-label"><span /> 임무 보고 <span /></div><div className="mili-complete-stage mt-10 px-4 py-9 sm:py-12"><p className="text-xs font-bold tracking-[0.24em] text-[#b7ff31]">VOD 학습 완료</p><h2 id="mission-complete-title" className="mili-mission-complete mt-3 text-4xl font-black tracking-[-0.055em] text-white sm:text-6xl">Mission Complete</h2><p className="mt-4 text-base font-medium text-white/80 sm:text-xl">작전 목표를 달성했습니다.</p></div><div className="mt-8 grid gap-3 md:grid-cols-3">{rewards.map((reward, index) => <article key={reward.label} className="mili-reward-item border border-[#b7ff31]/25 bg-[#101610]/80 p-4 text-left" style={{ animationDelay: `${.35 + index * .12}s` }}><span className="grid size-12 place-items-center border border-[#b7ff31] bg-[#b7ff31]/10 text-[#b7ff31]">{reward.icon}</span><p className="mt-4 text-sm font-bold text-[#b7ff31]">{reward.label}</p><b className="mt-1 block text-2xl text-white">{reward.value}</b></article>)}</div><ActionButton fullWidth onClick={onClaim}><Gift size={17} /> 보상 수령하기</ActionButton><p className="mt-3 text-xs text-white/45">보상은 학습 기록에 즉시 반영됩니다.</p></div></section></div>;
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
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><Panel className="overflow-hidden"><div className="relative flex min-h-[410px] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,#294521,#050806_70%)] p-6"><div aria-hidden="true" className={`absolute inset-0 opacity-30 ${playing ? "animate-pulse" : ""}`} style={{ backgroundImage: "linear-gradient(90deg, transparent 49%, rgba(183,255,49,.12) 50%, transparent 51%), linear-gradient(transparent 49%, rgba(183,255,49,.1) 50%, transparent 51%)", backgroundSize: "42px 42px" }} /><div className="relative text-center"><span className={`mx-auto grid size-20 place-items-center rounded-full border-2 ${completed ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-[#b7ff31] bg-black/45 text-[#b7ff31]"}`}>{completed ? <Check size={32} /> : <Play size={30} fill="currentColor" />}</span><p className="mt-5 text-sm text-white/50">02 / 원하는 답을 얻는 프롬프트 설계</p><h2 className="mt-2 text-2xl font-bold text-white">{completed ? "이번 영상을 완료했습니다." : playing ? "AI 교관의 설명을 재생하고 있습니다." : "학습 영상을 재생할 준비가 되었습니다."}</h2><p className="mt-3 text-sm text-white/55">{completed ? "수료 보상이 자동으로 준비되었습니다." : "재생 버튼을 누르면 영상 진행도가 올라갑니다."}</p></div></div><div className="border-t border-white/10 p-4"><div className="flex flex-wrap items-center gap-3"><button onClick={() => setPlaying(value => !value)} disabled={completed} className="grid size-11 place-items-center border border-[#b7ff31] bg-[#b7ff31] text-black disabled:opacity-45" aria-label={playing ? "일시 정지" : "영상 재생"}>{playing ? <span className="flex gap-1"><i className="h-4 w-1 bg-black" /><i className="h-4 w-1 bg-black" /></span> : <Play size={18} fill="currentColor" />}</button><span className="text-sm text-white/70">{time(seconds)} / 18:00</span><div className="h-1.5 min-w-32 flex-1 bg-white/10"><i className="block h-full bg-[#b7ff31] transition-[width] duration-300" style={{ width: `${progress}%` }} /></div><button onClick={() => setSeconds(duration)} className="text-sm font-bold text-white/55 hover:text-[#b7ff31]">학습 완료 처리</button><button onClick={() => setIdeOpen(true)} className="text-sm font-bold text-[#b7ff31]">Python / SQL 실습 열기 <Code2 className="inline size-4" /></button></div>{completed && rewardClaimed && <div className="mt-4 border border-[#4ed58a]/45 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">보상 수령이 완료되었습니다 / 크레딧 +150 / 프롬프트 실전 뱃지 획득</div>}</div></Panel>
      <Panel className="p-5"><div className="flex gap-2 border-b border-white/10 pb-3">{["목차", "노트", "답벗"].map(item => <button key={item} onClick={() => setTab(item)} className={`px-3 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div>{tab === "목차" && <div className="mt-4 space-y-2">{["AI가 이해하는 업무 맥락", "원하는 답을 얻는 프롬프트 설계", "결과 검증과 개선 실습"].map((item, index) => <button key={item} className={`flex w-full gap-3 border p-3 text-left text-sm ${index === 1 ? "border-[#b7ff31]/50 bg-[#b7ff31]/10 text-white" : "border-white/10 text-white/60"}`}><span className="text-[#b7ff31]">0{index + 1}</span>{item}</button>)}</div>}{tab === "노트" && <div className="mt-4"><textarea value={note} onChange={event => setNote(event.target.value)} className="min-h-48 w-full border border-white/10 bg-black/30 p-3 text-sm text-white outline-none focus:border-[#b7ff31]" placeholder="학습 내용을 기록하세요" /><p className="mt-3 text-xs text-white/45">노트는 이 학습 화면에서만 임시로 보관됩니다.</p></div>}{tab === "답벗" && <div className="mt-4"><p className="border border-[#54c7ff]/30 bg-[#54c7ff]/10 p-3 text-sm leading-6 text-white/75">답벗입니다. 지금 재생 중인 프롬프트 구조 설계 내용을 바탕으로 질문에 답할게요.</p><button onClick={() => setSent(true)} className="mt-3 w-full border border-white/10 p-3 text-left text-sm text-white/55">프롬프트를 더 구체적으로 만드는 방법은? <ArrowRight className="float-right size-4 text-[#b7ff31]" /></button>{sent && <p className="mt-3 text-sm text-[#b7ff31]">예시 요청, 조건, 출력 형식을 차례로 적어 보세요.</p>}</div>}</Panel></div>
    {ideOpen && <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5"><Panel className="w-full max-w-3xl p-5"><div className="flex justify-between"><div><p className="text-xs font-bold text-[#b7ff31]">실습 도구</p><h2 className="mt-2 text-xl font-bold text-white">Python / SQL IDE</h2></div><button onClick={() => setIdeOpen(false)} aria-label="실습 도구 닫기"><X /></button></div><pre className="mt-5 min-h-56 overflow-auto bg-black p-4 text-sm text-[#b7ff31]">{`prompt = "부대 일일 현황을 3줄로 요약해줘"\nprint(prompt)`}</pre><div className="mt-4 flex justify-end"><ActionButton onClick={() => setIdeOpen(false)}>실습 저장</ActionButton></div></Panel></div>}
    {showReward && <RewardOverlay onClaim={() => setRewardClaimed(true)} />}
  </>;
}

function LearningPlayerWorkspace() {
  const [tab, setTab] = useState("목차");
  const [note, setNote] = useState("");
  const [answer, setAnswer] = useState("");
  const [ran, setRan] = useState(false);
  const [seconds, setSeconds] = useState(872);
  const [playing, setPlaying] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const duration = 1080;
  const completed = seconds >= duration;
  const progress = Math.round((seconds / duration) * 100);
  useEffect(() => { if (!playing || completed) return; const timer = window.setInterval(() => setSeconds(value => Math.min(duration, value + 6)), 300); return () => window.clearInterval(timer); }, [playing, completed]);
  const time = (value: number) => `${Math.floor(value / 60).toString().padStart(2, "0")}:${(value % 60).toString().padStart(2, "0")}`;
  return <><PageHeading eyebrow="VOD 학습기" title="생성 AI 업무 활용 기초" copy="영상 시청, 실습, 학습 기록을 한 화면에서 연결합니다." aside={<span className="border border-[#4ed58a]/35 bg-[#4ed58a]/10 px-3 py-2 text-sm font-bold text-[#4ed58a]">수강 중 / {progress}%</span>} />
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.08fr)_minmax(340px,.82fr)_300px]">
      <Panel className="overflow-hidden"><div className="relative grid min-h-[520px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_center,#294521,#050806_72%)] p-6"><div aria-hidden="true" className={`absolute inset-0 opacity-30 ${playing ? "animate-pulse" : ""}`} style={{ backgroundImage: "linear-gradient(90deg,transparent 49%,rgba(183,255,49,.12) 50%,transparent 51%),linear-gradient(transparent 49%,rgba(183,255,49,.1) 50%,transparent 51%)", backgroundSize: "42px 42px" }} /><div className="relative text-center"><span className={`mx-auto grid size-20 place-items-center border-2 ${completed ? "border-[#b7ff31] bg-[#b7ff31] text-black" : "border-[#b7ff31] bg-black/45 text-[#b7ff31]"}`}>{completed ? <Check size={32} /> : <Play size={30} fill="currentColor" />}</span><p className="mt-5 text-sm text-white/50">02 / 원하는 답을 얻는 프롬프트 설계</p><h2 className="mt-2 text-2xl font-bold text-white">{completed ? "이번 영상을 완료했습니다." : playing ? "AI 교관의 설명을 재생하고 있습니다." : "학습 영상을 재생할 준비가 되었습니다."}</h2></div></div><div className="border-t border-white/10 p-4"><div className="flex items-center gap-3"><button onClick={() => setPlaying(value => !value)} disabled={completed} className="grid size-11 place-items-center border border-[#b7ff31] bg-[#b7ff31] text-black" aria-label={playing ? "일시 정지" : "영상 재생"}>{playing ? "Ⅱ" : <Play size={18} fill="currentColor" />}</button><span className="text-sm text-white/70">{time(seconds)} / 18:00</span><div className="h-1.5 flex-1 bg-white/10"><i className="block h-full bg-[#b7ff31]" style={{ width: `${progress}%` }} /></div><button onClick={() => setSeconds(duration)} className="text-xs font-bold text-white/60 hover:text-[#b7ff31]">학습 완료 처리</button></div></div></Panel>
      <Panel className="flex min-h-[600px] flex-col p-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-xs font-bold text-[#b7ff31]">실습 공간</p><h2 className="mt-1 text-lg font-bold text-white">프롬프트 결과 보기</h2></div><span className="border border-[#b7ff31]/30 px-2 py-1 text-xs font-bold text-[#b7ff31]">Python</span></div><label className="mt-5 text-sm font-bold text-white">실습 코드</label><textarea className="mt-3 min-h-52 w-full bg-black/55 p-4 font-mono text-sm leading-7 text-[#b7ff31] outline-none" defaultValue={'prompt = "부대 일일 현황을 3줄로 요약해줘"\nprint(prompt)'} /><label className="mt-4 text-sm font-bold text-white">입력값</label><textarea value={answer} onChange={event => setAnswer(event.target.value)} className="mt-3 min-h-20 w-full border border-white/10 bg-black/35 p-3 text-sm text-white outline-none" placeholder="예: 경계 근무 3명 / 장비 점검 완료" /><ActionButton fullWidth onClick={() => setRan(true)}><Play size={16} /> 실행하기</ActionButton><div className="mt-4 min-h-28 border border-white/10 bg-black/50 p-4"><p className="text-xs text-white/45">실행 결과</p><p className="mt-3 text-sm leading-6 text-white/80">{ran ? "1. 경계 근무 인원 3명 정상 배치\n2. 장비 점검 완료\n3. 이상 사항 없음" : "실행을 누르면 결과가 이곳에 표시됩니다."}</p></div></Panel>
      <Panel className="p-4"><div className="flex gap-1 border-b border-white/10 pb-3">{["목차", "노트", "답벗"].map(item => <button key={item} onClick={() => setTab(item)} className={`flex-1 px-2 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div>{tab === "목차" && <div className="mt-4 space-y-2">{["AI가 이해하는 업무 맥락", "원하는 답을 얻는 프롬프트 설계", "결과 검증과 개선 실습"].map((item, index) => <button key={item} className={`w-full border p-3 text-left text-sm ${index === 1 ? "border-[#b7ff31]/55 bg-[#b7ff31]/10 text-white" : "border-white/10 text-white/60"}`}><b className="mr-2 text-[#b7ff31]">0{index + 1}</b>{item}</button>)}</div>}{tab === "노트" && <div className="mt-4"><textarea value={note} onChange={event => setNote(event.target.value)} className="min-h-72 w-full border border-white/10 bg-black/30 p-3 text-sm text-white outline-none" placeholder="학습 내용을 기록하세요" /><p className="mt-3 text-xs text-white/45">노트는 이 학습 화면에서 임시로 보관됩니다.</p></div>}{tab === "답벗" && <div className="mt-4"><p className="border border-[#54c7ff]/30 bg-[#54c7ff]/10 p-3 text-sm leading-6 text-white/80">답벗입니다. 현재 영상과 실습 코드를 바탕으로 도와드릴게요.</p><button onClick={() => setAnswer("조건, 출력 형식, 예시를 순서대로 포함해 요청해 보세요.")} className="mt-3 w-full border border-white/10 p-3 text-left text-sm text-white/65">프롬프트를 더 구체적으로 만드는 방법은? <ArrowRight className="float-right size-4 text-[#b7ff31]" /></button></div>}</Panel>
    </div>{completed && rewardClaimed && <div className="mt-4 border border-[#4ed58a]/45 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">보상 수령이 완료되었습니다 / 크레딧 +150 / 프롬프트 실전 뱃지 획득</div>}{completed && !rewardClaimed && <RewardOverlay onClaim={() => setRewardClaimed(true)} />}</>;
}

function ProjectDetailView() {
  const [enrolled, setEnrolled] = useState(false);
  return <><PageHeading eyebrow="PBL 프로젝트" title="체력 기록 관리 시스템" copy="장병의 체력 기록을 더 빠르게 확인할 수 있는 업무 도구를 팀과 함께 설계합니다." aside={enrolled ? <Link href="/projects/체력-기록-관리-시스템/mission"><ActionButton>학습맵 보기 <ArrowRight size={16} /></ActionButton></Link> : <ActionButton onClick={() => setEnrolled(true)}>수강 신청하기 <ArrowRight size={16} /></ActionButton>} />
    {enrolled && <div className="mb-5 border border-[#4ed58a]/40 bg-[#4ed58a]/10 p-4 text-sm font-bold text-[#4ed58a]">수강 신청이 완료되었습니다. 학습맵의 첫 미션으로 이동할 수 있습니다.</div>}<div className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]"><Panel className="p-6"><p className="text-xs font-bold text-[#b7ff31]">학습맵</p><div className="mt-6 grid gap-3 sm:grid-cols-4">{["문제 이해", "데이터 설계", "화면 구현", "제출 / 피드백"].map((step, index) => <Link key={step} href={index === 0 ? "/projects/체력-기록-관리-시스템/mission" : "/projects/체력-기록-관리-시스템"} className={`min-h-32 border p-4 text-left ${index === 0 ? "border-[#b7ff31] bg-[#b7ff31]/10" : "border-white/10 bg-black/20"}`}><span className="text-xs text-[#b7ff31]">0{index + 1}</span><b className="mt-5 block text-sm text-white">{step}</b></Link>)}</div><div className="mt-6 border border-white/10 bg-black/25 p-4"><p className="text-xs text-white/45">첫 미션</p><h2 className="mt-2 text-lg font-bold text-white">여러 기록 목록 관리하기</h2><p className="mt-2 text-sm text-white/55">현장 사용자가 빠르게 찾을 수 있는 기록 목록의 기준을 정리합니다.</p><Link href="/projects/체력-기록-관리-시스템/mission"><ActionButton>미션 시작하기 <ArrowRight size={16} /></ActionButton></Link></div></Panel><Panel className="p-6"><p className="text-xs font-bold text-[#54c7ff]">프로젝트 정보</p><dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/50">기간</dt><dd className="font-bold text-white">4주</dd></div><div className="flex justify-between border-b border-white/10 pb-3"><dt className="text-white/50">유형</dt><dd className="font-bold text-white">PBL / 팀 프로젝트</dd></div><div className="flex justify-between"><dt className="text-white/50">모집 상태</dt><dd className="font-bold text-[#b7ff31]">모집 중</dd></div></dl></Panel></div></>;
}

function MissionView() {
  const [submitted, setSubmitted] = useState(false);
  return <><PageHeading eyebrow="프로젝트 미션" title="여러 기록 목록 관리하기" copy="문제 요구사항을 확인하고, 해결 방향을 작성해 제출하세요." aside={<span className="text-sm font-bold text-[#b7ff31]">학습맵 1 / 4</span>} /><Panel className="p-6 md:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_.85fr]"><div><h2 className="text-xl font-bold text-white">문제</h2><p className="mt-4 text-sm leading-7 text-white/60">장병의 체력 기록이 날짜별로 흩어져 있어 현황을 빠르게 확인하기 어렵습니다. 날짜, 종목, 결과, 특이사항을 한 화면에서 볼 수 있는 목록 구조를 설계하세요.</p><h2 className="mt-8 text-xl font-bold text-white">제출 기준</h2><ul className="mt-4 space-y-3 text-sm text-white/60">{["사용자와 문제 상황 정의", "목록에 필요한 핵심 정보", "검색 또는 정렬 기준"].map(item => <li key={item} className="flex gap-2"><ShieldCheck className="size-5 text-[#b7ff31]" />{item}</li>)}</ul></div><div className="border border-white/10 bg-black/30 p-5"><label className="text-sm font-bold text-white">해결 방향</label><textarea className="mt-3 min-h-44 w-full border border-white/10 bg-black p-3 text-sm text-white outline-none focus:border-[#b7ff31]" placeholder="문제 해결 방향을 작성하세요" /><ActionButton fullWidth onClick={() => setSubmitted(true)}>미션 제출하기 <FileCheck2 size={16} /></ActionButton>{submitted && <p className="mt-4 text-sm text-[#4ed58a]">제출되었습니다. 교관 피드백을 기다리는 중입니다.</p>}</div></div></Panel></>;
}

function LearningView({ openCourse, goTo }: { openCourse: (title: string) => void; goTo: (page: PageKey) => void }) {
  const [tab, setTab] = useState("VOD 강의");
  const items = tab === "VOD 강의" ? [{ title: "생성 AI 업무 활용 기초", progress: "64%", action: () => openCourse("생성 AI 업무 활용 기초") }, { title: "보안 AI 활용 수칙", progress: "22%", action: () => openCourse("보안 AI 활용 수칙") }] : [{ title: "체력 기록 관리 시스템", progress: "38%", action: () => goTo("projects") }, { title: "작전 보고서 요약 프롬프트 작성", progress: "준비 중", action: () => goTo("projects") }];
  return <><PageHeading eyebrow="내 학습" title="학습을 이어가세요" copy="수강 중인 VOD 강의와 PBL 프로젝트를 한 곳에서 관리합니다." /><Panel className="p-5 md:p-7"><div className="flex gap-2 border-b border-white/10 pb-4">{["VOD 강의", "PBL 프로젝트"].map(item => <button key={item} onClick={() => setTab(item)} className={`px-4 py-2 text-sm font-bold ${tab === item ? "bg-[#b7ff31] text-black" : "text-white/55"}`}>{item}</button>)}</div><div className="mt-5 grid gap-4 lg:grid-cols-2">{items.map(item => <button key={item.title} onClick={item.action} className="border border-white/10 bg-black/25 p-5 text-left hover:border-[#b7ff31]/50"><div className="flex justify-between"><span className="text-xs text-white/45">{tab}</span><b className="text-[#b7ff31]">{item.progress}</b></div><h2 className="mt-3 text-lg font-bold text-white">{item.title}</h2><div className="mt-5 h-1.5 bg-white/10"><i className="block h-full w-[64%] bg-[#b7ff31]" /></div><span className="mt-4 block text-sm font-bold text-[#b7ff31]">이어서 학습하기 <ArrowRight className="inline size-4" /></span></button>)}</div></Panel></>;
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
  if (pathname.endsWith("/write")) return <><PageHeading eyebrow="쇼케이스" title="프로젝트 전시 글쓰기" copy="성과와 배운 점을 동료에게 공유하세요." /><Panel className="p-6"><input className="w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="전시 제목" /><textarea className="mt-4 min-h-52 w-full border border-white/10 bg-black/30 p-3 text-white outline-none focus:border-[#b7ff31]" placeholder="프로젝트의 문제, 해결 과정, 배운 점을 작성하세요" /><ActionButton onClick={() => setSaved(true)}>전시 글 등록</ActionButton>{saved && <p className="mt-4 text-sm text-[#4ed58a]">전시 글이 등록되었습니다.</p>}</Panel></>;
  const projects = [
    { title: "작전 보고서 요약 프롬프트", slug: "report-prompt", type: "생성 AI", team: "제3학습분대" },
    { title: "체력 기록 관리 시스템", slug: "fitness-record", type: "PBL", team: "체력 데이터 1팀" },
    { title: "보급 현황 데이터 시각화", slug: "supply-visual", type: "데이터 분석", team: "보급 혁신팀" },
  ];
  const selected = projects.find(project => pathname.endsWith(project.slug));
  if (selected) return <><div className="mb-6 text-sm text-white/50"><Link href="/showcase" className="hover:text-[#b7ff31]">쇼케이스</Link> <ChevronRight className="inline size-4" /> <b className="text-white">{selected.title}</b></div><PageHeading eyebrow="쇼케이스 / 프로젝트 결과물" title={selected.title} copy="현장의 반복 업무를 줄이기 위해 팀이 설계하고 완성한 결과물입니다." /><div className="grid gap-5 xl:grid-cols-[minmax(0,1.25fr)_360px]"><Panel className="overflow-hidden p-0"><div className="relative min-h-[380px] overflow-hidden bg-[linear-gradient(135deg,#101f14,#050806_62%)] p-7 md:p-10"><div aria-hidden="true" className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(90deg,rgba(183,255,49,.18)_1px,transparent_1px),linear-gradient(rgba(183,255,49,.13)_1px,transparent_1px)", backgroundSize: "44px 44px" }} /><div className="relative"><span className="border border-[#b7ff31]/45 bg-[#b7ff31]/10 px-3 py-2 text-xs font-bold text-[#b7ff31]">{selected.type} 결과물</span><h2 className="mt-7 max-w-xl text-3xl font-bold tracking-[-0.05em] text-white md:text-4xl">현장 기록을<br />한눈에 읽는 작전 화면</h2><p className="mt-4 max-w-lg text-sm leading-6 text-white/62">날짜별 기록, 상태 요약, 주의 항목을 한 화면에 배치해 지휘관과 장병이 같은 정보를 빠르게 확인하도록 만들었습니다.</p></div><div className="absolute bottom-7 left-7 right-7 grid gap-3 sm:grid-cols-3"><div className="border border-[#b7ff31]/30 bg-black/55 p-4"><p className="text-xs text-white/45">기록 처리</p><b className="mt-2 block text-2xl text-[#b7ff31]">-42%</b></div><div className="border border-white/10 bg-black/55 p-4"><p className="text-xs text-white/45">사용 화면</p><b className="mt-2 block text-2xl text-white">3개</b></div><div className="border border-white/10 bg-black/55 p-4"><p className="text-xs text-white/45">검증 완료</p><b className="mt-2 block text-2xl text-white">12건</b></div></div></div><div className="grid gap-px bg-white/10 sm:grid-cols-3"><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">문제</p><p className="mt-2 text-sm font-bold text-white">기록이 흩어져 확인이 느림</p></div><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">해결</p><p className="mt-2 text-sm font-bold text-white">핵심 정보를 한 화면으로 통합</p></div><div className="bg-[#0b110d] p-5"><p className="text-xs text-white/45">배운 점</p><p className="mt-2 text-sm font-bold text-white">현장 업무 기준의 화면 설계</p></div></div></Panel><Panel className="p-6"><p className="text-xs font-bold text-[#b7ff31]">함께 만든 팀</p><h2 className="mt-2 text-xl font-bold text-white">{selected.team}</h2><div className="mt-6 space-y-4">{[["김철수 상병", "문제 정의 / 화면 흐름"], ["박민수 일병", "데이터 구조 / 검증"], ["이수진 하사", "사용성 검토 / 피드백"]].map(([name, role]) => <div key={name} className="flex gap-3 border-b border-white/10 pb-4"><span className="grid size-9 place-items-center bg-[#b7ff31]/10 text-xs font-black text-[#b7ff31]">{name.slice(0, 1)}</span><div><b className="block text-sm text-white">{name}</b><small className="mt-1 block text-xs text-white/48">{role}</small></div></div>)}</div><Link href="/team-projects" className="mt-6 inline-block text-sm font-bold text-[#b7ff31]">팀 프로젝트 보기 <ArrowRight className="inline size-4" /></Link></Panel></div></>;
  return <><PageHeading eyebrow="쇼케이스" title="프로젝트 전시" copy="동료 장병이 완성한 AI 활용 결과물과 배운 점을 살펴보세요." aside={<Link href="/showcase/write"><ActionButton>전시 글쓰기 <FileText size={16} /></ActionButton></Link>} /><div className="grid gap-5 md:grid-cols-3">{projects.map((project, index) => <Link href={`/showcase/${project.slug}`} key={project.title} className="mili-frame mili-hover-target border border-white/10 bg-[#0b110d] p-6"><span className="text-xs font-bold text-[#b7ff31]">프로젝트 {index + 1} / {project.type}</span><h2 className="mt-3 text-lg font-bold text-white">{project.title}</h2><p className="mt-3 text-sm text-white/55">{project.team}이 현장의 반복 업무를 줄이기 위해 설계한 결과물입니다.</p><span className="mt-6 block text-sm font-bold text-[#b7ff31]">프로젝트 자세히 보기 <ChevronRight className="inline size-4" /></span></Link>)}</div></>;
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

function MyHubView({ pathname, goTo, openCourse }: { pathname: string; goTo: (page: PageKey) => void; openCourse: (title: string) => void }) {
  const last = pathname.split("/").filter(Boolean).at(-1) || "";
  if (last === "learning") return <LearningView openCourse={openCourse} goTo={goTo} />;
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
  if (last && last !== "my" && sections[last]) return <><PageHeading eyebrow="마이페이지" title={sections[last].title} copy={sections[last].copy} /><Panel className="p-6">{last === "wishlist" ? <div className="space-y-3">{["AI 결과 검증과 개선", "데이터 시각화의 첫걸음"].map(title => <button key={title} onClick={() => openCourse(title)} className="flex w-full justify-between border border-white/10 p-4 text-left text-sm font-bold text-white"><span>{title}</span><ChevronRight className="text-[#b7ff31]" /></button>)}</div> : last === "level-test" ? <DiagnosisView goTo={goTo} /> : last === "certificates" ? <EmptyState title="발급 가능한 수료증이 없습니다" copy="필수 강의를 완료하면 이곳에서 수료증을 발급할 수 있습니다." /> : last === "withdraw" ? <div><p className="text-sm leading-6 text-white/60">탈퇴하면 학습 기록과 진행 중인 프로젝트에 접근할 수 없습니다.</p><ActionButton subtle>탈퇴 절차 확인</ActionButton></div> : <div className="grid gap-4 md:grid-cols-2">{["학습 목표를 설정하세요", "알림을 최신 상태로 유지하세요"].map(item => <div key={item} className="border border-white/10 bg-black/25 p-5 text-sm text-white/70">{item}</div>)}</div>}</Panel></>;
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
  if (pathname === "/legacy-learning-player") return <LearningPlayerView />;
  if (pathname === "/") return <HomeView goTo={goTo} isLightMode={isLightMode} />;
  if (pathname === "/courses") return <VodView openCourse={openCourse} />;
  if (pathname.endsWith("/learn") && pathname.startsWith("/courses/")) return <LearningPlayerWorkspace />;
  if (pathname.startsWith("/courses/")) return <VodDetailView title="생성 AI 업무 활용 기초" backToList={() => goTo("courses")} />;
  if (pathname === "/projects") return <ProjectView openProject={openProject} />;
  if (decodeURIComponent(pathname) === "/projects/동료-평가") return <PeerReviewView />;
  if (pathname.endsWith("/mission") && pathname.startsWith("/projects/")) return <MissionView />;
  if (pathname.startsWith("/projects/")) return <ProjectDetailView />;
  if (pathname.startsWith("/learning")) return <LearningView openCourse={openCourse} goTo={goTo} />;
  if (pathname.startsWith("/classrooms")) return <ClassroomView pathname={pathname} />;
  if (pathname.startsWith("/ranking")) return <RankingView />;
  if (pathname.startsWith("/showcase")) return <ShowcaseView pathname={pathname} />;
  if (pathname.startsWith("/team-projects")) return <TeamProjectView />;
  if (pathname === "/community/write") return <CommunityWriteView />;
  if (pathname.startsWith("/community")) return <CommunityView />;
  if (pathname.startsWith("/search")) return <SearchView pathname={pathname} />;
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
  const [isLightMode, setIsLightMode] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("mili-theme") === "light");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  useEffect(() => { window.localStorage.setItem("mili-theme", isLightMode ? "light" : "dark"); }, [isLightMode]);
  const goTo = (page: PageKey) => { router.push(pagePaths[page]); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openCourse = (title: string) => { router.push(`/courses/${slugify(title)}`); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openProject = (title: string) => { router.push(`/projects/${slugify(title)}`); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const activeItem = navigation.find((item) => item.key === activePage);
  const pageContent = <RouteContent pathname={pathname} goTo={goTo} openCourse={openCourse} openProject={openProject} isLightMode={isLightMode} />;
  const isImmersive = !isLightMode;
  const backgroundAsset = assetPath("/assets/home-command-map-background.png");
  const lightBackgroundAsset = assetPath("/assets/home-command-map-background-light.png");
  return <main className={`${activePage === "home" ? "h-screen overflow-hidden" : "min-h-screen"} ${isImmersive ? "mili-dark text-white" : "mili-light text-slate-900"}`}>
    {isImmersive && activePage === "home" && <><div className="fixed inset-0 z-0 bg-cover bg-center opacity-100" style={{ backgroundImage: `url(${backgroundAsset})` }} /><div className="fixed inset-0 z-0 bg-black/20" /></>}
    {isImmersive && activePage !== "home" && <div className="fixed inset-0 z-0 bg-black" />}
    {!isImmersive && <div className={`fixed inset-0 z-0 bg-[#F7F7F7] ${activePage === "home" ? "bg-cover bg-center" : ""}`} style={activePage === "home" ? { backgroundImage: `url(${lightBackgroundAsset})` } : undefined} />}
    <aside className={`mili-frame fixed inset-y-3 left-3 z-30 hidden w-[238px] flex-col rounded-[28px] border p-4 shadow-xl backdrop-blur-xl lg:flex ${isImmersive ? "border-white/[0.14] bg-[#090e0a]/82" : "border-slate-200/80 bg-white/72"}`}>
      <button onClick={() => goTo("home")} className="flex h-20 items-center px-1 text-left"><Image src={assetPath("/assets/mili-logo.png")} alt="MiliAI" width={136} height={50} priority className="h-auto w-[136px] object-contain" /></button>
      <nav className="mt-5 space-y-1" aria-label="학습 서비스 메뉴">{navigation.map((item) => { const Icon = item.icon; return <button type="button" key={item.key} onClick={() => goTo(item.key)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${activePage === item.key ? "border border-[#b7ff31]/55 bg-[#b7ff31]/10 text-[#b7ff31]" : "border border-transparent text-white/63 hover:bg-white/[0.06] hover:text-white"}`}><Icon size={18} strokeWidth={1.8} />{item.label}</button>; })}</nav>
      <div className="mili-frame mt-auto rounded-2xl border border-white/10 bg-white/[0.07] p-4"><div className="flex items-center gap-2 text-sm font-bold text-[#b7ff31]"><Sparkles size={16} /> AI 교관</div><p className="mt-2 text-xs leading-5 text-white/55">학습 중 막히는 부분이 있다면 언제든 AI 교관에게 질문하세요.</p><button onClick={() => setIsTutorOpen(true)} className={`mili-control mt-4 w-full rounded-xl px-3 py-2.5 text-xs font-bold ${isImmersive ? "bg-[#b7ff31] text-black hover:bg-[#c8ff4a]" : "border border-[#b7ff31]/45 bg-[#eef8d8] text-[#345006] hover:bg-[#e3f5c4]"}`}>질문 시작하기</button></div>
    </aside>

    <header className={`sticky top-0 z-20 border-b px-5 py-3 backdrop-blur lg:ml-[262px] lg:px-8 ${isImmersive ? "border-white/10 bg-[#050806]/72" : "border-slate-200 bg-white/72"}`}><div className="mx-auto flex max-w-[1460px] items-center justify-between gap-3"><button type="button" onClick={() => setMobileOpen(true)} className="grid size-11 place-items-center rounded-xl border border-current/15 lg:hidden" aria-label="메뉴 열기"><Menu size={20} /></button><div className="hidden items-center gap-2 text-sm opacity-60 sm:flex"><Compass className="size-4 text-[#78a921]" /><span>학습 베이스</span><ChevronRight className="size-4" /><b className="font-semibold opacity-100">{activeItem?.label}</b></div><div className="ml-auto flex items-center gap-2"><button type="button" onClick={() => goTo("search")} className="grid size-10 place-items-center rounded-xl border border-current/15 opacity-75 hover:opacity-100" aria-label="통합검색"><Search size={18} /></button><button type="button" className="relative grid size-10 place-items-center rounded-xl border border-current/15 opacity-75" aria-label="알림"><Bell size={18} /><i className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#b7ff31]" /></button><button type="button" onClick={() => goTo("my")} className="mili-control flex items-center gap-2 rounded-xl border border-current/15 bg-white/10 px-2.5 py-1.5 text-left"><Image src={assetPath("/assets/soldier-profile-reference.png")} alt="" width={30} height={30} className="size-8 object-contain object-bottom" /><span className="hidden pr-1 text-xs font-bold sm:inline">김철수 상병</span></button></div></div></header>

    <button type="button" onClick={() => setIsLightMode(value => !value)} className="fixed right-[276px] top-[17px] z-30 hidden size-10 place-items-center border border-current/15 bg-black/10 sm:grid" aria-label={isLightMode ? "다크 모드로 전환" : "라이트 모드로 전환"} title={isLightMode ? "다크 모드" : "라이트 모드"}>{isLightMode ? <Moon size={17} /> : <Sun size={17} />}</button>

    {mobileOpen && <div className="fixed inset-0 z-50 bg-black/70 lg:hidden"><aside className="h-full w-[280px] border-r border-white/10 bg-[#090e0a] p-4 shadow-2xl"><div className="flex items-center justify-between px-2 py-4"><Image src={assetPath("/assets/mili-logo.png")} alt="MiliAI" width={120} height={44} className="h-auto w-[120px]" /><button onClick={() => setMobileOpen(false)} aria-label="메뉴 닫기"><X /></button></div><nav className="mt-5 space-y-1">{navigation.map(item => { const Icon = item.icon; return <button key={item.key} onClick={() => goTo(item.key)} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-bold ${activePage === item.key ? "bg-[#b7ff31] text-black" : "text-white/65"}`}><Icon size={18} />{item.label}</button>})}</nav></aside></div>}
    <div className="relative z-10 mx-auto max-w-[1460px] px-5 py-7 lg:ml-[262px] lg:px-8 lg:py-10">{pageContent}</div>
    {isTutorOpen && <TutorChatDialog onClose={() => setIsTutorOpen(false)} />}
    {selectedItem && <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-5" role="dialog" aria-modal="true" aria-label="학습 상세"><Panel className="w-full max-w-lg p-6 shadow-2xl"><div className="flex items-start justify-between gap-5"><div><p className="text-xs font-bold tracking-[0.16em] text-[#b7ff31]">학습 상세</p><h2 className="mt-3 text-2xl font-bold leading-8 text-white">{selectedItem}</h2></div><button aria-label="닫기" onClick={() => setSelectedItem(null)} className="text-white/60 hover:text-white"><X /></button></div><p className="mt-5 text-sm leading-6 text-white/58">학습 목표, 진행 현황, 자료와 퀴즈를 한 화면에서 이어갈 수 있는 상세 학습 공간입니다.</p><div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs"><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">영상<br /><b className="mt-1 block text-white">18분</b></span><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">실습<br /><b className="mt-1 block text-white">1개</b></span><span className="rounded-xl bg-white/[0.06] p-3 text-white/60">퀴즈<br /><b className="mt-1 block text-white">3문항</b></span></div><div className="mt-6 flex gap-3"><ActionButton onClick={() => { setSelectedItem(null); goTo(selectedItem.includes("프로젝트") || selectedItem === "동료 평가" ? "projects" : "courses"); }}><Play size={16} /> 시작하기</ActionButton><ActionButton subtle onClick={() => setSelectedItem(null)}>나중에 보기</ActionButton></div></Panel></div>}
  </main>;
}
