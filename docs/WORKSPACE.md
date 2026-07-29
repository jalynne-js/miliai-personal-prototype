# MILI AI 작업 공간 가이드

## 확인 링크

- 운영 미리보기: <https://mili-ai-vercel-deploy.vercel.app/>
- 로컬 개발 서버: <http://localhost:3000>

## 현재 작업 기준

| 목적 | 기준 파일 | 메모 |
| --- | --- | --- |
| 화면과 인터랙션 수정 | `src/app/page.tsx` | 현재 서비스의 실제 렌더링 진입점입니다. |
| 전역 색·프레임·배경 규칙 | `src/app/globals.css` | `mili-frame`, `mili-control` 등 공통 시각 규칙이 있습니다. |
| 사이트 제목·설명 | `src/app/layout.tsx` | Next.js 루트 레이아웃과 메타데이터입니다. |
| 이미지 자산 | `public/assets/` | 새 자산은 용도 중심의 파일명으로 추가합니다. |
| 디자인 시스템 | `docs/DESIGN_SYSTEM.md` | 색상, 표면, 프레임, 인터랙션의 최신 기준 문서입니다. |
| 에셋 아카이브 | `docs/ASSET_ARCHIVE.md` | 사용자 제공 에셋과 최신 적용 우선순위를 기록합니다. |
| 화면·기능 범위 | `LEARNING_SITE_STRUCTURE.md` | 메뉴와 사용자 흐름을 확인합니다. |

## 화면 상태

현재 앱은 URL 라우팅이 아닌 단일 클라이언트 화면에서 상태로 전환됩니다.

| 상태 키 | 화면 |
| --- | --- |
| `home` | 오늘의 학습 베이스와 홈 대시보드 |
| `vod` | VOD 목록 및 강의 상세 |
| `project` | PBL 프로젝트 목록 및 상세 모달 |
| `community` | 공지, Q&A, FAQ, 뉴스 |
| `diagnosis` | 역량진단 |
| `journey` | 학습 여정 |
| `mypage` | 개인 대시보드, 강의, 활동, 뱃지 |
| `about` | 서비스 소개 |

## 자산 목록

| 파일 | 사용 위치 |
| --- | --- |
| `mili-logo.png` | 데스크톱·모바일 내비게이션 |
| `home-mission-map-background.png` | 홈 화면 미션 맵 배경 |
| `mili-topographic-background.png` | 홈 이외 화면의 배경 |
| `soldier-profile-reference.png` | 프로필 카드와 사용자 아바타 |
| `mission-landscape-v2.png` | 대체 시네마틱 배경 자산 |
| `mission-mascot.png` | 마스코트 자산 |

## 수정 규칙

1. 화면 문구, 구성, 인터랙션은 `src/app/page.tsx`에서 먼저 수정합니다.
2. 새 화면은 `PageKey`와 `navigation`에 함께 추가하고, `pageContent`에 렌더링을 등록합니다.
3. 라임은 Primary CTA·현재 상태·선택 상태에만 사용합니다. 기본 프레임은 숨기고 hover 또는 focus에서만 노출합니다. 상세 기준은 `docs/DESIGN_SYSTEM.md`를 따릅니다.
4. 이미지 교체 시 구현본은 `public/assets/`, 원본 참고 자료는 `design-assets/archive/`에 보관하고 `docs/ASSET_ARCHIVE.md`를 갱신합니다.
5. 디자인 변경 후 데스크톱과 모바일을 모두 확인하고, 기준이 달라지면 `design-qa.md`를 갱신합니다.

## 정리 대상과 다음 리팩터링

`src/components/`의 파일은 현재 `src/app/page.tsx`에서 import되지 않습니다. 이전 또는 실험 단계의 분리 후보이므로, 삭제하거나 화면에 연결하기 전에는 실제 동작 화면과 비교가 필요합니다.

다음 리팩터링에서는 아래 순서로 진행합니다.

1. `ActionButton`, `Panel`, `PageHeading`을 공통 UI로 추출합니다.
2. 화면별 뷰를 `src/features/learning-portal/`로 분리합니다.
3. `src/components/`의 기존 파일과 새 구조를 대조해 재사용하거나 제거합니다.
4. 화면 상태 기반 전환을 App Router 기반 URL 라우팅으로 옮길지 결정합니다.

이 순서를 따르면 현재 동작을 안전하게 유지하면서 화면 단위 수정이 쉬워집니다.
