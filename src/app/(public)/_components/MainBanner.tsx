import { Swiper, SwiperSlide } from "@/components/ui/Swiper";
import Image from "next/image";

export default function MainBanner() {
  return (
    <div className="w-full overflow-hidden rounded-xl">
      <Swiper aspectRatio="16/9" delay={5000} stopOnInteraction={true} stopOnMouseEnter={false}>
        <SwiperSlide link="/">
          <Image src="https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/banner/mainbanner.png" alt="mainBanner1" width={1920} height={600} style={{width: '100%', height: '100%', objectFit: 'cover'}} priority/>
        </SwiperSlide>
        <SwiperSlide link="/">
          <Image src="https://file.gitbaby.com/api/v1/buckets/happygivers/objects/download?prefix=static/banner/mainbanner2.jpg" alt="mainBanner2" width={1920} height={600} style={{width: '100%', height: '100%', objectFit: 'cover'}} priority/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}