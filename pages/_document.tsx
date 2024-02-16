import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang="ko">
          <link rel="manifest" href="/manifest/manifest.json" />
          <meta name="theme-color" content="#84A59D" />
          <meta
            name="description"
            content="가출한토토로의 개발자 사이트, 블로그, 게시판 일정 등등 여러 개인 프로젝트가 담긴 공간"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
