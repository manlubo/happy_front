import publicApi from "@/lib/api/publicApi";
import { LoginRequest, SignupMailRequest } from "@/types/auth";

// 로그인
export const signInApi = async (body: LoginRequest) => {
  const { data } = await publicApi.post("api/v1/auth/login", body);
  return data;
};

// 로그아웃
export const logoutApi = async () => {
  const { data } = await publicApi.post("api/v1/auth/logout");
  return data;
};

// 회원가입 메일전송
export const signupMailApi = async (body: SignupMailRequest) => {
  const { data } = await publicApi.post("api/v1/auth/signup/email/verification", body);
  return data;
};

// 회원가입 메일 토큰 검증
export const verifyMailTokenApi = async (token: string) => {
  const { data } = await publicApi.post(`api/v1/auth/signup/email/verification/check`, {token});
  return data;
};