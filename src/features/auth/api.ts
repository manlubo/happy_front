// API 호출

import publicApi from "@/lib/api/publicApi";
import { LoginRequest } from "@/types/auth";

// 로그인
export const signIn = (body: LoginRequest) => publicApi.post("api/v1/auth/login", body);