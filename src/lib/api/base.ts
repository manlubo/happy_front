import axios from "axios";
import { API_BASE_URL } from "../env";

// Base API 생성
export const createApi = (withCredentials: boolean, baseURL: string = API_BASE_URL) => {
    return axios.create({
        baseURL,
        timeout: 10_000, // 응답 최대 대기시간
        withCredentials, // 쿠키 전달 여부
    })
}