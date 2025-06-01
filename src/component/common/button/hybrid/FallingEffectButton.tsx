import { useThemeStore } from "@store/useThemeStore";
import React from "react";
import { FaWandMagic, FaWandMagicSparkles } from "react-icons/fa6";

interface IFallingEffectButton {

}
const FallingEffectButton = (props: IFallingEffectButton) => {
  const themeStore = useThemeStore();
  
  return (
    <div className="flex items-center justify-center gap-4">
      <button
        onClick={() =>
          themeStore.setFallingEffectMode(!themeStore.isFallingEffectMode)
        }
        className="relative flex h-btn-sm w-12 items-center rounded-2xl bg-gray-300 px-1 transition-all duration-300 ease-in-out primary-border-radius dark:bg-gray-700 min-[480px]:w-16"
        aria-label="Toggle dark mode"
      >
        {/* 원형 버튼 */}
        <div
          className={`text-black-80 flex h-6 w-6 transform items-center justify-center rounded-full bg-white-80 transition-transform duration-300 ease-in-out ${
            themeStore.isFallingEffectMode
              ? "translate-x-4 min-[480px]:translate-x-8"
              : "translate-x-0"
          }`}
        >
          {/* 해모양과 달모양 아이콘 */}
          {themeStore.isFallingEffectMode ? (
            <FaWandMagicSparkles />
          ) : (
            <FaWandMagic />
          )}
        </div>
      </button>
    </div>
  );
};
export default React.memo(FallingEffectButton);