/* eslint-disable react/no-unknown-property */
import MyRoom from '@components/threejs/MyRoom';
import ProjectIntroduce from '@components/threejs/ProjectIntroduce';
import styled from '@emotion/styled';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import { Suspense, useEffect } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file HomeThreejs.tsx
 * @version 0.0.1 "2023-06-15 22:28:00"
 * @description 설명
 */
const HomeThreejs = () => {
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
        trigger: '.section-one',
        start: 'top top-=300px',
        endTrigger: '.section-two',
        end: 'bottom bottom-=20%',
        // markers: true,
        scrub: 1,
      },
    });
    myRoom_gsap_timeline.to(myRoom_gsap, {
      ease: 'power04.easeOut',
      t: 100,
    });

    const projectIntroduce_gsap_timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.section-one',
        start: 'top top-=240px',
        endTrigger: '.section-one',
        end: 'bottom bottom',
        // markers: true,
        scrub: 1,
      },
    });
    projectIntroduce_gsap_timeline.to(projectIntroduce_gsap, {
      ease: 'power4.easeOut',
      t: 10,
      opacity: 1,
    });
  }, []);

  return (
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
  );
};
export default HomeThreejs;

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
