"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { useEffect, useState } from "react";


type Aspect = "16/9" | "4/3" | "1/1" | "21/9";

const aspectClassMap: Record<Aspect, string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "21/9": "aspect-[21/9]",
};

type SwiperProps = {
  children: React.ReactNode;
  aspectRatio?: Aspect;
  delay?: number;
  stopOnInteraction?: boolean;
  stopOnMouseEnter?: boolean;
};

// 스와이퍼 틀
export function Swiper({ children, aspectRatio = "16/9", delay = 5000, stopOnInteraction = true, stopOnMouseEnter = true }: SwiperProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
    },
    [
      Autoplay({
        delay: delay,           // 5초마다
        stopOnInteraction: stopOnInteraction, // 드래그/클릭 시 멈춤
        stopOnMouseEnter: stopOnMouseEnter, // 마우스 올리면 멈춤
      }),
    ]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <div className={`w-full ${aspectClassMap[aspectRatio]} overflow-hidden relative`} ref={emblaRef}>
      <div className="flex h-full">
        {children}
      </div>
      <div className="absolute md:bottom-4 md:right-4 bottom-2 right-2 min-w-[64px] bg-black/50 rounded-full flex justify-center py-0.5">
        <span className="text-sm font-medium text-white">
        {currentIndex + 1} / {emblaApi?.scrollSnapList().length ?? 0}
        </span>
      </div>
    </div>
  )
}

type SwiperSlideProps = {
  link?: string;
  children: React.ReactNode;
};

// 슬라이드
export function SwiperSlide({ children, link="/" }: SwiperSlideProps) {
  return (
    <div className="flex-[0_0_100%] h-full">
      <Link href={link}>
        {children}
      </Link>
    </div>
  );
}
