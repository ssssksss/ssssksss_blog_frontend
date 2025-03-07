import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export function extractFontFamilies(
  cssContent: string,
): Record<string, string> {
  const regex = /font-family:\s*["']?(.*?)["']?\s*;/g;
  const fontFamilies: Record<string, string> = {};
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cssContent)) !== null) {
    const font = match[1].trim();
    fontFamilies[font] = font; // 키와 값을 동일하게 설정
  }

  return fontFamilies;
}

const fonts = extractFontFamilies(`
  font-family: "gmarketSansBold";
  font-family: "cookieRunRegular";
  font-family: "typoHelloPOP";
  font-family: "yanoljaYacheBold";
  font-family: "yanoljaYacheRegular";
  font-family: "D2Coding";
  font-family: "bitbit";
  font-family: "SDSamliphopangche_Outline";
  font-family: "Ownglyph_meetme-Rg";
  font-family: "DNFBitBitv2";
  font-family: "HakgyoansimPuzzleTTF-Black";
  font-family: "WavvePADO-Regular";
  font-family: "OKCHAN";
`);

const config: Config = {
  mode: "jit",
  darkMode: "class",
  content: [
    "./src/component/**/view/**/*.{ts,tsx}",
    "./src/component/**/hybrid/**/*.{ts,tsx}",
    "./src/component/common/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/utils/**/*.{ts,tsx}",
  ],
  safelist: [
    {
      pattern:
        /^text-(red|orange|yellow|green|skyblue|blue|purple|pink|black|gray|white)-contrast$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        ...fonts, // 동적으로 가져온 폰트 추가
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      borderRadius: {
        primary: "1rem",
      },
      colors: {
        default: {
          1: "var(--bg-default-1)",
          2: "var(--bg-default-2)",
        },
        primary: {
          100: "var(--primary-color-100)",
          80: "var(--primary-color-80)",
          60: "var(--primary-color-60)",
          40: "var(--primary-color-40)",
          20: "var(--primary-color-20)",
          contrast: "var(--primary-color-contrast)",
        },
        secondary: {
          100: "var(--secondary-color-100)",
          80: "var(--secondary-color-80)",
          60: "var(--secondary-color-60)",
          40: "var(--secondary-color-40)",
          20: "var(--secondary-color-20)",
          contrast: "var(--secondary-color-contrast)",
        },
        third: {
          100: "var(--third-color-100)",
          80: "var(--third-color-80)",
          60: "var(--third-color-60)",
          40: "var(--third-color-40)",
          20: "var(--third-color-20)",
          contrast: "var(--third-color-contrast)",
        },
        red: {
          100: "#FF0000",
          80: "#FF3333",
          60: "#FF6666",
          40: "#FF9999",
          20: "#FFCCCC",
          contrast: "#F0F0F0",
        },
        orange: {
          100: "#FF9900",
          80: "#FFAD33",
          60: "#FFC266",
          40: "#FFD699",
          20: "#FFEBCC",
          contrast: "#FFFFFF",
        },
        yellow: {
          100: "#FAFF00",
          80: "#FBFF33",
          60: "#FCFF66",
          40: "#FDFF99",
          20: "#FEFFCC",
          contrast: "#333333",
        },
        green: {
          100: "#18A934",
          80: "#46BA5D",
          60: "#74CB85",
          40: "#A3DDAE",
          20: "#D1EED6",
          contrast: "#FFFFFF",
        },
        skyblue: {
          100: "#56CCF2",
          80: "#78D6F5",
          60: "#9AE0F7",
          40: "#BBEBFA",
          20: "#DDF5FC",
          contrast: "#FFFFFF",
        },
        blue: {
          100: "#3454FF",
          80: "#5D76FF",
          60: "#8598FF",
          40: "#AEBBFF",
          20: "#D6DDFF",
          contrast: "#FFFFFF",
        },
        purple: {
          100: "#9B51E0",
          80: "#AF74E6",
          60: "#C397EC",
          40: "#D7B9F3",
          20: "#EBDCF9",
          contrast: "#FFFFFF",
        },
        pink: {
          100: "#FFB8B8",
          80: "#FFC6C6",
          60: "#FFD4D4",
          40: "#FFE3E3",
          20: "#FFF1F1",
          contrast: "#FFFFFF",
        },
        black: {
          100: "#000000",
          80: "#333333",
          60: "#666666",
          40: "#999999",
          20: "#CCCCCC",
          contrast: "#FFFFFF",
        },
        gray: {
          100: "#C9C9C9",
          80: "#D4D4D4",
          60: "#DFDFDF",
          40: "#E9E9E9",
          20: "#F4F4F4",
          contrast: "#FFFFFF",
        },
        white: {
          100: "#FFFFFF",
          80: "#FCFCFC",
          60: "#F9F9F9",
          40: "#F5F5F5",
          20: "#F2F2F2",
          contrast: "#333333",
        },
      },
      backgroundImage: {
        "gradient-purple-40-blue-40-70deg":
          "linear-gradient(70deg, #D7B9F3 0%, #AEBBFF 100%)",
      },
      boxShadow: {
        up: "0 -4px 6px -1px rgba(195, 151, 236, 0.4), 0 -2px 4px -1px rgba(195, 151, 236, 0.2), 0 2px 2px 1px rgba(195, 151, 236, 0.25)",
        "top-md":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)", // 중간 크기 위쪽 그림자
        "top-lg":
          "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)", // 큰 크기 위쪽 그림자
      },
      keyframes: {
        marquee: {
          "0%": {transform: "translateX(0%)"},
          "100%": {transform: "translateX(-100%)"},
        },
        marquee5: {
          "0%": {transform: "translateX(0%)"},
          "50%": {transform: "translateX(-50%)"},
          "100%": {transform: "translateX(0%)"},
        },
        "fade-up": {
          "0%": {opacity: "0", transform: "translateY(100px)"},
          "100%": {opacity: "1", transform: "translateY(0)"},
        },
        marqueeContent: {
          "0%": {
            transform: "translateX(-100%)",
          },
          "40%": {transform: "translateX(0%)"},
          "60%": {
            transform: "translateX(0%)",
          },
          "100%": {transform: "translateX(-100%)"},
          // "0%": {
          //   transform:
          //     "translateX(calc(-100% + 3/7 * 1rem + 100/7 * 1vw - 1.5rem))",
          // },
          // "100%": {transform: "translateX(0%)"},
        },
        pulseSkeleton: {
          "0%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          },
          "50%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #f0f0f0 50%, #e0e0e0 75%)",
          },
          "100%": {
            "background-image":
              "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
          },
        },
        outlineBlink: {
          "0%, 100%": {
            outlineColor: "#C397EC",
          }, // 애니메이션 시작과 끝 색상
          "50%": {outlineColor: "transparent"}, // 중간에 투명하게
        },
        fadeIn: {
          "0%": {
            opacity: "0",
            transform: "scale(95%,95%)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(100%,100%)",
          },
        },
        fill: {
          "0%": {
            backgroundPosition: "200% 0",
          },
          "100%": {
            backgroundPosition: "0 0",
          },
        },
        updown: {
          "0%, 100%": {transform: "translateY(4px)"}, // 처음과 끝에는 제자리
          "50%": {transform: "translateY(-4px)"}, // 중간에는 위로 10px 이동
        },
        rotateFadeIn: {
          "0%": {
            transform: "translateY(50%) rotate3d(1, 0, 0, 45deg)",
            opacity: "0.3",
          },
          "50%": {
            transform: "translateY(25%) rotate3d(1, 0, 0, 30deg)",
            opacity: "0.7",
          },
          "100%": {
            transform: "translateY(0%) rotate3d(1, 0, 0, 0deg)",
            opacity: "1",
          },
        },
        modalGrowingScale: {
          "0%": {
            transform: "scale(0%)",
          },
          "100%": {
            transform: "scale(100%)",
          },
        },
      },
      animation: {
        marquee: "marquee 10s linear infinite",
        marquee5: "marquee5 10s linear infinite alternate",
        marqueeContent: "marqueeContent 8s linear infinite alternate",
        pulseSkeleton: "pulseSkeleton 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        slowSpin: "spin 12s linear infinite",
        fadeUp: "fade-up 1.5s ease-out",
        outlineBlink: "outlineBlink 2s infinite",
        fadeIn: "fadeIn 0.8s ease-in-out forwards",
        rotateFadeIn: "rotateFadeIn 0.2s linear",
        fill: "fill 4s linear infinite",
        updown: "updown 1.4s linear infinite",
        modalGrowingScale: "modalGrowingScale 0.3s linear",
      },
      willChange: {
        transform: "transform",
      },
      transformOrigin: {
        "center-center": "center center",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    function ({addUtilities, theme, addBase}: PluginAPI) {
      addBase({
        "@media (prefers-color-scheme: dark)": {
          ":root": {
            "--primary-color-100": `${theme("colors.black.100")}`,
            "--primary-color-80": `${theme("colors.black.80")}`,
            "--primary-color-60": `${theme("colors.black.60")}`,
            "--primary-color-40": `${theme("colors.black.40")}`,
            "--primary-color-20": `${theme("colors.black.20")}`,
            "--primary-color-contrast": `${theme("colors.black.contrast")}`,
            "--secondary-color-100": `${theme("colors.gray.100")}`,
            "--secondary-color-80": `${theme("colors.gray.80")}`,
            "--secondary-color-60": `${theme("colors.gray.60")}`,
            "--secondary-color-40": `${theme("colors.gray.40")}`,
            "--secondary-color-20": `${theme("colors.gray.20")}`,
            "--secondary-color-contrast": `${theme("colors.gray.contrast")}`,
            "--third-color-100": `${theme("colors.black.100")}`,
            "--third-color-80": `${theme("colors.black.80")}`,
            "--third-color-60": `${theme("colors.black.60")}`,
            "--third-color-40": `${theme("colors.black.40")}`,
            "--third-color-20": `${theme("colors.black.20")}`,
            "--third-color-contrast": `${theme("colors.black.contrast")}`,
            "--bg-default-1": `${theme("colors.black.20")}`,
            "--bg-default-2": `${theme("colors.gray.80")}`,
            "--bg-glassmorphism": "rgba(0, 0, 0, 0.1)",
            "--dynamic-opacity": "0.6",
          },
        },
        "@media (prefers-color-scheme: light)": {
          ":root": {
            "--bg-default-1": `${theme("colors.white.40")}`,
            "--bg-default-2": `${theme("colors.gray.40")}`,
            "--bg-glassmorphism": "rgba(255, 255, 255, 0.2)",
            "--dynamic-opacity": "0.8",
          },
          "[data-theme1=\"red\"]": {
            "--primary-color-100": `${theme("colors.red.100")}`,
            "--primary-color-80": `${theme("colors.red.80")}`,
            "--primary-color-60": `${theme("colors.red.60")}`,
            "--primary-color-40": `${theme("colors.red.40")}`,
            "--primary-color-20": `${theme("colors.red.20")}`,
            "--primary-color-contrast": `${theme("colors.red.contrast")}`,
          },
          "[data-theme1=\"orange\"]": {
            "--primary-color-100": `${theme("colors.orange.100")}`,
            "--primary-color-80": `${theme("colors.orange.80")}`,
            "--primary-color-60": `${theme("colors.orange.60")}`,
            "--primary-color-40": `${theme("colors.orange.40")}`,
            "--primary-color-20": `${theme("colors.orange.20")}`,
            "--primary-color-contrast": `${theme("colors.orange.contrast")}`,
          },
          "[data-theme1=\"yellow\"]": {
            "--primary-color-100": `${theme("colors.yellow.100")}`,
            "--primary-color-80": `${theme("colors.yellow.80")}`,
            "--primary-color-60": `${theme("colors.yellow.60")}`,
            "--primary-color-40": `${theme("colors.yellow.40")}`,
            "--primary-color-20": `${theme("colors.yellow.20")}`,
            "--primary-color-contrast": `${theme("colors.yellow.contrast")}`,
          },
          "[data-theme1=\"green\"]": {
            "--primary-color-100": `${theme("colors.green.100")}`,
            "--primary-color-80": `${theme("colors.green.80")}`,
            "--primary-color-60": `${theme("colors.green.60")}`,
            "--primary-color-40": `${theme("colors.green.40")}`,
            "--primary-color-20": `${theme("colors.green.20")}`,
            "--primary-color-contrast": `${theme("colors.green.contrast")}`,
          },
          "[data-theme1=\"skyblue\"]": {
            "--primary-color-100": `${theme("colors.sky.100")}`,
            "--primary-color-80": `${theme("colors.sky.80")}`,
            "--primary-color-60": `${theme("colors.sky.60")}`,
            "--primary-color-40": `${theme("colors.sky.40")}`,
            "--primary-color-20": `${theme("colors.sky.20")}`,
            "--primary-color-contrast": `${theme("colors.sky.contrast")}`,
          },
          "[data-theme1=\"blue\"]": {
            "--primary-color-100": `${theme("colors.blue.100")}`,
            "--primary-color-80": `${theme("colors.blue.80")}`,
            "--primary-color-60": `${theme("colors.blue.60")}`,
            "--primary-color-40": `${theme("colors.blue.40")}`,
            "--primary-color-20": `${theme("colors.blue.20")}`,
            "--primary-color-contrast": `${theme("colors.blue.contrast")}`,
          },
          "[data-theme1=\"purple\"]": {
            "--primary-color-100": `${theme("colors.purple.100")}`,
            "--primary-color-80": `${theme("colors.purple.80")}`,
            "--primary-color-60": `${theme("colors.purple.60")}`,
            "--primary-color-40": `${theme("colors.purple.40")}`,
            "--primary-color-20": `${theme("colors.purple.20")}`,
            "--primary-color-contrast": `${theme("colors.purple.contrast")}`,
          },
          "[data-theme1=\"pink\"]": {
            "--primary-color-100": `${theme("colors.pink.100")}`,
            "--primary-color-80": `${theme("colors.pink.80")}`,
            "--primary-color-60": `${theme("colors.pink.60")}`,
            "--primary-color-40": `${theme("colors.pink.40")}`,
            "--primary-color-20": `${theme("colors.pink.20")}`,
            "--primary-color-contrast": `${theme("colors.pink.contrast")}`,
          },
          "[data-theme1=\"black\"]": {
            "--primary-color-100": `${theme("colors.black.100")}`,
            "--primary-color-80": `${theme("colors.black.80")}`,
            "--primary-color-60": `${theme("colors.black.60")}`,
            "--primary-color-40": `${theme("colors.black.40")}`,
            "--primary-color-20": `${theme("colors.black.20")}`,
            "--primary-color-contrast": `${theme("colors.black.contrast")}`,
          },
          "[data-theme1=\"gray\"]": {
            "--primary-color-100": `${theme("colors.gray.100")}`,
            "--primary-color-80": `${theme("colors.gray.80")}`,
            "--primary-color-60": `${theme("colors.gray.60")}`,
            "--primary-color-40": `${theme("colors.gray.40")}`,
            "--primary-color-20": `${theme("colors.gray.20")}`,
            "--primary-color-contrast": `${theme("colors.gray.contrast")}`,
          },
          "[data-theme1=\"white\"]": {
            "--primary-color-100": `${theme("colors.white.100")}`,
            "--primary-color-80": `${theme("colors.white.80")}`,
            "--primary-color-60": `${theme("colors.white.60")}`,
            "--primary-color-40": `${theme("colors.white.40")}`,
            "--primary-color-20": `${theme("colors.white.20")}`,
            "--primary-color-contrast": `${theme("colors.white.contrast")}`,
          },

          "[data-theme2=\"red\"]": {
            "--secondary-color-100": `${theme("colors.red.100")}`,
            "--secondary-color-80": `${theme("colors.red.80")}`,
            "--secondary-color-60": `${theme("colors.red.60")}`,
            "--secondary-color-40": `${theme("colors.red.40")}`,
            "--secondary-color-20": `${theme("colors.red.20")}`,
            "--secondary-color-contrast": `${theme("colors.red.contrast")}`,
          },
          "[data-theme2=\"orange\"]": {
            "--secondary-color-100": `${theme("colors.orange.100")}`,
            "--secondary-color-80": `${theme("colors.orange.80")}`,
            "--secondary-color-60": `${theme("colors.orange.60")}`,
            "--secondary-color-40": `${theme("colors.orange.40")}`,
            "--secondary-color-20": `${theme("colors.orange.20")}`,
            "--secondary-color-contrast": `${theme("colors.orange.contrast")}`,
          },
          "[data-theme2=\"yellow\"]": {
            "--secondary-color-100": `${theme("colors.yellow.100")}`,
            "--secondary-color-80": `${theme("colors.yellow.80")}`,
            "--secondary-color-60": `${theme("colors.yellow.60")}`,
            "--secondary-color-40": `${theme("colors.yellow.40")}`,
            "--secondary-color-20": `${theme("colors.yellow.20")}`,
            "--secondary-color-contrast": `${theme("colors.yellow.contrast")}`,
          },
          "[data-theme2=\"green\"]": {
            "--secondary-color-100": `${theme("colors.green.100")}`,
            "--secondary-color-80": `${theme("colors.green.80")}`,
            "--secondary-color-60": `${theme("colors.green.60")}`,
            "--secondary-color-40": `${theme("colors.green.40")}`,
            "--secondary-color-20": `${theme("colors.green.20")}`,
            "--secondary-color-contrast": `${theme("colors.green.contrast")}`,
          },
          "[data-theme2=\"skyblue\"]": {
            "--secondary-color-100": `${theme("colors.sky.100")}`,
            "--secondary-color-80": `${theme("colors.sky.80")}`,
            "--secondary-color-60": `${theme("colors.sky.60")}`,
            "--secondary-color-40": `${theme("colors.sky.40")}`,
            "--secondary-color-20": `${theme("colors.sky.20")}`,
            "--secondary-color-contrast": `${theme("colors.sky.contrast")}`,
          },
          "[data-theme2=\"blue\"]": {
            "--secondary-color-100": `${theme("colors.blue.100")}`,
            "--secondary-color-80": `${theme("colors.blue.80")}`,
            "--secondary-color-60": `${theme("colors.blue.60")}`,
            "--secondary-color-40": `${theme("colors.blue.40")}`,
            "--secondary-color-20": `${theme("colors.blue.20")}`,
            "--secondary-color-contrast": `${theme("colors.blue.contrast")}`,
          },
          "[data-theme2=\"purple\"]": {
            "--secondary-color-100": `${theme("colors.purple.100")}`,
            "--secondary-color-80": `${theme("colors.purple.80")}`,
            "--secondary-color-60": `${theme("colors.purple.60")}`,
            "--secondary-color-40": `${theme("colors.purple.40")}`,
            "--secondary-color-20": `${theme("colors.purple.20")}`,
            "--secondary-color-contrast": `${theme("colors.purple.contrast")}`,
          },
          "[data-theme2=\"pink\"]": {
            "--secondary-color-100": `${theme("colors.pink.100")}`,
            "--secondary-color-80": `${theme("colors.pink.80")}`,
            "--secondary-color-60": `${theme("colors.pink.60")}`,
            "--secondary-color-40": `${theme("colors.pink.40")}`,
            "--secondary-color-20": `${theme("colors.pink.20")}`,
            "--secondary-color-contrast": `${theme("colors.pink.contrast")}`,
          },
          "[data-theme2=\"black\"]": {
            "--secondary-color-100": `${theme("colors.black.100")}`,
            "--secondary-color-80": `${theme("colors.black.80")}`,
            "--secondary-color-60": `${theme("colors.black.60")}`,
            "--secondary-color-40": `${theme("colors.black.40")}`,
            "--secondary-color-20": `${theme("colors.black.20")}`,
            "--secondary-color-contrast": `${theme("colors.black.contrast")}`,
          },
          "[data-theme2=\"gray\"]": {
            "--secondary-color-100": `${theme("colors.gray.100")}`,
            "--secondary-color-80": `${theme("colors.gray.80")}`,
            "--secondary-color-60": `${theme("colors.gray.60")}`,
            "--secondary-color-40": `${theme("colors.gray.40")}`,
            "--secondary-color-20": `${theme("colors.gray.20")}`,
            "--secondary-color-contrast": `${theme("colors.gray.contrast")}`,
          },
          "[data-theme2=\"white\"]": {
            "--secondary-color-100": `${theme("colors.white.100")}`,
            "--secondary-color-80": `${theme("colors.white.80")}`,
            "--secondary-color-60": `${theme("colors.white.60")}`,
            "--secondary-color-40": `${theme("colors.white.40")}`,
            "--secondary-color-20": `${theme("colors.white.20")}`,
            "--secondary-color-contrast": `${theme("colors.white.contrast")}`,
          },
          "[data-theme3=\"red\"]": {
            "--third-color-100": `${theme("colors.red.100")}`,
            "--third-color-80": `${theme("colors.red.80")}`,
            "--third-color-60": `${theme("colors.red.60")}`,
            "--third-color-40": `${theme("colors.red.40")}`,
            "--third-color-20": `${theme("colors.red.20")}`,
            "--third-color-contrast": `${theme("colors.red.contrast")}`,
          },
          "[data-theme3=\"orange\"]": {
            "--third-color-100": `${theme("colors.orange.100")}`,
            "--third-color-80": `${theme("colors.orange.80")}`,
            "--third-color-60": `${theme("colors.orange.60")}`,
            "--third-color-40": `${theme("colors.orange.40")}`,
            "--third-color-20": `${theme("colors.orange.20")}`,
            "--third-color-contrast": `${theme("colors.orange.contrast")}`,
          },
          "[data-theme3=\"yellow\"]": {
            "--third-color-100": `${theme("colors.yellow.100")}`,
            "--third-color-80": `${theme("colors.yellow.80")}`,
            "--third-color-60": `${theme("colors.yellow.60")}`,
            "--third-color-40": `${theme("colors.yellow.40")}`,
            "--third-color-20": `${theme("colors.yellow.20")}`,
            "--third-color-contrast": `${theme("colors.yellow.contrast")}`,
          },
          "[data-theme3=\"green\"]": {
            "--third-color-100": `${theme("colors.green.100")}`,
            "--third-color-80": `${theme("colors.green.80")}`,
            "--third-color-60": `${theme("colors.green.60")}`,
            "--third-color-40": `${theme("colors.green.40")}`,
            "--third-color-20": `${theme("colors.green.20")}`,
            "--third-color-contrast": `${theme("colors.green.contrast")}`,
          },
          "[data-theme3=\"skyblue\"]": {
            "--third-color-100": `${theme("colors.sky.100")}`,
            "--third-color-80": `${theme("colors.sky.80")}`,
            "--third-color-60": `${theme("colors.sky.60")}`,
            "--third-color-40": `${theme("colors.sky.40")}`,
            "--third-color-20": `${theme("colors.sky.20")}`,
            "--third-color-contrast": `${theme("colors.sky.contrast")}`,
          },
          "[data-theme3=\"blue\"]": {
            "--third-color-100": `${theme("colors.blue.100")}`,
            "--third-color-80": `${theme("colors.blue.80")}`,
            "--third-color-60": `${theme("colors.blue.60")}`,
            "--third-color-40": `${theme("colors.blue.40")}`,
            "--third-color-20": `${theme("colors.blue.20")}`,
            "--third-color-contrast": `${theme("colors.blue.contrast")}`,
          },
          "[data-theme3=\"purple\"]": {
            "--third-color-100": `${theme("colors.purple.100")}`,
            "--third-color-80": `${theme("colors.purple.80")}`,
            "--third-color-60": `${theme("colors.purple.60")}`,
            "--third-color-40": `${theme("colors.purple.40")}`,
            "--third-color-20": `${theme("colors.purple.20")}`,
            "--third-color-contrast": `${theme("colors.purple.contrast")}`,
          },
          "[data-theme3=\"pink\"]": {
            "--third-color-100": `${theme("colors.pink.100")}`,
            "--third-color-80": `${theme("colors.pink.80")}`,
            "--third-color-60": `${theme("colors.pink.60")}`,
            "--third-color-40": `${theme("colors.pink.40")}`,
            "--third-color-20": `${theme("colors.pink.20")}`,
            "--third-color-contrast": `${theme("colors.pink.contrast")}`,
          },
          "[data-theme3=\"black\"]": {
            "--third-color-100": `${theme("colors.gray.100")}`,
            "--third-color-80": `${theme("colors.gray.80")}`,
            "--third-color-60": `${theme("colors.gray.60")}`,
            "--third-color-40": `${theme("colors.gray.40")}`,
            "--third-color-20": `${theme("colors.gray.20")}`,
            "--third-color-contrast": `${theme("colors.gray.contrast")}`,
          },
          "[data-theme3=\"gray\"]": {
            "--third-color-100": `${theme("colors.gray.100")}`,
            "--third-color-80": `${theme("colors.gray.80")}`,
            "--third-color-60": `${theme("colors.gray.60")}`,
            "--third-color-40": `${theme("colors.gray.40")}`,
            "--third-color-20": `${theme("colors.gray.20")}`,
            "--third-color-contrast": `${theme("colors.gray.contrast")}`,
          },
          "[data-theme3=\"white\"]": {
            "--third-color-100": `${theme("colors.white.100")}`,
            "--third-color-80": `${theme("colors.white.80")}`,
            "--third-color-60": `${theme("colors.white.60")}`,
            "--third-color-40": `${theme("colors.white.40")}`,
            "--third-color-20": `${theme("colors.white.20")}`,
            "--third-color-contrast": `${theme("colors.white.contrast")}`,
          },
          ".dark": {
            "--primary-color-100": `${theme("colors.black.100")}`,
            "--primary-color-80": `${theme("colors.black.80")}`,
            "--primary-color-60": `${theme("colors.black.60")}`,
            "--primary-color-40": `${theme("colors.black.40")}`,
            "--primary-color-20": `${theme("colors.black.20")}`,
            "--primary-color-contrast": `${theme("colors.black.contrast")}`,
            "--secondary-color-100": `${theme("colors.black.100")}`,
            "--secondary-color-80": `${theme("colors.black.80")}`,
            "--secondary-color-60": `${theme("colors.black.60")}`,
            "--secondary-color-40": `${theme("colors.black.40")}`,
            "--secondary-color-20": `${theme("colors.black.20")}`,
            "--secondary-color-contrast": `${theme("colors.black.contrast")}`,
            "--third-color-100": `${theme("colors.black.100")}`,
            "--third-color-80": `${theme("colors.black.80")}`,
            "--third-color-60": `${theme("colors.black.60")}`,
            "--third-color-40": `${theme("colors.black.40")}`,
            "--third-color-20": `${theme("colors.black.20")}`,
            "--third-color-contrast": `${theme("colors.black.contrast")}`,
            "--bg-default-1": `${theme("colors.black.20")}`,
            "--bg-default-2": `${theme("colors.gray.80")}`,
            "--bg-glassmorphism": "rgba(0, 0, 0, 0.1)",
            "--dynamic-opacity": "0.6",
          },
        },
      }),
      addUtilities({
        // ".scrollbar-hide": {
        //   "-ms-overflow-style": "none" /* IE and Edge */,
        //   "scrollbar-width": "none" /* Firefox */,
        //   "&::-webkit-scrollbar": {
        //     display: "none" /* Chrome, Safari, and Opera */,
        //   },
        // },
        ".default-primary-outline": {
          outline: "0.0625rem solid var(--primary-color-80)",
          "border-radius": "1rem",
        },
        ".default-secondary-outline": {
          outline: "0.0625rem solid var(--secondary-color-80)",
          "border-radius": "1rem",
        },
        ".default-third-outline": {
          outline: "0.0625rem solid var(--third-color-80)",
          "border-radius": "1rem",
        },
        ".primary-outline": {
          outline: "0.0625rem solid var(--primary-color-80)",
        },
        ".secondary-outline": {
          outline: "0.0625rem solid var(--secondary-color-80)",
        },
        ".third-outline": {
          outline: "0.0625rem solid var(--third-color-80)",
        },
        ".primary-set": {
          background: `${theme("colors.primary.80")}`,
          color: `${theme("colors.primary.contrast")}`,
        },
        ".secondary-set": {
          background: `${theme("colors.secondary.80")}`,
          color: `${theme("colors.secondary.contrast")}`,
        },
        ".third-set": {
          background: `${theme("colors.third.80")}`,
          color: `${theme("colors.third.contrast")}`,
        },
        ".dynamic-opacity": {
          // opacity: "var(--dynamic-opacity)",
          "mix-blend-mode": "multiply",
        },
        ".default-outline-nocolor": {
          outline: "0.0625rem solid",
          "outline-offset": "-0.0625rem",
          "border-radius": "1rem",
        },
        ".default-flex": {
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
        },
        ".text-gradient": {
          background: "linear-gradient(to right, #C193EC 0%, #7D91FF 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient1": {
          background: "linear-gradient(70deg, #f2709c 0%, #ff9472 100%)",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".glassmorphism": {
          "backdrop-filter": "blur(24px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(24px) saturate(180%)",
          "background-color": "var(--bg-glassmorphism)",
          "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.1)",
          "will-change": "backdrop-filter, transform",
        },
        ".bg-gradient": {
          background: `linear-gradient(to right, ${theme("colors.primary.40")} 0%, ${theme("colors.secondary.40")} 100%)`,
        },
        ".animate-paused": {
          "animation-play-state": "paused",
        },
        ".animate--duration-1": {
          "animate--duration": "1s",
        },
        ".fillAnimation": {
          background:
              "linear-gradient(70deg, #C193EC 0%, #7D91FF 50%, #C193EC 100%)",
          backgroundSize: "200% 100%",
        },
      });
    },
  ],
};
export default config;
