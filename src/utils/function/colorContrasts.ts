import tinycolor from "tinycolor2";

export function getContrastRatio(bg: string, fg: string) {
  return tinycolor.readability(bg, fg);
}

export function isAccessibleContrast(bg: string, fg: string) {
  return getContrastRatio(bg, fg) >= 4.5;
}

export function getRandomColor() {
  return tinycolor.random().toHexString();
}

export function getAccessibleColorPair() {
  let fg = getRandomColor();
  let bg = getRandomColor();

  let tries = 0;
  while (!isAccessibleContrast(bg, fg) && tries < 100) {
    fg = getRandomColor();
    bg = getRandomColor();
    tries++;
  }

  return {foreground: fg, background: bg};
}
