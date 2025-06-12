"use client";

import useFetchCSR from "@hooks/useFetchCSR";
import { OrbitControls, Text, useCursor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as THREE from "three";
import {
  ssssksssBlogProjectEdges,
  ssssksssBlogProjectNodes,
} from "./ProjectSsssksssBlogNodes";

interface IProjectIntroEdge {}

type ProjectNode = {
  id: string;
  position: [number, number, number];
  color?: string;
};

function ProjectNode({
  position,
  label,
  selected,
  onClick,
  color,
}: {
  position: [number, number, number];
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  const [hovered, setHovered] = useState(false);
  useCursor(hovered); 

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <circleGeometry args={[0.3, 64]} />
        <meshStandardMaterial
          color={selected ? "red" : hovered ? "white" : color || "orange"}
        />
      </mesh>

      <Text
        position={[0, 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/CookieRunRegular.ttf"
      >
        {label}
      </Text>
    </group>
  );
}

function ProjectEdge({
  start,
  end,
  color,
}: {
  start: [number, number, number];
  end: [number, number, number];
  color?: string | number;
}) {
  const points = [
    new THREE.Vector3(start[0], start[1], -0.01),
    new THREE.Vector3(end[0], end[1], -0.01),
  ];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={geometry as any}>
      <lineBasicMaterial color={color ?? "gray"} />
    </line>
  );
}

const ProjectIntroEdge = (props: IProjectIntroEdge) => {
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(null);
  const [content, setContent] = useState("");
  const fetchCSR = useFetchCSR();

  const getPortfolioContent = async (title: string) => {
    const result: {content: string} = await fetchCSR.requestWithHandler({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio?title=${encodeURIComponent("[개인프로젝트] " + title)}`,
      hideError: true,
    });
    if (result == undefined) return setContent("");
    setContent(result.content);
  };

  return (
    <div className="relative aspect-square h-[60rem] primary-border-radius">
      <Canvas
        className="h-full w-full bg-black-80"
        camera={{position: [0, 0, 36], fov: 50}}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableRotate={false} enableZoom={true} />

        {ssssksssBlogProjectNodes.map((node) => (
          <ProjectNode
            key={node.id}
            position={node.position as any}
            label={node.id}
            selected={node.id === selectedNode?.id}
            color={node?.color}
            onClick={async () => {
              if (node.id !== selectedNode?.id) await getPortfolioContent(node.id);
              await setSelectedNode((prev) => (prev?.id === node.id ? null : node));
            }}
          />
        ))}

        {ssssksssBlogProjectEdges.map((edge, i) => {
          const start = ssssksssBlogProjectNodes.find(
            (n) => n.id === edge.from,
          )!.position;
          const end = ssssksssBlogProjectNodes.find(
            (n) => n.id === edge.to,
          )!.position;
          return (
            <ProjectEdge
              key={i}
              start={start as any}
              end={end as any}
              color={edge.color}
            />
          );
        })}
      </Canvas>

      <div className="absolute bottom-0 right-0 z-40 flex w-full justify-between gap-x-2 rounded bg-black-60 px-4 py-2 text-sm font-thin text-white-80">
        <div className="flex gap-x-2">
          <span>
            <span className="mr-1 rounded-2xl px-1 outline outline-1 outline-white-80">
              이동
            </span>
            : CTRL + 마우스 왼쪽 클릭 + 마우스 이동
          </span>
          <span>
            <span className="mr-1 rounded-2xl px-1 outline outline-1 outline-white-80">
              확대, 축소
            </span>
            : 마우스 스크롤
          </span>
        </div>
      </div>

      {selectedNode?.id && (
        <div className="absolute inset-0 left-[1.25rem] top-[1.25rem] z-50 flex h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] items-center justify-center bg-white-80 p-4">
          <button
            onClick={() => setSelectedNode(null)}
            className="absolute right-[2.5rem] top-[1rem] h-[2rem] w-[2rem] scale-100 transform text-contrast-1 transition-transform duration-300"
            style={{zIndex: 200}}
          >
            <AiOutlineCloseCircle size={"48"} />
          </button>
          <div
            className="bg-white relative h-full w-full overflow-y-auto rounded-lg border border-gray-300 p-4 shadow-lg"
            style={{overscrollBehavior: "contain"}}
          >
            <MarkdownPreview content={content || "내용이 없습니다."} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectIntroEdge;
