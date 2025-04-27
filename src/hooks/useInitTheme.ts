import { useThemeStore } from "@store/useThemeStore";
import { useEffect } from "react";

export const useInitTheme = () => {
  const themeStore = useThemeStore();
  useEffect(() => {
    themeStore.setTheme1(localStorage.getItem("theme1") || "purple");
    themeStore.setTheme2(localStorage.getItem("theme2") || "blue");
    themeStore.setTheme3(localStorage.getItem("theme3") || "green");

    if (localStorage.getItem("isDarkMode") === "true") {
      themeStore.setDarkMode(true);
    }
  }, []);
};
