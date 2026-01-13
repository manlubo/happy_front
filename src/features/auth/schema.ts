import { z } from 'zod'
import { SignupRequest, UserRole, type LoginRequest, type SignupMailRequest } from '@/types/auth'

// 로그인 요청 스키마
export const loginRequestSchema = z
  .object({
    username: z.string().min(5),
    password: z.string().min(8),
    rememberMe: z.boolean(),
  })
  .strict() satisfies z.ZodType<LoginRequest> // 서버 요청 구조와 같음을 명시


// 회원가입 인증메일 요청 스키마
export const signupMailRequestSchema = z
  .object({
    email: z.string().email(),
    role: z.enum(UserRole),
  })
  .strict() satisfies z.ZodType<SignupMailRequest>

// 회원가입 요청 스키마
export const signupRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    tel: z.string().min(11),
    address: z.string().min(5),
    role: z.enum(UserRole),
  })
  .strict() satisfies z.ZodType<SignupRequest>
