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
/**
 * Author : Sukyung Lee
 * FileName: index.tsx
 * Date: 2023-01-05 01:39:14
 * Description :
 */

const Index = () => {
  return (
    <Container>
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
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  height: 600px;
`;
