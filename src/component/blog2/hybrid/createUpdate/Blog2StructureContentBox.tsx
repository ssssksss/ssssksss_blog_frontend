import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    EditorLiStyle,
    EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import { useFormContext } from "react-hook-form";
import Blog2StructureContentCreateUpdateModal from "./Blog2StructureContentCreateUpdateModal";
import Blog2StructureContentItem from "./Blog2StructureContentItem";
import Blog2StructureSearchContentModal from "./Blog2StructureSearchContentModal";

interface IBlog2StructureContentBox {
  addBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  updateBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  removeBlog2Content: (type: "basic" | "structure", id: number) => void;
}
const Blog2StructureContentBox = (props: IBlog2StructureContentBox) => {
  const blog2FormContext = useFormContext();

  const addBlog2StructureContent = (data: IBlog2StructureContent) => {
    props.addBlog2Content(data, "structure");
  };

  const removeBlog2StructureContent = (id: number) => {
    props.removeBlog2Content("basic", id);
  };

  const updateBlog2StructureContent = (data: IBlog2StructureContent) => {
    props.updateBlog2Content(data, "structure");
  };

  return (
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      <article className="sticky left-2 top-[4.5rem] z-10 flex w-fit -translate-x-2 -translate-y-2 gap-2 bg-primary-60 p-1 opacity-80 primary-border-radius hover:opacity-100">
        <ModalButton
          buttonClassName={
            "primary-border-radius px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"
          }
          modal={
            <Blog2StructureContentCreateUpdateModal
              addBlog2StructureContent={addBlog2StructureContent}
              updateBlog2StructureContent={updateBlog2StructureContent}
            />
          }
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{width: "24px", height: "24px"}}
          />
        </ModalButton>
        <ModalButton
          buttonClassName={
            "primary-border-radius px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"
          }
          modal={
            <Blog2StructureSearchContentModal
              addBlog2StructureContent={addBlog2StructureContent}
            />
          }
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlassPlus}
            style={{width: "24px", height: "24px"}}
          />
        </ModalButton>
      </article>
      <ul className={EditorUlStyle}>
        <>
          {blog2FormContext
            .getValues("blog2StructureList")
            ?.map((i: IBlog2Structure) => (
              <li key={i.id} className={EditorLiStyle}>
                <Blog2StructureContentItem
                  data={i}
                  addBlog2StructureContent={addBlog2StructureContent}
                  updateBlog2StructureContent={updateBlog2StructureContent}
                  removeBlog2StructureContent={removeBlog2StructureContent}
                />
              </li>
            ))}
        </>
      </ul>
    </div>
  );
};
export default Blog2StructureContentBox;
