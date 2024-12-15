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
  content: [
    "./src/component/**/view/**/*.{ts,tsx}",
    "./src/component/**/hybrid/**/*.{ts,tsx}",
    "./src/component/common/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/utils/**/*.{ts,tsx}",
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
        primary: {
          100: "#9B51E0",
          80: "#AF74E6",
          60: "#C397EC",
          40: "#D7B9F3",
          20: "#EBDCF9",
        },
        secondary: {
          100: "#3454FF",
          80: "#5D76FF",
          60: "#8598FF",
          40: "#AEBBFF",
          20: "#D6DDFF",
        },
        third: {
          100: "#FF9900",
          80: "#FFAD33",
          60: "#FFC266",
          40: "#FFD699",
          20: "#FFEBCC",
        },
        red: {
          100: "#FF0000",
          80: "#FF3333",
          60: "#FF6666",
          40: "#FF9999",
          20: "#FFCCCC",
        },
        orange: {
          100: "#FF9900",
          80: "#FFAD33",
          60: "#FFC266",
          40: "#FFD699",
          20: "#FFEBCC",
        },
        yellow: {
          100: "#FAFF00",
          80: "#FBFF33",
          60: "#FCFF66",
          40: "#FDFF99",
          20: "#FEFFCC",
        },
        green: {
          100: "#18A934",
          80: "#46BA5D",
          60: "#74CB85",
          40: "#A3DDAE",
          20: "#D1EED6",
        },
        skyblue: {
          100: "#56CCF2",
          80: "#78D6F5",
          60: "#9AE0F7",
          40: "#BBEBFA",
          20: "#DDF5FC",
        },
        blue: {
          100: "#3454FF",
          80: "#5D76FF",
          60: "#8598FF",
          40: "#AEBBFF",
          20: "#D6DDFF",
        },
        purple: {
          100: "#9B51E0",
          80: "#AF74E6",
          60: "#C397EC",
          40: "#D7B9F3",
          20: "#EBDCF9",
        },
        pink: {
          100: "#FFB8B8",
          80: "#FFC6C6",
          60: "#FFD4D4",
          40: "#FFE3E3",
          20: "#FFF1F1",
        },
        black: {
          100: "#000000",
          80: "#333333",
          60: "#666666",
          40: "#999999",
          20: "#CCCCCC",
        },
        gray: {
          100: "#C9C9C9",
          80: "#D4D4D4",
          60: "#DFDFDF",
          40: "#E9E9E9",
          20: "#F4F4F4",
        },
        white: {
          100: "#FFFFFF",
          80: "#FCFCFC",
          60: "#F9F9F9",
          40: "#F5F5F5",
          20: "#F2F2F2",
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
    function ({addUtilities, theme}: PluginAPI) {
      addUtilities({
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
          "&::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, and Opera */,
          },
        },
        ".default-outline": {
          outline: `0.0625rem solid ${theme("colors.primary.60")}`,
          "outline-offset": "-0.0625rem",
          "border-radius": "1rem",
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
          "background-color": "rgba(255, 255, 255, 0.8)",
          "box-shadow": "0 4px 20px rgba(0, 0, 0, 0.1)",
          "will-change": "backdrop-filter, transform",
        },
        ".bg-gradient": {
          background: `linear-gradient(to right, ${theme("colors.primary.20")} 0%, ${theme("colors.secondary.20")} 100%)`,
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
