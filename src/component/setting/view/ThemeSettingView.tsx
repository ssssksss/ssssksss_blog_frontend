"use client";

import { useThemeStore } from "@store/useThemeStore";
import { useEffect } from "react";

const themes = [
  "white",
  "black",
  "gray",
  "red",
  "orange",
  "skyblue",
  "green",
  "purple",
  "blue",
];

const ThemeSettingView = () => {
  const themeStore = useThemeStore();

  // 다크 모드 상태 변경 시 body 태그에 'dark' 클래스 추가/제거
  useEffect(() => {
    if (themeStore.isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [themeStore.isDarkMode]);

  return (
    <section className="flex w-full flex-col gap-y-4 p-2 dark:bg-black-20 rounded-lg">
      {/* 색상 설정 1 */}
      <div className="flex flex-col gap-2">
        <div className="justify-start px-2"> 1번째 색상 </div>
        <div className="flex flex-wrap gap-4 px-2 py-2">
          {themes.map((i) => (
            <button
              key={"theme1" + i}
              className={`relative h-12 w-24 px-4 bg-${i}-80 text-${i}-contrast outline outline-[#eaeaea] rounded-md`}
              onClick={() => themeStore.setTheme1(i)}
              aria-label={`Change theme to ${i}`}
            >
              {themeStore.theme1 == i && (
                <div
                  className={`bg-white-80 absolute -right-2 -top-2 h-4 w-4 rounded-lg outline default-flex ${themeStore.isDarkMode ? "outline-white-80" : "outline-black-80"}`}
                >
                  ✔️
                </div>
              )}
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* 색상 설정 2 */}
      <div className="flex flex-col gap-2">
        <div className="justify-start px-2"> 2번째 색상 </div>
        <div className="flex flex-wrap gap-4 px-2 py-2">
          {themes.map((i) => (
            <button
              key={"theme2" + i}
              className={`relative h-12 w-24 px-4 bg-${i}-80 text-${i}-contrast outline outline-[#eaeaea] rounded-md`}
              onClick={() => themeStore.setTheme2(i)}
              aria-label={`Change theme to ${i}`}
            >
              {themeStore.theme2 == i && (
                <div
                  className={`bg-white-80 absolute -right-2 -top-2 h-4 w-4 rounded-lg outline default-flex ${themeStore.isDarkMode ? "outline-white-80" : "outline-black-80"}`}
                >
                  ✔️
                </div>
              )}
              {i}
            </button>
          ))}
        </div>
      </div>

      {/* 색상 설정 3 */}
      <div className="flex flex-col gap-2">
        <div className="justify-start px-2"> 3번째 색상 </div>
        <div className="flex flex-wrap gap-4 px-2 py-2">
          {themes.map((i) => (
            <button
              key={"theme3" + i}
              className={`relative h-12 w-24 px-4 bg-${i}-80 text-${i}-contrast outline outline-[#eaeaea] rounded-md`}
              onClick={() => themeStore.setTheme3(i)}
              aria-label={`Change theme to ${i}`}
            >
              {themeStore.theme3 == i && (
                <div
                  className={`bg-white-80 absolute -right-2 -top-2 h-4 w-4 rounded-lg outline default-flex ${themeStore.isDarkMode ? "outline-white-80" : "outline-black-80"}`}
                >
                  ✔️
                </div>
              )}
              {i}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemeSettingView;
