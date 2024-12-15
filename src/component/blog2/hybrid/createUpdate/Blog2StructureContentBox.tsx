import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faMagnifyingGlassPlus } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  EditorLiStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import { useFormContext } from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";
import Blog2StructureContentCreateUpdateModal from "./Blog2StructureContentCreateUpdateModal";
import Blog2StructureContentItem from "./Blog2StructureContentItem";
import Blog2StructureSearchContentModal from "./Blog2StructureSearchContentModal";

interface IBlog2StructureContentBox {
  isEdit?: boolean;
}
const Blog2StructureContentBox = (props: IBlog2StructureContentBox) => {
  const blog2FormContext = useFormContext();
  const toastifyStore = useToastifyStore();

  const addBlog2StructureContent = (data: IBlog2StructureContent) => {
    // 생성
    blog2FormContext.setValue("blog2StructureList", [
      ...blog2FormContext.getValues("blog2StructureList"),
      {
        id: 0,
        position: 0,
        blog2StructureContent: data,
      },
    ]);
    blog2FormContext.setValue("isUpdateBlog2Structure", true);
  };

  const removeBlog2StructureContent = (id: number) => {
    const temp = (
      blog2FormContext.getValues("blog2StructureList") as IBlog2Structure[]
    ).filter((i) => i.blog2StructureContent.id != id);
    blog2FormContext.setValue("blog2StructureList", [...temp]);
    if (props.isEdit) {
      blog2FormContext.setValue("isUpdateBlog2Structure", true);
      blog2FormContext.setValue("deleteBlog2StructureList", [
        ...blog2FormContext.getValues("deleteBlog2StructureList"),
        id,
      ]);
    }
    return {
      type: "error",
      message: "제거 성공",
    };
  };

  const updateBlog2StructureContent = (data: IBlog2StructureContent) => {
    const updatedList = blog2FormContext
      .getValues("blog2StructureList")
      .map((item: IBlog2Structure) =>
        item.blog2StructureContent.id == data.id
          ? {...item, blog2StructureContent: data}
          : item,
      );
    // 수정된 리스트를 다시 설정
    blog2FormContext.setValue("blog2StructureList", updatedList);
  };

  return (
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      <article className="sticky left-2 top-[4.5rem] z-10 flex w-fit -translate-x-2 -translate-y-2 gap-2 bg-primary-60 p-1 opacity-80 default-outline hover:opacity-100">
        <ModalButton
          buttonClassName={
            "default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"
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
            "default-outline px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"
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
