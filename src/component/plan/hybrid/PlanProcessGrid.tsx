"use client";

import React, { useRef, useState } from "react";

type Node = {
  id: string;
  x: number;
  y: number;
  label?: string;
};

type Edge = {
  from: string;
  to: string;
};

interface Props {
  nodes: Node[];
  edges: Edge[];
  width?: number;
  height?: number;
}

export default function WorkflowVisualizer({
  nodes: initialNodes,
  edges,
  width = 800,
  height = 600,
}: Props) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({x: 0, y: 0});

  const svgRef = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{x: number; y: number; nodeId?: string} | null>(null);

  // 마우스 휠로 확대/축소
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setScale((s) => Math.min(Math.max(s + delta, 0.5), 3));
  };

  // 드래그 시작 (노드 혹은 배경)
  const onMouseDown = (e: React.MouseEvent) => {
    // 노드 클릭 시 드래그 우선 처리
    if (selectedNode) {
      dragRef.current = {
        x: e.clientX,
        y: e.clientY,
        nodeId: selectedNode,
      };
    } else {
      dragRef.current = {
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      };
    }
  };

  // 드래그 중 (노드 이동 또는 배경 이동)
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragRef.current) return;

    if (dragRef.current.nodeId) {
      // 노드 드래그 이동
      const dx = (e.clientX - dragRef.current.x) / scale;
      const dy = (e.clientY - dragRef.current.y) / scale;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === dragRef.current!.nodeId
            ? {...node, x: node.x + dx, y: node.y + dy}
            : node,
        ),
      );

      dragRef.current.x = e.clientX;
      dragRef.current.y = e.clientY;
    } else {
      // 배경 팬 이동
      setOffset({
        x: e.clientX - dragRef.current.x,
        y: e.clientY - dragRef.current.y,
      });
    }
  };

  // 드래그 종료
  const onMouseUp = () => {
    dragRef.current = null;
    setSelectedNode(null);
  };

  // 베지에 곡선 path 계산 (단순하게 두 점 사이 곡선)
  const getEdgePath = (start: Node, end: Node) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const curveOffset = Math.min(100, Math.sqrt(dx * dx + dy * dy) / 2);

    // 수평 방향일 때 위쪽으로 부드럽게 굽히기 예시
    return `M${start.x},${start.y} C${start.x + curveOffset},${start.y} ${end.x - curveOffset},${end.y} ${end.x},${end.y}`;
  };

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      style={{
        border: "1px solid #ccc",
        userSelect: "none",
        cursor: dragRef.current
          ? dragRef.current.nodeId
            ? "grabbing"
            : "grab"
          : "default",
        backgroundColor: "#fafafa",
      }}
    >
      <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
        {/* 엣지 곡선 그리기 */}
        {edges.map(({from, to}) => {
          const fromNode = nodes.find((n) => n.id === from);
          const toNode = nodes.find((n) => n.id === to);
          if (!fromNode || !toNode) return null;
          return (
            <path
              key={`${from}-${to}`}
              d={getEdgePath(fromNode, toNode)}
              stroke="#888"
              strokeWidth={2}
              fill="none"
            />
          );
        })}

        {/* 노드 그리기 */}
        {nodes.map(({id, x, y, label}) => (
          <g
            key={id}
            transform={`translate(${x}, ${y})`}
            onMouseEnter={() => setHoveredNode(id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(id);
              alert(`Clicked node ${id}`);
            }}
            style={{cursor: "pointer"}}
          >
            <circle
              r={hoveredNode === id || selectedNode === id ? 20 : 15}
              fill={
                hoveredNode === id || selectedNode === id
                  ? "#4caf50"
                  : "#2196f3"
              }
              stroke="#333"
              strokeWidth={1}
            />
            <text
              x={0}
              y={hoveredNode === id || selectedNode === id ? 35 : 25}
              fontSize={12}
              textAnchor="middle"
              fill="#000"
              pointerEvents="none"
            >
              {label || id}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
