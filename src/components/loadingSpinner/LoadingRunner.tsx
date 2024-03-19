import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import Image from 'next/image';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file LoadingRunner.tsx
 * @version 0.0.1 "2024-03-06 12:27:48"
 * @description 설명
 */
const LoadingRunner = () => {
  return (
    <Container>
      <div className="wrap">
        <Logo>
          <Image src={Icons.LogoIcon} alt="" />
        </Logo>
      </div>
      <LoadingSpan className="loading">
        {[...'Loading'].map((i, index) => (
          <Letter key={index} value={index}>
            {i}
          </Letter>
        ))}
      </LoadingSpan>
    </Container>
  );
};
export default LoadingRunner;

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

  display: grid;
  place-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
  width: 100vw;
  background: ${(props) => props.theme.main.secondary60};
  &:before,
  &:after {
    border-radius: 2rem 2rem 0 0;
    content: '';
    position: absolute;
    width: 100vw;
    background:
      radial-gradient(
          circle at center,
          #58c9ea 0.1rem,
          transparent 0.1rem,
          transparent 1rem
        )
        50% 50% / 2rem 2rem,
      radial-gradient(
          circle at center,
          #58c9ea 0.1rem,
          transparent 0.1rem,
          transparent 1rem
        )
        calc(50% + 1rem) calc(50% + 1rem) / 2rem 2rem;
    height: calc(50vh - 1rem);
    box-shadow: inset 0 0 0 0.5rem ${(props) => props.theme.main.primary100};
    left: 0;
    top: calc(50% + 22.5rem);
    animation: scroll 2s linear infinite -1.5s;
    @keyframes scroll {
      to {
        transform: translateX(-200vw);
      }
    }
  }
  &:after {
    width: 150vw;
    left: 150vw;
  }
  .wrap {
    width: 40rem;
    height: 40rem;
    text-align: center;
    position: absolute;
    transform-origin: 100% 0%;
    font-family: 'JetBrains Mono';
    font-size: 5rem;
    animation: wobble 2s linear infinite;
    &:nth-of-type(2) {
      animation-delay: -0.05s;
      z-index: -1;
      span {
        color: #1e1f24;
        animation: run2 2s ease-in-out infinite;

        \-webkit-text-stroke: 0.2rem #bb9c30;
      }
    }
    @keyframes wobble {
      0%,
      20%,
      40%,
      50%,
      80%,
      100% {
        transform: rotate(-5deg);
      }
      10%,
      30%,
      90% {
        transform: rotate(5deg);
      }
      70% {
        transform: rotate(0deg) scaleY(0.8) scaleX(1.1);
      }
    }
  }
`;

const Logo = styled.div`
  position: absolute;
  left: 50%;
  bottom: 40%;
  transform: translate(-50%, 0%);
`;

const LoadingSpan = styled.div`
  position: absolute;
  left: 50%;
  bottom: 20%;
  color: white;
  transform: translate(-50%, 0%);
  display: flex;
  gap: 4rem;
  & > div {
    width: 2rem;
  }
`;

const Letter = styled.div<{ value: number }>`
  --time-value: 2;
  animation: wave calc(var(--time-value) * 1s) linear infinite;
  animation-delay: calc(
    ${(props) => props.value} * calc(var(--time-value) * 0.1s)
  );
  font-size: 4rem;
  @keyframes wave {
    0% {
      transform: translate(0%, 0%);
    }
    50% {
      transform: translate(0%, 3rem) scale(140%);
    }
    100% {
      transform: translate(0%, 0%);
    }
  }
`;
