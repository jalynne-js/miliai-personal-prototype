# MiliAI 핵심 디자인 에셋 아카이브

이 문서는 사용자 제공 에셋의 원본 근거와 적용 우선순위를 기록한다. 최신 항목이 같은 목적의 이전 항목보다 우선한다.

## 현재 기준

| 수신일 | 에셋 / 기준 | 보관 또는 구현 위치 | 적용 범위 | 상태 |
| --- | --- | --- | --- | --- |
| 2026-07-29 | 미션 맵 홈 화면 기준 | `public/assets/home-mission-map-background.png` | 홈 / 학습 화면 배경 | 현재 기준 |
| 2026-07-29 | 장병 프로필 기준 | `public/assets/soldier-profile-reference.png` | 프로필 카드 / 사용자 아바타 | 현재 기준 |
| 2026-07-29 | MiliAI 로고 | `public/assets/mili-logo.png` | 데스크톱 / 모바일 내비게이션 | 현재 기준 |
| 2026-07-29 | 공통 보상 팝업 참고 이미지 | 대화 첨부 원본 / 구현은 `RewardOverlay` | VOD 학습 완료 보상 | 현재 기준 |
| 2026-07-29 | 프레임 노출 규칙 | `docs/DESIGN_SYSTEM.md` | 전체 패널 | 현재 기준 |
| 2026-07-29 | AI Skill Badge Collection | `https://dusk-botany-90374806.figma.site` | 마이페이지 뱃지의 3개 역량군 / Lv1–Lv5 체계 | 현재 기준 |
| 2026-07-29 | 스트릭 / 역량 진단 / 로드맵 / VOD 레퍼런스 | 대화 첨부 원본 | 홈·마이페이지 스트릭 / 역량진단 / 학습여정 / VOD 학습기 | 현재 기준 |
| 2026-07-29 | 홈 작전 지도 배경 | `public/assets/home-command-map-background.png` | 홈 화면 전체 배경 | 현재 기준 |
| 2026-07-29 | 홈 로드맵 샘플 SVG | `public/assets/home-roadmap-sample.svg` | 홈 미션 맵 로드맵 안내 | 현재 기준 |
| 2026-07-29 | 라이트 모드 대시보드 컬러 레퍼런스 | `design-assets/archive/2026-07-29-light-mode-dashboard-reference.png` | 라이트 모드 캔버스 / 카드 / LNB / 라임 포인트 | 현재 기준 |
| 2026-07-29 | 홈 라이트 배경 | `public/assets/home-command-map-background-light.png` | 홈 / 라이트 모드 전체 배경 | 현재 기준 |
| 2026-07-29 | 홈 라이트 로드맵 SVG | `public/assets/home-roadmap-sample-light.svg` | 홈 / 라이트 모드 미션 맵 | 현재 기준 |
| 2026-07-29 | 장병 라이트 프로필 | `public/assets/soldier-profile-reference-light.png` | 홈 / 라이트 모드 프로필 카드 | 현재 기준 |

## 수신·반영 절차

1. 새로 제공받은 원본은 `design-assets/archive/`에 날짜와 용도가 드러나는 파일명으로 보관한다.
2. 화면에 직접 쓰는 이미지라면 최적화본을 `public/assets/`에 별도로 추가한다.
3. 이 표에 수신일, 원본 위치, 사용 화면, 기존 기준 대체 여부를 기록한다.
4. 같은 목적의 이전 에셋은 `대체됨`으로 남기고 삭제하지 않는다.
5. 구현 후 `docs/DESIGN_SYSTEM.md`의 토큰·컴포넌트 규칙과 `design-qa.md`를 함께 최신화한다.
