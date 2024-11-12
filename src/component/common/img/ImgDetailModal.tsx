import Image from "next/image";
import {useRef, useState} from "react";
import ModalTemplate from "../modal/hybrid/ModalTemplate";

interface IImgDetailModal extends IModalComponent {
  detailImgSrc: string;
}
const ImgDetailModal = (props: IImgDetailModal) => {
  const [scale, setScale] = useState(1);
  const [dragging, setDragging] = useState(false); // 드래그 상태
  const [position, setPosition] = useState({x: 0, y: 0}); // 이미지 위치
  const prevPosition = useRef({x: 0, y: 0}); // 이전 위치 저장

  // 휠 이벤트 핸들러 (이미지 확대/축소)
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault(); // 기본 스크롤 방지

    if (event.deltaY < 0) {
      setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // 최대 3배 확대
    } else {
      setScale((prevScale) => Math.max(prevScale - 0.1, 1)); // 최소 1배 크기
    }
  };

  // 마우스 다운 (드래그 시작)
  const handleMouseDown = (event: React.MouseEvent) => {
    setDragging(true);
    prevPosition.current = {x: event.clientX, y: event.clientY}; // 초기 마우스 위치 기록
  };

  // 마우스 이동 (드래그 중)
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!dragging) return;

    const deltaX = event.clientX - prevPosition.current.x;
    const deltaY = event.clientY - prevPosition.current.y;

    // 조금씩 이동하도록 조정 (속도 조절)
    setPosition((prevPosition) => ({
      x: prevPosition.x + deltaX * 0.5, // 이동 속도 조정 (0.1 배)
      y: prevPosition.y + deltaY * 0.5, // 이동 속도 조정 (0.1 배)
    }));

    prevPosition.current = {x: event.clientX, y: event.clientY}; // 마우스 위치 업데이트
  };

  // 마우스 업 (드래그 종료)
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <ModalTemplate
      className={"relative h-[calc(100vh-1rem)] w-[calc(100vw-1rem)]"}>
      {props.closeButtonComponent}
      <div
        className="fixed h-full w-full overflow-hidden"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          transition: "transform 0.1s ease",
          cursor: dragging ? "grabbing" : "grab", // 드래그 상태에 따라 커서 변경
          left: `${position.x}px`, // 이미지 위치 업데이트
          top: `${position.y}px`, // 이미지 위치 업데이트
          position: "absolute", // 위치 고정을 위한 절대 위치
        }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // 마우스를 벗어나면 드래그 종료
      >
        {props.detailImgSrc && <Image alt="" src={props.detailImgSrc} fill />}
      </div>
    </ModalTemplate>
  );
};
export default ImgDetailModal;
