# Design QA — MILI AI Mission-Map Home

## Comparison target

- Source visual truth: the provided MILI AI mission-map home screenshot, profile-frame screenshot, and supplied original assets.
- Supplied profile asset: `public/assets/soldier-profile-reference.png`
- Supplied home background asset: `public/assets/home-mission-map-background.png` (latest supplied `홈화면 배경(2).png`)
- Implementation capture: `implementation-home-full-background.png`
- Viewport: 1280 × 720 CSS pixels, desktop learner home state.

## Evidence reviewed

- The home was captured after its structure was changed to the supplied mission-map layout: the supplied map now spans the complete home canvas, with the headline readable on a top-only left-to-right scrim and the profile/recent-project frames placed below it.
- The My Page screen was opened and checked for exactly one `김철수 상병 프로필` image, using the supplied original character image.
- Primary navigation was checked for Home and My Page; the browser console had no error-level entries.

## Required fidelity surfaces

| Surface | Result |
| --- | --- |
| Fonts and typography | Strong Korean display hierarchy, compact system labels, and high contrast stay readable on the dark map background. |
| Spacing and layout rhythm | The fixed rail, wide mission-map hero, and independent profile/project panels retain consistent spacing. The hero has no frame; the lower panels begin after a 20px grid gap, so the background and foreground panels do not overlap. |
| Colors and tokens | The supplied monochrome terrain is preserved; near-black surfaces and constrained lime signals create the requested mission-control hierarchy. |
| Image quality and asset fidelity | The supplied male soldier is used directly on My Page and in the header avatar. The latest supplied mission-map image is used directly as the fixed, full-home background rather than inside a panel. |
| Copy and content | The full VOD, PBL, community, diagnosis, roadmap, and personal-learning structure remains present. |

## Findings

- No actionable P0, P1, or P2 issues remain.
- [P3] At narrow widths, the stage map converts to a vertical list; this retains each stage label without text or node collisions.

## Implementation checklist

- [x] Replace project-only background imagery with the supplied source image.
- [x] Replace profile imagery with the supplied male-soldier asset.
- [x] Use the supplied logo asset in the desktop and mobile navigation.
- [x] Rebuild the home as a mission-map hero plus non-overlapping profile/project frames.
- [x] Replace the full-home backdrop with the latest supplied mission-map reference image.
- [x] Add compact peer-review entry point and an incrementally updating unit-ranking interaction to the home.
- [x] Add selectable VOD course-introduction page and My Page course, activity, and badge-detail views.
- [x] Verify primary navigation, profile rendering, console errors, lint, and production build.

final result: passed

---

## 강의 난이도 / PBL 보상 / 커뮤니티 상세

- 검증 일시: 2026-07-29
- 구현 화면: `/courses/` / `/projects/[slug]/` / `/projects/[slug]/mission/` / `/community/` / `/diagnosis/` / `/showcase/[slug]/`
- 검증 항목: 강의 난이도 필터, 테마·검색 버튼 분리, PBL 팀원·동료평가 이동, 미션 제출 보상 오버레이, 커뮤니티 탭별 글과 상세 이동, 육각형 역량 표시, 쇼케이스 결과물 모달, 홈·마이페이지 실물 뱃지 노출
- 결과: 통과. 정적 빌드가 성공했고, 기존 공개 라우팅과 완료 보상 흐름을 유지합니다.
- 후속 P3: 실제 사용자·팀·게시글·역량 진단 데이터를 연결하면 현재의 목업 콘텐츠를 실시간 데이터로 전환할 수 있습니다.

final result: passed

---

## 메뉴 상세 화면 / 최신 보상 정책

