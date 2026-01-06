'use client'

import { API_BASE_URL } from "@/lib/env"
import { useSelector, useDispatch } from "react-redux"
import { AppDispatch, RootState } from "@/stores"
import { login } from "@/stores/authSlice";
import { LoginRequest } from "@/types/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema } from "@/features/auth/schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/features/auth/api";


export default function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const loginMutation = useMutation({
    mutationFn: signIn,
    onSuccess: (resp) => {
      dispatch(login(resp.data));
    },
    onError: (error) => {
      console.log(error);
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })
  

  const handleLogin: SubmitHandler<LoginRequest> = (data) => {
    console.log(data);

    loginMutation.mutate(data);
    
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <input type="text" {...register("username")}/>
          <span className="text-red-500">
            {errors.username?.message}
          </span>
          <input type="text" {...register("password")}/>
          <span className="text-red-500">
            {errors.password?.message}
          </span>
          <input type="checkbox" {...register("rememberMe")}/>
          <button type="submit">Login</button>
        </form>
      </main>
    </div>
  );
}
