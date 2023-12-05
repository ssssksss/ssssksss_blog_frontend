import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
// import axios from "axios";
// import React, { useState, useRef, useEffect, useCallback } from "react";
// import SocketIOClient from "socket.io-client";
// import SolveRender from "@/components/websocket/SolveRender";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-06-03 23:07:16"
 * @description 설명
 */
const Index = () => {
  // const [delay, setDelay] = useState("");
  // useEffect((): any => {
  //   window.onload = function (event) {
  //     start();
  //   };
  //   setDelay("1");
  // }, []);

  return (
    <Container>
      아무것도 보이지 않습니다.
      {/* {delay ? <SolveRender Socket={new WebSocket("ws:\\/\\/" + "192.168.126.234:81/")} /> : <div> 1 </div>}{" "} */}
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
`;
