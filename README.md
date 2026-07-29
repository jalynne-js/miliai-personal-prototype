# MILI AI Learning Mission Control

AI 학습 포털 프로토타입입니다. VOD 강의, 프로젝트, 커뮤니티, 역량진단, 학습 여정, 마이페이지를 하나의 학습 흐름으로 제공합니다.

## 바로 보기

- 운영 미리보기: [mili-ai-vercel-deploy.vercel.app](https://mili-ai-vercel-deploy.vercel.app/)
- 로컬 미리보기: [http://localhost:3000](http://localhost:3000)

## 시작하기

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 수정할 때 먼저 볼 문서

- [작업 공간 가이드](docs/WORKSPACE.md) — 실제 수정 파일, 화면 상태, 자산, 작업 규칙
- [디자인 시스템 초안](DESIGN.md) — 브랜드, 토큰, 레이아웃 원칙
- [학습 포털 구조](LEARNING_SITE_STRUCTURE.md) — 메뉴와 사용자 흐름
- [디자인 QA](design-qa.md) — 현재 홈 화면의 검수 기준
- [생성 자산 프롬프트](ASSET-PROMPTS.md) — 이미지 자산의 출처와 재생성 프롬프트

## 현재 코드 구조

```text
src/
  app/
    page.tsx        # 실제 동작하는 단일 화면 진입점과 화면 전환 상태
    globals.css     # 전역 테마와 MILI 프레임 스타일
    layout.tsx      # 문서 메타데이터와 루트 레이아웃
  components/       # 아직 page.tsx에 연결되지 않은 분리 후보 컴포넌트
public/assets/      # 로고, 프로필, 배경 이미지 등 디자인 자산
docs/               # 이후 수정 작업을 위한 문서
```

현재는 화면 동작을 보존하기 위해 `src/app/page.tsx`를 기준으로 수정합니다. 화면을 기능별 컴포넌트로 분리하는 리팩터링은 다음 작업 단위로 진행합니다.
