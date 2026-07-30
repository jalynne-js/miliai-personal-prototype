"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  BrainCircuit,
  ChevronRight,
  ClipboardList,
  FolderKanban,
  GraduationCap,
  Medal,
  Settings,
  Sparkles,
  Trophy,
} from "lucide-react";

type PersonalMyPageProps = {
  isLightMode: boolean;
  onGoTo: (page: "courses" | "projects" | "diagnosis") => void;
};

const shortcuts = [
  { label: "내 학습", icon: BookOpen, href: "/my/learning" },
  { label: "보관함", icon: FolderKanban, href: "/my/wishlist" },
  { label: "수료증", icon: GraduationCap, href: "/my/certificates" },
  { label: "크레딧", icon: Medal, href: "/my/credits" },
  { label: "작성한 글", icon: ClipboardList, href: "/my/posts" },
  { label: "알림", icon: Bell, href: "/my/notifications" },
  { label: "계정 설정", icon: Settings, href: "/my/settings" },
  { label: "역량 진단", icon: BrainCircuit, href: "/diagnosis" },
];

export default function PersonalMyPage({ isLightMode, onGoTo }: PersonalMyPageProps) {
  const text = isLightMode ? "text-[#162016]" : "text-white";
  const muted = isLightMode ? "text-[#667166]" : "text-white/55";
  const surface = isLightMode
    ? "border-[#d8e0d8] bg-white/85 shadow-[0_12px_34px_rgba(53,78,53,.08)]"
    : "border-white/10 bg-[#0b110d]/92 shadow-[0_16px_40px_rgba(0,0,0,.22)]";
  const subSurface = isLightMode ? "border-[#e0e6e0] bg-[#f5f8f4]" : "border-white/[0.09] bg-white/[0.035]";

  return (
    <div className="mx-auto max-w-[1100px] pb-8">
      <section className={`relative overflow-hidden rounded-[28px] border p-5 md:p-7 ${surface}`}>
        <div aria-hidden="true" className="absolute -right-20 -top-24 size-72 rounded-full bg-[#b7ff31]/[0.13] blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 right-1/3 size-72 rounded-full bg-[#54c7ff]/[0.09] blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
          <div className="relative mx-auto size-24 shrink-0 overflow-hidden rounded-full border-2 border-[#b7ff31]/70 bg-[#151c16] md:mx-0 md:size-28">
            <Image src="/profile-soldier.png" alt="김철수 상병 프로필" fill sizes="112px" className="object-cover object-top" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className={`text-2xl font-black tracking-[-.06em] md:text-3xl ${text}`}>김철수 상병</h1>
              <span className="rounded-lg border border-[#54c7ff]/35 bg-[#54c7ff]/10 px-2.5 py-1 text-[11px] font-bold text-[#278fc6]">AI 탐사대원</span>
            </div>
            <p className={`mt-2 text-sm ${muted}`}>상병 · 비전공 장병 · 체력 기록 관리 시스템 진행 중</p>
            <div className="mt-5 flex items-center gap-3">
              <b className={`shrink-0 text-sm ${text}`}>Lv. 23</b>
              <div className={`h-2 flex-1 overflow-hidden rounded-full ${isLightMode ? "bg-[#dfe6df]" : "bg-white/10"}`}><i className="block h-full w-[84%] rounded-full bg-[#b7ff31] shadow-[0_0_14px_rgba(183,255,49,.6)]" /></div>
              <b className={`text-xs ${text}`}>84%</b>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:w-[390px]">
            {[
              ["#ff8904", "21", "연속 학습", "최고 기록!"],
              ["#fdc700", "3", "탐사 배지", "총 10개 중"],
              ["#aaff19", "4/10", "완료 미션", "이번 프로젝트"],
              ["#51a2ff", "18h", "누적 학습", "이번 달"],
            ].map(([color, value, label, description]) => <article key={label} className={`rounded-2xl border p-3 ${subSurface}`}>
              <span className="block size-2 rounded-full" style={{ backgroundColor: color }} />
              <b className={`mt-3 block text-xl leading-none ${text}`}>{value}</b>
              <p className={`mt-2 text-[11px] font-bold ${muted}`}>{label}</p>
              <p className={`mt-0.5 text-[10px] ${muted}`}>{description}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
        <article className={`overflow-hidden rounded-[24px] border ${surface}`}>
          <div className="bg-[linear-gradient(120deg,#005c4b,#00875a)] px-6 py-5 text-white"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold tracking-[.15em] text-[#d9ff9a]">NEXT STEP</p><h2 className="mt-2 text-lg font-bold">온보딩 진단을 완료해주세요</h2><p className="mt-1 text-sm text-white/75">진단 후 맞춤형 학습 로드맵을 추천해 드립니다.</p></div><button onClick={() => onGoTo("diagnosis")} className="shrink-0 rounded-xl border border-white/30 bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25">진단 시작 <ArrowRight className="ml-1 inline size-3.5" /></button></div></div>
          <div className="p-5 md:p-6"><div className="flex items-center justify-between"><div><p className={`text-xs font-bold text-[#78a921]`}>진행 중 / MY PROJECT</p><h2 className={`mt-2 text-xl font-bold tracking-[-.04em] ${text}`}>체력 기록 관리 시스템</h2><p className={`mt-2 text-sm ${muted}`}>3일차 · 여러 기록 목록 관리하기</p></div><FolderKanban className="size-10 text-[#b7ff31]" /></div><div className="mt-7 flex justify-between text-xs"><span className={muted}>진행률</span><b className={text}>38%</b></div><div className={`mt-2 h-2 overflow-hidden rounded-full ${isLightMode ? "bg-[#dde5dd]" : "bg-white/10"}`}><i className="block h-full w-[38%] bg-[#b7ff31]" /></div><button onClick={() => onGoTo("projects")} className="mt-6 w-full rounded-xl border border-[#b7ff31]/35 bg-[#b7ff31]/10 py-3 text-sm font-bold text-[#6b9e0d] hover:bg-[#b7ff31]/20">이어서 학습하기 <ArrowRight className="inline size-4" /></button></div>
        </article>
        <article className={`rounded-[24px] border p-5 md:p-6 ${surface}`}><div className="flex items-center justify-between"><div><p className="text-xs font-bold tracking-[.15em] text-[#ffae45]">MY SKILL</p><h2 className={`mt-2 text-xl font-bold tracking-[-.04em] ${text}`}>나의 역량 분석</h2></div><span className="grid size-12 place-items-center rounded-2xl border border-[#b7ff31]/30 bg-[#b7ff31]/10 text-[#77a91a]"><BrainCircuit /></span></div><div className="mt-7 flex items-center gap-5"><div className="grid size-28 shrink-0 place-items-center rounded-full border border-[#b7ff31]/35 bg-[#b7ff31]/[0.06]"><span className="text-center"><b className={`block text-2xl ${text}`}>72</b><small className={muted}>AI 활용</small></span></div><p className={`text-sm leading-6 ${muted}`}>진단평가를 실시하면 현재 역량과 다음 학습 추천이 표시됩니다.</p></div><button onClick={() => onGoTo("diagnosis")} className="mt-6 text-sm font-bold text-[#78a921]">진단평가 실시하기 <ChevronRight className="inline size-4" /></button></article>
      </section>

      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <article className={`rounded-[24px] border p-5 md:p-6 ${surface}`}><div className="flex items-center justify-between"><h2 className={`text-xl font-bold tracking-[-.04em] ${text}`}>추천 학습</h2><button onClick={() => onGoTo("courses")} className="text-sm font-bold text-[#78a921]">전체 보기 <ChevronRight className="inline size-4" /></button></div><div className="mt-5 space-y-3">{[["생성 AI 업무 활용 기초", "프롬프트 설계 · 38분", "64%"], ["보안 AI 활용 수칙", "정보보호 · 18분", "필수"], ["데이터 시각화의 첫걸음", "데이터 분석 · 42분", "추천"]].map(([title, detail, badge], index) => <button onClick={() => onGoTo("courses")} key={title} className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition hover:border-[#b7ff31]/50 ${subSurface}`}><span className={`grid size-10 shrink-0 place-items-center rounded-xl font-black ${index === 0 ? "bg-[#b7ff31] text-[#14200b]" : "bg-[#54c7ff]/15 text-[#278fc6]"}`}>{index + 1}</span><span className="min-w-0 flex-1"><b className={`block truncate text-sm ${text}`}>{title}</b><small className={`mt-1 block ${muted}`}>{detail}</small></span><span className="text-xs font-bold text-[#78a921]">{badge}</span></button>)}</div></article>
        <article className={`rounded-[24px] border p-5 md:p-6 ${surface}`}><div className="flex items-center justify-between"><h2 className={`text-xl font-bold tracking-[-.04em] ${text}`}>바로가기</h2><Sparkles className="text-[#b7ff31]" /></div><div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">{shortcuts.map(({ label, icon: Icon, href }) => <Link href={href} key={label} className={`group flex min-h-[95px] flex-col items-center justify-center rounded-2xl border p-3 text-center transition hover:-translate-y-0.5 hover:border-[#b7ff31]/55 ${subSurface}`}><Icon className="size-5 text-[#78a921] transition group-hover:text-[#a2df24]" /><span className={`mt-2 text-xs font-bold ${text}`}>{label}</span></Link>)}</div></article>
      </section>

      <section className={`mt-5 rounded-[24px] border p-5 md:p-6 ${surface}`}><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className="grid size-12 place-items-center rounded-2xl bg-[#ffb84d]/12 text-[#e58a13]"><Trophy /></span><div><p className={`text-xs font-bold ${muted}`}>이번 달 탐사 기록</p><h2 className={`mt-1 text-lg font-bold ${text}`}>성장 경험치 184 XP를 획득했어요.</h2></div></div><Link href="/my/credits" className="text-sm font-bold text-[#78a921]">보상 센터 보기 <ChevronRight className="inline size-4" /></Link></div></section>
    </div>
  );
}
