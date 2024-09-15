import styled from '@emotion/styled';
import CatWheel from '@lottie/cat_wheel.json';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LottieComponent from '../lottie/LottieComponent';

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
            <LottieComponent
              lottieFile={CatWheel}
              className="h-full w-[275px]"
            />
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
  backdrop-filter: blur(3rem);
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
`;
