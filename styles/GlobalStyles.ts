import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "GmarketSansBold";
    src: url("/fonts/GmarketSansTTFBold.ttf")
      format("truetype");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "CookieRunRegular";
    src: url("/fonts/CookieRunRegular.ttf")
      format("truetype");
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html,body {
    width: 100%;
    scroll-behavior: smooth;
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
