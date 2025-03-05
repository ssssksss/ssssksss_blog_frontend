import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "src/component/common/layout/hybrid/Header";
import "./global.css";

export const metadata: Metadata = {
  title: "가출한토토로의 사이트",
  description: "블로그, 스케줄, 음악 플레이어 등등",
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {

  return (
    <html lang="ko" className="">
      <head>
        {/* <link rel="manifest" href="/manifest/manifest.json" /> */}
        <link rel="shortcut icon" href="/img/totoro.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta
          name="description"
          content="가출한토토로의 개발자 사이트, 블로그, 게시판 일정 등등 여러 개인 프로젝트가 담긴 공간"
        />
        <meta
          name="naver-site-verification"
          content="c25720a40b2a2d2e2ee2b0da57e9b5de26cd550e"
        />
        <meta
          name="google-site-verification"
          content="tbLLC2GI4ElFxdiITrMo0FmL5ZAnNBAB1x_EAxeLeJM"
        />

        {/* Open Graph meta tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://blog.ssssksss.xyz/" />
        <meta
          property="og:title"
          content="집나간토토로의 블로그와 토이 프로젝트"
        />
        <meta property="og:image" content="/img/totoro.svg" />
        <meta
          property="og:description"
          content="블로그와 토이프로젝트 사이트"
        />
        <meta property="og:site_name" content="Site Name" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </head>
      <body
        className={"flex min-h-full w-full flex-col items-center"}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
        </Suspense>
        <main className={"h-[calc(100%-3.5rem)] w-full max-w-[75rem] bg-default-1"}>
          {children}
        </main>
        {/* <main className={"w-full h-full max-w-[75rem] overflow-y-scroll scrollbar-hide"}>{children}</main> */}
        {/* <Footer /> */}
        <div id="modal-root"></div>
        <div id="modal-root1"></div>
      </body>
    </html>
  );
}
