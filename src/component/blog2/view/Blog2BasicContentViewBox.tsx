import LottieNotFound from "@component/common/lottie/LottieNotFound";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/MarkdownPreview";
import React, { useCallback, useRef } from "react";
import Blog2BasicContentViewItem from "./Blog2BasicContentViewItem";
import Blog2ContentIndexBox from "./Blog2ContentIndexBox";
import Blog2ContentIndexButton from "./Blog2ContentIndexButton";

interface IBlog2BasicContentViewBox {
  data: IBlog2Basic[];
}

const Blog2BasicContentViewBox = (props: IBlog2BasicContentViewBox) => {
  const modalState = useModalState();
  const ref = useRef<HTMLDivElement>(null);

  const handleLinkClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      event.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({behavior: "smooth"});
      }
      window.history.replaceState(null, "", `#${targetId}`);
    },
    [],
  );

  const generateLink = useCallback(
    (text: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(
        convertMarkdownToHtml(text),
        "text/html",
      );
      const headings = doc.querySelectorAll(
        "h1[data-index='true'], h2[data-index='true'], h3[data-index='true']",
      );
      const idsArray = Array.from(headings, (heading) => ({
        id: heading.id,
        htag: heading.tagName,
      }));

      return idsArray.map((i) => (
        <label
          key={i.id}
          className="relative flex items-center justify-start p-1 text-[1rem] hover:bg-primary-20"
        >
          <a
            className={`w-full font-DNFBitBitv2 ${i.htag === "H1" ? "pl-1 text-primary-80" : i.htag === "H2" ? "pl-2 text-secondary-80" : "pl-3 text-third-80"}`}
            href={`#${i.id}`}
            onClick={(event) => handleLinkClick(event, i.id)}
          >
            {i.id}
          </a>
        </label>
      ));
    },
    [handleLinkClick],
  );

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
      {modalState.isOpen && (
        <Blog2ContentIndexBox
          data={props.data}
          closeModal={() => modalState.closeModal()}
        />
      )}
      {!modalState.isOpen && (
        <Blog2ContentIndexButton openModal={() => modalState.openModal()} />
      )}
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

export default React.memo(Blog2BasicContentViewBox);
