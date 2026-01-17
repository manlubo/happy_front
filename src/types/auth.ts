// 권한
export enum UserRole {
  ADMIN = "ADMIN",
  ORG = "ORG",
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

// 회원가입 인증메일 요청
export interface SignupMailRequest {
  email: string;
  role: UserRole;
}

// 회원가입 요청
export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  tel: string;
  address: string;
  role: UserRole;
}

// 전화번호 인증번호 요청
export interface SendTelRequest {
  tel: string;
}

// 전화번호 인증번호 확인
export interface SendTelCheckRequest {
  tel: string;
  code: string;
}
