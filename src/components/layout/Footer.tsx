import Link from "next/link";
import Container from "./Container";
import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-8 bg-gray-100">
      <Container>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-gray-700">Happy Givers</Link>
            <Link href="https://github.com/manlubo/happy_front">
              <FaGithub className="w-6 h-6 text-gray-600 hover:text-gray-800 transition"/>
            </Link>
          </div>
          <div className="flex gap-4 text-gray-600 mt-8 text-sm">
            <Link href="/" className="hover:underline transition">이용약관</Link>
            <Link href="/" className="font-semibold hover:underline transition">개인정보처리방침</Link>
            <Link href="/" className="hover:underline transition">공지사항</Link>
            <Link href="/" className="hover:underline transition">자주묻는 질문</Link>
          </div>
          <p className="text-gray-500 text-sm">© 2026 Happygivers. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}