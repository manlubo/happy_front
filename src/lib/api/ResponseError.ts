import axios, { AxiosError } from "axios";

// API 응답 성공 타입
export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
}

// API 응답 에러 타입
export type ApiErrorResponse = {
  success: false;
  code: string;
  message: string;
}

export type ApiAxiosError = AxiosError<ApiErrorResponse>;

export function isApiAxiosError(error: unknown): error is ApiAxiosError {
  return axios.isAxiosError(error) && error.response?.data.success === false;
}