'use client'

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Radio from "@/components/common/Radio";
import AuthLink from "@/components/ui/authLink";
import Block from "@/components/ui/Block";
import { signupMailApi } from "@/features/auth/api";
import { signupMailRequestSchema } from "@/features/auth/schema";
import { isApiAxiosError } from "@/lib/api/ResponseError";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { SignupMailRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useCooldown } from "@/features/common/hooks/useCooldown";

export default function SignupMailPageView() {
  const dispatch = useDispatch<AppDispatch>();

  const { time, isCooldown, startCooldown, stopCooldown } = useCooldown(60);
  
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
        console.log(error.response?.data.code);
        if(error.response?.data.code === "THROTTLE_ERROR"){
          dispatch(
            openModal({
              modalType: "alert",
              modalProps: {
                title: "인증메일 전송 실패",
                message: "잠시후 다시 시도해주세요.",
              },
            })
          );
        }
        else{
          stopCooldown();
          dispatch(
            openModal({
              modalType: "alert",
              modalProps: {
                title: "인증메일 전송 실패",
                message: error.response?.data.message || "인증메일 전송에 실패했습니다.",
              },
            })
          );
        }
      } else {
        stopCooldown();
        dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "인증메일 전송 실패",
              message: "잠시후 다시 시도해주세요.",
            },
          })
        );
      }
    },
  })

  const {
      register,
      handleSubmit,
      control,
      formState: { errors, isValid },
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
    startCooldown();
    signupMailMutation.mutate(data);
  }

  const role = useWatch({
    control,
    name: "role",
  });

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSendMail)} className="flex flex-col gap-4">
          <Radio
            value={role}
            options={[
              { label: "개인", value: UserRole.USER },
              { label: "기관", value: UserRole.ORG },
            ]}
            register={register("role")}
          />
          <Input label="이메일" type="text" {...register("email")} error={!!errors.email} errorLabel={"올바른 이메일을 입력해주세요."}/>
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} disabled={!isValid || isCooldown} className="mt-4">
            {isCooldown ? `${time}` : "인증메일 전송"}
          </Button>
        </form>
      </Block>
      <AuthLink page="signup" className="gap-6"/>
    </div>
  )
}