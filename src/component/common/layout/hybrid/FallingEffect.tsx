"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NUM_ITEMS = 15; // 떨어지는 요소 개수

const FallingEffect = ({type = "❄️"}) => {
  const [items, setItems] = useState<
    {
      id: number;
      left: string;
      size: string;
      duration: number;
      rotateSpeed: number;
    }[]
  >([]);

  useEffect(() => {
    const newItems = Array.from({length: NUM_ITEMS}).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 1.5 + 0.5}rem`, // 크기 랜덤
      duration: Math.random() * 5 + 3, // 떨어지는 속도 랜덤
      rotateSpeed: Math.random() * 360 - 180, // 회전 속도 (-180 ~ 180도)
    }));
    setItems(newItems);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 h-full w-full overflow-hidden">
      {items.map(({id, left, size, duration, rotateSpeed}) => (
        <motion.div
          key={id}
          initial={{y: "-300px", opacity: 0.5}}
          animate={{y: "100vh", opacity: 1, rotate: rotateSpeed}}
          transition={{
            duration,
            repeat: Infinity,
            ease: "linear",
            rotateSpeed: Math.random() * 360 - 180,
          }}
          className="absolute"
          style={{left, fontSize: size}}
        >
          {type}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingEffect;
