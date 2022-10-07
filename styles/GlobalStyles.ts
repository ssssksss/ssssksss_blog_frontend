import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}
  @font-face {
    font-family: "GmarketSansBold";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
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
