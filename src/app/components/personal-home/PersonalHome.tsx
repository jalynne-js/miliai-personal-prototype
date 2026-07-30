"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Toaster, toast } from "sonner";
import BrandingHome from "../../imports/branding-login";
import PixelBlast from "./PixelBlast";
import TargetCursor from "./TargetCursor";
import "./personal-home.css";

const HOME_DESIGN_WIDTH = 1920;
const HOME_DESIGN_HEIGHT = 1080;
const CROPPED_SIDEBAR_WIDTH = 230;
const CROPPED_HEADER_HEIGHT = 90;
const HOME_CONTENT_WIDTH = HOME_DESIGN_WIDTH - CROPPED_SIDEBAR_WIDTH;
const HOME_CONTENT_HEIGHT = HOME_DESIGN_HEIGHT - CROPPED_HEADER_HEIGHT;

type PageKey =
  | "home"
  | "courses"
  | "projects"
  | "community"
  | "diagnosis"
  | "journey"
  | "my"
  | "about";

type PersonalHomeProps = {
  isLightMode: boolean;
  goTo: (page: PageKey) => void;
};

function MobileProfileCard() {
  const stats = [
    ["연속 학습", "21", "리그 내 최고 기록!", "#ff8904"],
    ["탐사 배지", "3", "총 10개 중", "#d99c00"],
    ["완료 미션", "4/10", "이번 프로젝트 기준", "#6d9f17"],
    ["누적 학습", "18h", "이번 달 총계", "#2f7899"],
  ];

  return (
    <section className="personal-mobile-card page-card-reveal">
      <div className="flex items-start gap-3">
        <div className="relative mt-0.5 size-[52px] shrink-0 overflow-hidden rounded-full bg-black/60">
          <Image
            src="/profile-soldier.png"
            alt="김철수 상병 프로필"
            fill
            sizes="52px"
            className="absolute inset-0 size-full object-cover object-top"
          />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[22px] font-bold tracking-[-1.1px] text-white">김철수 상병</h2>
            <span className="rounded-lg bg-white/[0.06] px-2 py-1 text-[11px] text-[#51a2ff]">AI 탐사대원</span>
          </div>
          <p className="mt-1 text-xs font-medium text-[#a6a6aa]">
            상병 · 비전공 장병 · 체력 기록 관리 시스템 진행 중
          </p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-2">
        {stats.map(([label, value, detail, color]) => (
          <button
            type="button"
            key={label}
            onClick={() => toast(label, { duration: 1200 })}
            className="cursor-target rounded-[14px] border border-white/[0.07] p-[13px] text-left"
          >
            <span className="mb-2 block size-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="block text-[11px] font-bold text-white">{label}</span>
            <strong className="block text-[20px] font-black leading-[34px] text-white">{value}</strong>
            <small className="block text-[9px] text-[#a6a6aa]">{detail}</small>
          </button>
        ))}
      </div>

      <div className="mt-[18px] rounded-xl border border-white/[0.07] p-4">
        <div className="mb-2.5 flex items-center justify-between">
          <strong className="text-[13px] font-black text-white">Lv. 23</strong>
          <span className="text-[11px] font-bold text-white">84%</span>
        </div>
        <div className="progress-track h-[7px] overflow-hidden rounded-full bg-white/10">
          <div className="home-progress-fill h-full w-[84%] rounded-full bg-[#aaff19]" />
        </div>
      </div>
    </section>
  );
}