- 검증 일시: 2026-07-29
- 기준 자산: `miliai-reference-project-catalog.png` / `miliai-reference-learning-vod.png` / `miliai-reference-learning-pbl.png` / `miliai-reference-classroom.png` / `miliai-reference-ranking-*.png` / `mvp_rewards_rewrite.md`
- 구현 화면: `/projects/` / `/learning/` / `/classrooms/` / `/ranking/` / `/my/credits/`
- 검증 항목: 정적 경로의 끝 슬래시 처리 / 프로젝트 목록 / VOD·PBL 전환 / 랭킹 탭·필터·개인 순위 / 탐사 XP·Lv·뱃지·인증서 정책 문구
- 결과: 통과. 프로젝트 카탈로그와 보상 센터의 최신 정책 문구가 렌더링되고, 콘솔 오류가 없습니다.
- 후속 P3: 실제 API 연결 시 완료 이벤트와 중복 지급 검증은 서버 응답으로 교체합니다.

final result: passed

## 2026-07-29 — AI 교관 즉시 상담

### 확인 기준

- 구현 화면: 홈 / 다크 모드 / 데스크톱
- 검증 흐름: `질문 시작하기` → AI 교관 상담 다이얼로그 → 빠른 질문 → 직접 입력 후 Enter 전송

### 결과

- 다크 모드의 좌측 AI 교관 CTA가 Signal lime 배경으로 표시된다.
- CTA 선택 시 일반 상세 화면이 아닌 대화형 AI 교관 다이얼로그가 즉시 열린다.
- 빠른 질문 3종, 직접 질문 입력, Enter 전송, 사용자 메시지 및 맥락형 교관 응답을 확인했다.
- 라이트 모드에서는 CTA가 연한 라임 표면으로 전환되며, 공통 버튼 그림자 제거 규칙을 유지한다.
- 브라우저 콘솔 오류 0건, 린트·프로덕션 빌드 통과.

final result: passed

## 2026-07-29 — 홈 라이트 전용 에셋 교체

### 비교 기준

- 제공 배경: `design-assets/archive/2026-07-29-home-background-light.png` (`3838 × 2160`)
- 제공 로드맵: `design-assets/archive/2026-07-29-home-roadmap-light.svg`
- 제공 프로필: `design-assets/archive/2026-07-29-soldier-profile-light.png` (`258 × 270`)
- 구현 캡처: `/tmp/mili-home-light-assets-1920x1080.png`
- 상태: 홈 / 라이트 모드 / `1920 × 1080` CSS 픽셀 / 1× 밀도

### 전체·집중 영역 비교

- 전체 화면: 제공된 밝은 지형 배경이 홈 캔버스 전체에 `cover`로 표시된다.
- 집중 영역 / 미션 맵: 넓은 데스크톱에서 제공된 라이트 SVG가 기존 다크 SVG 대신 표시되며 단계 글자와 경로가 읽힌다.
- 집중 영역 / 프로필: 제공된 투명 배경 장병 이미지를 라이트 프로필 카드에 사용하고, 다크 프로필 자산은 보존했다.

### 필수 표면 확인

| 표면 | 결과 |
| --- | --- |
| Fonts / typography | 라이트 배경 위에서 미션 제목과 단계 글자의 대비가 유지된다. |
| Spacing / layout rhythm | 다크·라이트 간 홈 모듈 좌표와 무스크롤 레이아웃을 보존했다. |
| Colors / tokens | 제공 라이트 배경 및 SVG의 밝은 회색·라임 톤을 제품 라이트 팔레트와 결합했다. |
| Image quality | 세 자산 모두 원본 파일을 공개 자산으로 복사해 사용했으며, 확대·왜곡 없이 각각의 비율을 유지한다. |
| Copy / content | 기존 한국어 단계·프로필·프로젝트 문구를 변경하지 않았다. |

### 확인 항목

- [x] 라이트 토글 후 배경 URL `home-command-map-background-light.png`
- [x] 라이트 로드맵 SVG 및 라이트 프로필 이미지 URL
- [x] 1920 × 1080 홈 무스크롤
- [x] 린트 / 프로덕션 빌드 통과

### 결과

- P0/P1/P2 잔여 이슈 없음.

final result: passed

## 2026-07-29 — 라이트 모드 대시보드 컬러 리프레시

