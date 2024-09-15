import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoadingComponent from '../common/loading/LoadingComponent';
import Footer from './Footer';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout2 = ({ children }: AppLayoutProps) => {
  const isLoading = useSelector((state: RootState) => state.loadingStore.value);
  const router = useRouter();
  useEffect(() => {
    if (window.localStorage.getItem('theme')) {
      store.dispatch(
        rootActions.themeStore.setTheme(window.localStorage.getItem('theme')),
      );
    }
    const start = (url: string, shallow: boolean) => {
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
      <div className={'max-w-[144rem] px-[.5rem] pb-[1rem] min-h-[calc(100%-7.825rem)]'}>{children}</div>
      {isLoading && (
        <LoadingComponent w={'100vw'} h={'100vh'} position={'fixed'} />
      )}
      <Footer />
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
