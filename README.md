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

---
