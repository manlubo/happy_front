// 권한
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// 유저 상태
export enum UserStatus {
  READY = "READY",
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  DELETED = "DELETED",
}

// 로그인 응답
export interface LoginResponse {
  id: number;
  name: string;
  profile?: string;
  status?: UserStatus;
  roles: UserRole[];
}

// 로그인 요청
export interface LoginRequest {
  username: string;
  password: string;
  rememberMe: boolean;
}