### 비교 기준

- 소스 시각 기준: `design-assets/archive/2026-07-29-light-mode-dashboard-reference.png` (`736 × 552`)
- 구현 캡처: `/tmp/mili-light-mode-dashboard-1280x720.png` (`1280 × 720`)
- 상태: 데스크톱 홈 / 라이트 모드 / 1× CSS 밀도
- 비교 범위: 화면 구조가 아닌 라이트 모드의 캔버스, LNB, 카드, 텍스트, 라임 신호색. 원본은 일반 대시보드, 구현은 MiliAI 홈이므로 정보 구조 차이는 의도된 차이로 분리했다.

### 전체·집중 영역 비교

- 전체 화면: 레퍼런스의 부드러운 회백색 캔버스와 순백 카드 대비를 `#F7F7F7` / `#FFFFFF`로 반영했다.
- 집중 영역 / LNB: 불투명한 흰색 대신 `#FBFBF9` 반투명 표면, 비활성 항목의 투명 배경, 선택 항목의 연한 회색 표면과 좌측 라임 신호선을 적용했다.
- 집중 영역 / 타이포그래피: 제목 그림자를 제거하고 본문 `#1B1D1B`, 보조 정보 `#6F736E`로 대비를 정리했다.

### 필수 표면 확인

| 표면 | 결과 |
| --- | --- |
| Fonts / typography | 다크 모드 전용 타이틀 그림자를 제거했고, 제목·본문·보조 정보의 명도 위계를 분리했다. |
| Spacing / layout rhythm | 기존 MiliAI 홈 구조와 여백은 보존했다. 레퍼런스와 다른 대시보드 IA는 의도된 차이다. |
| Colors / tokens | 캔버스 `#F7F7F7`, 카드 `#FFFFFF`, LNB `#FBFBF9`, 경계 `#E4E6E1`, 라임 배경 `#A9F541`을 확인했다. |
| Image quality | 기존 MiliAI 로고·장병 프로필 자산을 보존했으며, 색상 레퍼런스는 이미지 자산 대체를 요구하지 않는다. |
| Copy / content | 서비스 고유의 한국어 메뉴·학습 문구를 유지했다. |

### 확인 항목

- [x] 라이트 토글 전환
- [x] 캔버스 / 카드 / LNB / 제목 그림자 / 비활성 메뉴 배경의 계산 색상 확인
- [x] 브라우저 콘솔 오류 0건

### 결과

- 이전 점검의 P1: 라이트 모드의 다크 제목 그림자와 비활성 LNB 항목의 불필요한 회색 채움은 제거했다.
- P0/P1/P2 잔여 이슈 없음.

final result: passed

## 2026-07-29 — 홈 SVG 로드맵 / 테마 기본값 / 하단 모듈 배치

### 결과

- 제공된 `홈 로드맵 샘플.svg`를 `public/assets/home-roadmap-sample.svg`로 보관하고, 넓은 데스크톱 홈 미션 맵에 원본 그대로 배치했다.
- 기존 HTML 단계 텍스트와 점선 연결선은 제거했다.
- 기본 테마는 블랙 다크 모드이며, 상단 토글로 `#F7F7F7` 라이트 모드로 전환되는 것을 확인했다.
- 프로필 모듈은 `left = 304px`, `top = 641px` 기준으로 확인됐고, 900px 이상 높이의 데스크톱에서는 하단 여백을 기준으로 고정한다.

### 확인 항목

- [x] 새 홈 배경 자산 로드
- [x] SVG 로드맵 자산 로드 / 기존 HTML 단계 노드 0개
- [x] 다크 기본 / 라이트 토글 상태
- [x] 무스크롤, 콘솔 오류 없음, 린트 및 프로덕션 빌드 통과

final result: passed

## 2026-07-29 — 홈 작전 지도 레퍼런스 반영

### 비교 기준

