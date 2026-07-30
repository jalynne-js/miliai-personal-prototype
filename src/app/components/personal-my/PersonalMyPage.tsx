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
  onOpenLearning: () => void;
};

const shortcuts = [
  { label: "내 학습", icon: BookOpen, href: "/my/learning" },
  { label: "보관함", icon: FolderKanban, href: "/my/wishlist" },
  { label: "수료증 (4)", icon: GraduationCap, href: "/my/certificates" },
  { label: "크레딧", icon: Medal, href: "/my/credits" },
  { label: "팀 프로젝트", icon: FolderKanban, href: "/team-projects" },
  { label: "작성한 글 (0)", icon: ClipboardList, href: "/my/posts" },
  { label: "알림", icon: Bell, href: "/my/notifications" },
  { label: "계정 설정", icon: Settings, href: "/my/settings" },
];

export default function PersonalMyPage({ onGoTo, onOpenLearning }: PersonalMyPageProps) {
  const text = "text-[var(--mili-text)]";
  const muted = "text-[var(--mili-text-secondary)]";
  const surface = "border-[var(--mili-border)] bg-[var(--mili-surface)]";
  const inset = "border-[var(--mili-border)] bg-[var(--mili-surface-interactive)]";
  const stats = [
    ["10", "수강 중 VOD"], ["4", "완료된 VOD"], ["3", "PBL 프로젝트"],
    ["42.0%", "평균 진도율"], ["4", "수료증"], ["125", "보유 크레딧"],
  ];

  return <div className="mili-entry-page mx-auto max-w-[960px] pb-10">
    <section className={`border p-5 md:p-6 ${surface} rounded-2xl`}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-[var(--mili-primary-border)] bg-[var(--mili-surface-interactive)] md:size-[72px]">
          <Image src="/profile-soldier.png" alt="김철수 상병 프로필" fill sizes="72px" className="object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2"><h1 className={`text-2xl font-bold tracking-[-.05em] ${text}`}>김철수 상병</h1><span className="rounded-lg border border-[var(--mili-info)] bg-[var(--mili-info-bg)] px-2 py-1 text-[11px] text-[var(--mili-info)]">AI 탐사대원</span></div>
          <p className={`mt-1 text-xs ${muted}`}>상병 · 비전공 장병 · 체력 기록 관리 시스템 진행 중</p>
          <div className="mt-4 flex items-center gap-3"><b className={`shrink-0 text-sm ${text}`}>Lv. 23</b><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--mili-surface-interactive)]"><i className="block h-full w-[84%] rounded-full bg-[var(--mili-primary)]" /></div><b className={`text-[11px] ${text}`}>84%</b></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
        {[["var(--mili-warning)", "21", "연속 학습", "최고 기록!"], ["var(--mili-warning)", "3", "탐사 배지", "총 10개 중"], ["var(--mili-primary)", "4/10", "완료 미션", "이번 프로젝트"], ["var(--mili-info)", "18h", "누적 학습", "이번 달"]].map(([color, value, label, sub]) => <article key={label} className={`border p-3 ${inset} rounded-xl`}><span className="block size-2 rounded-full" style={{ backgroundColor: color }} /><b className={`mt-2 block text-xl leading-none ${text}`}>{value}</b><p className={`mt-2 text-[11px] font-semibold ${muted}`}>{label}</p><p className={`mt-0.5 text-[9px] ${muted}`}>{sub}</p></article>)}
      </div>
    </section>

    <section className="mt-5 overflow-hidden rounded-2xl border border-[var(--mili-primary-border)] bg-[var(--mili-primary-bg)] text-[var(--mili-text)]">
      <div className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="text-sm font-bold">🔔 온보딩 진단을 완료해주세요</p><p className="mt-1 text-xs text-[var(--mili-text-secondary)]">역량 상황 진단 후 맞춤형 학습 로드맵을 추천해 드립니다.</p></div><button onClick={() => onGoTo("diagnosis")} className="shrink-0 rounded-xl bg-[var(--mili-primary)] px-3 py-2 text-xs font-semibold text-[var(--mili-primary-on)]">진단 시작하기 <ArrowRight className="inline size-3.5" /></button></div>
    </section>

    <section className="mt-5 grid grid-cols-3 gap-3 md:grid-cols-6">
      {stats.map(([value, label]) => <article key={label} className={`border p-4 text-center ${surface} rounded-2xl`}><b className={`block text-2xl font-black ${text}`}>{value}</b><p className={`mt-1 text-[11px] ${muted}`}>{label}</p></article>)}
    </section>

    <section className="mt-5 grid gap-4 md:grid-cols-2">
      <article className={`border p-5 ${surface} rounded-2xl`}><div className="flex items-center justify-between"><h2 className={`text-[15px] font-bold ${text}`}>이어서 학습하기</h2><button onClick={onOpenLearning} className="text-xs font-semibold text-[var(--mili-primary)]">전체 보기 <ArrowRight className="inline size-3" /></button></div><div className={`mt-4 border p-4 ${inset} rounded-xl`}><div className="flex items-center gap-2"><span className="rounded-md bg-[var(--mili-primary-bg)] px-2 py-0.5 text-[10px] font-bold text-[var(--mili-primary)]">진행 중</span><span className={"text-[10px] " + muted}>MY PROJECT</span></div><h3 className={`mt-3 text-sm font-semibold ${text}`}>체력 기록 관리 시스템</h3><p className={`mt-1 text-[11px] ${muted}`}>3일차 · 여러 기록 목록 관리하기</p><div className="mt-4 flex justify-between text-[10px]"><span className={muted}>진행률</span><b className={text}>38%</b></div><div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--mili-surface-interactive)]"><i className="block h-full w-[38%] rounded-full bg-[var(--mili-primary)]" /></div><button onClick={() => onGoTo("projects")} className="mt-4 w-full rounded-xl border border-[var(--mili-primary-border)] bg-[var(--mili-primary-bg)] py-2 text-xs font-bold text-[var(--mili-primary)]">이어서 학습하기 <ArrowRight className="inline size-3.5" /></button></div></article>
      <article className={`border p-5 ${surface} rounded-2xl`}><div className="flex items-center justify-between"><h2 className={`text-[15px] font-bold ${text}`}>나의 역량 분석</h2><button onClick={() => onGoTo("diagnosis")} className="text-xs font-semibold text-[#aaff19]">진단하기 <ArrowRight className="inline size-3" /></button></div><div className="flex min-h-[190px] flex-col items-center justify-center text-center"><span className="grid size-16 place-items-center rounded-full border border-[#aaff19]/20 bg-[#aaff19]/[0.04] text-[#aaff19]"><BrainCircuit size={26} /></span><p className={`mt-4 text-[13px] ${muted}`}>진단평가를 실시하면 역량 지표가 표시됩니다.</p><button onClick={() => onGoTo("diagnosis")} className="mt-2 text-xs font-semibold text-[#aaff19]">진단평가 실시하기 <ArrowRight className="inline size-3" /></button></div></article>
    </section>

    <section className="mt-4 grid gap-4 md:grid-cols-2">
      <article className={`border p-5 ${surface} rounded-2xl`}><h2 className={`text-[15px] font-bold ${text}`}>추천 학습</h2><div className="mt-4 space-y-3">{[["업무에 바로 쓰는 Claude Design 기반 보고서 PPT 만들기", "4주 이상", "Da", "bg-[#d23eb3]"], ["생성형 AI를 통한 Google Flow 강의 보고서 만들기", "2주 이상", "Cl", "bg-[#1597df]"], ["ChatGPT와 Gemini를 이용한 보고서 시각화", "1시간", "AI", "bg-[#46a45b]"]].map(([title, duration, tag, color]) => <button onClick={() => onGoTo("courses")} key={title} className={`flex w-full items-center gap-3 border p-3 text-left ${inset} rounded-xl`}><span className={`grid size-10 shrink-0 place-items-center rounded-lg text-xs font-bold text-white ${color}`}>{tag}</span><span className="min-w-0"><b className={`block truncate text-xs ${text}`}>{title}</b><small className={`mt-1 block text-[10px] ${muted}`}>{duration}</small></span></button>)}</div></article>
      <article className={`border p-5 ${surface} rounded-2xl`}><h2 className={`text-[15px] font-bold ${text}`}>바로가기</h2><div className="mt-4 grid grid-cols-4 gap-2">{shortcuts.map(({ label, icon: Icon, href }) => <Link key={label} href={href} className={`flex min-h-[82px] flex-col items-center justify-center gap-2 border p-2 text-center hover:border-[#aaff19]/35 ${inset} rounded-xl`}><Icon className="size-[18px] text-[#aaff19]" /><span className={`text-[10px] leading-tight ${text}`}>{label}</span></Link>)}</div></article>
    </section>
  </div>;
}
