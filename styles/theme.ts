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
  xs: `${calcRem(12)}`,
  sm: `${calcRem(16)}`,
  md: `${calcRem(18)}`,
  lg: `${calcRem(24)}`,
  xl: `${calcRem(30)}`,
};

const borderRadius = {
  xs: `${calcRem(12)}`,
  sm: `${calcRem(16)}`,
  md: `${calcRem(18)}`,
  lg: `${calcRem(24)}`,
  xl: `${calcRem(30)}`,
};

const padding = {
  xs: `${calcRem(12)}`,
  sm: `${calcRem(16)}`,
  md: `${calcRem(18)}`,
  lg: `${calcRem(24)}`,
  xl: `${calcRem(30)}`,
};

const height = {
  xs: "40px",
  sm: "60px",
  md: "80px",
  lg: "100px",
  xl: "120px",
};

const deviceSizes = {
  mobile: "360px",
  tablet: "768px",
  laptop: "1024px",
  maxWidth: "1024px",
};

const customScreen = {
  sm: "576px",
  md: "768px",
  lg: "992px",
  xl: "1200px",
  maxWidth: "1440px",
  phone: "360px",
  tablet: "768px",
  desktop: "1024px",
};

const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `screen and (max-width: ${deviceSizes.tablet})`,
  laptop: `screen and (min-width: ${deviceSizes.tablet})`,
};

const fontFamily = {
  cookieRunOTFBlack: "cookieRunOTFBlack",
  cookieRunRegular: "cookieRunRegular",
  gmarketSansBold: "gmarketSansBold",
};

// 색깔
const colors = {
  orange: "#333",
  secondary: "#333",
  skyblue: "#333",
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
  orangeLight: "#FFC266",
  orange: "#FFAD33",
  orangeDark: "#FF9900",
  purpleLight: "#B29ADA",
  purple: "#9879CE",
  purpleDark: "#7E57C2",
  skyblueLight: "#97D4FF",
  skyblue: "#75C6FF",
  skyblueDark: "#52B8FF",
  lightredLight: "#FFAA8E",
  lightred: "#FF8D69",
  lightredDark: "#FF7143",
  greenLight: "#74CB85",
  green: "#46BA5D",
  greenDark: "#18A934",
  turquoiseLight: "#67E1C2",
  turquoise: "#34D7AE",
  turquoiseDark: "#01CD9A",
  blueLight: "#82B3F4",
  blue: "#5999F1",
  blueDark: "#2F80ED",
  yellowLight: "#F7DF94",
  yellow: "#F5D470",
  yellowDark: "#F2C94C",
  error: "white",
  disabled: "#E5E5E5",
  dangerLight: "#FC9372",
  danger: "#FB6F43",
  dangerDark: "#FA4B14",
  cancel: "black",
  border: "#999999",
  placeholder: "#f0f0f0",
  black: "#333333",
  white: "white",
  white1: "#f2f2f2",
  white2: "#fafafa",
  white3: "#f4f5f6",
  white4: "#f9f9f9",
  white5: "#f3f5fb",
  background: "#FFFFFF",
  background1: "#F4F4F4",
  /**
   * @parmas 현재 사용하고 있는 배경색
   */
  background2: "#F6EFE5",
  background3: "#e0e0e0",
  grayLight: "#C2C2C2",
  gray: "#ADADAD",
  grayDark: "#999999",
  googleCalendarGray: "#f1f3f4",
  transparent: "transparent",
};

const flex = {
  display: "flex",
  row: {
    display: "flex",
    between: {
      display: "flex",
      justifyContent: "space-between",
      center: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      },
      start: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
      end: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
      },
    },
    around: {
      display: "flex",
      justifyContent: "space-around",
      center: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      },
    },
    center: {
      display: "flex",
      justifyContent: "center",
      center: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      between: {
        display: "flex",
        justifyContent: "center",
        alignItems: "space-between",
      },
    },
    end: {
      display: "flex",
      justifyContent: "flex-end",
      center: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      },
    },
    _: {
      display: "flex",
      flexFlow: "nowrap row",
      center: {
        display: "flex",
        alignItems: "center",
      },
      start: {
        display: "flex",
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

const theme = {
  fontSizes,
  colors,
  flex,
  backgroundColors,
  deviceSizes,
  device,
  fontFamily,
  /**
   * @Params sm:576, md:768, lg:992, xl:1200, maxWidth:1440, phone:360, tablet:768, desktop:1024
   */
  customScreen,
  borderRadius,
  padding,
  height,
};

export default theme;
