// 권한 타입
export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

// 유저 정보 타입
export interface User {
  id: number;
  name: string;
  profile?: string;
  roles: Role[];
}
