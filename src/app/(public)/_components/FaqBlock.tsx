import { Icons } from "@/components/common/Icons";
import Block from "@/components/ui/Block";
import Link from "next/link";

export default function FaqBlock() {
  return (
    <Block className="rounded-md">
      <div className="p-6 flex flex-col gap-2">
        <div className="flex justify-between items-center border-b pb-4 border-gray-200">
          <h3 className="text-base text-gray-700 font-semibold">FAQ</h3>
          <Link href="/" className="flex items-center gap-1 text-gray-500 text-sm group">
            <p className="group-hover:underline">더보기</p> 
            <Icons.rightArrow size={16}/>
          </Link>
        </div>
        <div className="flex flex-col gap-2 rounded-md text-gray-600">
         <Link href="/" className="flex items-center gap-2 py-4 border-b border-gray-200">
          <p>[결제] FAQ 입니다.</p>
         </Link>
         <Link href="/" className="flex items-center gap-2 py-4 border-b border-gray-200">
          <p>[기부] FAQ 입니다.</p>
         </Link>
         <Link href="/" className="flex items-center gap-2 pt-4 border-gray-200">
          <p>[기부] FAQ 입니다.</p>
         </Link>
        </div>
      </div>
    </Block>
  );
}