import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../api";
import { login } from "@/stores/authSlice";
import { openModal } from "@/stores/uiSlice";

export default function useLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  
  const loginError = () => {
    dispatch(
        openModal({
          modalType: "alert",
          modalProps: {
            title: "로그인 실패",
            message: "아이디와 비밀번호를 확인해 주세요.",
          },
        })
    );
  }

  const loginMutation = useMutation({
    mutationFn: signInApi,
    onSuccess: (resp) => {
      dispatch(login(resp.data));
      router.replace("/");
    },
    onError: () => {
      loginError();
    },
  })

  return {
    mutate: loginMutation.mutate,
    loginError,
  }
}