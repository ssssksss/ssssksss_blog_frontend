"use client";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";

function Model({url}: {url: string}) {
  const group = useRef<THREE.Group>(null!);
  // const {scene} = useGLTF(url);
  const {scene, animations} = useGLTF(url);
  const mixer = useRef<THREE.AnimationMixer>();

  useEffect(() => {
    if (animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(scene);

      animations.forEach((clip) => {
        // 20~100 프레임만 새로운 Clip으로 생성
        // const sub = THREE.AnimationUtils.subclip(clip, "clip20toEnd", 24, 40);

        // const action = mixer.current!.clipAction(sub);
        // action.setLoop(THREE.LoopRepeat, Infinity); // 반복 재생 가능
        // action.clampWhenFinished = false;
        // action.play();
        const action = mixer.current!.clipAction(clip); // clipAction으로 Action 생성
        action.play(); // Action을 통해 재생
      });
    }
  }, [animations, scene]);

  useFrame((state, delta) => mixer.current?.update(delta));

  return <primitive ref={group} object={scene} />;
}

export default function Page() {
  return (
    <div className="h-full">
      <Canvas camera={{position: [0, 5, -5]}}>
        {/* 자연스러운 조명 */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model url="/glb/AGEA_LOGO.glb" />
        </Suspense>
        <OrbitControls makeDefault enablePan enableZoom />
        {/* <OrbitControls /> */}
        {/* <gridHelper args={[10, 10]} /> */}
        {/* <axesHelper args={[50]} /> */}
      </Canvas>
    </div>
  );
}
