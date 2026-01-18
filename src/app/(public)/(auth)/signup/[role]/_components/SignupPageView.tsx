'use client'

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import PasswordInput from "@/components/common/PasswordInput";
import Block from "@/components/ui/Block";
import useSendSms from "@/features/auth/hooks/useSendSms";
import useSignup from "@/features/auth/hooks/useSignup";
import useSignupSmsCheck from "@/features/auth/hooks/useSignupSmsCheck";
import { signupRequestSchema } from "@/features/auth/schema";
import { openDaumPostcode } from "@/lib/daumPostcode";
import { SignupRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface SignupPageViewProps {
  role: UserRole;
  email: string;
  token: string;
}

export default function SignupPageView({role, email, token}: SignupPageViewProps) {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [code, setCode] = useState('');

  const signupMutation = useSignup({token});
  const sendTelMutation = useSendSms();
  const verifyTelMutation = useSignupSmsCheck({setIsPhoneVerified});


  const {
    register,
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { isValid, errors },
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

  const handleSearchAddress = () => {
    openDaumPostcode((data) => {
      setMainAddress(data.roadAddress || data.jibunAddress);
      setDetailAddress("");
    });
  }

  const password = useWatch({
    control,
    name: "password",
  });

  const tel = useWatch({
    control,
    name: "tel",
  });

  const handleSendTel = async () => {
    const isTelValid = await trigger("tel");

    if(!isTelValid) return;

    sendTelMutation.startCooldown();
    sendTelMutation.mutate({tel});
  }

  const handleVerifyTel = async () => {
    if(!/^[0-9]{6}$/.test(code)){
      verifyTelMutation.smsCheckError();
      return;
    }
    verifyTelMutation.mutate({code, tel});
  }

  const handleSignup = (data: SignupRequest) => {
    signupMutation.mutate(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">
          <Input label="이메일" type="text" value={email} disabled readOnly/>
          <PasswordInput label="비밀번호" {...register("password")} error={!!errors.password} errorLabel={"비밀번호는 8자 이상, 영문, 숫자, 특수문자(!@*.)를 포함해야 합니다."}/>
          <PasswordInput label="비밀번호 확인" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} error={password !== passwordConfirm} errorLabel={"비밀번호가 일치하지 않습니다." }/>
          <Input label={role === UserRole.ORG ? "기관명" : "이름"} type="text" {...register("name")}/>
          <Input label="전화번호" type="text" {...register("tel")} error={!!errors.tel} maxLength={11} errorLabel={"올바른 전화번호를 입력해주세요."} disabled={isPhoneVerified || sendTelMutation.isCooldown}
          rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={isPhoneVerified || !!errors.tel || tel.length < 10 || sendTelMutation.isCooldown} onClick={handleSendTel}>{isPhoneVerified ? "인증완료" : sendTelMutation.isCooldown ? `${sendTelMutation.time}` : "인증번호"}</Button>}/>
          {!isPhoneVerified && sendTelMutation.isCooldown &&<Input label="인증번호" type="text" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={code.length < 6} onClick={handleVerifyTel}>인증받기</Button>}/>}
          <Input label="주소" type="text" value={mainAddress} rightSlot={<Button className="text-xs rounded-sm w-[68px]" onClick={handleSearchAddress}>주소검색</Button>} disabled readOnly/>
          <Input label="상세주소" type="text" value={detailAddress} onChange={(e) => {
            const value = e.target.value;
            setDetailAddress(value);
            setValue("address", `${mainAddress} ${value}`, {
              shouldDirty: true,
              shouldValidate: true,
            });
          }} error={mainAddress.length > 0 && detailAddress.length < 1} errorLabel={"상세주소를 입력해주세요."}/>
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} disabled={!isValid || mainAddress.length < 1 || detailAddress.length < 1 || !isPhoneVerified} className={`mt-4`}>
            회원가입
          </Button>
        </form>
      </Block>
    </div>
  )
}