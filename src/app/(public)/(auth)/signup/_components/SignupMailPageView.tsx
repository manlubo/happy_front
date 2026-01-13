'use client'

import { Icons } from "@/components/common/Icons";
import Block from "@/components/ui/Block";
import { signupMailApi } from "@/features/auth/api";
import { signupMailRequestSchema } from "@/features/auth/schema";
import { isApiAxiosError } from "@/lib/api/ResponseError";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { SignupMailRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function SignupMailPageView() {
  const dispatch = useDispatch<AppDispatch>();
  
    const signupMailMutation = useMutation({
      mutationFn: signupMailApi,
      onSuccess: () => {
        dispatch(openModal({
            modalType: "alert",
            modalProps: {
              title: "인증메일 전송",
              message: "인증메일이 전송되었습니다.",
            },
        }));
      },
      onError: (error) => {
        if(isApiAxiosError(error)) {
          dispatch(
            openModal({
              modalType: "alert",
              modalProps: {
                title: "인증메일 전송 실패",
                message: error.response?.data.message || "인증메일 전송에 실패했습니다.",
              },
            })
          );
        } else {
          dispatch(
            openModal({
              modalType: "alert",
              modalProps: {
                title: "인증메일 전송 실패",
                message: "서버에러입니다. 잠시후 다시 시도해주세요.",
              },
            })
          );
        }
      },
    })

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignupMailRequest>({
      mode: 'onSubmit',
      reValidateMode: 'onChange',
      shouldFocusError: false,
      resolver: zodResolver(signupMailRequestSchema),
      defaultValues: {
        email: '',
        role: UserRole.USER,
      },
    })
  
  const handleSendMail = (data: SignupMailRequest) => {
    signupMailMutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSendMail)} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label>
              <input type="radio" {...register("role")} value={UserRole.USER} className="cursor-pointer"/>
              개인
            </label>
            <label>
              <input type="radio" {...register("role")} value={UserRole.ORG} className="cursor-pointer"/>
              기관
            </label>
          </div>
          <input type="text" {...register("email")} className="border border-gray-200 rounded-md p-2"/>
          <div className={`flex items-center gap-1 ${errors.email ? "text-red-500" : "text-blue-500"}`}>
            <Icons.check size={16}/>
            <p className="text-sm font-medium">이메일 형식</p>
          </div>
          <button type="submit" className="cursor-pointer py-3 text-center bg-blue-500 text-white text-md font-semibold rounded-md w-full hover:bg-blue-600 transition">인증메일 전송</button>
        </form>
      </Block>
    </div>
  )
}