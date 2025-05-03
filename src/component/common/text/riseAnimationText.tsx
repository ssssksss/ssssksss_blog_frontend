"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file riseAnimationText.tsx
 * @version 0.0.1 "2025-05-03 17:54:02"
 * @description 설명
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
  const [key, setKey] = useState(0);
  const letters = Array.from(text);

  useEffect(() => {
    const id = setInterval(() => {
      setKey((prev) => prev + 1); // key를 변경하면 컴포넌트 리렌더링됨
    }, interval);
    return () => clearInterval(id); // 컴포넌트 언마운트 시 정리
  }, [interval]);

  return (
    <div className={`flex space-x-1 overflow-hidden ${textClassName}`}>
      {letters.map((char, i) => (
        <motion.span
          key={`${key}-${i}`} // key에 key값 추가하여 매번 새로 애니메이션
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: i * 0.05, duration: 0.3}}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

export default RiseAnimationText;
