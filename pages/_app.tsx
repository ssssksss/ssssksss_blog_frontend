import NavBar from '@components/layout/NavBar';
import { Global } from '@emotion/react';
import { store } from '@redux/store/index';
import GlobalStyles from '@styles/GlobalStyles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { ReactElement, ReactNode, StrictMode, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const Layout =
    Component.layout || ((children: ReactElement) => <> {children} </>);
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

  return getLayout(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyles} />
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <title>가출한토토로의 블로그</title>
          </Head>
          <NavBar>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NavBar>
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  );
}

export default MyApp;
