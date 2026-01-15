import Link from "next/link";

type UnderLineLinkProps = {
    href?: string;
    label: string;
    className?: string;
}

export default function UnderLineLink({ href = "#", label, className }: UnderLineLinkProps) {
    return (
      <Link href={href} className={`hover:underline text-gray-500 ${className}`}>{label}</Link>
    )
}