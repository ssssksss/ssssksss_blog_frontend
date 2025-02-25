"use client";

import { create } from "zustand";

interface ThemeState {
  theme1: string; // "light" | "dark" | "blue" | "green" 등
  theme2: string; // "light" | "dark" | "blue" | "green" 등
  theme3: string; // "light" | "dark" | "blue" | "green" 등
  isDarkMode: boolean; // 다크 모드 상태 추가
  setTheme1: (theme: string) => void;
  setTheme2: (theme: string) => void;
  setTheme3: (theme: string) => void;
  toggleDarkMode: () => void; // 다크 모드 토글 함수
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme1: "purple",
  theme2: "blue",
  theme3: "green",
  isDarkMode: true,
  setTheme1: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme1", theme); // 로컬스토리지에 저장
      document.documentElement.setAttribute("data-theme1", theme); // <html>에 적용
    }
    set({theme1: theme});
  },
  setTheme2: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme2", theme); // 로컬스토리지에 저장
      document.documentElement.setAttribute("data-theme2", theme); // <html>에 적용
    }
    set({theme2: theme});
  },
  setTheme3: (theme) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme3", theme); // 로컬스토리지에 저장
      document.documentElement.setAttribute("data-theme3", theme); // <html>에 적용
    }
    set({theme3: theme});
  },
  toggleDarkMode: () => {
    set((state) => {
      const newIsDarkMode = !state.isDarkMode;
      if (typeof window !== "undefined") {
        if (newIsDarkMode) {
          document.documentElement.classList.add("dark"); // 다크 모드 활성화
          localStorage.setItem("isDarkMode", "true"); // 로컬스토리지에 저장
        } else {
          document.documentElement.classList.remove("dark"); // 다크 모드 비활성화
          localStorage.setItem("isDarkMode", "false"); // 로컬스토리지에 저장
        }
      }
      return {isDarkMode: newIsDarkMode};
    });
  },
}));
