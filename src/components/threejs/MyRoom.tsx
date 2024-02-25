/* eslint-disable react/no-unknown-property */
// react 18이상 drei,fiber 버전이 높은 경우 props type문제가 있음
import { useFrame, useLoader } from '@react-three/fiber';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// gsap.registerPlugin(ScrollTrigger);
const MyRoom = ({ myRoom_gsap }) => {
  const gltf = useLoader(GLTFLoader, '/glTF/myhome/myhome.glb');
  useEffect(() => {
    // [] 모니터 오브젝트에 보여주는 mp4 영상 넣어주는 함수
    const _input_video_in_monitor_object = () => {
      const video = document.createElement('video');
      video.src = '/videos/test_video.mp4';
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.autoplay = true;
      video.play();
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.encoding = THREE.sRGBEncoding;
      videoTexture.minFilter = THREE.NearestFilter;
      videoTexture.magFilter = THREE.NearestFilter;
      const geometry = new THREE.PlaneGeometry();
      const material = new THREE.MeshBasicMaterial({
        map: videoTexture,
      });
      material.toneMapped = false;
      const mesh = new THREE.Mesh(geometry, material);
      mesh.name = 'video';
      mesh.position.set(0.18, 0, 0);

      gltf.scene.children
        .filter((i) => i.name === 'monitor')
        .map((j) => {
          mesh.rotation.set(j.rotation.x, Math.PI / 2 + 0.02, j.rotation.z);
        });
      mesh.scale.set(3.6, 2.2, 4);

      gltf.nodes.monitor.add(mesh);

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
    };
    _input_video_in_monitor_object();

    // []초반에 보여주는 애니메이션
    gsap.to(gltf.nodes.drawer1.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.drawer1.position.y,
          x: gltf.nodes.drawer1.position.x,
          delay: 2,
        },
        { x: gltf.nodes.drawer1.position.x + 0.2, delay: 1 },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.drawer2.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.drawer2.position.y,
          x: gltf.nodes.drawer2.position.x,
          delay: 1.5,
        },
        { x: gltf.nodes.drawer2.position.x + 0.4, delay: 1 },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.drawer3.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.drawer3.position.y,
          x: gltf.nodes.drawer3.position.x,
          delay: 1,
        },
        { x: gltf.nodes.drawer3.position.x + 0.6, delay: 1 },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.table.position, {
      keyframes: [
        { y: 100 },
        { y: gltf.nodes.table.position.y, delay: 2 },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.bed.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.bed.position.y,
          x: gltf.nodes.bed.position.x,
          delay: 1,
        },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.monitor.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.monitor.position.y,
          x: gltf.nodes.monitor.position.x,
          delay: 2.2,
        },
        { ease: '.easeInOut' },
      ],
    });

    gsap.to(gltf.nodes.chair.position, {
      keyframes: [
        { y: 100 },
        {
          y: gltf.nodes.chair.position.y,
          x: gltf.nodes.chair.position.x,
          delay: 2.2,
        },
        { ease: '.easeInOut' },
      ],
    });
  }, []);

  const ref = useRef();
  useFrame(() => {
    const temp = 1 - myRoom_gsap.t / 20;
    ref.current.scale.x = temp > 0 ? temp : 0;
    ref.current.scale.y = temp > 0 ? temp : 0;
    ref.current.scale.z = temp > 0 ? temp : 0;
    ref.current.rotation.y = 90 * (myRoom_gsap.t / 1000);
    ref.current.visible = temp > 0 ? true : false;
  });

  return (
    <>
      <directionalLight color="light" />
      <pointLight args={['#ffffff']} position={[10, 20, -10]} intensity={0.6} />
      <pointLight
        args={['#ffffff']}
        position={[100, 20, -10]}
        intensity={0.6}
      />
      <pointLight
        args={['#ffffff']}
        position={[10, 20, -100]}
        intensity={0.6}
      />
      <pointLight
        args={['#ffffff']}
        position={[10, 100, -10]}
        intensity={0.6}
      />
      <pointLight args={['#ffffff']} position={[3, 2, -1]} intensity={1} />
      <primitive object={gltf.scene} scale={1} ref={ref} />
    </>
  );
};

export default MyRoom;
