import EditButton from "@component/common/button/EditButton";
import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModalState from "@hooks/useModalState";
import { EditorTitleStyle } from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import Blog2StructureContentCreateUpdateModal from "./Blog2StructureContentCreateUpdateModal";

interface IBlog2StructureContentItem {
  data: IBlog2Structure;
  addBlog2StructureContent: (data: IBlog2StructureContent) => void;
  updateBlog2StructureContent: (data: IBlog2StructureContent) => void;
  removeBlog2StructureContent: (id: number) => void;
}
const Blog2StructureContentItem = (props: IBlog2StructureContentItem) => {
  const modalState = useModalState();
  return (
    <div className="h-full w-full">
      <h2
        className={EditorTitleStyle}
        id={props.data.blog2StructureContent.directory
          .replace(/\s+/g, "-")
          .toLowerCase()}
      >
        {props.data.blog2StructureContent.directory.split("/").pop()}
      </h2>
      {modalState.isOpen && (
        <MarkdownPreview content={props.data.blog2StructureContent.content} />
      )}
      <div
        className={"absolute right-2 top-2 flex h-[2rem] items-center gap-x-1"}
      >
        <button
          className="h-8 w-8"
          onClick={() =>
            modalState.isOpen ? modalState.closeModal() : modalState.openModal()
          }
        >
          {!modalState.isOpen ? (
            <FiMaximize2 size="28" />
          ) : (
            <FiMinimize2 size="28" />
          )}
        </button>
        <ModalButton
          buttonClassName={"font-bold p-1 w-[2.25rem] default-flex"}
          modal={
            <Blog2StructureContentCreateUpdateModal
              edit={true}
              item={props.data.blog2StructureContent}
              addBlog2StructureContent={props.addBlog2StructureContent}
              updateBlog2StructureContent={props.updateBlog2StructureContent}
            />
          }
        >
          <EditButton />
        </ModalButton>
        <Button
          className={
            "w-[2.25rem] rounded-2xl p-1 opacity-40 default-flex hover:bg-primary-20 hover:opacity-100"
          }
          onClick={() =>
            props.removeBlog2StructureContent(
              props.data.blog2StructureContent.id,
            )
          }
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{width: "28px", height: "28px"}}
          />
        </Button>
      </div>
    </div>
  );
};
export default Blog2StructureContentItem;