import {
  BookOpen,
  CircleHelp,
  FolderKanban,
  LayoutDashboard,
  MessageSquareText,
  Settings,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const navigation = [
  { label: "홈", href: "#mission-control", icon: LayoutDashboard, active: true },
  { label: "학습", href: "#learning", icon: BookOpen, active: false },
  { label: "프로젝트", href: "#projects", icon: FolderKanban, active: false },
  {
    label: "커뮤니티",
    href: "#community",
    icon: MessageSquareText,
    active: false,
  },
  { label: "나", href: "#profile", icon: UserRound, active: false },
] as const;

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col border-r border-[#29332C] bg-[#050806]/94 px-4 py-6 backdrop-blur-md lg:flex">
      <a
        href="#mission-control"
        aria-label="MILI AI 홈"
        className="flex min-h-12 items-center gap-3 rounded-xl px-3"
      >
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-xl border border-[#B7F52A]/35 bg-[#B7F52A]/8"
        >
          <ShieldCheck className="size-5 text-[#B7F52A]" strokeWidth={1.8} />
        </span>
        <span className="font-display text-xl font-bold tracking-[-0.03em] text-white">
          MILI AI
        </span>
      </a>

      <div className="mt-8 border-y border-[#29332C] py-5">
        <p className="px-3 font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F8A82]">
          Mission control
        </p>
        <div className="mt-3 flex items-center gap-3 px-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#4ED58A] opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-[#4ED58A]" />
          </span>
          <span className="text-sm font-medium text-[#B4BDB6]">
            전술 학습망 정상
          </span>
        </div>
      </div>

      <nav aria-label="주요 메뉴" className="mt-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`group flex min-h-12 items-center gap-3 rounded-xl border px-3.5 text-sm font-semibold transition-colors ${
                    item.active
                      ? "border-[#B7F52A]/25 bg-[#121A15] text-[#F4F7F4]"
                      : "border-transparent text-[#7F8A82] hover:border-[#29332C] hover:bg-[#0C120E] hover:text-[#F4F7F4]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-5 w-0.5 rounded-full transition-colors ${
                      item.active
                        ? "bg-[#B7F52A]"
                        : "bg-transparent group-hover:bg-[#445148]"
                    }`}
                  />
                  <Icon
                    aria-hidden="true"
                    className={`size-5 ${
                      item.active ? "text-[#B7F52A]" : "text-current"
                    }`}
                    strokeWidth={1.8}
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto space-y-2 border-t border-[#29332C] pt-5">
        <a
          href="#support"
          className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm text-[#7F8A82] transition-colors hover:bg-[#0C120E] hover:text-[#F4F7F4]"
        >
          <CircleHelp className="size-4.5" strokeWidth={1.8} />
          도움말 및 지원
        </a>
        <a
          href="#settings"
          className="flex min-h-11 items-center gap-3 rounded-xl px-4 text-sm text-[#7F8A82] transition-colors hover:bg-[#0C120E] hover:text-[#F4F7F4]"
        >
          <Settings className="size-4.5" strokeWidth={1.8} />
          환경 설정
        </a>

        <div className="mt-4 rounded-2xl border border-[#29332C] bg-[#0C120E] p-3.5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#B7F52A] font-bold text-[#111807]">
              김
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#F4F7F4]">
                김민준 대원
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#7F8A82]">
                Unit 06 · Lv.6
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
