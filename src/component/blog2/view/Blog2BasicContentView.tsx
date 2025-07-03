import ImgDetailModal from "@component/common/img/ImgDetailModal";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import { Modal } from "@component/common/modal/hybrid/Modal";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import { useScrollToHash } from "@hooks/useScrollToHash";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import React, { useEffect, useRef, useState } from "react";
import Blog2BasicContentViewItem from "./Blog2BasicContentViewItem";
import Blog2ContentIndexButton from "./Blog2ContentIndexButton";
import Blog2ContentIndexContainer from "./Blog2ContentIndexContainer";

interface IBlog2BasicContentView {
  data: IBlog2Basic[];
}

const Blog2BasicContentView = (props: IBlog2BasicContentView) => {
  const modalState = useModalState();
  const imageModalState = useModalState();
  const [imageSrc, setImageSrc] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useScrollToHash();

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

  useEffect(() => {
    const container = document.getElementById("basic-content-list");
    if (!container) return;

    const attachClickHandlers = () => {
      const imgs = container.querySelectorAll("img");
      imgs.forEach((img) => {
        if ((img as any)._clickHandlerAttached) return; // 중복 방지

        img.style.cursor = "pointer";
        img.onclick = () => {
          setImageSrc(img.src);
          imageModalState.openModal();
        };

        (img as any)._clickHandlerAttached = true;
      });
    };

    // 초기 한 번 실행
    attachClickHandlers();

    // DOM 변화 감지
    const observer = new MutationObserver(() => {
      attachClickHandlers(); // 이미지가 생길 때마다 다시 이벤트 등록
    });

    observer.observe(container, {childList: true, subtree: true});

    return () => observer.disconnect();
  }, []);

  if (props.data.length === 0) {
    return (
      <div className="relative flex w-full flex-col rounded-[1rem] p-0">
        <div className="flex w-full flex-col items-center">
          <LottieNotFound text={"정보가 없습니다."} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex w-full flex-col rounded-[1rem] p-0">
      {modalState.isOpen ? (
        <Blog2ContentIndexContainer
          data={props.data}
          closeModal={() => modalState.closeModal()}
        />
      ) : (
        <Blog2ContentIndexButton openModal={() => modalState.openModal()} />
      )}
      <Modal modalState={imageModalState}>
        <ImgDetailModal detailImgSrc={imageSrc} />
      </Modal>
      <ul id="basic-content-list" className={EditorUlStyle}>
        {props.data.map((i) => (
          <li key={i.id} className={EditorLiStyle}>
            <Blog2BasicContentViewItem data={i} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Blog2BasicContentView);
