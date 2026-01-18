'use client'

import { InputHTMLAttributes, useState } from "react";
import { Icons } from "./Icons";
import Input from "./Input";

type PasswordInputProps = {
  label: string;
  error?: boolean;
  errorLabel?: string | null;
} & InputHTMLAttributes<HTMLInputElement>;

export default function PasswordInput({label, className, disabled, error = false, errorLabel = null, ...props}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input label={label} type={showPassword ? "text" : "password"} className={className} 
      disabled={disabled} error={error} errorLabel={errorLabel} {...props}
      rightSlot={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="
            absolute right-5 top-1/2 -translate-y-1/2
            text-gray-400 hover:text-gray-500 cursor-pointer
          "        >
          {showPassword ? (
            <Icons.eyeSlash size={18} />
          ) : (
            <Icons.eye size={18} />
          )}
        </button>
      }
    />
  )
}