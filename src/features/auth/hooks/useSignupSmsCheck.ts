import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { verifyTelApi } from "../api";

type UseSignupSmsCheckProps = {
  setIsPhoneVerified: (isPhoneVerified: boolean) => void;
}

export default function useSignupSmsCheck({setIsPhoneVerified}: UseSignupSmsCheckProps) {
  const dispatch = useDispatch<AppDispatch>();
  const smsCheckError = () => {
    dispatch(
      openModal({
        modalType: "alert",
        modalProps: {
          title: "인증번호 검증 실패",
          message: "인증번호가 일치하지 않습니다.",
        },
      })
    );
  }
  const verifyTelMutation = useMutation({
    mutationFn: verifyTelApi,
    onSuccess: (resp) => {
      if (!!resp.data?.email){
        dispatch(
          openModal({
            modalType: "link",
            modalProps: {
              title: "이미 가입된 번호입니다.",
              message: `${resp.data.email}이 본인의 계정이라면\n해당 계정을 이용해 주세요.`,
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
      smsCheckError();
    },
  }) 

  return {
    mutate: verifyTelMutation.mutate,
    smsCheckError,
  }
}