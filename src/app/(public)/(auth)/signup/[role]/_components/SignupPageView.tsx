'use client'

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Block from "@/components/ui/Block";
import { sendTelApi, signupApi, verifyTelApi } from "@/features/auth/api";
import { signupRequestSchema } from "@/features/auth/schema";
import { useCooldown } from "@/features/common/hooks/useCooldown";
import { isApiAxiosError } from "@/lib/api/ResponseError";
import { openDaumPostcode } from "@/lib/daumPostcode";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { SignupRequest, UserRole } from "@/types/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";

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

  const { time, isCooldown, startCooldown } = useCooldown(180);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const signupMutation = useMutation({
    mutationFn: (body: SignupRequest) => signupApi(body, token),
    onSuccess: () => {
      dispatch(openModal({
          modalType: "alert",
          modalProps: {
            title: "회원가입",
            message: "회원가입이 완료되었습니다.",
          },
      }));
      router.push("/login");
    },
    onError: (error) => {
      if(isApiAxiosError(error)){
        dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "회원가입 실패",
              message: error.response?.data.message || "회원가입에 실패했습니다. 잠시후 다시 시도해주세요.",
            },
          })
        );
      } else {
        dispatch(
          openModal({
            modalType: "alert",
            modalProps: {
              title: "회원가입 실패",
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
              message: "서버에러입니다. 잠시후 다시 시도해주세요.",
            },
          })
      );
    },
  })

  const verifyTelMutation = useMutation({
    mutationFn: verifyTelApi,
    onSuccess: (data) => {
      if (!!data.data?.email){
        dispatch(
          openModal({
            modalType: "link",
            modalProps: {
              title: "이미 가입된 번호입니다.",
              message: `${data.data.email}이 본인의 계정이라면\n해당 계정을 이용해 주세요.`,
              link: "/login",
              linkText: "기존 계정으로 로그인",
              cancelText: "새 계정으로 가입하기",
            },
          })
        );
      }
      setIsPhoneVerified(true);
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

    startCooldown();
    sendTelMutation.mutate({tel});
  }

  const handleVerifyTel = async () => {
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
          <Input label="비밀번호" type="password" {...register("password")} error={!!errors.password} errorLabel={"비밀번호는 8자 이상, 영문, 숫자, 특수문자(!@*.)를 포함해야 합니다."}/>
          <Input label="비밀번호 확인" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} error={password !== passwordConfirm} errorLabel={"비밀번호가 일치하지 않습니다." }/>
          <Input label={role === UserRole.ORG ? "기관명" : "이름"} type="text" {...register("name")}/>
          <Input label="전화번호" type="text" {...register("tel")} error={!!errors.tel} errorLabel={"올바른 전화번호를 입력해주세요."} disabled={isPhoneVerified || isCooldown}
          rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={isPhoneVerified || !!errors.tel || tel.length < 10 || isCooldown} onClick={handleSendTel}>{isPhoneVerified ? "인증완료" : isCooldown ? `${time}` : "인증번호"}</Button>}/>
          {!isPhoneVerified && isCooldown &&<Input label="인증번호" type="text" maxLength={6} value={code} onChange={(e) => setCode(e.target.value)} rightSlot={<Button className="text-xs rounded-sm w-[68px]" disabled={code.length < 6} onClick={handleVerifyTel}>인증받기</Button>}/>}
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