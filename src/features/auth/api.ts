import publicApi from "@/lib/api/publicApi";
import { LoginRequest } from "@/types/auth";

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
