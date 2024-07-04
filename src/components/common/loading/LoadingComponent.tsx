import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file loadingComponent.tsx
 * @version 0.0.1 "2024-02-23 11:27:43"
 * @description position="relative"로 감싼 div가 필요
 */

interface ILoadingComponentProps {
  w: string;
  h: string;
  position: 'absolute' | 'fixed';
}

const LoadingComponent = (props: ILoadingComponentProps) => {
  const isLoading = useSelector((state) => state.loadingStore.value);
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem('theme')) {
      store.dispatch(
        rootActions.themeStore.setTheme(window.localStorage.getItem('theme')),
      );
    }
    const start = (url, { shallow }) => {
      if (shallow) return;
      store.dispatch(rootActions.loadingStore.setIsLoading(true));
    };
    const end = () => {
      store.dispatch(rootActions.loadingStore.setIsLoading(false));
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);

    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <React.Fragment>
      {isLoading && (
        <Container {...props}>
          <Container1>
            <Spinner32 />
          </Container1>
        </Container>
      )}
    </React.Fragment>
  );
};
export default LoadingComponent;

const Container = styled.div<{ ILoadingComponentProps }>`
  width: ${(props) => props.w};
  height: ${(props) => props.h};
  position: ${(props) => props.position || 'absolute'};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100003;
  backdrop-filter: blur(1.6rem);
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Spinner32 = styled.div`
  --box-size: min(8rem, 50vh);
  & {
    width: var(--box-size);
    height: var(--box-size);
    display: inline-block;
    position: relative;
    transform: rotate(45deg);
  }
  &::before {
    content: '';
    box-sizing: border-box;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    position: absolute;
    left: 0;
    top: calc(-1 * var(--box-size) / 2);
    animation: animloader 4s ease infinite;
  }
  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    width: calc(var(--box-size) / 2);
    height: calc(var(--box-size) / 2);
    background: rgba(255, 255, 255, 0.85);
    /* 이게 이동하는 블럭 색상 */
    background: ${(props) => props.theme.main.primary80};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
    animation: animloader2 2s ease infinite;
  }

  @keyframes animloader {
    0% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    12% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    25% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    37% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
    50% {
      box-shadow:
        0 calc(var(--box-size) / 2) ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    62% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          ${(props) => props.theme.main.secondary80},
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    75% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size)
          ${(props) => props.theme.main.secondary80},
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    87% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) ${(props) => props.theme.main.secondary80};
    }
    100% {
      box-shadow:
        0 calc(var(--box-size) / 2) rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) calc(var(--box-size) / 2)
          rgba(255, 255, 255, 0),
        calc(var(--box-size) / 2) var(--box-size) rgba(255, 255, 255, 0),
        0rem var(--box-size) rgba(255, 255, 255, 0);
    }
  }

  @keyframes animloader2 {
    0% {
      transform: translate(0, 0) rotateX(0) rotateY(0);
    }
    25% {
      transform: translate(100%, 0) rotateX(0) rotateY(180deg);
    }
    50% {
      transform: translate(100%, 100%) rotateX(-180deg) rotateY(180deg);
    }
    75% {
      transform: translate(0, 100%) rotateX(-180deg) rotateY(360deg);
    }
    100% {
      transform: translate(0, 0) rotateX(0) rotateY(360deg);
    }
  }
`;
