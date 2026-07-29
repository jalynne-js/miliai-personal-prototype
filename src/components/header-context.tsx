import { Bell, CircleHelp, Menu, Radio } from "lucide-react";

export function HeaderContext() {
  return (
    <header className="flex min-h-20 items-center justify-between gap-5 border-b border-[#29332C] pb-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          aria-label="메뉴 열기"
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-[#29332C] bg-[#0C120E] text-[#B4BDB6] lg:hidden"
        >
          <Menu className="size-5" />
        </button>
        <div>
          <div className="flex items-center gap-2.5">
            <Radio
              aria-hidden="true"
              className="hidden size-4 text-[#B7F52A] sm:block"
              strokeWidth={1.8}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#7F8A82]">
              Primary operation · Active
            </p>
          </div>
          <h1 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#F4F7F4] sm:text-2xl xl:text-[28px]">
            김민준 대원, 현재 활성화된 주 작전 목표입니다.
          </h1>
        </div>
      </div>

      <div className="hidden items-center gap-2 sm:flex">
        <button
          type="button"
          aria-label="알림 2개 확인"
          className="relative grid size-11 place-items-center rounded-xl border border-[#29332C] bg-[#0C120E] text-[#B4BDB6] transition-colors hover:border-[#445148] hover:text-[#F4F7F4]"
        >
          <Bell className="size-[18px]" strokeWidth={1.8} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#FFB84D]" />
        </button>
        <button
          type="button"
          aria-label="도움말"
          className="grid size-11 place-items-center rounded-xl border border-[#29332C] bg-[#0C120E] text-[#B4BDB6] transition-colors hover:border-[#445148] hover:text-[#F4F7F4]"
        >
          <CircleHelp className="size-[18px]" strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
