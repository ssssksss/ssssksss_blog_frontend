export function hexToRgb(hex: string) {
  const match = hex.replace("#", "").match(/.{1,2}/g);
  if (!match) return null;
  const [r, g, b] = match.map((x) => parseInt(x, 16) / 255);
  return {r, g, b};
}

export function getLuminance(hex: string) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  const linear = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const {r, g, b} = rgb;
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function getContrastRatio(hex1: string, hex2: string) {
  const L1 = getLuminance(hex1);
  const L2 = getLuminance(hex2);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export function getWcagGrade(contrast: number): string {
  if (contrast >= 7) return "AAA";
  if (contrast >= 4.5) return "AA";
  if (contrast >= 3) return "AA (Large)";
  return "Fail";
}

export function getReadableTextColors(bgHex: string, threshold = 4.5) {
  const candidates = [
    "#000000",
    "#FFFFFF",
    "#1E1E1E",
    "#F5F5F5",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#333333",
    "#666666",
    "#999999",
  ];
  return candidates.filter(
    (color) => getContrastRatio(bgHex, color) >= threshold,
  );
}

export function getRandomHex(): string {
  const r = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const g = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  const b = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0");
  return `#${r}${g}${b}`;
}

export function getRandomAccessiblePair(threshold = 4.5): {
  text: string;
  bg: string;
} {
  for (let i = 0; i < 100; i++) {
    const text = getRandomHex();
    const bg = getRandomHex();
    if (getContrastRatio(text, bg) >= threshold) {
      return {text, bg};
    }
  }
  // fallback
  return {text: "#000000", bg: "#ffffff"};
}