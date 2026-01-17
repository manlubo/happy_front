import { ButtonHTMLAttributes } from "react";
import { BUTTON_DISABLED } from "./disabled";

type ButtonStyle = "solid" | "outline";
type ButtonColor = "blue" | "gray" | "lightGray";

type ButtonProps = {
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const BUTTON_BASE_STYLE =
  "inline-flex items-center justify-center gap-2 rounded-md px-3 py-3 text-md font-semibold transition focus:outline-none cursor-pointer";

export const BUTTON_STYLE_MAP: Record<ButtonStyle, Record<ButtonColor, string>> = {
  solid: {
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    gray: "bg-gray-600 text-white hover:bg-gray-700",
    lightGray: "bg-gray-200 text-gray-600 hover:bg-gray-300",
  },
  outline: {
    blue: "border border-blue-500 text-blue-500 hover:bg-blue-50",
    gray: "border border-gray-300 text-gray-600 hover:bg-gray-100",
    lightGray: "border border-gray-200 text-gray-600 hover:bg-gray-100",
  },
};

export default function Button({
  buttonStyle = "solid",
  buttonColor = "blue",
  disabled,
  fullWidth = false,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {

  const isDisabled = disabled;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      className={`
        ${BUTTON_BASE_STYLE}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? BUTTON_DISABLED : BUTTON_STYLE_MAP[buttonStyle][buttonColor]}
        ${className ?? ""}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
