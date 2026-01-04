import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/auth";

// 로그인 상태
interface AuthState {
  user: User | null;
}

// 로그인 상태 초기값
const initialState: AuthState = {
  user: null,
};

// 로그인 상태 관리
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
    // 유저 정보만 갱신 (프로필 수정 등)
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = state.user ? { ...state.user, ...action.payload } : null;
      }
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
