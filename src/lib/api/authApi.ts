import { createApi } from "./base";
import { authResponseInterceptor } from "./interceptors/authResponse";

// 인증이 필요한 API
const authApi = createApi(true);

// 응답 인터셉터 추가
authApi.interceptors.response.use(
  (res) => res,
  authResponseInterceptor
)

export default authApi;