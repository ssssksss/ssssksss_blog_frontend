import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from '../common/loading/LoadingComponent';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout2 = ({ children }: AppLayoutProps) => {
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
    <Container>
      <ImageBox></ImageBox>
      <Container1>{children}</Container1>
      {isLoading && (
        <LoadingComponent w={'100vw'} h={'100vh'} position={'fixed'} />
      )}
    </Container>
  );
};

export default Layout2;
const Container = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.br10};
  position: relative;
  height: 100vh;
  width: 100vw;
  z-index: 2;
`;

const ImageBox = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url('https://ssssksssblogbucket.s3.ap-northeast-2.amazonaws.com/private/%EC%9A%B0%EC%A3%BC+%EB%B0%B0%EA%B2%BD1.svg');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
`;

const Container1 = styled.main`
  container-name: main-container;
  container-type: inline-size;
  max-width: 1440px;
  /* LeftBar.tsx에 있는 너비와 맞추어주어야 한다. */
  /* 마진 5px * 2 + leftBar(44px) */
  width: calc(100vw - 52px);
  @media (min-width: ${(props) => props.theme.deviceSizes.pc}) {
    width: calc(100vw - 130px);
    margin: auto;
  }

  & > div {
    --top-navbar-height: 48px;
    max-height: calc(100vh - var(--top-navbar-height));
    padding: 2px;
    @media (pointer: coarse) {
      max-height: calc(100vh - var(--top-navbar-height) - 44px);
    }
  }
`;
