import LottieNotFound from "@component/common/lottie/LottieNotFound";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import { useScrollToHash } from "@hooks/useScrollToHash";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import React, { useRef } from "react";
import Blog2BasicContentViewItem from "./Blog2BasicContentViewItem";
import Blog2ContentIndexButton from "./Blog2ContentIndexButton";
import Blog2ContentIndexContainer from "./Blog2ContentIndexContainer";

interface IBlog2BasicContentView {
  data: IBlog2Basic[];
}

const Blog2BasicContentView = (props: IBlog2BasicContentView) => {
  const modalState = useModalState();
  const ref = useRef<HTMLDivElement>(null);
  useScrollToHash();

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

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
      {modalState.isOpen ? 
        <Blog2ContentIndexContainer
          data={props.data}
          closeModal={() => modalState.closeModal()}
        />
        :
        <Blog2ContentIndexButton openModal={() => modalState.openModal()} />
      }
      <ul className={EditorUlStyle}>
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
