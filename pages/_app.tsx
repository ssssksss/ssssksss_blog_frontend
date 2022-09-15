import { ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { ReactElement, ReactNode, useState, useRef } from "react";
import { theme } from "../utils/style/DefaultTheme";
import Layout1 from "src/components/layout/Layout1";
import Layout2 from "src/components/layout/Layout2";
import { Provider } from "react-redux";
import { store } from "@/redux/store/index";
import BlogHeader from "src/components/blog/BlogUI/BlogHeader";
import BlogFooter from "src/components/blog/BlogUI/BlogFooter";
import NextjsHeader from "src/components/common/NextjsHeader";
import GlobalStyles from "@/styles/GlobalStyles";

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

  return getLayout(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <NextjsHeader />
        <BlogHeader />
        <TestLayout>
          <Component {...pageProps} />
        </TestLayout>
        <BlogFooter />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
