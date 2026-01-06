import { AxiosError } from 'axios'

// 401 응답시 가로채는 역할
export function authResponseInterceptor(error: AxiosError) {
  if (error.response?.status === 401) {
    console.warn('인증이 만료되었습니다.')
  }
  return Promise.reject(error)
}