- 참고 코드: `/Users/gimhyeonseo/.codex/attachments/eb540043-5815-40a6-8351-7d00a88fe8f8/pasted-text.txt`
- 구현 캡처: `/tmp/mili-home-command-map.png`
- 상태: 데스크톱 홈 기본 화면 / 3일 스트릭 표시 / 2단계 진행 중

### 결과

- 레퍼런스의 다크 작전 지도, 대형 작전 타이틀, 1–4단계와 최종 인증서 노드를 홈 미션 맵에 반영했다.
- 현재 단계인 `생성 AI 활용`은 레퍼런스처럼 주황 신호색으로 구분하고 나머지 단계는 백색 / 회색 위계를 유지했다.
- 기존의 프로필·최근 프로젝트·스트릭·최종 메뉴 구조는 보존했다.

### 확인 항목

- [x] 작전 지도 단계 노드와 한국어 단계명
- [x] 현재 단계 주황 강조
- [x] 홈 화면 무스크롤 (`scrollHeight = clientHeight = 720`)
- [x] 콘솔 오류 없음 / 린트 통과

final result: passed

## 2026-07-29 — 라이트 업무 화면 / VOD 3분할 학습기

### 비교 기준

- 참고 이미지: 대화로 제공된 스트릭 / AI 역량 진단 / 학습 로드맵 / 3분할 VOD 학습기 화면과 `AI Skill Badge Collection` 사이트
- 구현 캡처: `/tmp/mili-vod-three-pane.png`, `/tmp/mili-diagnosis-light.png`, `/tmp/mili-home-flat-navigation.png`
- 주요 상태: 홈 기본 / 역량진단 라이트 테마 / VOD 학습 시작 전

### 결과

- 홈과 VOD 학습기는 다크 몰입 표면을 유지하고, 역량진단을 포함한 업무 화면은 플랫 라이트 테마로 전환했다.
- 라이트 화면에서 LNB·헤더는 반투명 화이트, 다크 화면에서는 반투명 다크 표면으로 렌더링된다.
- VOD는 영상 / 실습·결과 / 목차·노트·답벗의 3개 독립 영역으로 나뉘며, 영상 재생·완료·실습 실행·우측 탭 전환을 확인했다.
- 최종 LNB에는 홈, 강의, 프로젝트, 쇼케이스, 커뮤니티, 역량진단, 학습여정, 마이페이지, 서비스소개만 노출되고, 통합검색은 상단 아이콘으로 이동했다.

### 확인 항목

- [x] VOD 3분할 핵심 영역과 상호작용
- [x] 라이트 화면에서 콘텐츠 대비와 검색 아이콘
- [x] 홈 화면의 720px 기준 무스크롤 (`scrollHeight = clientHeight`)
- [x] 메뉴 9개 항목과 역량진단 라우트
- [x] 콘솔 오류 없음 / 린트 / 프로덕션 빌드 통과

### 잔여 차이

- [P3] 대화 첨부 원본 중 임시 경로에서 사라진 파일은 픽셀 단위 병합 비교를 할 수 없었다. 시각 구조와 정보 위계는 제공된 대화 이미지 기준으로 반영했다.

final result: passed

## 2026-07-29 — 팀 프로젝트 프레임 온디맨드 노출

### 비교 기준

- 참고 이미지: 브라우저 주석으로 제공된 팀 프로젝트 모바일 화면 (`542 × 1323`), 선택된 `내 프로젝트 팀` 패널의 상시 라임 코너 프레임을 숨기는 요청
- 구현 캡처: `/tmp/mili-team-projects-frame-default-542x1323.png`
- 구현 URL: `http://localhost:3000/team-projects`
- CSS 뷰포트 / 구현 픽셀: `542 × 1323` / `542 × 1323`, 1× 밀도
- 상태: 팀 선택 기본 상태 / 포인터가 패널 밖에 있는 상태

### 비교 결과

