import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoadingHandler from "@hooks/useLoadingHandler";
import { EditorLiStyle, EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import Image from "next/image";
import { useState } from "react";
import Blog2BasicCreateUpdateContentModal from "./Blog2BasicCreateUpdateContentModal";

interface IBlog2BasicContentItem {
    data: IBlog2Basic;
    removeBlog2BasicContent: (id: number) => void;
    updateBlog2BasicContent: (data: IBlog2BasicContent) => void;
}
const Blog2BasicContentItem = (props: IBlog2BasicContentItem) => {

  const [isFold, setIsFold] = useState(false);
  const { loadingWithHandler } = useLoadingHandler();

  return (
    <li
      className={EditorLiStyle}
    >
      <h2 className={EditorTitleStyle}  id={props.data.blog2BasicContent.title.replace(/\s+/g, "-").toLowerCase()}>
        {props.data.blog2BasicContent.title}
      </h2>
      {
        !isFold && <MarkdownPreview content={props.data.blog2BasicContent.content} />
      }
      {/* 수정 버튼과 닫기 제거 버튼 */}
      <div className={"absolute right-2 top-2 flex h-[2rem] items-center"}>
        <Button className={"relative w-[2.25rem] rounded-2xl p-1 aspect-square default-flex"} onClick={()=>setIsFold(prev=>!prev)}> {isFold ? <Image alt="ic" src={"/images/icons/ic-maximize.svg"} width={28} height={28} /> : <Image alt="ic" src={"/images/icons/ic-minimize.svg"} width={28} height={28}/>} </Button>
        <ModalButton
          buttonClassName={"font-bold rounded-2xl p-1 hover:bg-primary-20 w-[2.25rem] default-flex"}
          modal={<Blog2BasicCreateUpdateContentModal edit={true} item={props.data.blog2BasicContent} updateBlog2BasicContent={props.updateBlog2BasicContent} />}
        >
          <FontAwesomeIcon icon={faPenToSquare} style={{ width: "28px", height: "28px" }} />
        </ModalButton>
        <Button className={"opacity-40 hover:opacity-100 p-1 rounded-2xl hover:bg-primary-20 w-[2.25rem] default-flex"} onClick={() => loadingWithHandler(()=>props.removeBlog2BasicContent(props.data.blog2BasicContent.id))}>
          <FontAwesomeIcon icon={faXmark} style={{ width: "28px", height: "28px" }} />
        </Button>
      </div>
    </li>
  );
};
export default Blog2BasicContentItem;