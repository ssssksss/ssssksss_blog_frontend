"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface ITest {}
const Test = (props: ITest) => {
  function Castle() {
    const { scene } = useGLTF("/glb/castle-wall.glb");
    return <primitive object={scene} />;
  }

  return (
    <div className="h-full w-full">
      <Canvas camera={{position: [0, 5, -5]}}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} />
        <Castle />
        <OrbitControls />
        {/* 좌표축 헬퍼 */}
        {/* <axesHelper args={[5]} /> 크기 5 */}
        {/* FPS 및 렌더링 상태 표시 */}
        {/* <Stats /> */}
        {/* 바닥/격자 */}
        {/* <gridHelper args={[10, 10]} /> */}
      </Canvas>
    </div>
  );
};
export default Test;
