import Link from "next/link";
import { Icons } from "../common/Icons";

export default function BottomBar() {
  const bottomMenuClassName = "flex flex-col items-center flex-1 gap-2 text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 px-4 py-3 bg-white border-t border-gray-200 sm:hidden">
      <div className="flex justify-between items-center gap-2">
        <Link href="/" className={bottomMenuClassName}>
          <Icons.home size={20}/>
          <p className="text-sm">홈</p>
        </Link>
        <Link href="/" className={bottomMenuClassName}>
          <Icons.donate size={20}/>
          <p className="text-sm">기부</p>
        </Link>
        <Link href="/" className={bottomMenuClassName}>
          <Icons.feed size={20}/>
          <p className="text-sm">피드</p>
        </Link>
        <Link href="/" className={bottomMenuClassName}>
          <Icons.profile size={20}/>
          <p className="text-sm">마이</p>
        </Link>
        <Link href="/" className={bottomMenuClassName}>
          <Icons.menu size={20}/>
          <p className="text-sm">메뉴</p>
        </Link>
      </div>
    </div>
  );
}