import { keyframes } from "styled-components";
import theme from "./theme";

const RightToLeftFadein = keyframes`
from{
  opacity: 0;
  transform: translate(100%,0%);
}
to{
  opacity: 1;
  transform: translate(0%,0%);
}
`;

const UpToDownRepeatFadein = keyframes`
  from{
    opacity: 1;
    transform: translate(0px,-4px);
  }
  to{
    opacity: 0;
    transform: translate(0px,4px);
  }
`;

const Fadein = keyframes`
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
`;

const Fadeout = keyframes`
  from{
    opacity: 1;
  }
  to{
    opacity: 0;
  }
`;

const ChangeGrayColor = keyframes`
  0% {
    color: ${theme.colors.grayDark};
  }
  100% {
    color: ${theme.colors.grayLight};
  }
`;

export const animationKeyFrames = {
  RightToLeftFadein,
  Fadein,
  Fadeout,
  UpToDownRepeatFadein,
  ChangeGrayColor,
};
