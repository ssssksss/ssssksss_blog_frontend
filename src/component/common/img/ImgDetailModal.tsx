"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import ModalTemplate from "../modal/hybrid/ModalTemplate";

interface IImgDetailModal extends IModalComponent {
  detailImgSrc: string;
}

const ImgDetailModal = (props: IImgDetailModal) => {
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const prevPosition = useRef({x: 0, y: 0});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 휠 이벤트 (확대/축소)
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();

    setScale((prev) => {
      const nextScale = event.deltaY < 0 ? prev + 0.1 : prev - 0.1;
      return Math.min(3, Math.max(0.5, parseFloat(nextScale.toFixed(2))));
    });
  };

  // 마우스 다운
  const handleMouseDown = (event: React.MouseEvent) => {
    setDragging(true);
    prevPosition.current = {x: event.clientX, y: event.clientY};
  };

  // 마우스 이동
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging) return;

    const deltaX = event.clientX - prevPosition.current.x;
    const deltaY = event.clientY - prevPosition.current.y;

    setPosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    prevPosition.current = {x: event.clientX, y: event.clientY};
  };

  // 마우스 업
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <ModalTemplate className="relative h-[calc(100vh-1rem)] w-[calc(100vw-1rem)]">
      {props.closeButtonComponent}

      {/* 드래그, 스크롤, 확대 영역 */}
      <div
        ref={containerRef}
        className="bg-black fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-opacity-90"
        style={{cursor: dragging ? "grabbing" : "grab"}}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 내부 이미지 컨테이너 */}
        <div
          className="primary-border-radius"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.15s ease-out",
            transformOrigin: "center center",
          }}
        >
          {props.detailImgSrc && (
            <Image
              alt="확대 이미지"
              src={props.detailImgSrc}
              width={1200}
              height={800}
              priority
              style={{
                objectFit: "contain",
                maxWidth: "90vw",
                maxHeight: "90vh",
                userSelect: "none",
              }}
              draggable={false}
            />
          )}
        </div>
      </div>
    </ModalTemplate>
  );
};

export default ImgDetailModal;