function MobileProjectCard({ goTo }: Pick<PersonalHomeProps, "goTo">) {
  return (
    <section className="personal-mobile-card page-card-reveal">
      <h2 className="mb-6 text-xl font-bold tracking-[-1px] text-white">최근 프로젝트</h2>
      <div className="flex items-center gap-2">
        <span className="rounded-lg bg-[rgba(170,255,25,0.08)] px-2.5 py-1.5 text-[10px] font-bold text-[#aaff19]">
          진행 중
        </span>
        <span className="text-[10px] text-[#737373]">MY PROJECT</span>
      </div>
      <h3 className="mt-3.5 text-[17px] font-bold tracking-[-0.7px] text-white">체력 기록 관리 시스템</h3>
      <p className="mt-1 text-[10px] text-[#a6a6aa]">3일차 · 여러 기록 목록 관리하기</p>

      <div className="mt-[22px]">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[9px] text-[#8a948d]">진행률</span>
          <strong className="text-[11px] text-white">38%</strong>
        </div>
        <div className="progress-track h-[7px] overflow-hidden rounded-full bg-white/10">
          <div className="home-progress-fill h-full w-[38%] rounded-full bg-[#aaff19]" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-[10px] bg-white/[0.04] px-3.5 py-2.5">
        <div>
          <p className="text-[9px] text-[#8a948d]">현재 단계</p>
          <p className="mt-0.5 text-[11px] font-semibold text-white">여러 기록 목록 관리하기</p>
        </div>
        <span className="rounded-md bg-[rgba(170,255,25,0.08)] px-2 py-1 text-[11px] font-bold text-[#aaff19]">
          3일차
        </span>
      </div>

      <button
        type="button"
        onClick={() => goTo("projects")}
        className="cursor-target mt-5 flex h-[46px] w-full items-center justify-center rounded-[11px] bg-[#aaff19] text-[13px] font-bold text-[#11170d]"
      >
        이어서 학습하기 →
      </button>
    </section>
  );
}

function MobileHome(props: PersonalHomeProps) {
  return (
    <div className="relative min-h-full overflow-hidden px-4 pb-10 pt-10">
      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-[26px] font-bold leading-[1.2] tracking-[-2px] text-white">
            김철수 상병님,
            <br />
            탐사를 이어가 보세요.
          </h1>
          <p className="mt-2 text-[15px] font-semibold text-[#a6a6aa]">
            현재 학습 단계와 새롭게 도전할 프로젝트를 확인해 보세요.
          </p>
        </div>
        <div className="space-y-4">
          <MobileProfileCard />
          <MobileProjectCard goTo={props.goTo} />
        </div>
      </div>
    </div>
  );
}

function DesktopHome({ isLightMode, goTo }: PersonalHomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const parallaxFrameRef = useRef(0);
  const [contentFit, setContentFit] = useState<{ scale: number; left: number; top: number } | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const update = () => {
      const rect = viewport.getBoundingClientRect();
      const scale = Math.min(rect.width / HOME_CONTENT_WIDTH, rect.height / HOME_CONTENT_HEIGHT);
      setContentFit({
        scale,
        left: (rect.width - HOME_CONTENT_WIDTH * scale) / 2,
        top: (rect.height - HOME_CONTENT_HEIGHT * scale) / 2,
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const cleanups: Array<() => void> = [];
    const addClick = (element: HTMLElement, handler: () => void) => {
      element.classList.add("cursor-target");
      element.style.cursor = "pointer";
      element.addEventListener("click", handler);
      cleanups.push(() => element.removeEventListener("click", handler));
    };

    const hiddenNav = root.querySelectorAll<HTMLElement>('[class*="gap-[5.125px]"][class*="top-[106px]"]');
    hiddenNav.forEach((frame) => {
      Array.from(frame.children).forEach((child, index) => {
        if (child instanceof HTMLElement) {
          const routes: PageKey[] = ["home", "courses", "projects", "community", "diagnosis", "journey", "my", "about"];
          addClick(child, () => goTo(routes[index] ?? "home"));
        }
      });
    });

    root.querySelectorAll<HTMLElement>('[class*="bg-[#a1a1a1]"]').forEach((button) => {
      addClick(button, () => toast("AI 교관", { description: "AI 교관과 질문 세션을 시작합니다", duration: 1800 }));
    });
    root.querySelectorAll<HTMLElement>('[class*="bg-[#aaff19]"][class*="rounded-[11px]"]').forEach((button) => {
      addClick(button, () => goTo("projects"));
    });

    const statLabels = ["연속 학습", "탐사 배지", "완료 미션", "누적 학습"];
    root.querySelectorAll<HTMLElement>('[class*="flex-[1_0_0]"][class*="rounded-[14px]"]').forEach((card, index) => {
      card.classList.add("home-reveal-card");
      card.style.animationDelay = `${180 + index * 90}ms`;
      addClick(card, () => toast(statLabels[index % statLabels.length], { duration: 1200 }));
    });

    const stageOrder = new Map([
      ["1단계", 0],
      ["2단계", 1],
      ["3단계", 2],
      ["4단계", 3],
      ["최종", 4],
    ]);
    root.querySelectorAll<HTMLElement>('[class*="gap-[12.149px]"]').forEach((node) => {
      const stageName = Array.from(node.querySelectorAll("p"))
        .map((label) => label.textContent?.trim())
        .find((label) => label && stageOrder.has(label));
      if (!stageName) return;
      node.classList.add("home-stage-reveal");
      node.style.animationDelay = `${160 + (stageOrder.get(stageName) ?? 0) * 180}ms`;
      node.style.pointerEvents = "none";
      node.querySelectorAll<HTMLElement>("p").forEach((label) => {
        label.style.lineHeight = "1.35";
        label.style.paddingBottom = "4px";
        label.style.whiteSpace = "nowrap";
      });
    });

    const panels = [
      root.querySelector<HTMLElement>('[data-name="Article"]'),
      root.querySelector<HTMLElement>('[class*="h-[386.398px]"][class*="w-[451.195px]"]'),
    ].filter((panel): panel is HTMLElement => Boolean(panel));
    panels.forEach((panel, index) => {
      panel.classList.add("home-reveal-panel");
      panel.style.animationDelay = `${360 + index * 150}ms`;
    });

    const progressFills = Array.from(root.querySelectorAll<HTMLElement>('[data-name="Italic Text"]'));
    root.querySelectorAll<HTMLElement>('[data-name="Container"]').forEach((element) => {
      if (element.className.includes("bg-[#aaff19]") && element.className.includes("h-[7px]")) {
        progressFills.push(element);
      }
    });
    progressFills.forEach((fill, index) => {
      fill.classList.add("home-progress-fill");
      fill.parentElement?.classList.add("progress-track");
      fill.style.animationDelay = `${760 + index * 180}ms`;
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [goTo, isLightMode]);

  const moveBackground = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const viewport = viewportRef.current;
    const background = backgroundRef.current;
    if (!viewport || !background) return;
    const rect = viewport.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * -18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    cancelAnimationFrame(parallaxFrameRef.current);
    parallaxFrameRef.current = requestAnimationFrame(() => {
      background.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.04)`;
    });
  }, []);

  const resetBackground = useCallback(() => {
    if (backgroundRef.current) {
      backgroundRef.current.style.transform = "translate3d(0, 0, 0) scale(1.04)";
    }
  }, []);

  return (
    <div
      ref={viewportRef}
      onPointerMove={moveBackground}
      onPointerLeave={resetBackground}
      className="relative size-full overflow-hidden"
      data-theme-surface="personal-home"
    >
      <div
        ref={backgroundRef}
        className="absolute -inset-[3%] transition-transform duration-700 ease-out will-change-transform"
        style={{ transform: "translate3d(0, 0, 0) scale(1.04)" }}
      >
        <PixelBlast
          className=""
          style={{}}
          variant="square"
          pixelSize={4}
          color="#AAFF19"
          patternScale={2}
          patternDensity={1}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          speed={0.5}
          transparent
          edgeFade={0}
        />
      </div>
      <div className={`absolute inset-0 ${isLightMode ? "bg-white/38" : "bg-black/25"}`} />
      <div
        className="absolute overflow-hidden"
        style={{
          width: HOME_CONTENT_WIDTH,
          height: HOME_CONTENT_HEIGHT,
          left: contentFit?.left ?? 0,
          top: contentFit?.top ?? 0,
          visibility: contentFit ? "visible" : "hidden",
          transform: `scale(${contentFit?.scale ?? 1})`,
          transformOrigin: "left top",
        }}
      >
        <div
          ref={containerRef}
          style={{
            width: HOME_DESIGN_WIDTH,
            height: HOME_DESIGN_HEIGHT,
            transform: `translate(-${CROPPED_SIDEBAR_WIDTH}px, -${CROPPED_HEADER_HEIGHT}px)`,
          }}
        >
          <BrandingHome />
        </div>
      </div>
    </div>
  );
}

export default function PersonalHome(props: PersonalHomeProps) {
  return (
    <div
      className={`personal-home relative min-h-full xl:size-full xl:overflow-hidden ${
        props.isLightMode ? "mili-light bg-[#edf1ec] text-slate-900" : "mili-dark bg-[#0c0c0d] text-white"
      }`}
    >
      <div className="pointer-events-none fixed inset-0 xl:hidden">
        <PixelBlast
          className=""
          style={{}}
          variant="square"
          pixelSize={4}
          color="#AAFF19"
          patternScale={2}
          patternDensity={1}
          enableRipples
          rippleSpeed={0.3}
          rippleThickness={0.1}
          rippleIntensityScale={1}
          speed={0.5}
          transparent
          edgeFade={0}
          autoPauseOffscreen={false}
        />
      </div>
      <div className={`pointer-events-none absolute inset-0 xl:hidden ${props.isLightMode ? "bg-white/38" : "bg-black/25"}`} />
      <TargetCursor
        spinDuration={5}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.3}
        cursorColor={props.isLightMode ? "#15191d" : "#ffffff"}
        cursorColorOnTarget="#8edb00"
        targetSelector=".cursor-target"
      />
      <Toaster
        position="bottom-right"
        theme={props.isLightMode ? "light" : "dark"}
        toastOptions={{
          style: props.isLightMode
            ? { background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", color: "#17191d" }
            : { background: "#1a1d21", border: "1px solid rgba(255,255,255,0.1)", color: "#ffffff" },
        }}
      />
      <div className="hidden size-full xl:block">
        <DesktopHome {...props} />
      </div>
      <div className="relative min-h-full xl:hidden">
        <MobileHome {...props} />
      </div>
    </div>
  );
}
