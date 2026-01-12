import { RootState } from "@/stores";
import { useSelector } from "react-redux";
import Block from "./Block";
import Image from "next/image";
import { Icons } from "../common/Icons";
import LogoutButton from "./LogoutButton";
import Link from "next/link";

export default function SideBarUserBlock() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Block className={`rounded-lg ${user ? "" : "p-4 gap-4"} flex flex-col items-center overflow-hidden`}>
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
        <Link href="/login" className="group flex w-full items-center gap-4">
          <Icons.profile size={40} className="text-gray-300"/>
          <p className="text-sm font-medium text-gray-600 group-hover:underline cursor-pointer transition">로그인하세요.</p>
        </Link>
      )}
    </Block>
  );
}