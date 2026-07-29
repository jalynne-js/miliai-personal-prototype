"use client";

import {
  ArrowRight,
  Check,
  Clock3,
  Crosshair,
  History,
  Pause,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";

const stages = [
  { label: "데이터 준비", state: "complete" },
  { label: "모델 분석", state: "complete" },
  { label: "경량화 실습", state: "current" },
  { label: "검증", state: "upcoming" },
  { label: "결과 보고", state: "upcoming" },
] as const;

export function HeroMissionCard() {
  const [isResuming, setIsResuming] = useState(false);
  const [isResumed, setIsResumed] = useState(false);

  function handleResume() {
    if (isResuming || isResumed) {
      return;
    }

    setIsResuming(true);
    window.setTimeout(() => {
      setIsResuming(false);
      setIsResumed(true);
    }, 900);
  }

  return (
    <section
      id="mission-control"
      aria-labelledby="hero-mission-title"
      className="relative min-h-[560px] overflow-hidden rounded-[24px] border border-[#29332C] bg-[#0C120E]/92 p-6 backdrop-blur-md sm:p-8 xl:p-10"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-full w-px bg-[#B7F52A]/35"
      />
      <div
        aria-hidden="true"
        className="absolute right-7 top-7 grid size-24 place-items-center rounded-full border border-[#29332C] text-[#29332C]"
      >
        <Crosshair className="size-11" strokeWidth={0.8} />
      </div>

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#B7F52A]/30 bg-[#B7F52A]/8 px-3 py-1.5 text-xs font-semibold text-[#B7F52A]">
            <span className="size-1.5 rounded-full bg-[#B7F52A]" />
            주 작전 목표
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#7F8A82]">
            OP-CV-025 / Clearance A
          </span>
        </div>

        <div className="mt-9 max-w-[720px]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#7F8A82]">
            Active mission
          </p>
          <h2
            id="hero-mission-title"
            className="mt-4 max-w-[690px] text-3xl font-bold leading-[1.22] tracking-[-0.04em] text-white sm:text-4xl xl:text-[44px]"
          >
            [작전명] 컴퓨터 비전 모델 경량화 실습
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#B4BDB6]">
            제한된 연산 환경에서 모델 정확도를 유지하며 추론 속도를
            개선하십시오. 현재 체크포인트의 실습 환경이 보존되어 있습니다.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="border-l border-[#29332C] pl-4">
            <div className="flex items-center gap-2 text-[#7F8A82]">
              <Clock3 className="size-4" strokeWidth={1.8} />
              <span className="text-xs">예상 소요 시간</span>
            </div>
            <p className="mt-2 font-mono text-lg font-semibold text-[#F4F7F4]">
              34분
            </p>
          </div>
          <div className="border-l border-[#29332C] pl-4">
            <div className="flex items-center gap-2 text-[#7F8A82]">
              <History className="size-4" strokeWidth={1.8} />
              <span className="text-xs">마지막 동기화</span>
            </div>
            <p className="mt-2 font-mono text-lg font-semibold text-[#F4F7F4]">
              48h ago
            </p>
          </div>
          <div className="border-l border-[#29332C] pl-4">
            <div className="flex items-center gap-2 text-[#7F8A82]">
              <ShieldCheck className="size-4" strokeWidth={1.8} />
              <span className="text-xs">작전 진행도</span>
            </div>
            <p className="mt-2 font-mono text-lg font-semibold text-[#B7F52A]">
              2 / 5
            </p>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-[#F4F7F4]">
              2/5 단계 진행 중
            </p>
            <p className="text-right text-xs text-[#7F8A82]">
              최종 체크포인트 통과: 48시간 전
            </p>
          </div>

          <ol className="mt-4 grid grid-cols-5 gap-2" aria-label="작전 진행 단계">
            {stages.map((stage, index) => (
              <li key={stage.label}>
                <div
                  className={`flex h-1.5 items-center rounded-full ${
                    stage.state === "complete"
                      ? "bg-[#4ED58A]"
                      : stage.state === "current"
                        ? "bg-[#B7F52A]"
                        : "bg-[#29332C]"
                  }`}
                />
                <div className="mt-2 flex items-center gap-1.5">
                  {stage.state === "complete" ? (
                    <Check
                      aria-hidden="true"
                      className="size-3 text-[#4ED58A]"
                      strokeWidth={2.2}
                    />
                  ) : (
                    <span className="font-mono text-[10px] text-[#7F8A82]">
                      0{index + 1}
                    </span>
                  )}
                  <span
                    className={`hidden text-[11px] sm:inline ${
                      stage.state === "current"
                        ? "font-semibold text-[#B7F52A]"
                        : "text-[#7F8A82]"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-auto pt-9">
          <button
            type="button"
            onClick={handleResume}
            disabled={isResuming}
            aria-describedby="resume-status"
            className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-2xl bg-[#B7F52A] px-5 text-left text-[15px] font-bold text-[#111807] transition-[background-color,transform] hover:bg-[#C8FF4A] active:translate-y-px disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:min-w-[460px] sm:px-6"
          >
            <span className="flex items-center gap-3">
              {isResuming ? (
                <Pause className="size-5" strokeWidth={2.2} />
              ) : isResumed ? (
                <Check className="size-5" strokeWidth={2.2} />
              ) : (
                <Play className="size-5 fill-current" strokeWidth={2.2} />
              )}
              {isResuming
                ? "작전 환경 연결 중..."
                : isResumed
                  ? "작전이 재개되었습니다"
                  : "이전 이탈 지점(03:42)부터 작전 재개하기"}
            </span>
            <ArrowRight
              className="size-5 shrink-0 transition-transform group-hover:translate-x-1"
              strokeWidth={2.2}
            />
          </button>
          <p
            id="resume-status"
            aria-live="polite"
            className="mt-3 text-xs text-[#7F8A82]"
          >
            {isResumed
              ? "03:42 지점에서 학습 환경을 복구했습니다."
              : "최근 저장된 코드와 실행 로그를 함께 복구합니다."}
          </p>
        </div>
      </div>
    </section>
  );
}
