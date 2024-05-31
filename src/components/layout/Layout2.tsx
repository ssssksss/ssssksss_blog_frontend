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
  z-index: 0;
`;

const Container1 = styled.main`
  container-name: main-container;
  container-type: inline-size;
  max-width: 144rem;
  /* LeftBar.tsx에 있는 너비와 맞추어주어야 한다. */
  /* 마진 0.5rem * 2 + leftBar(4.4rem) */
  & > div {
    --top-navbar-height: 4.8rem;
    max-height: calc(100vh - var(--top-navbar-height));
    padding: 0.2rem;
    @media (pointer: coarse) {
      max-height: calc(100vh - var(--top-navbar-height) - 4.4rem);
    }
  }
`;
