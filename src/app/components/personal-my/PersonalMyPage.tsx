"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  ClipboardList,
  FolderKanban,
  GraduationCap,
  Medal,
  Settings,
} from "lucide-react";

type PersonalMyPageProps = {
  isLightMode: boolean;
  onGoTo: (page: "courses" | "projects" | "diagnosis") => void;
};

const shortcuts = [
  { label: "내 학습", icon: BookOpen, href: "/my/learning" },
  { label: "보관함", icon: FolderKanban, href: "/my/wishlist" },
  { label: "수료증 (0)", icon: GraduationCap, href: "/my/certificates" },
  { label: "크레딧", icon: Medal, href: "/my/credits" },
  { label: "팀 프로젝트", icon: FolderKanban, href: "/projects" },
  { label: "작성한 글 (0)", icon: ClipboardList, href: "/my/posts" },
  { label: "알림", icon: Bell, href: "/my/notifications" },
  { label: "계정 설정", icon: Settings, href: "/my/settings" },
];

export default function PersonalMyPage({ isLightMode, onGoTo }: PersonalMyPageProps) {
  const text = isLightMode ? "text-[#1f2820]" : "text-white";
  const muted = isLightMode ? "text-[#737c73]" : "text-white/45";
  const surface = isLightMode ? "border-slate-200 bg-white" : "border-white/[0.08] bg-[#141515]";
  const inset = isLightMode ? "border-slate-200 bg-[#f6f8f6]" : "border-white/[0.07] bg-white/[0.025]";
  const stats = [
    ["3", "수강 중 VOD"], ["0", "완료된 VOD"], ["1", "PBL 프로젝트"],
    ["0.0%", "평균 진도율"], ["0", "수료증"], ["5", "보유 크레딧"],
  ];

  return <div className="mili-entry-page mx-auto max-w-[960px] pb-10">
    <section className={`border p-5 md:p-6 ${surface} rounded-2xl`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[#aaff19]/30 bg-black md:size-[72px]">
          <Image src="/profile-soldier.png" alt="김철수 상병 프로필" fill sizes="72px" className="object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2"><h1 className={`text-2xl font-bold tracking-[-.05em] ${text}`}>김철수 상병</h1><span className="rounded-lg border border-[#51a2ff]/25 bg-[#51a2ff]/10 px-2 py-1 text-[11px] text-[#51a2ff]">AI 탐사대원</span></div>
          <p className={`mt-1 text-xs ${muted}`}>상병 · 비전공 장병 · 체력 기록 관리 시스템 진행 중</p>
          <div className="mt-4 flex items-center gap-3"><b className={`shrink-0 text-sm ${text}`}>Lv. 23</b><div className={`h-1.5 flex-1 overflow-hidden rounded-full ${isLightMode ? "bg-slate-200" : "bg-white/10"}`}><i className="block h-full w-[84%] rounded-full bg-[#aaff19]" /></div><b className={`text-[11px] ${text}`}>84%</b></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[["#ff8904", "21", "연속 학습", "최고 기록!"], ["#fdc700", "3", "탐사 배지", "총 10개 중"], ["#aaff19", "4/10", "완료 미션", "이번 프로젝트"], ["#51a2ff", "18h", "누적 학습", "이번 달"]].map(([color, value, label, sub]) => <article key={label} className={`border p-3 ${inset} rounded-xl`}><span className="block size-2 rounded-full" style={{ backgroundColor: color }} /><b className={`mt-2 block text-xl leading-none ${text}`}>{value}</b><p className={`mt-2 text-[11px] font-semibold ${muted}`}>{label}</p><p className={`mt-0.5 text-[9px] ${muted}`}>{sub}</p></article>)}
      </div>
    </section>

    <section className="mt-5 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,#005c4b,#00875a)] text-white">
      <div className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-bold">🔔 온보딩 진단을 완료해주세요</p><p className="mt-1 text-xs text-white/70">역량 상황 진단 후 맞춤형 학습 로드맵을 추천해 드립니다.</p></div><button onClick={() => onGoTo("diagnosis")} className="shrink-0 rounded-xl border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold hover:bg-white/25">진단 시작하기 <ArrowRight className="inline size-3.5" /></button></div>
    </section>

    <section className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-6">
      {stats.map(([value, label]) => <article key={label} className={`border p-4 text-center ${surface} rounded-2xl`}><b className={`block text-2xl font-black ${text}`}>{value}</b><p className={`mt-1 text-[11px] ${muted}`}>{label}</p></article>)}
    </section>

    <section className="mt-5 grid gap-4 md:grid-cols-2">
      <article className={`border p-5 ${surface} rounded-2xl`}><div className="flex items-center justify-between"><h2 className={`text-[15px] font-bold ${text}`}>이어서 학습하기</h2><button onClick={() => onGoTo("courses")} className="text-xs font-semibold text-[#aaff19]">전체 보기 <ArrowRight className="inline size-3" /></button></div><div className={`mt-4 border p-4 ${inset} rounded-xl`}><div className="flex items-center gap-2"><span className="rounded-md bg-[#aaff19]/10 px-2 py-0.5 text-[10px] font-bold text-[#aaff19]">진행 중</span><span className={"text-[10px] " + muted}>MY PROJECT</span></div><h3 className={`mt-3 text-sm font-semibold ${text}`}>체력 기록 관리 시스템</h3><p className={`mt-1 text-[11px] ${muted}`}>3일차 · 여러 기록 목록 관리하기</p><div className="mt-4 flex justify-between text-[10px]"><span className={muted}>진행률</span><b className={text}>38%</b></div><div className={`mt-1.5 h-1.5 overflow-hidden rounded-full ${isLightMode ? "bg-slate-200" : "bg-white/10"}`}><i className="block h-full w-[38%] rounded-full bg-[#aaff19]" /></div><button onClick={() => onGoTo("projects")} className="mt-4 w-full rounded-xl border border-[#aaff19]/25 bg-[#aaff19]/10 py-2 text-xs font-bold text-[#aaff19] hover:bg-[#aaff19]/15">이어서 학습하기 <ArrowRight className="inline size-3.5" /></button></div></article>
      <article className={`border p-5 ${surface} rounded-2xl`}><div className="flex items-center justify-between"><h2 className={`text-[15px] font-bold ${text}`}>나의 역량 분석</h2><button onClick={() => onGoTo("diagnosis")} className="text-xs font-semibold text-[#aaff19]">진단하기 <ArrowRight className="inline size-3" /></button></div><div className="flex min-h-[190px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full border border-[#aaff19]/20 bg-[#aaff19]/[0.04] text-[#aaff19]"><BrainCircuit size={26} /></span><p className={`mt-4 text-[13px] ${muted}`}>진단평가를 실시하면 역량 지표가 표시됩니다.</p><button onClick={() => onGoTo("diagnosis")} className="mt-2 text-xs font-semibold text-[#aaff19]">진단평가 실시하기 <ArrowRight className="inline size-3" /></button></div></article>
    </section>

    <section className="mt-4 grid gap-4 md:grid-cols-2">
      <article className={`border p-5 ${surface} rounded-2xl`}><h2 className={`text-[15px] font-bold ${text}`}>추천 학습</h2><div className="mt-4 space-y-3">{[["업무에 바로 쓰는 Claude Design 기반 보고서 PPT 만들기", "4주 이상", "Da", "bg-[#d23eb3]"], ["생성형 AI를 통한 Google Flow 강의 보고서 만들기", "2주 이상", "Cl", "bg-[#1597df]"], ["ChatGPT와 Gemini를 이용한 보고서 시각화", "1시간", "AI", "bg-[#46a45b]"]].map(([title, duration, tag, color]) => <button onClick={() => onGoTo("courses")} key={title} className={`flex w-full items-center gap-3 border p-3 text-left ${inset} rounded-xl`}><span className={`grid size-10 shrink-0 place-items-center rounded-lg text-xs font-bold text-white ${color}`}>{tag}</span><span className="min-w-0"><b className={`block truncate text-xs ${text}`}>{title}</b><small className={`mt-1 block text-[10px] ${muted}`}>{duration}</small></span></button>)}</div></article>
      <article className={`border p-5 ${surface} rounded-2xl`}><h2 className={`text-[15px] font-bold ${text}`}>바로가기</h2><div className="mt-4 grid grid-cols-4 gap-2">{shortcuts.map(({ label, icon: Icon, href }) => <Link key={label} href={href} className={`flex min-h-[82px] flex-col items-center justify-center gap-2 border p-2 text-center hover:border-[#aaff19]/35 ${inset} rounded-xl`}><Icon className="size-[18px] text-[#aaff19]" /><span className={`text-[10px] leading-tight ${text}`}>{label}</span></Link>)}</div></article>
    </section>
  </div>;
}
