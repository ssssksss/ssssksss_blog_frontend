import { keyframes } from "@emotion/react";
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

const LeftToRightFadein = keyframes`
from{
  opacity: 0;
  transform: translate(-50%,0%);
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
    opacity: 0.2;
    transform: translate(0px,4px);
  }
`;

const UpToDownRepeat = keyframes`
  0%,100%{
    transform: translate(0,-1px);
    padding-bottom: -2px;
  }
  50%{
    transform: translate(0px,1px);
    padding-top: 2px;
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
  0%,100% {
    color: #333333;
  }
  50% {
    color: #999999;
  }
`;

const FlipCard = keyframes`
  50% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

export const animationKeyFrames = {
  RightToLeftFadein,
  LeftToRightFadein,
  Fadein,
  Fadeout,
  UpToDownRepeatFadein,
  ChangeGrayColor,
  UpToDownRepeat,
  FlipCard,
};
