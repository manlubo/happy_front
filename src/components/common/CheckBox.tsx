'use client'

import { InputHTMLAttributes, useState } from "react";
import { Icons } from "./Icons";
import { UseFormRegisterReturn } from "react-hook-form";

type CheckboxProps = {
  label: string;
  register: UseFormRegisterReturn;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "checked" | "type">;

export default function Checkbox({ label, register, ...props }: CheckboxProps) {
  const [checked, setChecked] = useState(false);

  return (
    <label
      className="
        inline-flex w-fit items-center gap-1.5
        select-none cursor-pointer
        whitespace-nowrap
      "
    >
      <input
        type="checkbox"
        className="hidden"
        {...register}
        {...props}
        onChange={(e) => {
          setChecked(e.target.checked);
          register.onChange(e);
        }}
      />

      <span className="w-5 h-5 flex items-center justify-center">
        <Icons.check size={20} className={checked ? "text-blue-400" : "text-gray-300"} />  
      </span>

      <span className={`text-sm ${checked ? "text-blue-400" : "text-gray-400"} font-medium`}>
        {label}
      </span>
    </label>
  );
}
