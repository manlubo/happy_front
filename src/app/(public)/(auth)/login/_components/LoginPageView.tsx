'use client'

import { LoginRequest } from "@/types/auth"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginRequestSchema } from "@/features/auth/schema"
import Block from "@/components/ui/Block"
import Button from "@/components/common/Button"
import Checkbox from "@/components/common/CheckBox"
import AuthLink from "@/components/ui/authLink"
import PasswordInput from "@/components/common/PasswordInput"
import Input from "@/components/common/Input"
import useLogin from "@/features/auth/hooks/useLogin"

export default function LoginPageView() {
  const loginMutation = useLogin();
  
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
    loginMutation.loginError();
  };


  const handleLogin: SubmitHandler<LoginRequest> = (data) => {
    loginMutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">로그인</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleLogin, onInvalid)} className="flex flex-col gap-4">
          <Input label="이메일 또는 휴대전화" type="text" {...register("username")}/>
          <PasswordInput label="비밀번호" {...register("password")}/>
          <Checkbox label="로그인유지" register={register("rememberMe")}/>
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} className="mt-4">
            로그인
          </Button>
        </form>
      </Block>
      <AuthLink page="login" className="gap-6"/>
    </div>
  );
}