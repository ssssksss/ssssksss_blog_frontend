import type { AppProps } from "next/app";
import type { NextPage } from "next";
import React, { ReactElement, ReactNode, useState, useEffect } from "react";
import Layout1 from "src/components/layout/Layout1";
import Layout2 from "src/components/layout/Layout2";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";
import BlogFooter from "src/components/blog/BlogUI/BlogFooter";
import NextjsHeader from "src/components/common/NextjsHeader";
// import PageTransitions from "@/components/common/reactTransitionGroup/PageTransitions";
import { useRouter } from "next/router";
import BlogFirstMenu from "@/components/blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "@/components/blog/BlogUI/BlogSecondMenu";
import "react-quill/dist/quill.snow.css";
import { ThemeProvider } from "@emotion/react";
import GlobalStyles from "@/styles/GlobalStyles";
import { Global } from "@emotion/react";
import theme from "@/styles/theme";
import NavBar from "@/components/layout/NavBar";
import ReactToastifyComponents from "@/components/externalLibrary/react-toastify/ReactToastifyComponents";
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  layout: typeof Layout1 | typeof Layout2;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  const Layout = Component.layout || ((children: ReactElement) => <> {children} </>);
  // const [routingPageOffset, setRoutingPageOffset] = useState(0);
  const router = useRouter();

  // useEffect(() => {
  //   const pageChange = () => {
  //     setRoutingPageOffset(window.scrollY);
  //   };
  //   router.events.on("routeChangeStart", pageChange);
  // }, [router.events]);

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <NextjsHeader />
        <NavBar />
        <ReactToastifyComponents />
        {router.asPath.split("/")[1] === "blog" && !router.asPath.includes("update") && (
          <>
            <BlogFirstMenu />
            <BlogSecondMenu />
          </>
        )}
        {/* <PageTransitions
          route={router.asPath}
          routingPageOffset={routingPageOffset}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PageTransitions> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
