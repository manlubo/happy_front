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


// 비밀번호 규칙
export const PASSWORD_RULES = {
  min: (v: string) => v.length >= 8,
  english: (v: string) => /[a-zA-Z]/.test(v),
  number: (v: string) => /[0-9]/.test(v),
  special: (v: string) => /[!@*.]/.test(v),
};

// 비밀번호 검증 커스텀 리파인
const validatePassword = (password: string, ctx: z.RefinementCtx) => {
  for (const rule of Object.values(PASSWORD_RULES)) {
    if (!rule(password)) {
      ctx.addIssue({
        code: "custom",
      });
      break;
    }
  }
}

// 회원가입 요청 스키마
export const signupRequestSchema = z
  .object({
    email: z.string().email(),
    password: z.string()
      .superRefine(validatePassword),
    name: z.string().min(2),
    tel: z.string().min(11),
    address: z.string().min(5),
    role: z.enum(UserRole),
  })
  .strict() satisfies z.ZodType<SignupRequest>
