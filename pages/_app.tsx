import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import React, { ReactElement, ReactNode, useState, useEffect } from "react";
import { theme } from "../utils/style/DefaultTheme";
import Layout1 from "src/components/layout/Layout1";
import Layout2 from "src/components/layout/Layout2";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";
import BlogHeader from "src/components/blog/BlogUI/BlogHeader";
import BlogFooter from "src/components/blog/BlogUI/BlogFooter";
import NextjsHeader from "src/components/common/NextjsHeader";
import GlobalStyles from "@/styles/GlobalStyles";
import PageTransitions from "@/components/common/reactTransitionGroup/PageTransitions";
import { useRouter } from "next/router";
import BlogFirstMenu from "@/components/blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "@/components/blog/BlogUI/BlogSecondMenu";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout: typeof Layout1 | typeof Layout2;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const TestLayout =
    Component.layout || ((children: ReactElement) => <> {children} </>);
  const [routingPageOffset, setRoutingPageOffset] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const pageChange = () => {
      setRoutingPageOffset(window.scrollY);
    };
    router.events.on("routeChangeStart", pageChange);
  }, [router.events]);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NextjsHeader />
        <BlogHeader />
        {router.asPath.split("/")[1] === "blog" && (
          <>
            <BlogFirstMenu />
            <BlogSecondMenu />
          </>
        )}
        <PageTransitions
          route={router.asPath}
          routingPageOffset={routingPageOffset}
        >
          <TestLayout>
            <Component {...pageProps} />
          </TestLayout>
        </PageTransitions>
        <BlogFooter />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
