import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import {faMagnifyingGlassPlus} from "@fortawesome/free-solid-svg-icons/faMagnifyingGlassPlus";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {faSquarePlus} from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import {faXmark} from "@fortawesome/free-solid-svg-icons/faXmark";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  EditorLiStyle,
  EditorPriviewStyle,
  EditorTitleStyle,
  EditorUlStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import {convertMarkdownToHtml} from "@utils/editor/ReturnMarkdown";
import {useFormContext} from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";
import Blog2StructureContentCreateUpdateModal from "./Blog2StructureContentCreateUpdateModal";
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
    toastifyStore.setToastify({
      type: "success",
      message: "추가되었습니다.",
    });
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
    toastifyStore.setToastify({
      type: "success",
      message: "제거되었습니다.",
    });
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
    toastifyStore.setToastify({
      type: "success",
      message: "수정되었습니다.",
    });
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
          }>
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
          }>
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
                <h2
                  className={EditorTitleStyle}
                  id={i.blog2StructureContent.directory
                    .replace(/\s+/g, "-")
                    .toLowerCase()}>
                  {i.blog2StructureContent.directory.split("/").pop()}
                </h2>
                <div
                  id={"preview"}
                  className={EditorPriviewStyle}
                  dangerouslySetInnerHTML={{
                    __html: convertMarkdownToHtml(
                      i.blog2StructureContent.content,
                    ),
                  }}
                />
                <div
                  className={
                    "absolute right-2 top-2 flex h-[2rem] items-center gap-x-1"
                  }>
                  <ModalButton
                    buttonClassName={
                      "font-bold rounded-2xl hover:bg-primary-20 p-1 w-[2.25rem] default-flex"
                    }
                    modal={
                      <Blog2StructureContentCreateUpdateModal
                        edit={true}
                        item={i.blog2StructureContent}
                        addBlog2StructureContent={addBlog2StructureContent}
                        updateBlog2StructureContent={
                          updateBlog2StructureContent
                        }
                      />
                    }>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{width: "28px", height: "28px"}}
                    />
                  </ModalButton>
                  <Button
                    className={
                      "w-[2.25rem] rounded-2xl p-1 opacity-40 default-flex hover:bg-primary-20 hover:opacity-100"
                    }
                    onClick={() =>
                      removeBlog2StructureContent(i.blog2StructureContent.id)
                    }>
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{width: "28px", height: "28px"}}
                    />
                  </Button>
                </div>
              </li>
            ))}
        </>
      </ul>
    </div>
  );
};
export default Blog2StructureContentBox;
