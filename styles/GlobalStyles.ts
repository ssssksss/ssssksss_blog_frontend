import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
const GlobalStyles = createGlobalStyle`
  ${reset}
  *, *::before, *::after {
  }
  body {
  }
  strong {
    font-weight: bold;
  }
  em {
  font-style: italic;
  }
`;
export default GlobalStyles;
