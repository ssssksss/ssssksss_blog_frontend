import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store/index';
import { ThemeProvider } from '@emotion/react';
import GlobalStyles from '@/styles/GlobalStyles';
import { Global } from '@emotion/react';
import { purpleTheme, darkTheme } from '@/styles/theme';
import 'react-quill/dist/quill.snow.css';
import 'prismjs/themes/prism-tomorrow.css';
// react-date-range 라이브러리
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';
import dynamic from 'next/dynamic';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout: typeof Layout1 | typeof BlogLayout;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const NavBar = dynamic(() => import('@/components/layout/NavBar'), {
  loading: () => <p>Loading...</p>,
});

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
  // const [queryClient] = useState(() => new QueryClient());
  // const [routingPageOffset, setRoutingPageOffset] = useState(0);

  // useEffect(() => {
  //   const pageChange = () => {
  //     setRoutingPageOffset(window.scrollY);
  //   };
  //   router.events.on("routeChangeStart", pageChange);
  // }, [router.events]);

  return getLayout(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={purpleTheme}>
          <Global styles={GlobalStyles} />
          {/* <NextjsHeader /> */}
          <ReactToastifyComponents />
          {/* <PageTransitions
          route={router.asPath}
          routingPageOffset={routingPageOffset}
          >
          <Layout>
          <Component {...pageProps} />
          </Layout>
        </PageTransitions> */}
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <NavBar>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NavBar>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