- 기본 상태에서 대상 패널의 `::before`, `::after` 코너 프레임 opacity는 모두 `0`이며, 기본 테두리는 표면 구분을 위한 저대비 `rgb(39, 49, 40)`만 남는다.
- 팀 선택 버튼을 포커스한 상태에서는 대상 패널이 `:focus-within`이 되고 코너 프레임 opacity가 모두 `1`이 되는 것을 확인했다. hover에도 같은 CSS 규칙이 적용된다.
- 모바일 `542px` 폭에서 `scrollWidth = clientWidth = 542px`로 가로 오버플로가 없고, 콘솔 오류도 없다.

### 필수 표면 확인

| 표면 | 결과 |
| --- | --- |
| Fonts / typography | 기존 제목·본문 위계와 줄바꿈을 유지했다. |
| Spacing / layout rhythm | 패널 여백과 팀 카드 간격은 바꾸지 않아 모바일 세로 흐름을 유지한다. |
| Colors / tokens | 기본에는 저대비 표면 경계만, hover·focus에는 Signal lime을 노출한다. 선택된 팀의 상태 라임은 의도적으로 유지했다. |
| Image quality | 배경·아바타 등 이미지 자산을 변경하지 않았다. |
| Copy / content | 사용자 노출 문구를 변경하지 않았다. |

### 확인 항목

- [x] 전역 `mili-frame` 코너 프레임 기본 숨김
- [x] hover / focus-within에서 코너 프레임, 테두리, 글로우 노출
- [x] 선택·진행 상태의 라임 정보는 보존
- [x] 팀 프로젝트 모바일 화면 가로 오버플로 및 콘솔 오류 확인

### 잔여 차이

- [P3] 기본 저대비 외곽선은 패널의 경계를 읽기 위해 유지했다. 이는 사용자가 지적한 라임 코너 프레임과는 별개의 표면 구분 규칙이다.

final result: passed

## 2026-07-29 — VOD 수료 보상 전체 화면 오버레이

### 비교 기준

- 참고 이미지: 대화로 제공된 `공통 보항 팝업.png` (`/Users/gimhyeonseo/Downloads/공통 보항 팝업.png`)
- 구현 캡처: `/tmp/mili-reward-overlay-1280x720.png`
- 검증 상태: VOD가 마지막 재생 시간에 도달한 직후 / 보상 수령 전 / 데스크톱 `1280 × 720` CSS 뷰포트
- 참고 파일은 대화 이미지로 시각 비교했고, QA 시점에는 지정된 Downloads 경로에서 원본 파일을 다시 읽을 수 없어 병합 비교 이미지는 생성하지 않았다.

### 결과

- 별도 브라우저 창 대신 전체 화면을 딤 처리하고, 기존 화면을 배경으로 유지하는 단일 오버레이를 적용했다.
- 라임 신호색의 외곽선·모서리 프레임, `임무 보고` 라벨, 3개 보상 카드, 전체 폭 수령 버튼을 참고 이미지의 정보 구조에 맞춰 배치했다.
- `Mission Complete`에는 진입 확대, 라임 글로우, 스캔 라인 애니메이션을 적용하고, 모션 감소 환경에서는 애니메이션을 정지한다.
- 실제 영상 재생 후 완료 시점을 기다려 자동 표시를 확인했다. 수령 버튼 선택 후에는 오버레이가 닫히고 `보상 수령이 완료되었습니다 / 크레딧 +150 / 프롬프트 실전 뱃지 획득` 상태가 표시된다.

### 확인 항목

- [x] 영상 완료 시 보상 오버레이 자동 노출
- [x] 전체 화면 딤 처리 및 기존 VOD 학습기 위의 단일 오버레이
- [x] 보상 수령 후 오버레이 닫힘 및 완료 상태 표시
- [x] 제공 참고 이미지의 다크 / 라임 / 미션 리포트 레이아웃 반영
- [x] 수동 완료 처리 버튼으로도 동일한 완료 상태 재현 가능

### 잔여 차이

- [P3] 참고 이미지의 번개·육각형·불꽃 전용 일러스트 대신 현재 제품의 Lucide 아이콘 체계를 사용했다. 서비스 전반의 아이콘 일관성을 유지하기 위한 선택이다.

