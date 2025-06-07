import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorLiStyle, EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useState } from "react";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import Blog2BasicCreateUpdateContentModal from "./Blog2BasicCreateUpdateContentModal";

interface IBlog2BasicContentItem {
    data: IBlog2Basic;
    removeBlog2BasicContent: (id: number) => void;
    updateBlog2BasicContent: (data: IBlog2BasicContent) => void;
}
const Blog2BasicContentItem = (props: IBlog2BasicContentItem) => {

  const [isFold, setIsFold] = useState(false);

  return (
    <li className={EditorLiStyle}>
      <h1
        className={EditorTitleStyle}
        id={props.data.blog2BasicContent.title
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.blog2BasicContent.title}
      </h1>
      {!isFold && (
        <MarkdownPreview content={props.data.blog2BasicContent.content} />
      )}
      {/* 수정 버튼과 닫기 제거 버튼 */}
      <div className={"absolute right-2 top-2 flex h-[2rem] items-center"}>
        <Button
          className={
            "relative aspect-square w-[2.25rem] rounded-2xl p-1 default-flex"
          }
          onClick={() => setIsFold((prev) => !prev)}
        >
          {isFold ? <FiMaximize2 size="28" /> : <FiMinimize2 size="28" />}
        </Button>

        {/* basic 글을 수정하는 버튼 */}
        <ModalButton
          buttonClassName={
            "font-bold rounded-2xl p-1 hover:bg-primary-20 w-[2.25rem] default-flex"
          }
          modal={
            <Blog2BasicCreateUpdateContentModal
              edit={true}
              blog2BasicContentItem={props.data.blog2BasicContent}
              updateBlog2BasicContent={props.updateBlog2BasicContent}
            />
          }
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            style={{width: "28px", height: "28px"}}
          />
        </ModalButton>

        {/* basic 글을 전체글에서 빼는 버튼(삭제는 아님) */}
        <Button
          className={
            "w-[2.25rem] rounded-2xl p-1 opacity-40 default-flex hover:bg-primary-20 hover:opacity-100"
          }
          onClick={() =>
            props.removeBlog2BasicContent(props.data.blog2BasicContent.id)
          }
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{width: "28px", height: "28px"}}
          />
        </Button>
      </div>
    </li>
  );
};
export default Blog2BasicContentItem;