import { css } from "@emotion/react";
import theme from "./theme";

const GlobalStyles = css`
  @font-face {
    font-family: "gmarketSansBold";
    src: url("/fonts/GmarketSansTTFBold.ttf") format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "cookieRunRegular";
    src: url("/fonts/cookieRunRegular.ttf") format("truetype");
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  }
  html,
  body {
    width: 100%;
    scroll-behavior: smooth;
    background-color: ${theme.backgroundColors.background2};
    &::-webkit-scrollbar {
      display: none;
      /* width: 5px; */
    }
  }
  button {
    cursor: pointer;
    border: none;
    background-color: white;
  }
  a {
    outline: none;
    color: inherit;
    text-decoration: none;
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
`;
export default GlobalStyles;
