import { useMutation } from "@tanstack/react-query";
import { sendTelApi } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { useCooldown } from "@/features/common/hooks/useCooldown";

export default function useSendSms() {
  const dispatch = useDispatch<AppDispatch>();
  const { time, isCooldown, startCooldown, stopCooldown } = useCooldown(180);

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

  return {
    mutate: sendTelMutation.mutate,
    time,
    isCooldown,
    startCooldown,
    stopCooldown,
  }
}