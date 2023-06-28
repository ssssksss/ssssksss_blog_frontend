/* eslint-disable react/no-unknown-property */
import styled from "@emotion/styled";
import Layout1 from "@/components/layout/Layout1";
import { Canvas } from "@react-three/fiber";
import Box from "@/components/threejs/Box";
import React from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Controls, PlayState, Tween } from "react-gsap";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import ReactPlayer from "react-player/lazy";
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2023-01-05 01:39:14
 * Description :
 */

const Index = () => {
  const [user, setUser] = useState("영희");
  const [userId, setUserId] = useState(1);

  const test1 = useCallback(
    (userId) => {
      console.log("여기는 test1");
    },
    [userId]
  );

  const test2 = () => {
    console.log("여기는 test2");
    console.log("새롭게 만들어진 함수입니다.");
  };

  useEffect(() => {
    console.log("여기는 테스트1");
  }, []);

  useEffect(() => {
    console.log("여기는 테스트2");
  }, [user]);

  useEffect(() => {
    console.log("여기는 테스트3");
    test1(1);
    test2(1);
  }, [test1]);

  useEffect(() => {
    console.log("여기는 테스트4");
    test1(1);
    test2(1);
  }, [test2]);

  const player = useRef(null);
  const [play, setPlay] = useState(false);
  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });
  const handleProgress = (state) => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

  const secToTime = (duration) => {
    var seconds = Math.floor(duration % 60),
      minutes = Math.floor((duration / 60) % 60),
      hours = Math.floor((duration / (60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  };

  return (
    <Container>
      <button onClick={() => setUser(user === "영희" ? "철수" : "영희")}> 강제 리렌더링 </button>
      {/* <Canvas
        camera={{
          position: [26, 26, -26],
          fov: 20,
          near: 5,
          far: 1000,
        }}
      >
        <Suspense fallback={null}>
          <Box />
          <OrbitControls />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas> */}

      <ReactPlayer
        width="0px"
        height="0px"
        url={"https://www.youtube.com/watch?v=mjY0Wx_zE0A"}
        ref={player}
        playing={play}
        onProgress={handleProgress}
      />
      <button onClick={() => setPlay((prev) => !prev)}>플레이 버튼</button>
      <div>
        {secToTime(playTime.playedSeconds)} [{Math.floor(playTime.played * 100)}%]
      </div>
      <input
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={playTime.played}
        onChange={(e) =>
          setPlayTime((prev) => ({
            playedSeconds: prev.playedSeconds,
            played: parseFloat(e.target.value),
          }))
        }
        onMouseUp={(e) => {
          player.current.seekTo(parseFloat(e.target.value), "fraction");
        }}
        onTouchEnd={(e) => player.current.seekTo(parseFloat(e.target.value), "fraction")}
      />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  height: 600px;
`;
