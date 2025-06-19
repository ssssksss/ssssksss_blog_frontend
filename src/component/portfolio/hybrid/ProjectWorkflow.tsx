"use client";

import useFetchCSR from "@hooks/useFetchCSR";
import { OrbitControls, Text, useCursor } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import * as THREE from "three";

interface IProjectWorkflow {
  json: string;
}

const COLOR_MAP: Record<string, string> = {
  green: "#00C851",
  orange: "#F5721A",
  red: "#CC2222",
  purple: "#9370DB",
};

type ProjectNode = {
  id: string;
  position: [number, number, number];
  color?: string;
};

type ProjectEdge = {
  from: string;
  to: string;
  color?: string;
};

const ProjectWorkflow = (props: IProjectWorkflow) => {
  const [nodes, setNodes] = useState<ProjectNode[]>([]);
  const [edges, setEdges] = useState<ProjectEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<ProjectNode | null>(null);
  const [content, setContent] = useState("");
  const fetchCSR = useFetchCSR();


  useEffect(() => {
    try {
      const parsed = JSON.parse(props.json);
      if (Array.isArray(parsed.nodes) && Array.isArray(parsed.edges)) {
        setNodes(parsed.nodes);
        setEdges(parsed.edges);
      } else {
        setNodes([]);
        setEdges([]);
        console.warn("Invalid JSON structure: nodes or edges missing");
      }
    } catch (e) {
      setNodes([]);
      setEdges([]);
      console.error("JSON parsing failed:", e);
    }
  }, [props.json]);

  const getPortfolioContent = async (title: string) => {
    try {
      const result: {content: string} = await fetchCSR.requestWithHandler({
        url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio?title=${encodeURIComponent(
          "[개인프로젝트] " + title,
        )}`,
        hideError: true,
      });
      if (!result) {
        setContent("");
        return;
      }
      setContent(result.content);
    } catch (error) {
      setContent("");
      console.error("Failed to fetch portfolio content:", error);
    }
  };

  return (
    <div className="relative w-[calc(100%-1rem)] aspect-square h-[calc(100%-4rem)]">
      <Canvas
        className="h-full bg-black-80 rounded-2xl"
        camera={{position: [0, 0, 36], fov: 50}}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableRotate={false} enableZoom={true} />

        {nodes.map((node) => (
          <ProjectNode
            key={node.id}
            position={node.position}
            label={node.id}
            selected={node.id === selectedNode?.id}
            color={node.color}
            onClick={async () => {
              if (node.id !== selectedNode?.id) {
                await getPortfolioContent(node.id);
              }
              setSelectedNode((prev) => (prev?.id === node.id ? null : node));
            }}
          />
        ))}

        {edges.map((edge, i) => {
          const startNode = nodes.find((n) => n.id === edge.from);
          const endNode = nodes.find((n) => n.id === edge.to);
          if (!startNode || !endNode) return null;
          return (
            <ProjectEdge
              key={i}
              start={startNode.position}
              end={endNode.position}
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
            className="bg-default-1 relative h-full w-full overflow-y-auto rounded-lg border border-gray-300 p-4 shadow-lg"
            style={{overscrollBehavior: "contain"}}
          >
            <MarkdownPreview content={content || "내용이 없습니다."} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectWorkflow;

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

  const realColor = selected
    ? COLOR_MAP.red // 선택되면 무조건 빨간색으로 할 경우
    : hovered
      ? "#ffffff"
      : color && COLOR_MAP[color.toLowerCase()]
        ? COLOR_MAP[color.toLowerCase()]
        : color || "orange";

  return (
    <group position={position}>
      <mesh
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <circleGeometry args={[0.3, 64]} />
        <meshStandardMaterial
          color={hovered ? "white" : realColor || "red"}
        />
      </mesh>

      <Text
        {...({
          position: [0, 0.5, 0],
          fontSize: 0.3,
          color: "white",
          anchorX: "center",
          anchorY: "middle",
          font: "/fonts/CookieRunRegular.ttf",
          children: label,
        } as any)}
      />
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
    <primitive
      object={
        new THREE.Line(
          geometry,
          new THREE.LineBasicMaterial({color: color ?? "gray"}),
        )
      }
    />
  );
}
