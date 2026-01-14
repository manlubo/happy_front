'use client'

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { BUTTON_DISABLED } from "./disabled";

type ButtonStyle = "solid" | "outline";
type ButtonColor = "blue" | "gray";

type ButtonProps = {
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  cooldown?: number;        // 초 단위
  autoCooldown?: boolean;  // 클릭 후 자동 쿨타임
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const BASE_STYLE =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-md font-semibold transition focus:outline-none";

const STYLE_MAP: Record<ButtonStyle, Record<ButtonColor, string>> = {
  solid: {
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
  },
  outline: {
    blue: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    gray: "border border-gray-300 text-gray-600 hover:bg-gray-100",
  },
};

export default function Button({
  buttonStyle = "solid",
  buttonColor = "blue",
  cooldown,
  autoCooldown = false,
  disabled,
  fullWidth = false,
  className,
  onClick,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const [remain, setRemain] = useState<number | null>(null);

  // 쿨다운 타이머
  useEffect(() => {
    if (remain === null) return;

    const timer = setInterval(() => {
      setRemain((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remain]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (disabled || remain !== null) return;

    const result = onClick?.(e);

    if (autoCooldown && cooldown) {
      try {
        await Promise.resolve(result);
        setRemain(cooldown);
      } catch {
        // 실패 시 쿨타임 시작 안 함
      }
    }
  };

  const isCooldown = remain !== null;
  const isDisabled = disabled || isCooldown;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onClick={handleClick}
      className={`
        ${BASE_STYLE}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? BUTTON_DISABLED : STYLE_MAP[buttonStyle][buttonColor]}
        ${className ?? ""}
      `}
      {...props}
    >
      {isCooldown
        ? `${Math.floor(remain! / 60)}:${String(remain! % 60).padStart(2, "0")}`
        : children}
    </button>
  );
}
