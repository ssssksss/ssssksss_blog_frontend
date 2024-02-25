/* eslint-disable react/no-unknown-property */
import styled from '@emotion/styled';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Box from '../../Box';

function MyRoom() {
  const camera_location = 70;
  return (
    <>
      <Container>
        <Canvas
          camera={{
            position: [camera_location, camera_location, -camera_location],
            fov: 20,
            near: 5,
            far: 1000,
          }}
        >
          <Suspense fallback={null}>
            <OrbitControls />
            <Box />
            <color attach="background" args={['#ABD0BC']} />
            <directionalLight color="light" />
            <pointLight
              args={['#ffffff']}
              position={[10, 20, -10]}
              intensity={0.6}
            />
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
            <pointLight
              args={['#ffffff']}
              position={[3, 2, -1]}
              intensity={1}
            />
          </Suspense>
        </Canvas>
      </Container>
    </>
  );
}

export default MyRoom;

const Container = styled.div`
  height: 600px;
  width: 100%;
`;
