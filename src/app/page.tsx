'use client'

import { API_BASE_URL } from "@/lib/env"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { login, logout, updateUser } from "@/stores/authSlice";
import { LoginRequest, UserRole, UserStatus } from "@/types/auth";
import { useState } from "react";


export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  
  const [loginForm, setLoginForm] = useState<LoginRequest>({
    username: '',
    password: '',
    rememberMe: false,
  })

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
  }


  return (
    <div className="">
      <main className="">
        <h1 className="text-3xl font-bold">Hello World</h1>
        <div>API_BASE_URL : {API_BASE_URL}</div>
        <div>user_id : {user?.id}</div>
        <div>user_name : {user?.name}</div>
        <div>user_roles : {user?.roles}</div>
        <div>user_profile : {user?.profile}</div>
        <div>user_status : {user?.status}</div>
        <button onClick={() => dispatch(login({ id: 1, name: "유저", roles: [UserRole.USER], profile: "user-avatar.png", status: UserStatus.ACTIVE }))}>Login</button>
        <br/>
        <button onClick={() => dispatch(logout())}>Logout</button>
        <br/>
        <button onClick={() => dispatch(updateUser({ name: "관리자", roles: [UserRole.USER, UserRole.ADMIN], profile: "admin-avatar.png" }))}>Update User</button>
        <form onSubmit={handleLogin}>
          <input type="text" />
          <input type="text" />
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}
