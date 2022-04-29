import { DefaultTheme } from "styled-components";
const theme: DefaultTheme = {
  customColors: {
    firstTitle: "#7e57c2",
    first: "#b085f5",
    secondTitle: "#ffa946",
    second: "#ffbb6d",
    third: "#e3ffd3",
    thirdTitle: "#00af27",
    fourth: "#fff3e3",
  },
  customFonts: {
    cookieRunOTFBlack: "cookieRunOTFBlack",
    cookieRunOTFRegular: "cookieRunOTFRegular",
    GmarketSansBold: "GmarketSansBold",
  },
  customScreen: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    maxWidth: "1440px",
  },
  flex: {
    flexCenter: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "center",
      "align-items": "center",
    },
    flexLeft: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "left",
      "align-items": "center",
    },
    flexLeftTop: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "left",
      "align-items": "flex-start",
    },
    flexAround: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "space-around",
      "align-items": "center",
    },
    flexEvenly: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "space-evenly",
      "align-items": "center",
    },
    flexBetween: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "space-between",
      "align-items": "center",
    },
    flexRight: {
      display: "flex",
      "flex-flow": "nowrap row",
      "justify-content": "flex-end",
      "align-items": "center",
    },
  },
  customButton: {
    //background: "white",
    "border-radius": "10px",
    "font-size": "1rem",
    cursor: "pointer",
  },
};
export { theme };
