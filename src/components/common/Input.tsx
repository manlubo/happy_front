'use client'

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Icons } from "./Icons";
import { INPUT_DISABLED } from "./disabled";

type InputProps = {
  label: string;
  rightSlot?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({label, type="text", className, rightSlot, disabled, ...props}: InputProps) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputBase =
    "peer w-full rounded-md bg-transparent px-4 pt-3 pb-3 text-base focus:outline-none";

  const inputState = disabled
    ? `border border-gray-200 ${INPUT_DISABLED}`
    : "border border-gray-300 text-gray-600 focus:border-blue-500";

  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder=" "
        className={`
          ${inputBase}
          ${inputState}
          ${isPassword ? "pr-11" : "pr-4"}
          ${className ?? ""}
        `}
        {...props}
      />

      <label
        className={`
          absolute left-3 top-1/2 -translate-y-1/2
          px-1 bg-white font-medium transition-all pointer-events-none
          ${disabled ? "text-gray-400" : "text-gray-500 peer-focus:text-blue-500"}
          peer-focus:top-0
          peer-focus:text-sm
          peer-not-placeholder-shown:top-0
          peer-not-placeholder-shown:text-sm
        `}
      >
        {label}
      </label>

      {rightSlot && (
        <div
          className={`
            absolute right-3 top-1/2 -translate-y-1/2
            flex items-center
          `}
        >
          {rightSlot}
        </div>
      )}

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-6 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-500 cursor-pointer
          "        >
          {showPassword ? (
            <Icons.eyeSlash size={18} />
          ) : (
            <Icons.eye size={18} />
          )}
        </button>
      )}
    </div>
  )
}