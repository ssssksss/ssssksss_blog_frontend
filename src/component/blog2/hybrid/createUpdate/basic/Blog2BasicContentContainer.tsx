import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { EditorUlStyle } from "@utils/editor/EditorTailwindcssStyle";
import { useFormContext, useWatch } from "react-hook-form";
import { FaRegPlusSquare, FaSearchPlus } from "react-icons/fa";
import Blog2BasicContentItem from "./Blog2BasicContentItem";
import Blog2BasicCreateUpdateContentModal from "./Blog2BasicCreateUpdateContentModal";
import Blog2BasicSearchContentModal from "./Blog2BasicSearchContentModal";
// 블로그 내용에서 기초 섹션의 내용만 보여지는 부분
const Blog2BasicContentContainer = (props: IBlog2BasicContentContainer) => {
  
  const blog2FormContext = useFormContext();
  const blog2BasicList = useWatch({
    control: blog2FormContext.control,
    name: "blog2BasicList",
  });

  const addBlog2BasicContent = (data: IBlog2BasicContent) => {
    props.addBlog2Content(data, "basic");
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
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      <article className="sticky left-2 top-[4.5rem] z-10 flex w-fit -translate-x-2 -translate-y-2 gap-2 p-1 text-contrast-1 opacity-80 primary-border-radius hover:opacity-100">
        {/* 블로그 기초 내용을 세롭게 생성하는 버튼 */}
        <ModalButton
          buttonClassName={
            "px-2 font-bold h-[2.5rem] hover:bg-primary-80 rounded-2xl"
          }
          modal={
            <Blog2BasicCreateUpdateContentModal
              addBlog2BasicContent={addBlog2BasicContent}
              updateBlog2BasicContent={updateBlog2BasicContent}
            />
          }
        >
          <FaRegPlusSquare size="28" />
        </ModalButton>
        {/* 블로그 기초 리스트에 검색해서 기초글을 추가하는 버튼 */}
        <ModalButton
          buttonClassName={
            "px-2 font-bold h-[2.5rem] hover:bg-primary-80 rounded-2xl"
          }
          modal={
            <Blog2BasicSearchContentModal
              addBlog2BasicContent={addBlog2BasicContent}
            />
          }
        >
          <FaSearchPlus size={"24"} />
        </ModalButton>
      </article>
      <ul className={EditorUlStyle}>
        <>
          {blog2BasicList?.map((i: IBlog2Basic) => (
            <Blog2BasicContentItem
              key={i.blog2BasicContent.id}
              data={i}
              removeBlog2BasicContent={removeBlog2BasicContent}
              updateBlog2BasicContent={updateBlog2BasicContent}
            />
          ))}
        </>
      </ul>
    </div>
  );
};
export default Blog2BasicContentContainer; 