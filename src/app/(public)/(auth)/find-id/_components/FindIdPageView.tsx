'use client'

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import AuthLink from "@/components/ui/authLink";
import Block from "@/components/ui/Block";
import { sendTelApi, verifyTelApi } from "@/features/auth/api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { findIdRequestSchema } from "@/features/auth/schema";
import { useCooldown } from "@/features/common/hooks/useCooldown";
import { SendTelCheckRequest } from "@/types/auth";
import { useState } from "react";
import LinkButton from "@/components/common/LinkButton";

export default function FindIdPageView() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');

  const { time, isCooldown, startCooldown, stopCooldown } = useCooldown(180);

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

  const sendTelMutation = useMutation({
    mutationFn: sendTelApi,
    onSuccess: () => {
      dispatch(openModal({
          modalType: "alert",
          modalProps: {
            title: "인증번호 전송",
            message: "인증번호가 전송되었습니다.",
          },
      }));
    },
    onError: () => {
      dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "인증번호 전송 실패",
              message: "잠시후 다시 시도해주세요.",
            },
          })
      );
    },
  })

  const onInvalid = () => {
    dispatch(
      openModal({
        modalType: "alert",
        modalProps: {
          title: "인증번호 검증 실패",
          message: "인증번호가 일치하지 않습니다.",
        },
      })
    );
  };

  const verifyTelMutation = useMutation({
    mutationFn: verifyTelApi,
    onSuccess: (resp) => {
      if (!!resp.data?.email){
        setEmail(resp.data?.email);
      } else {
        dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "회원 정보 조회 실패",
              message: "해당 휴대폰번호로 등록된\n회원 정보를 찾을 수 없습니다.",
            },
          })
        );
        stopCooldown();
      }
    },
    onError: () => {
      dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "인증번호 검증 실패",
              message: "인증번호가 일치하지 않습니다.",
            },
          })
      );
    },
  })

  const tel = useWatch({ control, name: "tel" });

  const handleSendTel = async () => {
    const isTelValid = await trigger("tel");

    if(!isTelValid) return;

    startCooldown();
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
          <Input label="전화번호" type="text" {...register("tel")} error={!!errors.tel} maxLength={11} errorLabel={"올바른 전화번호를 입력해주세요."} disabled={isCooldown}
                    rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={!!errors.tel || tel.length < 10 || isCooldown} onClick={handleSendTel}>{isCooldown ? `${time}` : "인증번호"}</Button>}/>
          {isCooldown &&<Input label="인증번호" type="text" {...register("code")} maxLength={6}/>}
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