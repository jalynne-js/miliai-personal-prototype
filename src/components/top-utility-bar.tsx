import { Bell, ChevronDown, SunMedium } from "lucide-react";

export function TopUtilityBar() {
  return (
    <div className="absolute right-6 top-5 z-20 flex items-center gap-2 sm:right-8">
      <button
        type="button"
        aria-label="화면 밝기 설정"
        className="hidden size-11 place-items-center rounded-2xl border border-white/12 bg-[#071008]/58 text-white/78 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white sm:grid"
      >
        <SunMedium className="size-[18px]" strokeWidth={1.7} />
      </button>
      <button
        type="button"
        aria-label="알림 0개"
        className="relative hidden h-11 min-w-11 place-items-center rounded-2xl border border-white/12 bg-[#071008]/58 px-3 font-mono text-sm text-white/78 backdrop-blur-xl transition-colors hover:bg-white/10 hover:text-white sm:grid"
      >
        0
        <span className="absolute right-2 top-2 size-1 rounded-full bg-[#FFB84D]" />
      </button>
      <button
        type="button"
        className="flex h-12 items-center gap-3 rounded-2xl border border-white/12 bg-[#071008]/62 px-2.5 pr-3.5 text-left backdrop-blur-xl transition-colors hover:bg-white/10"
        aria-label="김민준 대원 프로필 열기"
      >
        <span className="grid size-8 place-items-center rounded-xl bg-[#B7F52A] text-xs font-bold text-[#111807]">
          김
        </span>
        <span className="hidden min-w-24 sm:block">
          <span className="block text-xs font-semibold text-white">김민준</span>
          <span className="mt-0.5 block text-[9px] text-white/42">
            이병 · 비전공 장병
          </span>
        </span>
        <ChevronDown
          className="hidden size-3.5 text-white/55 sm:block"
          strokeWidth={1.7}
        />
      </button>
      <button
        type="button"
        aria-label="알림 확인"
        className="grid size-11 place-items-center rounded-2xl border border-white/12 bg-[#071008]/58 text-white/78 backdrop-blur-xl sm:hidden"
      >
        <Bell className="size-[18px]" strokeWidth={1.7} />
      </button>
    </div>
  );
}
