/* eslint-disable react/no-unknown-property */
import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import styled from "@emotion/styled";
// import { css, keyframes } from "@emotion/react";
// import { animationKeyFrames } from "@/styles/animationKeyFrames";
import MyRoom from "../threejs/MyRoom";
import { Suspense, useRef, useState, useEffect } from "react";
import { OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Content from "../threejs/Content";
import gsap from "gsap";
import ProjectIntroduce from "../threejs/ProjectIntroduce";
import { Mesh } from "three";
// import ScrollTrigger from "gsap/ScrollTrigger";

/**
 * Author : Sukyung Lee
 * FileName: IntroduceChapter.tsx
 * Date: 2022-10-03 03:06:04
 * Description :
 */

const Portfolio = () => {
  const camera_location = 120;

  let myRoom_gsap = {
    t: 0,
  };

  let projectIntroduce_gsap = {
    t: 1,
    transparent: true,
    opacity: 0,
    camera_rotation_x: -3.0802623127340802,
    camera_rotation_y: -0.03502060314729156,
    camera_rotation_z: -3.1394425739208884,
  };

  useEffect(() => {
    const myRoom_gsap_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top-=300px",
        endTrigger: ".section-two",
        end: "bottom bottom-=20%",
        // markers: true,
        scrub: 1,
      },
    });
    myRoom_gsap_timeline.to(myRoom_gsap, {
      ease: "power04.easeOut",
      t: 100,
    });

    const projectIntroduce_gsap_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-one",
        start: "top top-=240px",
        endTrigger: ".section-one",
        end: "bottom bottom",
        // markers: true,
        scrub: 1,
      },
    });
    projectIntroduce_gsap_timeline.to(projectIntroduce_gsap, {
      ease: "power4.easeOut",
      t: 10,
      opacity: 1,
    });
  }, []);

  return (
    <>
      <Container>
        <ObjectModel>
          <Canvas
            id="canvas"
            camera={{
              position: [camera_location, camera_location, -camera_location],
              fov: 20,
              near: 5,
              far: 1000,
            }}
          >
            {/* <color attach="background" args={["#ABD0BC"]} /> */}
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
              <MyRoom myRoom_gsap={myRoom_gsap} />
              <ProjectIntroduce projectIntroduce_gsap={projectIntroduce_gsap} />
            </Suspense>
          </Canvas>
        </ObjectModel>
        <Content />
      </Container>
    </>
  );
};

export default Portfolio;
// const Container = styled(CC.RowBetweenDiv)`
const Container = styled.main`
  /* @media (max-width: ${theme.customScreen.sm}) {
    flex-flow: nowrap column-reverse;
  } */
  width: 100%;
  height: 100%;
  position: relative;
`;

const ObjectModel = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  pointer-events: none;
`;