final result: passed
## 2026-07-29 — 홈 화면 1080px 뷰포트 컴팩트화

### 비교 기준

- 참고 이미지: `/var/folders/rq/0l7s__ts2fscllvr_1s5p09m0000gn/T/codex-clipboard-da8f47cc-dadb-4065-abd7-32f9d2e0fcca.png`
- 구현 캡처: `/tmp/mili-home-implementation-1920x1080-final.png`
- 검증 상태: 데스크톱 홈 기본 상태, CSS 뷰포트 `1920 × 1080`
- 참고 이미지 해상도는 `3840 × 2160`(2×)이며, 1920 × 1080 기준으로 정규화해 비교했다.
- 브라우저 캡처 전송본은 `1558 × 1080` PNG로 내려왔지만, `window.innerWidth/innerHeight`와 DOM 사각형을 기준으로 실제 CSS 뷰포트를 확인했다.

### 결과

- 프로필 및 최근 프로젝트 패널의 하단은 각각 `y = 963px`이며, 1080px 뷰포트 내에 117px의 여유를 두고 모두 표시된다.
- 히어로 영역을 압축하고, 참고 이미지 구조에 맞춰 프로필 통계·레벨 진행도·최근 프로젝트의 현재 단계와 전체 폭 CTA를 배치했다.
- 다크 월드맵 배경, 라임 신호색, 고대비 타이포그래피, 제공된 병사 이미지를 유지했다.

### 확인 항목

- [x] 1920 × 1080 데스크톱에서 프로필 영역 전체 노출
- [x] 1920 × 1080 데스크톱에서 최근 프로젝트 영역 전체 노출
- [x] 390 × 844 모바일 레이아웃의 세로 흐름 및 가로 오버플로 확인
- [x] 제공된 이미지 자산을 사용하고 대체용 생성 이미지를 추가하지 않음
- [x] 린트 및 프로덕션 빌드 확인

### 잔여 차이

- [P3] 참고 이미지의 다중 원형 일러스트 링 대신, 제공된 병사 이미지를 원형으로 크롭해 사용했다. 화면 밀도와 영역 크기는 맞추되 이미지 자체의 충실도를 우선한 선택이며, 필요하면 다음 작업에서 장식 링을 더 정교하게 다듬을 수 있다.

final result: passed

---

## 보상 센터 / 탐사 뱃지 컬렉션

- 검증 일시: 2026-07-29
- 기준 자산: `public/assets/badges/collection-level-1.png` ~ `collection-level-5.png`
- 구현 화면: `/my/credits/`
- 검증 항목: 레벨 필터 전환 / 배지 컬렉션 이미지 / 탐사 경험치 / 탐사 Lv / 탐사 인증서 / 다음 미션 이동
- 결과: 통과. Lv.4 전환과 다음 미션 이동을 확인했으며, 콘솔 오류가 없습니다.
- 후속 P3: 작은 화면에서 배지 컬렉션 이미지를 더 압축해 볼 수 있습니다.

final result: passed

---

## 강의 / PBL 상세 공개 흐름

- 검증 일시: 2026-07-29
- 기준 자산: `miliai-reference-course-catalog.png` / `miliai-reference-course-detail.png` / `miliai-reference-project-detail.png`
- 구현 화면: `/courses/` / `/courses/[slug]/` / `/projects/[slug]/`
- 검증 항목: 강의 검색·레벨 필터·8개 콘텐츠 카드 / 강의 소개·콘텐츠·목차·보관함 / PBL 개요·3개 미션 / 로그인 없이 상세·학습 접근
- 결과: 통과. 세 화면이 비어 있지 않은 콘텐츠로 렌더링되고, 공개 학습 CTA와 미션 링크가 작동하며 콘솔 오류가 없습니다.
- 후속 P3: 운영 데이터 API 연결 시 강의 수·기간·콘텐츠 ID를 실제 응답으로 교체합니다.

final result: passed
