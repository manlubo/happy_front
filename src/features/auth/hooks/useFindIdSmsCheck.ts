import { useMutation } from "@tanstack/react-query";
import { verifyTelApi } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";

type UseFindIdSmsCheckProps = {
  setEmail: (email: string) => void;
  stopCooldown: () => void;
}

export default function useFindIdSmsCheck({setEmail, stopCooldown}: UseFindIdSmsCheckProps) {
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
      smsCheckError();
    },
  })

  return {
    mutate: verifyTelMutation.mutate,
    smsCheckError,
  }
}
