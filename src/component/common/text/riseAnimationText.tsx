"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file riseAnimationText.tsx
 * @version 0.1.0 "2025-05-23"
 * @description 성능 최적화된 텍스트 계단식 애니메이션
 */

interface IRiseAnimationText {
  text: string;
  textClassName?: string;
  interval?: number; // 반복 주기 (ms)
}

const RiseAnimationText = ({
  text,
  textClassName = "",
  interval = 3000,
}: IRiseAnimationText) => {
  const letters = Array.from(text);
  const controls = useAnimation();

  useEffect(() => {
    const triggerAnimation = async () => {
      await controls.start("visible");
    };

    triggerAnimation(); // 초기 실행

    const id = setInterval(() => {
      controls.set("hidden"); // 초기 상태로 리셋
      triggerAnimation(); // 다시 시작
    }, interval);

    return () => clearInterval(id);
  }, [interval, controls]);

  const variants = {
    hidden: {y: 20, opacity: 0},
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className={`flex space-x-1 overflow-hidden ${textClassName}`}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={variants}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default RiseAnimationText;
