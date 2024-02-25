/* eslint-disable react/no-unknown-property */
import { useLoader } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Box = () => {
  const gltf = useLoader(GLTFLoader, '/glTF/myhome/myhome.glb');

  // console.log("Box.tsx 파일 : ", gltf);
  // console.log("Box.tsx 파일 : ", gltf.nodes);
  // console.log("Box.tsx 파일 : ", gltf.nodes.table);

  // gsap.to(gltf.nodes.drawer1.position, {
  //   keyframes: [
  //     { y: 100 },
  //     {
  //       y: gltf.nodes.drawer1.position.y,
  //       x: gltf.nodes.drawer1.position.x,
  //       delay: 2,
  //     },
  //     { x: gltf.nodes.drawer1.position.x + 0.2, delay: 1 },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  // gsap.to(gltf.nodes.drawer2.position, {
  //   keyframes: [
  //     { y: 100 },
  //     {
  //       y: gltf.nodes.drawer2.position.y,
  //       x: gltf.nodes.drawer2.position.x,
  //       delay: 1.5,
  //     },
  //     { x: gltf.nodes.drawer2.position.x + 0.4, delay: 1 },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  // gsap.to(gltf.nodes.drawer3.position, {
  //   keyframes: [
  //     { y: 100 },
  //     {
  //       y: gltf.nodes.drawer3.position.y,
  //       x: gltf.nodes.drawer3.position.x,
  //       delay: 1,
  //     },
  //     { x: gltf.nodes.drawer3.position.x + 0.6, delay: 1 },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  // gsap.to(gltf.nodes.table.position, {
  //   keyframes: [
  //     { y: 100 },
  //     { y: gltf.nodes.table.position.y, delay: 2 },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  // gsap.to(gltf.nodes.bed.position, {
  //   keyframes: [
  //     { y: 100 },
  //     {
  //       y: gltf.nodes.bed.position.y,
  //       x: gltf.nodes.bed.position.x,
  //       delay: 1,
  //     },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  // gsap.to(gltf.nodes.monitor.position, {
  //   keyframes: [
  //     { y: 100 },
  //     {
  //       y: gltf.nodes.monitor.position.y,
  //       x: gltf.nodes.monitor.position.x,
  //       delay: 2.2,
  //     },
  //     { ease: ".easeInOut" },
  //   ],
  // });

  function Video() {
    const [video] = useState(() =>
      Object.assign(document.createElement('video'), {
        src: '/videos/test_video.mp4',
        crossOrigin: 'Anonymous',
        loop: true,
        muted: true,
      }),
    );
    useEffect(() => void video.play(), [video]);
    return (
      <mesh
        position={[
          gltf.nodes.monitor.position.x + 0.2,
          gltf.nodes.monitor.position.y,
          gltf.nodes.monitor.position.z,
        ]}
        rotation={[0, (2.17 * Math.PI) / 3, 0]}
        scale={[3.5, 2.3, 0.8]}
      >
        <planeGeometry />
        <meshBasicMaterial toneMapped={false}>
          <videoTexture
            attach="map"
            args={[video]}
            encoding={THREE.sRGBEncoding}
          />
        </meshBasicMaterial>
      </mesh>
    );
  }

  return (
    <>
      <Video />
      <primitive object={gltf.scene} scale={1} />
    </>
  );
};

export default Box;
