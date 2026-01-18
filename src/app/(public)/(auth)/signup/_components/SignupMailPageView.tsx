'use client'

import Button from "@/components/common/Button";
import Radio from "@/components/common/Radio";
import AuthLink from "@/components/ui/authLink";
import Block from "@/components/ui/Block";
import { signupMailRequestSchema } from "@/features/auth/schema";
import { SignupMailRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import Input from "@/components/common/Input";
import useSignupMail from "@/features/auth/hooks/useSignupMail";

export default function SignupMailPageView() {
  const signupMailMutation = useSignupMail();

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
    signupMailMutation.startCooldown();
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
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} disabled={!isValid || signupMailMutation.isCooldown} className="mt-4">
            {signupMailMutation.isCooldown ? `${signupMailMutation.time}` : "인증메일 전송"}
          </Button>
        </form>
      </Block>
      <AuthLink page="signup" className="gap-6"/>
    </div>
  )
}