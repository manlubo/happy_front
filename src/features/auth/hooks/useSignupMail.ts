import { useMutation } from "@tanstack/react-query";
import { signupMailApi } from "../api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { isApiAxiosError } from "@/lib/api/ResponseError";
import { useCooldown } from "@/features/common/hooks/useCooldown";

export default function useSignupMail() {
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

  return {
    mutate: signupMailMutation.mutate,
    time,
    isCooldown,
    startCooldown,
    stopCooldown,
  }
}