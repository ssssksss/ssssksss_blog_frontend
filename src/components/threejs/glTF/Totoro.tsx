import * as THREE from "three";
import { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import theme from "@/styles/theme";

/**
 * Author : Sukyung Lee
 * FileName: Totoro.tsx
 * Date: 2022-10-03 19:48:50
 * Description :
 */
const Totoro = () => {
  const canvasRef = useRef<any>(null);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(105, 400 / 600, 0.1, 1000);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(360, 600);
    canvasRef.current?.appendChild(renderer.domElement);
    camera.position.set(1, 2, 3);
    const controls = new OrbitControls(camera, renderer.domElement);
    scene.position.set(0, -1, 0);
    scene.background = new THREE.Color(theme.backgroundColors.background2);
    controls.autoRotate = true;
    controls.enableZoom = false;
    controls.minPolarAngle = Math.PI / 3;
    controls.maxPolarAngle = Math.PI * 0.5;
    controls.autoRotateSpeed = 4;
    controls.minDistance = 4;
    controls.update();
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    let loader = new GLTFLoader();
    let url = "/glTF/totoros/scene.glb";
    loader.load(url, function (gltf) {
      scene.add(gltf.scene);
      animate();
    });

    return () => canvasRef.current?.removeChild(renderer.domElement);
  }, []);

  return <div ref={canvasRef} />;
};

export default Totoro;
