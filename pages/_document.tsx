import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="manifest" href="/manifest/manifest.json" />
          <link rel="shortcut icon" href="/img/totoro.svg" />
          <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />
          <meta
            name="description"
            content="가출한토토로의 개발자 사이트, 블로그, 게시판 일정 등등 여러 개인 프로젝트가 담긴 공간"
          />

          {/* SEO 등록 */}
          <meta
            name="naver-site-verification"
            content="c25720a40b2a2d2e2ee2b0da57e9b5de26cd550e"
          />
          <meta
            name="google-site-verification"
            content="tbLLC2GI4ElFxdiITrMo0FmL5ZAnNBAB1x_EAxeLeJM"
          />
          {/* op-graph 설정*/}
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
          <meta property="og:type" content="blog" />
          <meta property="og:site_name" content="Site Name" />
          <meta property="og:locale" content="en_US" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          {/* 트위터 */}
          {/* <meta name="twitter:card" content="website" /> */}
          {/* <meta name="twitter:title" content="집나간토토로의 블로그와 토이 프로젝트" /> */}
          {/* <meta name="twitter:description" content="블로그와 토이프로젝트 사이트" /> */}
          {/* <meta name="twitter:image" content="/img/totoro.svg" /> */}
          {/* iOS */}
          {/* <meta property="al:ios:url" content="https://blog.ssssksss.xyz/" /> */}
          {/* <meta property="al:ios:app_store_id" content="ios 앱스토어 ID" />  */}
          {/* <meta property="al:ios:app_name" content="ios 앱 이름" />  */}
          {/* Android */}
          {/* <meta property="al:android:url" content="안드로이드 앱 URL" /> */}
          {/* <meta property="al:android:app_name" content="안드로이드 앱 이름" /> */}
          {/* <meta property="al:android:package" content="안드로이드 패키지 이름" />  */}
          {/* <meta property="al:web:url" content="안드로이드 앱 URL" /> */}
          <script src="https://developers.kakao.com/sdk/js/kakao.js"
          defer
        >
        </script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
