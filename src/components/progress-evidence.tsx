import {
  Activity,
  CalendarDays,
  Clock3,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

const evidence = [
  {
    label: "누적 작전 투입 시간",
    value: "142h",
    detail: "지난 주 대비 +8h",
    icon: Clock3,
  },
  {
    label: "현재 활동 연속성",
    value: "14일",
    detail: "개인 최고 기록까지 3일",
    icon: CalendarDays,
  },
] as const;

export function ProgressEvidence() {
  return (
    <section
      aria-labelledby="progress-evidence-title"
      className="rounded-[24px] border border-[#29332C] bg-[#0C120E]/80 p-6 backdrop-blur-md sm:p-8 xl:p-9"
    >
      <div className="grid gap-8 xl:grid-cols-12 xl:items-center">
        <div className="xl:col-span-4">
          <div className="flex items-center gap-2 text-[#4ED58A]">
            <ShieldCheck className="size-4" strokeWidth={1.8} />
            <p className="font-mono text-[10px] uppercase tracking-[0.18em]">
              Progress evidence
            </p>
          </div>
          <h2
            id="progress-evidence-title"
            className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-[#F4F7F4]"
          >
            작전 수행 증거
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#B4BDB6]">
            참여 시간이 아니라 실제 수행 기록과 활동 연속성을 기준으로 현재
            성장 상태를 보여줍니다.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:col-span-6">
          {evidence.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="rounded-2xl border border-[#29332C] bg-[#121A15] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-[#B4BDB6]">{item.label}</p>
                    <p className="mt-3 font-mono text-3xl font-bold tracking-[-0.04em] text-[#F4F7F4]">
                      {item.value}
                    </p>
                  </div>
                  <span className="grid size-10 place-items-center rounded-xl border border-[#29332C] text-[#B7F52A]">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                </div>
                <p className="mt-5 flex items-center gap-2 text-xs text-[#4ED58A]">
                  <TrendingUp className="size-3.5" strokeWidth={1.8} />
                  {item.detail}
                </p>
              </article>
            );
          })}
        </div>

        <div className="xl:col-span-2">
          <div className="flex min-h-28 flex-col justify-between rounded-2xl border border-[#29332C] px-5 py-4">
            <div className="flex items-center justify-between">
              <Activity className="size-4 text-[#B7F52A]" strokeWidth={1.8} />
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#7F8A82]">
                Readiness
              </span>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-[#F4F7F4]">
                82%
              </p>
              <p className="mt-1 text-xs text-[#B4BDB6]">훈련 준비도 양호</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
