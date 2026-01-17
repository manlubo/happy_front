'use client'

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Block from "@/components/ui/Block";
import { signupRequestSchema } from "@/features/auth/schema";
import { openDaumPostcode } from "@/lib/daumPostcode";
import { SignupRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface SignupPageViewProps {
  role: UserRole;
  email: string;
}

export default function SignupPageView({role, email}: SignupPageViewProps) {
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [mainAddress, setMainAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');

  const {
    register,
    handleSubmit,
    control,
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
      setValue("address", mainAddress + detailAddress);
    });
  }

  const password = useWatch({
    control,
    name: "password",
  });

  const handleSignup = (data: SignupRequest) => {
    setValue("address", mainAddress + detailAddress);
    console.log(data);
  }

  return (
    <div className="flex flex-col gap-12 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center">회원가입</h1>
      <Block className="rounded-lg p-8 ">
        <form onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">
          <Input label="이메일" type="text" value={email} disabled readOnly/>
          <Input label="비밀번호" type="password" {...register("password")} error={!!errors.password} errorLabel={"비밀번호는 8자 이상, 영문, 숫자, 특수문자(!@*.)를 포함해야 합니다."}/>
          <Input label="비밀번호 확인" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} error={password !== passwordConfirm} errorLabel={"비밀번호가 일치하지 않습니다." }/>
          <Input label={role === UserRole.ORG ? "기관명" : "이름"} type="text" {...register("name")}/>
          <Input label="전화번호" type="text" {...register("tel")} error={!!errors.tel} errorLabel={"올바른 전화번호를 입력해주세요."}/>
          <Input label="주소" type="text" value={mainAddress} rightSlot={<Button className="text-xs rounded-sm" onClick={handleSearchAddress}>주소검색</Button>} disabled/>
          <Input label="상세주소" type="text" value={detailAddress} onChange={(e) => {
            setDetailAddress(e.target.value);
            setValue("address", mainAddress + detailAddress);
          }} error={detailAddress.length < 1} errorLabel={"상세주소를 입력해주세요."}/>
          <Button type="submit" buttonColor="blue" buttonStyle="solid" fullWidth={true} disabled={!isValid || mainAddress.length < 1 || detailAddress.length < 1} className={`mt-4`}>
            회원가입
          </Button>
        </form>
      </Block>
    </div>
  )
}