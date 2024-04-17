import { darkTheme } from '@styles/theme';
import { useEffect, useState } from 'react';

export const useTheme = () => {
  let initTheme = darkTheme;
  const [theme, setTheme] = useState(initTheme);

  const setThemeMode = mode => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  useEffect(() => {
    const isBrowserDarkMode =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    initTheme = isBrowserDarkMode ? 'darkTheme' : 'lightTheme';
    const localSettingTheme = localStorage.getItem('theme');
    if (localSettingTheme && initTheme !== 'darkTheme') {
      initTheme = localSettingTheme;
    }
  }, []);

  return [theme, setThemeMode];
};
