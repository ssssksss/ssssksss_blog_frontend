import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModalState from "@hooks/useModalState";
import {
  EditorLiStyle,
  EditorPreviewStyle,
  EditorTitleStyle,
  EditorUlStyle,
} from "@utils/editor/EditorTailwindcssStyle";
import { convertMarkdownToHtml } from "@utils/editor/ReturnMarkdown";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import useToastifyStore from "src/store/toastifyStore";
import Blog2ResultCreateUpdateModal from "./Blog2ResultCreateUpdateModal";

interface IBlog2ResultBox {
  isEdit?: boolean;
}
const Blog2ResultBox = (props: IBlog2ResultBox) => {
  const blog2FormContext = useFormContext();
  const toastifyStore = useToastifyStore();
  const modalState = useModalState();

  const addBlog2Result = (data: IBlog2Result) => {
    // 생성
    blog2FormContext.setValue("blog2ResultList", [
      ...blog2FormContext.getValues("blog2ResultList"),
      data,
    ]);
    toastifyStore.setToastify({
      type: "success",
      message: "추가되었습니다.",
    });
  };

  const deleteBlog2Result = async (id: number) => {
    const response = await fetch(`/api/blog2/result?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "삭제가 실패했습니다.",
      });
      return;
    }
    const temp: IBlog2Result[] = [];
    blog2FormContext.getValues("blog2ResultList").forEach((i: IBlog2Result) => {
      if (i.id != id) {
        temp.push(i);
      } else {
        if (props.isEdit) {
          blog2FormContext.setValue("isUpdateBlog2Result", true);
          blog2FormContext.setValue("deleteBlog2ResultList", [
            ...blog2FormContext.getValues("deleteBlog2ResultList"),
            id,
          ]);
        }
      }
    });
    blog2FormContext.setValue("blog2ResultList", [...temp]);
    toastifyStore.setToastify({
      type: "success",
      message: "제거되었습니다.",
    });
  };

  const updateBlog2Result = (data: IBlog2Result) => {
    const updatedList = blog2FormContext
      .getValues("blog2ResultList")
      .map((item: IBlog2Result) =>
        item.id == data.id ? {...item, ...data} : item,
      );
    // 수정된 리스트를 다시 설정
    blog2FormContext.setValue("blog2ResultList", updatedList);
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
            <Blog2ResultCreateUpdateModal
              addBlog2Result={addBlog2Result}
              updateBlog2Result={updateBlog2Result}
            />
          }
        >
          <FontAwesomeIcon
            icon={faSquarePlus}
            style={{width: "24px", height: "24px"}}
          />
        </ModalButton>
      </article>
      <ul className={EditorUlStyle}>
        <>
          {blog2FormContext
            .getValues("blog2ResultList")
            ?.map((i: IBlog2Result) => (
              <li key={i.id} className={EditorLiStyle}>
                <h2 className={EditorTitleStyle} id={i.title}>
                  {i.title}
                </h2>
                {modalState.isOpen && (
                  <div
                    id={"preview"}
                    className={EditorPreviewStyle}
                    dangerouslySetInnerHTML={{
                      __html: convertMarkdownToHtml(i.content),
                    }}
                  />
                )}
                <div
                  className={
                    "absolute right-2 top-2 flex h-[2rem] items-center gap-x-1"
                  }
                > <button
                    className="h-8 w-8"
                    onClick={() => modalState.isOpen ? modalState.closeModal() : modalState.openModal()}
                  >
                    {!modalState.isOpen ? (
                      <Image
                        alt="ic"
                        src={"/images/icons/ic-maximize.svg"}
                        width={28}
                        height={28}
                      />
                    ) : (
                      <Image
                        alt="ic"
                        src={"/images/icons/ic-minimize.svg"}
                        width={28}
                        height={28}
                      />
                    )}
                  </button>
                  <ModalButton
                    buttonClassName={
                      "font-bold rounded-2xl hover:bg-primary-20 p-1 w-[2.25rem] default-flex"
                    }
                    modal={
                      <Blog2ResultCreateUpdateModal
                        edit={true}
                        item={i}
                        addBlog2Result={addBlog2Result}
                        updateBlog2Result={updateBlog2Result}
                      />
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      style={{width: "28px", height: "28px"}}
                    />
                  </ModalButton>
                  <Button
                    className={
                      "w-[2.25rem] rounded-2xl p-1 opacity-40 default-flex hover:bg-primary-20 hover:opacity-100"
                    }
                    onClick={() => deleteBlog2Result(i.id!)}
                  >
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
export default Blog2ResultBox;
