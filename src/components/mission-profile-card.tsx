"use client";

import Image from "next/image";
import { ArrowRight, Check, Pause, Play } from "lucide-react";
import { useState } from "react";

const missionStats = [
  { label: "현재 단계", value: "2/5" },
  { label: "최종 통과", value: "48h" },
  { label: "동료 평가", value: "2건" },
  { label: "누적 작전", value: "142h" },
] as const;

export function MissionProfileCard() {
  const [resumeState, setResumeState] = useState<
    "idle" | "connecting" | "ready"
  >("idle");

  function handleResume() {
    if (resumeState !== "idle") {
      return;
    }

    setResumeState("connecting");
    window.setTimeout(() => setResumeState("ready"), 900);
  }

  return (
    <section
      aria-labelledby="current-mission-title"
      className="relative z-20 mx-5 mb-5 overflow-hidden rounded-[28px] border border-[#B7F52A]/25 bg-[#050806]/60 px-6 pb-7 pt-7 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl md:mx-10 md:px-8 lg:absolute lg:bottom-5 lg:left-[300px] lg:right-[58px] lg:mx-0 lg:mb-0 lg:min-h-[356px] lg:px-9 lg:pb-7 xl:left-[322px] xl:right-[88px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[#B7F52A]/38"
      />

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="relative hidden min-h-[294px] lg:block">
          <Image
            src="/assets/mission-mascot.png"
            alt="MILI AI 탐사 마스코트"
            width={340}
            height={340}
            priority
            className="absolute -bottom-[92px] -left-10 h-[400px] w-[400px] object-contain drop-shadow-[0_0_34px_rgba(84,199,255,0.32)] xl:-left-7"
          />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-[26px] font-semibold tracking-[-0.04em] text-white">
                  김민준 대원
                </p>
                <span className="rounded-full border border-[#B7F52A]/25 bg-[#B7F52A]/8 px-2.5 py-1 text-[10px] font-semibold text-[#B7F52A]">
                  AI 탐사대원
                </span>
              </div>
              <h2
                id="current-mission-title"
                className="mt-2 text-sm font-medium text-white/62"
              >
                [작전명] 컴퓨터 비전 모델 경량화 실습
              </h2>
            </div>
            <p className="font-mono text-xl font-semibold text-[#B7F52A]">
              Lv. 6
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4">
            {missionStats.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3.5"
              >
                <p className="text-[10px] text-white/38">{item.label}</p>
                <p className="mt-1.5 font-mono text-lg font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl bg-black/14 px-4 py-3.5">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[11px] text-white/42">
                2/5 단계 진행 중 (최종 체크포인트 통과: 48시간 전)
              </p>
              <p className="font-mono text-xs font-semibold text-white">40%</p>
            </div>
            <div
              role="progressbar"
              aria-label="현재 작전 진행도"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={40}
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/12"
            >
              <div className="h-full w-[40%] rounded-full bg-[#B7F52A]" />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleResume}
              disabled={resumeState === "connecting"}
              className="group flex min-h-12 w-full items-center justify-between gap-4 rounded-2xl bg-[#B7F52A] px-5 text-left text-[13px] font-bold text-[#111807] shadow-[0_14px_34px_rgba(183,245,42,0.2)] transition-[background-color,transform] hover:bg-[#C8FF4A] active:translate-y-px disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:min-w-[420px]"
            >
              <span className="flex items-center gap-3">
                {resumeState === "connecting" ? (
                  <Pause className="size-[18px]" strokeWidth={2} />
                ) : resumeState === "ready" ? (
                  <Check className="size-[18px]" strokeWidth={2} />
                ) : (
                  <Play
                    className="size-[18px] fill-current"
                    strokeWidth={2}
                  />
                )}
                {resumeState === "connecting"
                  ? "작전 환경 연결 중..."
                  : resumeState === "ready"
                    ? "작전이 재개되었습니다"
                    : "이전 이탈 지점(03:42)부터 작전 재개하기"}
              </span>
              <ArrowRight
                className="size-[18px] shrink-0 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </button>
            <p
              aria-live="polite"
              className="text-[10px] text-white/38"
            >
              {resumeState === "ready"
                ? "03:42 지점의 학습 환경을 복구했습니다."
                : "코드와 실행 로그가 보존되어 있습니다."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
