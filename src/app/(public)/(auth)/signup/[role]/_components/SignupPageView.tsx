'use client'

import { Icons } from "@/components/common/Icons";
import Block from "@/components/ui/Block";
import { signupRequestSchema } from "@/features/auth/schema";
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
    formState: { errors },
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

  const handleSignup = (data: SignupRequest) => {
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">
          <input type="text" value={email} disabled className="border border-gray-200 rounded-md p-2"/>
          <input type="password" {...register("password")} className="border border-gray-200 rounded-md p-2"/>
          <div className={`flex items-center gap-1 ${errors.password ? "text-red-500" : "text-blue-500"}`}>
            <Icons.check size={16}/>
            <p className="text-sm font-medium">8자 이상</p>
          </div>
          <input type="text" {...register("name")} className="border border-gray-200 rounded-md p-2"/>
          <input type="text" {...register("tel")} className="border border-gray-200 rounded-md p-2"/>
          <input type="text" {...register("address")} className="border border-gray-200 rounded-md p-2"/>
          {role === UserRole.ORG && <input type="text" value={role} disabled className="border border-gray-200 rounded-md p-2"/>}
          <button type="submit" className="cursor-pointer py-3 text-center bg-blue-500 text-white text-md font-semibold rounded-md w-full hover:bg-blue-600 transition">회원가입</button>
        </form>
      </Block>
    </div>
  )
}