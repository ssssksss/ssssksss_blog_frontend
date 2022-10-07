/**
 * Author : Sukyung Lee
 * FileName: theme.ts
 * Date: 2022-07-02 02:09:11
 * Description : 공통적인 스타일을 지정하여 일관성있는 스타일을 보여주기 위해 작성
 */

// 폰트를 rem으로 계산
const calcRem = (size: number) => `${size / 16}rem`;

// 폰트 사이즈
const fontSizes = {
  small: `${calcRem(12)}`,
  base: `${calcRem(16)}`,
  lg: `${calcRem(18)}`,
  subTitle: `${calcRem(24)}`,
  mainTitle: `${calcRem(30)}`,
};

// 색깔
const colors = {
  primary: "#333",
  secondary: "#333",
  third: "#333",
  error: "#333",
  disabled: "#333",
  danger: "#333",
  cancel: "#333",
  border: "#333333",
  background: "#333",
  placeholder: "#999999",
  grayLight: "#C2C2C2",
  gray: "#ADADAD",
  grayDark: "#999999",
};
const backgroundColors = {
  primaryLight: "#FFC266",
  primary: "#FFAD33",
  primaryDark: "#FF9900",
  secondaryLight: "#B29ADA",
  secondary: "#9879CE",
  secondaryDark: "#7E57C2",
  thirdLight: "#97D4FF",
  third: "#75C6FF",
  thirdDark: "#52B8FF",
  fourthLight: "#FFAA8E",
  fourth: "#FF8D69",
  fourthDark: "#FF7143",
  fifthLight: "#74CB85",
  fifth: "#46BA5D",
  fifthDark: "#18A934",
  sixthLight: "#67E1C2",
  sixth: "#34D7AE",
  sixthDark: "#01CD9A",
  seventhLight: "#82B3F4",
  seventh: "#5999F1",
  seventhDark: "#2F80ED",
  eighthLight: "#F7DF94",
  eighth: "#F5D470",
  eighthDark: "#F2C94C",
  error: "white",
  disabled: "#E5E5E5",
  dangerLight: "#FC9372",
  danger: "#FB6F43",
  dangerDark: "#FA4B14",
  cancel: "black",
  border: "#999999",
  placeholder: "#f0f0f0",
  black: "#333333",
  white: "#FFFFFF",
  background: "#FFFFFF",
  background1: "#F4F4F4",
  background2: "#F6EFE5",
  grayLight: "#C2C2C2",
  gray: "#ADADAD",
  grayDark: "#999999",
};

const flex = {
  display: "flex",
  row: {
    display: "flex",
    flexFlow: "nowrap row",

    between: {
      display: "flex",
      flexFlow: "nowrap row",
      justifyContent: "space-between",
      center: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      start: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
      end: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
    },
    around: {
      display: "flex",
      flexFlow: "nowrap row",
      justifyContent: "space-around",
      center: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "space-around",
        alignItems: "center",
      },
    },
    center: {
      display: "flex",
      flexFlow: "nowrap row",
      justifyContent: "center",
      center: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "center",
        alignItems: "center",
      },
      between: {
        display: "flex",
        flexFlow: "nowrap row",
        justifyContent: "center",
        alignItems: "space-between",
      },
    },
    end: {
      display: "flex",
      flexFlow: "nowrap row",
      justifyContent: "flex-end",
      center: {
        display: "flex",
        flexFlow: "nowrap row",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
    _: {
      display: "flex",
      flexFlow: "nowrap row",
      center: {
        display: "flex",
        flexFlow: "nowrap row",
      },
      start: {
        display: "flex",
        flexFlow: "nowrap row",
        alignItems: "flex-start",
      },
    },
  },
  column: {
    display: "flex",
    flexFlow: "nowrap column",
    center: {
      display: "flex",
      flexFlow: "nowrap column",
      justifyContent: "center",
      center: {
        display: "flex",
        flexFlow: "nowrap column",
        justifyContent: "center",
        alignItems: "center",
      },
      between: {
        display: "flex",
        flexFlow: "nowrap column",
        justifyContent: "center",
        alignItems: "space-between",
      },
      end: {
        display: "flex",
        flexFlow: "nowrap column",
        justifyContent: "center",
        alignItems: "flex-end",
      },
    },
    start: {
      display: "flex",
      flexFlow: "nowrap column",
      justifyContent: "flex-start",
      start: {
        display: "flex",
        flexFlow: "nowrap column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
      },
    },
    between: {
      display: "flex",
      flexFlow: "nowrap column",
      justifyContent: "space-between",
    },
    end: {
      display: "flex",
      flexFlow: "nowrap column",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    _: {
      start: {
        display: "flex",
        flexFlow: "nowrap column",
        alignItems: "flex-start",
      },
    },
  },
};

const deviceSizes = {
  mobile: "360px",
  tablet: "768px",
  laptop: "1024px",
  maxWidth: "1024px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.tablet})`,
};

const customFonts = {
  cookieRunOTFBlack: "cookieRunOTFBlack",
  cookieRunOTFRegular: "cookieRunOTFRegular",
  GmarketSansBold: "GmarketSansBold",
};

const theme = {
  fontSizes,
  colors,
  flex,
  backgroundColors,
  deviceSizes,
  device,
  customFonts,
};

export default theme;
