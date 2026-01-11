'use client'

import { useDispatch } from "react-redux"
import { AppDispatch } from "@/stores"
import { useMutation } from "@tanstack/react-query"
import { signInApi } from "@/features/auth/api"
import { LoginRequest } from "@/types/auth"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginRequestSchema } from "@/features/auth/schema"
import Block from "@/components/ui/Block"
import { login } from "@/stores/authSlice"
import { useRouter } from "next/navigation"
import { openModal } from "@/stores/uiSlice"

export default function LoginPageView() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
  
    const loginMutation = useMutation({
      mutationFn: signInApi,
      onSuccess: (resp) => {
        dispatch(login(resp.data));
        router.replace("/");
      },
      onError: (error) => {
        console.log(error);
        dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "로그인 실패",
              message: "아이디와 비밀번호를 확인해 주세요.",
            },
          })
        );
      },
    })
  
  const {
    register,
    handleSubmit,
  } = useForm<LoginRequest>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    shouldFocusError: false,
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const onInvalid = () => {
    dispatch(
      openModal({
        modalType: "alert",
        modalProps: {
          title: "로그인 실패",
          message: "아이디와 비밀번호를 확인해 주세요.",
        },
      })
    );
  };


  const handleLogin: SubmitHandler<LoginRequest> = (data) => {
    loginMutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">로그인</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleLogin, onInvalid)} className="flex flex-col gap-4">
          <input type="text" {...register("username")} className="border border-gray-200 rounded-md p-2"/>
          <input type="password" {...register("password")} className="border border-gray-200 rounded-md p-2"/>
          <label className="cursor-pointer mb-4"><input type="checkbox" {...register("rememberMe")}/> 로그인유지</label>
          <button type="submit" className="cursor-pointer py-3 text-center bg-blue-500 text-white text-md font-semibold rounded-md w-full hover:bg-blue-600 transition">로그인</button>
        </form>
      </Block>
    </div>
  );
}