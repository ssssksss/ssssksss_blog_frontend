"use client";

import { useThemeStore } from "@store/useThemeStore";
import { FaMoon, FaSun } from "react-icons/fa"; // 아이콘 추가

const DarkmodeToggleButton = () => {
  const themeStore = useThemeStore();
  
  return (
    <div className="flex justify-center items-center gap-4 px-4">
      <button
        onClick={() => themeStore.toggleDarkMode()}
        className="relative flex h-8 w-16 items-center rounded-full bg-gray-300 p-1 transition-all duration-300 ease-in-out dark:bg-gray-700"
        aria-label="Toggle dark mode"
      >
        {/* 원형 버튼 */}
        <div
          className={`bg-white-80 flex h-6 w-6 transform items-center justify-center rounded-full transition-transform duration-300 ease-in-out ${
            themeStore.isDarkMode ? "translate-x-8" : "translate-x-0"
          }`}
        >
          {/* 해모양과 달모양 아이콘 */}
          {themeStore.isDarkMode ? (
            <FaMoon className="text-yellow-400" />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </div>
      </button>
    </div>
  );
};

export default DarkmodeToggleButton;
