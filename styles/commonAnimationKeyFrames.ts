import { keyframes } from "styled-components";

export const animationRightToLeft = keyframes`
0%{
  opacity: 0;
  transform: translate(100%,0%);
}
100%{
  opacity: 1;
  transform: translate(0%,0%);
}
`;
