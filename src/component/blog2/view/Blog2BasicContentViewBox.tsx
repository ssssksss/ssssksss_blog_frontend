import AbsoluteCloseButton from "@component/common/button/hybrid/AbsoluteCloseButton";
import LottieNotFound from "@component/common/lottie/LottieNotFound";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import "@styles/customEditor.css";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import React, { useCallback, useRef } from "react";
import Blog2BasicContentViewItem from "./Blog2BasicContentViewItem";

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
        <div
          ref={ref}
          className="sticky left-[calc(100%-1rem)] top-[4.5rem] z-10 h-0 w-0 translate-x-1"
        >
          <ul className="absolute right-0 flex max-h-[calc(100vh-5rem)] w-[20rem] max-w-[50vw] flex-col gap-y-2 bg-gray-40 p-4 pt-12 default-outline min-[1900px]:left-[0.375rem]">
            <AbsoluteCloseButton
              className="right-[1rem] top-[1rem]"
              onClick={() => modalState.closeModal()}
            />
            <div className="h-full overflow-y-scroll rounded-lg pb-[3rem] font-SDSamliphopangche_Outline text-[1.25rem] scrollbar-hide">
              {props.data.map((i) => (
                <div key={i.id}>
                  <label className="relative flex items-center justify-start p-1 font-bold hover:bg-primary-20">
                    <a
                      className="w-full"
                      href={`#${i.blog2BasicContent.title.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {i.blog2BasicContent.title}
                    </a>
                  </label>
                  {generateLink(i.blog2BasicContent.content)}
                </div>
              ))}
            </div>
          </ul>
        </div>
      )}
      {!modalState.isOpen && (
        <div className="sticky left-[100%] top-[4.5rem] z-10 h-0 w-0">
          <button
            onClick={() => modalState.openModal()}
            className="absolute right-0 top-0 z-20 h-[2.5rem] w-[2.5rem] bg-primary-20 default-outline"
          >
            <FontAwesomeIcon icon={faBars} className="text-[2rem]" />
          </button>
        </div>
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
