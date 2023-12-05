import { css } from '@emotion/react';
import theme from './theme';

const GlobalStyles = css`
  @font-face {
    font-family: 'gmarketSansBold';
    src: url('/fonts/GmarketSansTTFBold.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'cookieRunRegular';
    src: url('/fonts/cookieRunRegular.ttf') format('truetype');
  }
  @font-face {
    font-family: 'typoHelloPOP';
    src: url('/fonts/TypoHelloPOP.ttf') format('truetype');
  }
  @font-face {
    font-family: 'yanoljaYacheBold';
    src: url('/fonts/YanoljaYacheBold.ttf') format('truetype');
  }
  @font-face {
    font-family: 'yanoljaYacheRegular';
    src: url('/fonts/YanoljaYacheRegular.ttf') format('truetype');
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
    font-size: ${props => props.theme.calcRem(16)};
  }
  html,
  body {
    width: 100%;
    scroll-behavior: smooth;
    /* background-color: ${theme.backgroundColors.background2}; */
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

  /*  */

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`;
export default GlobalStyles;
