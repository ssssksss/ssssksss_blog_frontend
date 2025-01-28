import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditorUlStyle } from "@utils/editor/EditorTailwindcssStyle";
import { useFormContext } from "react-hook-form";
import Blog2BasicContentItem from "./Blog2BasicContentItem";
import Blog2BasicCreateUpdateContentModal from "./Blog2BasicCreateUpdateContentModal";
import Blog2BasicSearchContentModal from "./Blog2BasicSearchContentModal";

interface IBlog2BasicContentBox {
  addBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  updateBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  removeBlog2Content: (
      type: "basic" | "structure",
      id: number
  ) => void;
}
const Blog2BasicContentBox = (props: IBlog2BasicContentBox) => {
  
  const blog2FormContext = useFormContext();

  const addBlog2BasicContent = (data: IBlog2BasicContent) => {
    props.addBlog2Content(data, "basic");  //   // 생성
  };

  const removeBlog2BasicContent = (id: number) => {
    props.removeBlog2Content(
      "basic", id
    );
  };

  const updateBlog2BasicContent = (data: IBlog2BasicContent) => {
    props.updateBlog2Content(data, "basic");
  };

  return (
    <div className={"relative w-full flex flex-col rounded-[1rem] p-0"}> 
      <article className="sticky left-2 top-[4.5rem] z-10 -translate-y-2 -translate-x-2 w-fit p-1 flex default-outline gap-2 opacity-80 hover:opacity-100 bg-primary-60">
        <ModalButton
          buttonClassName={"default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"}
          modal={<Blog2BasicCreateUpdateContentModal addBlog2BasicContent={addBlog2BasicContent} updateBlog2BasicContent={updateBlog2BasicContent} />}
        >
          <FontAwesomeIcon icon={faSquarePlus} style={{ width: "24px", height: "24px" }} />
        </ModalButton>
        <ModalButton
          buttonClassName={"default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"}
          modal={<Blog2BasicSearchContentModal addBlog2BasicContent={addBlog2BasicContent} />}
        >
          <FontAwesomeIcon icon={faMagnifyingGlassPlus} style={{ width: "24px", height: "24px"}} />
        </ModalButton>
      </article>
      <ul className={EditorUlStyle}>
        <>
          {
            blog2FormContext.getValues("blog2BasicList")?.map((i: IBlog2Basic) => (
              <Blog2BasicContentItem key={i.blog2BasicContent.id} data={i} removeBlog2BasicContent={removeBlog2BasicContent} updateBlog2BasicContent={updateBlog2BasicContent} />
            ))
          }
        </>
      </ul>
    </div> 
  );
};
export default Blog2BasicContentBox; 