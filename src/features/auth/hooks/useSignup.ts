import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../api";
import { SignupRequest } from "@/types/auth";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { openModal } from "@/stores/uiSlice";
import { isApiAxiosError } from "@/lib/api/ResponseError";
import { useRouter } from "next/navigation";

type UseSignupProps = {
  token: string;
}

export default function useSignup({token}: UseSignupProps) {
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

  return {
    mutate: signupMutation.mutate,
  }
}