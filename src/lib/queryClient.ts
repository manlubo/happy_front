import { QueryClient } from '@tanstack/react-query'

// React Query 전역 설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30, // 데이터 30초 동안 유효(해당 시간동안 캐시 유지: API 호출 빈도 조절)
      retry: 1, // 실패시 재시도 횟수
      refetchOnWindowFocus: false, // 윈도우 포커스 시 재로딩 여부
    },
  },
})
