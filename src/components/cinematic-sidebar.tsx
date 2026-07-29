import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  CircleUserRound,
  FolderKanban,
  Settings2,
} from "lucide-react";

const navigation = [
  { label: "홈", code: "H", href: "#home", active: true, icon: BookOpen },
  {
    label: "PBL 프로젝트",
    code: "P",
    href: "#projects",
    active: false,
    icon: FolderKanban,
  },
  {
    label: "내 정보 및 보상",
    code: "M",
    href: "#profile",
    active: false,
    icon: CircleUserRound,
  },
  {
    label: "맞춤 학습 설정",
    code: "S",
    href: "#settings",
    active: false,
    icon: Settings2,
  },
] as const;

export function CinematicSidebar() {
  return (
    <aside className="fixed inset-y-3 left-3 z-30 hidden w-[228px] flex-col overflow-hidden rounded-[32px] border border-white/12 bg-[#050806]/72 px-[18px] py-7 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-xl lg:flex">
      <a
        id="home"
        href="#home"
        aria-label="MILI AI 홈"
        className="flex min-h-12 items-center px-2"
      >
        <span className="font-display text-[28px] font-bold tracking-[-0.06em] text-white">
          MILI
        </span>
        <span className="ml-1.5 rounded-md bg-white px-1.5 py-0.5 font-display text-[25px] font-bold tracking-[-0.08em] text-[#111807]">
          AI
        </span>
      </a>

      <div className="relative mt-8 min-h-[132px] overflow-hidden rounded-[24px] border border-white/13 bg-white/[0.035] px-5 py-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
          Mission status
        </p>
        <p className="mt-3 text-sm font-semibold text-white">7일째 전진 중</p>
        <Image
          src="/assets/mission-mascot.png"
          alt=""
          width={98}
          height={98}
          className="absolute -bottom-1 right-0 h-[86px] w-[86px] object-contain drop-shadow-[0_0_18px_rgba(84,199,255,0.28)]"
        />
      </div>

      <p className="mt-9 px-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/48">
        Learning base
      </p>

      <nav aria-label="주요 메뉴" className="mt-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`group flex min-h-[52px] items-center gap-3 rounded-2xl border px-3 text-sm transition-all ${
                  item.active
                    ? "border-[#B7F52A] bg-[#B7F52A] font-semibold text-[#111807] shadow-[0_12px_32px_rgba(183,245,42,0.18)]"
                    : "border-transparent text-white/68 hover:border-white/12 hover:bg-white/[0.045] hover:text-white"
                }`}
              >
                <span
                  className={`grid size-7 shrink-0 place-items-center rounded-lg border font-mono text-[10px] font-semibold ${
                    item.active
                      ? "border-[#111807]/20"
                      : "border-white/35 text-white/78"
                  }`}
                >
                  {item.code}
                </span>
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <ArrowRight
                  className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto rounded-[24px] border border-white/10 bg-[#050806]/64 p-4 backdrop-blur-md">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/45">
          This week
        </p>
        <p className="mt-3 text-sm font-semibold text-white">
          4개의 Step 완료
        </p>
        <div
          className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/18"
          role="progressbar"
          aria-label="이번 주 학습 진행도"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={64}
        >
          <div className="h-full w-[64%] rounded-full bg-[#B7F52A]" />
        </div>
        <p className="mt-3 text-[11px] text-white/46">학습 시간 2시간 40분</p>
      </div>
    </aside>
  );
}
