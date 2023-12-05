import { keyframes } from '@emotion/react';
import theme from './theme';

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

const rainbowColors = keyframes`
  0% {
    background-image: linear-gradient(
      90deg,
      rgba(174, 84, 242, 1) 0%,
      rgba(247, 84, 34, 1) 20%,
      rgba(247, 167, 46, 1) 40%,
      rgba(195, 245, 189, 1) 60%,
      rgba(250, 238, 167, 1) 80%
    );
  }
  20% {
    background-image: linear-gradient(
      90deg,
      rgba(174, 84, 242, 1) 0%,
      rgba(247, 84, 34, 1) 20%,
      rgba(247, 167, 46, 1) 40%,
      rgba(195, 245, 189, 1) 60%,
      rgba(250, 238, 167, 1) 80%
    );
  }
  40% {
    background-image: linear-gradient(
      90deg,
      rgba(247, 84, 34, 1)    0%,
      rgba(247, 167, 46, 1)   20%,
      rgba(195, 245, 189, 1)  40%,
      rgba(250, 238, 167, 1)  60%,
      rgba(174, 84, 242, 1)  80%
    );
  }
  60% {
    background-image: linear-gradient(
      90deg,
      rgba(247, 167, 46, 1)   0%,
      rgba(195, 245, 189, 1)  20%,
      rgba(250, 238, 167, 1)  40%,
      rgba(174, 84, 242, 1)   60%,
      rgba(247, 84, 34, 1)   80%
      );
  }
  80% {
    background-image: linear-gradient(
      90deg,
      rgba(195, 245, 189, 1)  0%,
      rgba(250, 238, 167, 1)  20%,
      rgba(174, 84, 242, 1)   40%,
      rgba(247, 84, 34, 1)    60%,
      rgba(247, 167, 46, 1)    80%
      );
  }
  100% {
    background-image: linear-gradient(
      90deg,
    rgba(250, 238, 167, 1)  0%,
    rgba(174, 84, 242, 1)   20%,
    rgba(247, 84, 34, 1)    40%,
    rgba(247, 167, 46, 1)   60%,
    rgba(195, 245, 189, 1)   80%
    );
  }
  `;

const Jelly = keyframes`
  from {
    transform: scale(1.0, 1.0);
    transform: translate(20px, 25%);
  }
  /* 30% {
    transform: scale(1.25, 0.75);
  }
  40% {
    transform: scale(0.75, 1.25);
  } */
  50% {
    /* transform: scale(1.15, 0.85); */
    transform: scale(5.0,5.0);
  }
  /* 65% {
    transform: scale(.95, 1.05);
  }
  75% {
    transform: scale(1.05, .95);
  } */
  to {
    transform: scale(1.0, 1.0);
    transform: translate(25%, 20px);
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
  rainbowColors,
  Jelly,
};
