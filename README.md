# HappyGivers 고도화 - Front

## 프로젝트 목표

- **프론트엔드·백엔드 분리 아키텍처 구축**

  - Backend : Spring Boot
  - Frontend : Next.js(App Router) + Vercel

- **서버 상태와 클라이언트 상태의 명확한 분리**

  - 서버 상태 : TanStack Query 기반 데이터 패칭 및 캐싱
  - 클라이언트 상태 : Redux Toolkit 기반 UI / 인증 상태 관리

- **확장 가능한 프론트엔드 아키텍처 설계**

  - 페이지 / 비즈니스 로직 / UI 컴포넌트 역할 분리
  - 도메인(feature) 단위 코드 구조 설계

- **SEO 및 초기 렌더링 성능 최적화**

  - Next.js App Router 기반 SSR / SSG 활용
  - Metadata API를 통한 페이지 메타 정보 표준화
  - next/font 기반 폰트 로딩 최적화

- **환경 분리 및 배포 전략 수립**

  - 개발 / 운영 환경 분리
  - 환경 변수 기반 API 엔드포인트 관리
  - Vercel 기반 자동 배포 파이프라인 구성

- **쓰로틀, 디바운스 최적화, 옵티미스틱 업데이트 적용**
  - 잦은 사용자 인터랙션에서 불필요한 API 호출을 방지하기 위해 Throttle, Debounce를 적용
  - 서버 응답을 기다리지 않고 UI를 즉시 업데이트하는 Optimistic Update를 통해 사용자 경험을 개선

---

## 주요 기술 적용 및 개선내용

- **pnpm 사용**

  - 의존성을 하드링크 기반으로 관리하여 중복 설치를 방지하고, 설치 및 빌드 시간을 최적화

- **환경변수 관리**

  - 환경별 `.env` 설정 분리를 통해 개발/운영 환경 충돌 방지
  - `env.ts`에서 환경변수를 관리하여 접근을 일관되게 관리

- **React Query를 통한 서버 상태관리**

  - TanStack Query devtools : 개발 환경에서만 사용하도록 설정

- **Redux Toolkit을 통한 클라이언트 상태관리**

  - 전역에서 공유되는 UI 상태 및 인증 상태 관리를 위해 Redux Toolkit을 사용
  - `types` 폴더에 도메인 및 공통 타입 정의
  - `stores` 폴더에 각 상태 단위별 Slice 정의
  - `stores/index.ts`에서 Slice 리듀서들을 결합하여 store 생성
  - `providers.tsx`에서 Provider를 통해 애플리케이션에 store 주입
