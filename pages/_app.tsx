import { store } from '@/redux/store/index';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import 'prismjs/themes/prism-tomorrow.css';
import { ReactElement, ReactNode, StrictMode } from 'react';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
// react-date-range 라이브러리
import NavBar from '@/components/layout/NavBar';
import GlobalStyles from '@/styles/GlobalStyles';
import { Global } from '@emotion/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { QueryClient, QueryClientProvider } from 'react-query';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout: typeof Layout1 | typeof BlogLayout;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const ReactToastifyComponents = dynamic(
  () => import('@/components/react-toastify/ReactToastifyComponents'),
  {
    loading: () => <p>Loading...</p>,
  }
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  const Layout =
    Component.layout || ((children: ReactElement) => <> {children} </>);
  const queryClient = new QueryClient();

  return getLayout(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Global styles={GlobalStyles} />
          <Head>
            <meta charset="utf-8" />
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
    </StrictMode>
  );
}

export default MyApp;
