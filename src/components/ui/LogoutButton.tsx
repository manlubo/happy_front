'use client'

import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "@/features/auth/api";
import { useDispatch } from "react-redux";
import { logout } from "@/stores/authSlice";
import { AppDispatch } from "@/stores";

type LogoutButtonProps = {
  children: React.ReactNode;
  className?: string;
}

export default function LogoutButton({ children, className }: LogoutButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  
  const logoutMutation = useMutation({
      mutationFn: logoutApi,
      onSuccess: () => {
        dispatch(logout());
      },
      onError: (error) => {
        console.log(error);
      },
    })

  const handleLogout = () => {
    logoutMutation.mutate();
  }

  return (
      <button className={className} onClick={handleLogout}>{children}</button>
  );
}