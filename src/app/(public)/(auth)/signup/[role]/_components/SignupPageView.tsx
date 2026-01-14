'use client'

import Button from "@/components/common/Button";
import { Icons } from "@/components/common/Icons";
import Input from "@/components/common/Input";
import Block from "@/components/ui/Block";
import { PASSWORD_RULES, signupRequestSchema } from "@/features/auth/schema";
import { SignupRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface SignupPageViewProps {
  role: UserRole;
  email: string;
}

export default function SignupPageView({role, email}: SignupPageViewProps) {

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<SignupRequest>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: zodResolver(signupRequestSchema),
    defaultValues: {
      email: email,
      password: '',
      name: '',
      tel: '',
      address: '',
      role: role,
    },
  })

  const password = watch("password") ?? "";

  const handleSignup = (data: SignupRequest) => {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">
          <Input label="이메일" type="text" value={email} disabled />
          <Input label="비밀번호" type="password" {...register("password")} />
          <div className="flex gap-2">
            <div className={`flex items-center gap-1 ${PASSWORD_RULES.min(password) ? "text-blue-500" : "text-red-500"} `}>
              <Icons.check size={16}/>
              <p className="text-sm font-medium">8자 이상</p>
            </div>
            <div className={`flex items-center gap-1 ${
              PASSWORD_RULES.english(password) ? "text-blue-500" : "text-red-500"
            }`}>
              <Icons.check size={16} />
              <p className="text-sm font-medium">영문</p>
            </div>
            <div className={`flex items-center gap-1 ${
              PASSWORD_RULES.number(password) ? "text-blue-500" : "text-red-500"
            }`}>
              <Icons.check size={16} />
              <p className="text-sm font-medium">숫자</p>
            </div>
            <div className={`flex items-center gap-1 ${
              PASSWORD_RULES.special(password) ? "text-blue-500" : "text-red-500"
            }`}>
              <Icons.check size={16} />
              <p className="text-sm font-medium">특수문자(!@*.)</p>
            </div>
          </div>
          <Input label="이름" type="text" {...register("name")}/>
          <Input label="전화번호" type="text" {...register("tel")}/>
          <Input label="주소" type="text" {...register("address")} />
          {role === UserRole.ORG && <Input label="" type="text" value={role} disabled/>}
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} disabled={!isValid} className={`cursor-pointer text-md font-semibold`}>
            회원가입
          </Button>
        </form>
      </Block>
    </div>
  )
}