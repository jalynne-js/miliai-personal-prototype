import type { LucideIcon } from "lucide-react";
import { ChevronRight } from "lucide-react";

interface TaskQueueCardProps {
  title: string;
  description: string;
  meta: string;
  icon: LucideIcon;
  tone: "warning" | "neutral";
}

export function TaskQueueCard({
  title,
  description,
  meta,
  icon: Icon,
  tone,
}: TaskQueueCardProps) {
  const isWarning = tone === "warning";

  return (
    <button
      type="button"
      className="group flex w-full items-start gap-4 border-b border-[#29332C] py-6 text-left transition-colors last:border-b-0 hover:bg-[#121A15]/55 focus-visible:relative focus-visible:z-10"
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl border ${
          isWarning
            ? "border-[#FFB84D]/25 bg-[#FFB84D]/8 text-[#FFB84D]"
            : "border-[#54C7FF]/25 bg-[#54C7FF]/8 text-[#54C7FF]"
        }`}
      >
        <Icon className="size-5" strokeWidth={1.8} />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={`block text-[15px] font-semibold leading-6 ${
            isWarning ? "text-[#FFB84D]" : "text-[#F4F7F4]"
          }`}
        >
          {title}
        </span>
        <span className="mt-2 block text-sm leading-6 text-[#B4BDB6]">
          {description}
        </span>
        <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.1em] text-[#7F8A82]">
          {meta}
        </span>
      </span>

      <ChevronRight
        aria-hidden="true"
        className="mt-1 size-5 shrink-0 text-[#7F8A82] transition-transform group-hover:translate-x-1 group-hover:text-[#F4F7F4]"
        strokeWidth={1.8}
      />
    </button>
  );
}
