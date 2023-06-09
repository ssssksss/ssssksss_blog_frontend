import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
/**
 * Author : Sukyung Lee
 * FileName: NextjsHeader.tsx
 * Date: 2023-03-27 00:18:06
 * Description : Header 설정하는 곳
 */
const NextjsHeader = () => {
  return (
    <Head>
      <title> 가출한토토로의 블로그 </title>
      <link id="favicon" rel="icon" href="/img/totoro.svg" />
      <meta charSet="UTF-8" />
    </Head>
  );
};
export default NextjsHeader;
