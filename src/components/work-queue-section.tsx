import { ClipboardCheck, MessageSquareCode } from "lucide-react";
import { TaskQueueCard } from "@/components/task-queue-card";

export function WorkQueueSection() {
  return (
    <section
      aria-labelledby="work-queue-title"
      className="flex min-h-[560px] flex-col rounded-[24px] border border-[#29332C] bg-[#0C120E]/80 p-6 backdrop-blur-md sm:p-8"
    >
      <div className="flex items-end justify-between gap-4 border-b border-[#29332C] pb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#7F8A82]">
            Work queue
          </p>
          <h2
            id="work-queue-title"
            className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#F4F7F4]"
          >
            확인이 필요한 임무
          </h2>
        </div>
        <span className="grid size-8 place-items-center rounded-full border border-[#FFB84D]/35 font-mono text-xs font-semibold text-[#FFB84D]">
          02
        </span>
      </div>

      <div className="flex-1">
        <TaskQueueCard
          title="72시간 내 요구되는 동료 평가 2건 대기 중"
          description="전술 객체 탐지 결과물에 대한 동료 검토가 할당되었습니다."
          meta="Due in 72h · Priority A"
          icon={ClipboardCheck}
          tone="warning"
        />
        <TaskQueueCard
          title="피드백 수신: 제출된 데이터 전처리 코드 수정 지시"
          description="결측값 처리 방식과 데이터 증강 단계에 대한 교관 피드백을 확인하십시오."
          meta="Received 11:24 · Instructor"
          icon={MessageSquareCode}
          tone="neutral"
        />
      </div>

      <div className="mt-4 rounded-2xl border border-[#29332C] bg-[#121A15] px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-[#7F8A82]">작전 큐 상태</p>
            <p className="mt-1 text-sm font-medium text-[#B4BDB6]">
              긴급도 순으로 자동 정렬됨
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#4ED58A]">
            <span className="size-1.5 rounded-full bg-[#4ED58A]" />
            동기화 완료
          </span>
        </div>
      </div>
    </section>
  );
}
