"use client";

import ThemeActiveButton2 from "@component/common/button/ThemeActiveButton2";
import { IDEA_KEYWORD_LIST } from "@utils/variables/ideaKeywordList";
import gsap from "gsap";
import { Howl, Howler } from "howler";
import { useEffect, useRef, useState } from "react";

const SLOT_COUNT = 3;

export default function SlotMachine() {
  const [result, setResult] = useState<string[]>([]);
  const [allResults, setAllResults] = useState<string[][]>([]);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showResult, setShowResult] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const [spinCount, setSpinCount] = useState<number | string>(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const spinSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    spinSoundRef.current = new Howl({
      src: ["/sounds/spin.mp3"],
      volume: 1.0,
    });
  }, []);

  const playSpinSound = () => {
    if (!isMuted && spinSoundRef.current) {
      spinSoundRef.current.stop();
      spinSoundRef.current.play();
    }
  };

  const spinOnce = (useAnimation = true): Promise<void> => {
    return new Promise((resolve) => {
      const shuffled = [...IDEA_KEYWORD_LIST].sort(() => Math.random() - 0.5);
      const newResult = shuffled.slice(0, SLOT_COUNT);

      setResult(newResult);
      setShowResult(false);

      reelRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const index = IDEA_KEYWORD_LIST.indexOf(newResult[i]);
        const offset = -index * 60;

        if (useAnimation) {
          gsap.to(ref, {
            y: offset,
            duration: 2 + i * 0.5,
            ease: "power4.out",
          });
        } else {
          gsap.set(ref, {y: offset});
        }
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const delay = useAnimation ? 2700 : 0;

      timeoutRef.current = window.setTimeout(() => {
        setShowResult(true);
        setAllResults((prev) => [...prev, newResult]);
        resolve();
      }, delay);
    });
  };

  const spinMultiple = async (useAnimation = true) => {
    if (isSpinning) return;
    setIsSpinning(true);
    setAllResults([]);

    for (let i = 0; i < Number(spinCount); i++) {
      playSpinSound();
      await spinOnce(useAnimation);
    }

    setIsSpinning(false);
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      Howler.mute(!prev);
      return !prev;
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-10 text-black-80">
      <div className="relative flex flex-col gap-y-2 overflow-hidden rounded-2xl bg-[#F5AC19] px-6 pb-6 pt-4">
        <h1 className="h-10 w-full rounded-2xl bg-white-40 default-flex">
          🎰 아이디어 룰렛 머신
        </h1>
        <div className="flex gap-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-white h-[180px] w-[100px] overflow-hidden rounded-2xl border-4 border-black-80 bg-white-40 text-center"
            >
              <div
                ref={(el) => {
                  reelRefs.current[i] = el;
                }}
                className="transition-transform duration-500"
              >
                {[
                  IDEA_KEYWORD_LIST[IDEA_KEYWORD_LIST.length - 1],
                  ...IDEA_KEYWORD_LIST,
                  IDEA_KEYWORD_LIST[0],
                ].map((word, j) => (
                  <div
                    key={j}
                    className="text-black flex h-[60px] items-center justify-center text-lg font-bold"
                  >
                    {word}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center space-x-4">
        <input
          type="text"
          placeholder="횟수입력(~20)"
          inputMode="numeric"
          pattern="[0-9]*"
          value={spinCount}
          disabled={isSpinning}
          onChange={(e) => {
            const val = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 필터링
            const num = Number(val);
            if (val === "") {
              setSpinCount("");
            } else if (num >= 1 && num <= 20) {
              setSpinCount(num);
            }
          }}
          className="h-[3rem] w-[124px] rounded-2xl border border-gray-300 px-3 py-2 text-center"
        />

        <ThemeActiveButton2
          onClick={() => spinMultiple(true)}
          isActive={!isSpinning}
          className="h-[3rem] w-[3rem] rounded-2xl p-2 text-2xl"
          title="돌리기"
        >
          {isSpinning ? (
            <div className="aspect-square h-[2.75rem] primary-border-radius default-flex">
              <div className="h-4 w-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
            </div>
          ) : (
            "🎰"
          )}
        </ThemeActiveButton2>

        <ThemeActiveButton2
          onClick={() => spinMultiple(false)} // 빠르게 여러번 돌리기
          isActive={!isSpinning}
          className="h-[3rem] w-[6rem] rounded-2xl p-2 text-2xl"
          title="빨리 돌리기"
        >
          ⚡🎰
        </ThemeActiveButton2>

        <ThemeActiveButton2
          onClick={toggleMute}
          className="h-[3rem] w-[3rem] rounded-[50%] border border-contrast-1 p-2 text-2xl default-flex"
        >
          {isMuted ? "🔇" : "🔊"}
        </ThemeActiveButton2>
      </div>

      <ul className="relative flex flex-col gap-y-2 rounded-2xl pb-6 pt-4 w-[22.75rem] mt-4">
        {allResults.map((res, idx) => (
          <div
            key={idx}
            className="flex w-full justify-evenly gap-x-2 rounded-2xl bg-white-40 p-1 text-center"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="bg-white h-[60px] w-full overflow-hidden rounded-2xl border-4 border-black-80 bg-white-40 text-center default-flex"
              >
                {res[i]}
              </div>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
}
