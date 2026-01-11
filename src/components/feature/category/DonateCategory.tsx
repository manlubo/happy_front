
import Image from "next/image";
import { DonateIcons } from "@/components/common/Icons";
import Link from "next/link";

type DonateCategoryProps = {
  horizontal?: boolean;
  size: number;
}

export default function DonateCategory({ horizontal = false, size }: DonateCategoryProps) {
  const baseClassName = `cursor-pointer group flex-1 flex items-center gap-2 ${horizontal ? "" : "flex-col"}`;
  const pClassName = `text-base font-medium w-full text-center py-1 bg-gray-100 rounded-full text-gray-600 group-hover:bg-blue-500 group-hover:text-white`;
  return (
    <div className="flex md:gap-4 mt-4 md:flex-row flex-col gap-6">
      <div className="flex gap-4 flex-1">
        <Link href="/" className={baseClassName}>
          <Image src={DonateIcons.all.src} alt={DonateIcons.all.alt} width={size} height={size}/>
          <p className={pClassName}>전체</p>
        </Link>
        <Link href="/" className={baseClassName}>
          <Image src={DonateIcons.kid.src} alt={DonateIcons.kid.alt} width={size} height={size}/>
          <p className={pClassName}>청소년</p>
        </Link>
        <Link href="/" className={baseClassName}>
          <Image src={DonateIcons.old.src} alt={DonateIcons.old.alt} width={size} height={size}/>
          <p className={pClassName}>노인</p>
        </Link>
        <Link href="/" className={baseClassName}>
          <Image src={DonateIcons.animal.src} alt={DonateIcons.animal.alt} width={size} height={size}/>
          <p className={pClassName}>동물</p>
        </Link>
      </div>
      <div className="flex gap-4 flex-1">
      <Link href="/" className={baseClassName}>
        <Image src={DonateIcons.earth.src} alt={DonateIcons.earth.alt} width={size} height={size}/>
        <p className={pClassName}>지구</p>
      </Link>
      <Link href="/" className={baseClassName}>
        <Image src={DonateIcons.area.src} alt={DonateIcons.area.alt} width={size} height={size}/>
        <p className={pClassName}>환경</p>
      </Link>
      <Link href="/" className={baseClassName}>
        <Image src={DonateIcons.needy.src} alt={DonateIcons.needy.alt} width={size} height={size}/>
        <p className={pClassName}>장애인</p>
      </Link>
      <Link href="/" className={baseClassName}>
        <Image src={DonateIcons.social.src} alt={DonateIcons.social.alt} width={size} height={size}/>
        <p className={pClassName}>사회</p>
      </Link>
      </div>
    </div>
  );
}