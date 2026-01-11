import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
};

const HEIGHT = {
  sm: 32,
  md: 48,
  lg: 64,
} as const;

export default function Logo({ size = "md" }: LogoProps) {
  const height = HEIGHT[size];
  const width = height * 2.6;

  return (
    <Image
      src="/logo.svg"
      alt="Logo"
      width={width}
      height={height}
      loading="eager"
    />
  );
}