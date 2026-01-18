'use client'

import Button from "@/components/common/Button";
import AuthLink from "@/components/ui/authLink";
import Block from "@/components/ui/Block";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findIdRequestSchema } from "@/features/auth/schema";
import { SendTelCheckRequest } from "@/types/auth";
import { useState } from "react";
import LinkButton from "@/components/common/LinkButton";
import Input from "@/components/common/Input";
import useSendSms from "@/features/auth/hooks/useSendSms";
import useFindIdSmsCheck from "@/features/auth/hooks/useFindIdSmsCheck";

export default function FindIdPageView() {
  const [email, setEmail] = useState('');

  const { register, handleSubmit, control, trigger, formState: { errors } } = useForm<SendTelCheckRequest>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    resolver: zodResolver(findIdRequestSchema),
    defaultValues: {
      tel: '',
      code: '',
    },
  })

  const sendTelMutation = useSendSms();
  
  const verifyTelMutation = useFindIdSmsCheck({
    setEmail,
    stopCooldown: sendTelMutation.stopCooldown,
  });

  const onInvalid = () => {
    verifyTelMutation.smsCheckError();
  };

  const tel = useWatch({ control, name: "tel" });

  const handleSendTel = async () => {
    const isTelValid = await trigger("tel");

    if(!isTelValid) return;

    sendTelMutation.startCooldown();
    sendTelMutation.mutate({ tel });
  }

  const handleFindId = (data: SendTelCheckRequest) => {
    verifyTelMutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">아이디 찾기</h1>
      <Block className="rounded-lg p-8 ">
        {email.length > 0 ? 
        <>
          <Input label="아이디 찾기 결과" type="text" disabled value={email} readOnly/>
          <div className="flex justify-center mt-8 gap-2">
            <LinkButton label="로그인" href="/login"/>
            <LinkButton label="비밀번호 찾기" href="/signup" buttonColor="blue" buttonStyle="outline"/>
          </div>
        </>
          :
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleFindId, onInvalid)}>
          <Input label="전화번호" type="text" {...register("tel")} error={!!errors.tel} maxLength={11} errorLabel={"올바른 전화번호를 입력해주세요."} disabled={sendTelMutation.isCooldown}
                    rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={!!errors.tel || tel.length < 10 || sendTelMutation.isCooldown} onClick={handleSendTel}>{sendTelMutation.isCooldown ? `${sendTelMutation.time}` : "인증번호"}</Button>}/>
          {sendTelMutation.isCooldown &&<Input label="인증번호" type="text" {...register("code")} maxLength={6}/>}
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} className="mt-4">
            아이디 찾기
          </Button>
        </form> 
        }
      </Block>
      <AuthLink page="findId" className="gap-6"/>
    </div>
  )
}