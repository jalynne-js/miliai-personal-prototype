# MiliAI 2.0 IA 구현 매핑

기준일: 2026-07-29

## 현재 구조 요약

- 현재 `src/app/page.tsx`는 하나의 클라이언트 페이지 안에서 상태로 화면을 전환한다.
- 재사용 가능한 화면: 홈 / VOD 강의 목록과 상세 / 프로젝트 목록 / 커뮤니티 / 역량진단 / 학습 여정 / 마이페이지 / 서비스 소개.
- 공통 디자인 언어: 다크 배경 / 라임 포인트 / 프레임 패널 / 좌측 내비게이션 / 반응형 모바일 드로어.
- `src/components/*`에는 이전 대시보드 시안 컴포넌트가 남아 있으나 현재 페이지 런타임에는 연결되지 않는다. 삭제하지 않고 현 구조를 유지한다.

## IA 메뉴 매핑

| IA 메뉴 | 권장 URL | 현재 대응 화면 | 분류 | 필요한 작업 | 주요 컴포넌트 |
| --- | --- | --- | --- | --- | --- |
| 홈 | `/` | 홈 | 기존 화면 수정 | IA 허브 링크 추가 | `HomeView` |
| 강의 | `/courses` | VOD 강의 | 기존 화면 수정 | 목록 / 검색 / 필터 / 상세 / 수강 흐름 / 학습기 연결 | `VodView` / `VodDetailView` / `LearningPlayerView` |
| 프로젝트 | `/projects` | 프로젝트 | 기존 화면 수정 | 목록 / 상세 / 신청 / 학습맵 / 미션 / 제출 흐름 | `ProjectView` / `ProjectDetailView` / `MissionView` |
| 내 학습 | `/learning` | 마이페이지 내 강의 | 중복 통합 | VOD / PBL 탭으로 통합 | `LearningView` |
| 클래스룸 | `/classrooms` | 없음 | 신규 생성 | 목록 / VOD·PBL 클래스 / 출석 / 헬프센터 / 테스트 | `ClassroomView` |
| 랭킹 | `/ranking` | 홈 내 부대별 순위 | 기존 화면 재사용 | 누적 크레딧 / 평균 진도율 / 문제 해결 탭 | `RankingView` |
| 쇼케이스 | `/showcase` | 없음 | 신규 생성 | 전시 목록 / 글쓰기 흐름 | `ShowcaseView` |
| 팀프로젝트 | `/team-projects` | 프로젝트 내 동료 평가 | 중복 통합 | 팀 현황 / 역할 / 피드백을 PBL과 연결 | `TeamProjectView` |
| 커뮤니티 | `/community` | 커뮤니티 | 기존 화면 수정 | 공지사항 / Q&A / FAQ / 글쓰기 URL | `CommunityView` |
| 통합검색 | `/search` | 없음 | 신규 생성 | 검색 전 / 결과 / 유형 탭 / 빈 상태 | `SearchView` |
| 마이페이지 | `/my` | 마이페이지 / 역량진단 | 기존 화면 수정 | 대시보드 / 온보딩 / 진단 / 보관함 / 수료증 / 보상 / 게시글 / 알림 / 설정 | `MyHubView` |
| 안내 | `/guide` | 학습 여정 / 서비스 소개 | 중복 통합 | 학습 로드맵 / 서비스 소개 | `GuideView` |

## 구현 순서

1. 기존 상태 기반 전환을 `next/navigation` 기반 URL 전환으로 교체하고, catch-all 라우트로 IA 하위 URL을 수용한다.
2. 좌측 내비게이션과 모바일 메뉴를 12개 IA 최상위 메뉴로 확장한다.
3. 기존 강의 / 프로젝트 / 커뮤니티 / 마이페이지를 새 URL에 재배치하고 상세·신청·학습 흐름을 연결한다.
4. 클래스룸 / 랭킹 / 쇼케이스 / 팀프로젝트 / 통합검색 / 안내 허브와 하위 상태를 생성한다.
5. 검색 전·결과 없음·수강 차단·잘못된 경로 오류 상태와 반응형 메뉴를 검증한다.

## 하위 흐름 URL

| 기능 | URL |
| --- | --- |
| 강의 상세 | `/courses/{강의-슬러그}` |
| 수강 중 VOD 학습기 | `/courses/{강의-슬러그}/learn` |
| 프로젝트 상세 | `/projects/{프로젝트-슬러그}` |
| 프로젝트 미션 / 제출 | `/projects/{프로젝트-슬러그}/mission` |
| VOD 클래스룸 | `/classrooms/vod-ai` |
| PBL 클래스룸 | `/classrooms/pbl-fitness` |
| 쇼케이스 글쓰기 | `/showcase/write` |
| 커뮤니티 Q&A 글쓰기 | `/community/write` |
| 검색 결과 | `/search/result` |
| 온보딩 설문 | `/my/onboarding` |
| 역량 진단 | `/my/level-test` |
| 보관함 | `/my/wishlist` |
| 수료증 | `/my/certificates` |
| 크레딧 / 보상 | `/my/credits` |
| 작성한 게시글 | `/my/posts` |
| 알림 | `/my/notifications` |
| 계정 설정 / 회원 탈퇴 | `/my/settings` / `/my/withdraw` |
| 학습 로드맵 | `/guide/roadmap` |
| 서비스 소개 | `/guide/about` |
