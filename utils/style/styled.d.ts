import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    customColors: {
      firstTitle: string;
      first: string;
      secondTitle: string;
      second: string;
      third: string;
      thirdTitle: string;
      fourth: string;
    };
    customFonts: {
      cookieRunOTFBlack: string;
      cookieRunOTFRegular: string;
      GmarketSansBold: string;
    };
    customScreen: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      maxWidth: string;
    };
    flex: {
      flexCenter: {
        display: string;
        "flex-flow": string;
        "justify-content": string;
        "align-items": string;
      };
      flexLeft: {
        display: string;
        "flex-flow": string;
        "justify-content": string;
        "align-items": string;
      };
      flexLeftTop: {
        display: string;
        "flex-flow": string;
        "justify-content": string;
        "align-items": string;
      };
      flexAround: {
        display: string;
        "flex-flow": string;
        "justify-content": string;
        "align-items": string;
      };
      flexRight: {
        display: string;
        "flex-flow": string;
        "justify-content": string;
        "align-items": string;
      };
    };
    customButton: {
      background: string;
      "border-radius": string;
      "font-size": string;
      cursor: string;
    };
  }
}
