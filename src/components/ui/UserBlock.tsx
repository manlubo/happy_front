'use client'

import Link from "next/link";
import Block from "./Block";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { Icons } from "../common/Icons";


export default function UserBlock() {
  const user = useSelector((state: RootState) => state.auth.user);
  

  return (
    <Block className={`rounded-lg ${user ? "" : "p-6 gap-4"} flex flex-col items-center overflow-hidden`}>
      {user ? (<>
        <div className="flex justify-between items-center gap-4 w-full p-6">
          <div className="border border-gray-200 rounded-full">
            {user.profile ? (
              <Image src={user.profile} alt="user" width={60} height={60}/>
            ) : (
              <Icons.profile size={60} className="text-gray-300"/>
            )}
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base font-medium">{user.name}
              <span className="text-gray-500">님</span>
            </p>
            <LogoutButton className="py-1 px-3 border border-gray-200 rounded-full text-sm text-gray-600 hover:bg-gray-100/70 cursor-pointer transition">로그아웃</LogoutButton>
          </div>
        </div>
        <div className="bg-gray-100 px-6 py-4 w-full flex text-gray-600 border-t border-gray-200 text-sm">
          <Link href="/" className="w-full text-center hover:underline">프로필 수정</Link>
          <Link href="/" className="w-full text-center hover:underline">마이 페이지</Link>
        </div>
      </>
      ) : (
        <>
        <p className="text-base text-gray-600">당신의 소중한 후원을 기다립니다.</p>
        <Link href="/login" className="py-3 text-center bg-blue-500 text-white text-md font-semibold rounded-md w-full hover:bg-blue-600 transition">로그인</Link>
        <div className="flex gap-4 text-sm text-gray-500 mt-2">
          <Link href="/signup" className="hover:underline">회원가입</Link>
          <Link href="/" className="hover:underline">아이디 찾기</Link>
          <Link href="/" className="hover:underline">비밀번호 찾기</Link>
        </div>
        </>
      )}
    </Block>
  );
}