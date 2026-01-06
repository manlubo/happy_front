import { createApi } from "./base";

// 인증이 필요 없는 API
const publicApi = createApi(false);

export default publicApi;