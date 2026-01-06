import publicApi from "@/lib/api/publicApi";
import { LoginRequest } from "@/types/auth";

// 로그인
export const signIn = async (body: LoginRequest) => {
  const { data } = await publicApi.post("api/v1/auth/login", body);
  return data;
};