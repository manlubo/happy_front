import Link from "next/link";

type NavLinkProps = {
    href: string;
    children: React.ReactNode;
}

export default function NavLink({href, children}: NavLinkProps) {
    return (
      <Link className="text-base font-semibold p-4 text-gray-400 hover:text-gray-600 transition" href={href}>{children}</Link>
    );
}