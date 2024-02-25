import { Layout1 } from '@components/layout/Layout1';
import NavBar from '@components/layout/NavBar';
import { Global } from '@emotion/react';
import { store } from '@redux/store/index';
import GlobalStyles from '@styles/GlobalStyles';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import 'prismjs/themes/prism-tomorrow.css';
import { ReactElement, ReactNode, StrictMode } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';

type NextPageWithLayout = NextPage & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout: typeof Layout1;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const Layout =
    Component.layout || ((children: ReactElement) => <> {children} </>);
  const queryClient = new QueryClient();

  return getLayout(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyles} />
          <Head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <title> 가출한토토로의 블로그 </title>
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
