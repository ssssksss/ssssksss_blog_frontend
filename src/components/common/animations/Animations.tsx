import { keyframes } from '@emotion/react';

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
    transform: translate(0rem,-0.4rem);
  }
  to{
    opacity: 0.2;
    transform: translate(0rem,0.4rem);
  }
`;

const UpToDownRepeat = keyframes`
  0%,100%{
    transform: translate(0,-0.1rem);
  }
  50%{
    transform: translate(0rem,0.1rem);
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

const skeletonColors = keyframes`
    0% {
          background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    }
    50% {
          background-image: linear-gradient(90deg, #f0f0f0 25%, #f0f0f0 50%, #e0e0e0 75%);
    }
    100% {
          background-image: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #f0f0f0 75%);
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

const Animations = {
  RightToLeftFadein,
  LeftToRightFadein,
  Fadein,
  Fadeout,
  UpToDownRepeatFadein,
  ChangeGrayColor,
  UpToDownRepeat,
  FlipCard,
  rainbowColors,
  skeletonColors,
};

export default Animations;
