import Link from "next/link";
import Container from "./Container";
import { Icons } from "@/components/common/Icons";
import UnderLineLink from "../common/UnderLineLink";

export default function Footer() {
  return (
    <footer className="pt-8 bg-gray-100 pb-28 sm:pb-8">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-700">Happy Givers</Link>
            <Link href="https://github.com/manlubo/happy_front">
              <Icons.github className="w-6 h-6 text-gray-600 hover:text-gray-800 transition"/>
            </Link>
          </div>
          <div className="flex gap-4 mt-8 text-sm">
            <UnderLineLink href="/" className="text-gray-600" label="이용약관"/>
            <UnderLineLink href="/" className="font-semibold text-gray-600" label="개인정보처리방침"/>
            <UnderLineLink href="/" className="text-gray-600" label="공지사항"/>
            <UnderLineLink href="/" className="text-gray-600" label="자주묻는 질문"/>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Happygivers. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}