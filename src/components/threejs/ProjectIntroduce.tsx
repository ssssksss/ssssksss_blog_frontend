/* eslint-disable react/no-unknown-property */

import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Material, Mesh } from 'three';
/**
 * Author : Sukyung Lee
 * FileName: ProjectIntroduce.tsx
 * Date: 2023-02-09 18:44:59
 * Description :
 */

interface IProjectIntroduceProps {
  projectIntroduce_gsap: unknown;
}

const ProjectIntroduce = (props: IProjectIntroduceProps) => {
  const Box = () => {
    const myRef = useRef<Mesh>(null);

    useFrame(() => {
      const node = myRef.current;
      if (node) {
        // myRef.current.rotation.x += 0.01;
        myRef.current.position.x = 0;
        myRef.current.position.y = 0;
        myRef.current.position.z = 0;
        myRef.current.scale.x = props.projectIntroduce_gsap?.t * 3;
        myRef.current.scale.y = props.projectIntroduce_gsap?.t * 3;
        myRef.current.scale.z = 1;
        (myRef.current.material as Material).opacity =
          props.projectIntroduce_gsap?.opacity;
        (myRef.current.material as Material).transparent =
          props.projectIntroduce_gsap?.transparent;
        myRef.current.rotation.x = Math.PI / 4;
        myRef.current.rotation.y = -Math.PI / 4;
        myRef.current.rotation.z = Math.PI / 6;
        // camera.rotation.x = props.projectIntroduce_gsap.camera_rotation_x;
        // camera.rotation.y = props.projectIntroduce_gsap.camera_rotation_y;
        // camera.rotation.z = props.projectIntroduce_gsap.camera_rotation_z;
      }
    });

    return (
      <mesh ref={myRef} scale={2}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  };

  return (
    <React.Fragment>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      {/* <Box position={[4.2, 0, 0]} /> */}
      <Box />
    </React.Fragment>
  );
};
export default ProjectIntroduce;
