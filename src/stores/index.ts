import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uiReducer from "./uiSlice";

// 전역 스토어 정의
export const store = configureStore({
    reducer: {
      // 리듀서 함수 연결
        auth: authReducer,
        ui: uiReducer,
    },
});

// 타입 추론 후 export
export type RootState = ReturnType<typeof store.getState>;
// dispatch 타입 추론 후 export
export type AppDispatch = typeof store.dispatch;