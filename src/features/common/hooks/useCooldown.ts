import { useEffect, useState, useMemo } from "react";

export function useCooldown(seconds: number) {
  const [remain, setRemain] = useState<number | null>(null);

  // 쿨타임 시작
  const startCooldown = () => {
    setRemain(seconds);
  };

  // 쿨타임 멈추기
  const stopCooldown = () => {
    setRemain(null);
  };

  useEffect(() => {
    if (remain === null) return;

    const timer = setInterval(() => {
      setRemain((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remain]);

  const time = useMemo(() => {
    if (remain === null) return null;

    const minutes = Math.floor(remain / 60);
    const seconds = String(remain % 60).padStart(2, "0");

    return `${minutes}:${seconds}`;
  }, [remain]);

  return {
    time,
    isCooldown: remain !== null,
    startCooldown,
    stopCooldown,
  };
}