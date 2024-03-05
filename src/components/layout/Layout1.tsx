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
const Layout1 = ({ children }: AppLayoutProps) => {
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
      {isLoading ? <LoadingComponent /> : <Container1>{children}</Container1>}
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  padding: 4px;
  border-radius: ${(props) => props.theme.borderRadius.br10};
  height: 100%;
  position: relative;
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
