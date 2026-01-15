'use client'

import Link from "next/link";
import { AnchorHTMLAttributes } from "react";
import { BUTTON_BASE_STYLE, BUTTON_STYLE_MAP } from "./Button";
import { BUTTON_DISABLED } from "./disabled";

type ButtonStyle = "solid" | "outline";
type ButtonColor = "blue" | "gray";

type LinkButtonProps = {
  buttonStyle?: ButtonStyle;
  buttonColor?: ButtonColor;
  fullWidth?: boolean;
  disabled?: boolean;
  label: string;
  href?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export default function LinkButton({
  buttonStyle = "solid",
  buttonColor = "blue",
  fullWidth = true,
  disabled = false,
  label,
  href = "#",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`
        ${BUTTON_BASE_STYLE}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? BUTTON_DISABLED : BUTTON_STYLE_MAP[buttonStyle][buttonColor]}
      `}
      {...props}
    >
      {label}
    </Link>
  );
}
