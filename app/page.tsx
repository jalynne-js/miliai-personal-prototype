"use client";

import { useState } from "react";

const heroImage = "https://www.figma.com/api/mcp/asset/7614d365-54fa-4d33-9c6b-bfdb59ab6786";

const navItems = [
  ["⌂", "홈"],
  ["▣", "VOD 강의"],
  ["◆", "프로젝트"],
  ["☷", "커뮤니티"],
  ["◉", "역량진단"],
  ["↗", "학습 여정"],
  ["◎", "마이페이지"],
  ["ⓘ", "서비스 소개"],
];

const courses = [
  { tag: "생성AI 프로젝트", level: "2단계", title: "작전 보고서 요약 프롬프트 작성", meta: "예상 25분 · 실습형 학습", state: "우선 학습", palette: "violet" },
  { tag: "VOD 강의", level: "1단계", title: "AI로 만드는 나만의 업무 자동화", meta: "예상 40분 · 기초부터 시작", state: "추천 학습", palette: "teal" },
];

export default function Home() {
  const [active, setActive] = useState("홈");
  const [tab, setTab] = useState("전체");
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [profileName, setProfileName] = useState("김철수 상병");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const avatars = ["남자 1", "남자 2", "여자 1", "여자 2", "청년 1", "멘토", "고양이", "다람쥐", "강아지", "AI 로봇"];

  return (
    <main className="mili-home" data-theme={theme}>
      <aside className="mili-sidebar">
        <div className="mili-logo"><span>✦</span><div><strong>MILI AI</strong><small>INTERNAL PLATFORM</small></div></div>
        <nav className="mili-nav" aria-label="주 메뉴">
          {navItems.map(([icon, label]) => <button key={label} className={active === label ? "active" : ""} onClick={() => setActive(label)}><i>{icon}</i>{label}</button>)}
        </nav>
        <div className="mili-sidebar-foot"><span className="online-dot" /> SYSTEM ONLINE<br /><small>내부용 MILI AI 플랫폼</small></div>
      </aside>

      <section className="mili-content">
        <header className="mili-header"><span className="mili-breadcrumb">MILI AI <b>/</b> {active}</span><div className="mili-header-actions"><button className="mili-theme-toggle" aria-label={`${theme === "dark" ? "라이트" : "다크"} 모드로 전환`} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? "☀" : "◐"}</button><button aria-label="알림">♧<em /></button><button aria-label="검색">⌕</button><button className="mili-login" onClick={() => setProfileOpen(true)}><span>◉</span> {profileName} <b>›</b></button></div></header>

        <div className="mili-body">
          <div className="mili-welcome"><p className="mili-kicker">WELCOME TO MILI AI</p><h1>오늘의 탐사를<br />이어가 볼까요?</h1><p>현재 학습 단계와 새롭게 도전할 프로젝트를 확인해 보세요.</p></div>

          <section className="mili-dashboard-grid">
            <div className="mili-card mili-course-card">
              <div className="mili-card-head"><h2>인기 학습 강좌</h2><div className="mili-tabs">{["전체", "강의", "프로젝트"].map((item) => <button key={item} className={tab === item ? "selected" : ""} onClick={() => setTab(item)}>{item}</button>)}</div></div>
              <div className="mili-course-list">{courses.map((course) => <article className={`mili-course ${course.palette}`} key={course.title} style={{ backgroundImage: `url(${heroImage})` }}><div className="mili-course-top"><span className="mili-pill">{course.tag}</span><span className="mili-pill course-level">{course.level}</span><span className="mili-priority">✦ {course.state}</span></div><h3>{course.title}</h3><p>{course.meta}</p><button className="mili-course-cta">학습 시작 <b>→</b></button></article>)}</div>
            </div>

            <div className="mili-right-column">
              <div className="mili-card mili-level-card"><div className="mili-card-head"><h2>나의 학습 레벨</h2><button className="mili-more mili-link-button" onClick={() => setProfileOpen(true)}>프로필 편집 ›</button></div><div className="mili-level"><div className={`mili-avatar sprite-avatar sprite-${selectedAvatar}`} aria-label={avatars[selectedAvatar]} /><div><strong>Lv. 23</strong><p>{profileName} · 다음 레벨까지 1,240 EXP</p></div></div><div className="mili-progress-label"><span>현재 경험치</span><b>84%</b></div><div className="mili-progress"><span /></div></div>
              <div className="mili-card mili-project-card"><div className="mili-card-head"><h2>최근 프로젝트</h2><span className="mili-more">전체보기 ›</span></div><span className="mili-status">진행 중</span><small className="mili-project-type">MY PROJECT</small><h3>체력 기록 관리 시스템</h3><p className="mili-muted">3일차 · 여러 기록 목록 관리하기</p><div className="mili-progress-label"><span>진행률</span><b>38%</b></div><div className="mili-progress"><span className="project-progress" /></div><button className="mili-resume">이어서 학습하기 <b>→</b></button></div>
            </div>
          </section>
          <div className="mili-bottom-note"><span>✦</span><p><b>오늘의 학습을 시작해 보세요.</b> 작은 탐사가 쌓여 새로운 역량이 됩니다.</p><button>학습 로드맵 보기 →</button></div>
        </div>
      </section>
      {profileOpen && <div className="profile-backdrop" role="presentation" onClick={() => setProfileOpen(false)}><section className="profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onClick={(event) => event.stopPropagation()}><div className="profile-modal-head"><div><p className="mili-kicker">MY PROFILE</p><h2 id="profile-title">나의 탐사대원 설정</h2></div><button className="profile-close" onClick={() => setProfileOpen(false)}>×</button></div><label className="profile-label">이름<input value={profileName} onChange={(event) => setProfileName(event.target.value)} /></label><div className="profile-label">캐릭터 선택<span className="profile-hint">성별과 연령대, 동물형까지 자유롭게 골라보세요.</span></div><div className="avatar-grid">{avatars.map((name, index) => <button key={name} className={`avatar-option ${selectedAvatar === index ? "selected" : ""}`} onClick={() => setSelectedAvatar(index)}><span className={`sprite-avatar sprite-${index}`} /><b>{name}</b></button>)}</div><button className="profile-save" onClick={() => { setProfileOpen(false); setActive("마이페이지"); }}>프로필 저장 <b>→</b></button></section></div>}
    </main>
  );
}
