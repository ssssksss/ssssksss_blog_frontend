import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useEffect } from "react";
import GlobalStyles from "../utils/style/GlobalStyles";
import { theme } from "../utils/style/DefaultTheme";
import Layout1 from "@/components/layout/Layout1";
import Layout2 from "@/components/layout/Layout2";
import { Provider } from "react-redux";
import { store } from "@/store/index";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import Head from "next/head";

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

  useEffect(() => {
    console.log("app.tsx");
    //visitFunc();
  }, []);

  const visitFunc = async () => {
    await AxiosInstance({
      url: "/ssssksss/visit",
      method: "GET",
    })
      .then((response) => {
        console.log(response.data);
        console.log("성공??");
      })
      .catch((error) => {
        console.log("에러");
        console.log("실패??");
      });
  };

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BlogHeader />
        <Head>
          <meta
            httpEquiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        </Head>
        <TestLayout>
          <Component {...pageProps} />
        </TestLayout>
        <BlogFooter />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
