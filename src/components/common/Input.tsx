'use client'

import { InputHTMLAttributes, ReactNode, useState } from "react";
import { Icons } from "./Icons";
import { INPUT_DISABLED } from "./disabled";

type InputProps = {
  label: string;
  error?: boolean;
  errorLabel?: string | null;
  rightSlot?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input({label, type="text", className, rightSlot, disabled, error = false, errorLabel = null, ...props}: InputProps) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputBase =
    "peer w-full rounded-md bg-transparent border px-4 py-3 text-base focus:outline-none";

  const inputState = disabled
    ? `border-gray-200 ${INPUT_DISABLED}`
    : "border-gray-300 text-gray-600 focus:border-blue-400";

  return (
    <div className={`relative w-full ${error && "mb-4"}`}>
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder=" "
        className={`
          ${inputBase}
          ${inputState}
          ${error ? "border-red-400 focus:border-red-400" : ""}
          ${isPassword ? "pr-11" : "pr-4"}
          ${className ?? ""}
        `}
        {...props}
      />

      <label
        className={`
          absolute left-3 top-1/2 -translate-y-1/2 text-base text-gray-400
          px-1 bg-white font-base transition-all pointer-events-none
          ${disabled ? "" : " peer-focus:text-blue-400"}
          ${error ? "peer-focus:text-red-400 peer-not-placeholder-shown:text-red-400" : ""}
          peer-focus:top-0
          peer-focus:text-xs
          peer-focus:font-medium
          peer-not-placeholder-shown:top-0
          peer-not-placeholder-shown:text-xs
        `}
      >
        {label}
      </label>
      {error && errorLabel && (
        <div className="absolute left-0 bottom-[-24px] flex items-center gap-1">
          <Icons.warn size={16} className="text-red-400"/>
          <span className="text-red-400 font-medium text-xs">{errorLabel}</span>
        </div>
      )}

      {rightSlot && (
        <div
          className={`
            absolute right-1 top-1/2 -translate-y-1/2
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