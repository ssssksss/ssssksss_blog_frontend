import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";

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
