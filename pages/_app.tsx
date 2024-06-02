import NavBar from '@components/layout/NavBar';
import { Global } from '@emotion/react';
import { store } from '@redux/store/index';
import GlobalStyles from '@styles/GlobalStyles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import './index.css';

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const queryClient = new QueryClient();

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const registInit = async () => {
        const registration = await navigator.serviceWorker.register('/sw.js');
        registration.waiting?.postMessage('SKIP_WAITING');
      };
      registInit();
    }
  }, []);

  return (
    // <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyles} />
          <Head>
            <title>가출한토토로의 블로그</title>
            <meta
              name="viewport"
              content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"
            />
          </Head>
          <NavBar>{getLayout(<Component {...pageProps} />)}</NavBar>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </Provider>
    // </StrictMode>
  );
}

export default MyApp;
