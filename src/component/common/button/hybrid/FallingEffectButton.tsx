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
        className="relative flex h-8 w-16 items-center rounded-full bg-gray-300 p-1 transition-all duration-300 ease-in-out primary-border-radius dark:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {/* 원형 버튼 */}
        <div
          className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white-80 transition-transform duration-300 ease-in-out ${
            themeStore.isFallingEffectMode ? "translate-x-8" : "translate-x-0"
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