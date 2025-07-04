import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons/faSquarePlus";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useModalState from "@hooks/useModalState";
import {
  EditorLiStyle,
  EditorTitleStyle,
  EditorUlStyle
} from "@utils/editor/EditorTailwindcssStyle";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { useFormContext } from "react-hook-form";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import Blog2ResultCreateUpdateModal from "./Blog2ResultCreateUpdateModal";

interface IBlog2ResultBox {
  isEdit?: boolean;
}
const Blog2ResultBox = (props: IBlog2ResultBox) => {
  const blog2FormContext = useFormContext();
  const modalState = useModalState();

  const addBlog2Result = (data: IBlog2Result) => {
    // 생성
    blog2FormContext.setValue("blog2ResultList", [
      ...blog2FormContext.getValues("blog2ResultList"),
      data,
    ]);
  };

  const deleteBlog2Result = async (id: number) => {
    const response = await fetch(`/api/blog2/result?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        type: "error",
        message: "삭제가 실패했습니다.",
      };
    }
    const temp: IBlog2Result[] = [];
    blog2FormContext.getValues("blog2ResultList").forEach((i: IBlog2Result) => {
      if (i.id != id) {
        temp.push(i);
      } else {
        if (props.isEdit) {
          blog2FormContext.setValue("isUpdateBlog2ResultList", true);
        }
      }
    });
    blog2FormContext.setValue("blog2ResultList", [...temp]);
    return {
      message: "삭제 성공",
    };
  };

  const updateBlog2Result = (data: IBlog2Result) => {
    const updatedList = blog2FormContext
      .getValues("blog2ResultList")
      .map((item: IBlog2Result) =>
        item.id == data.id ? {...item, ...data} : item,
      );
    // 수정된 리스트를 다시 설정
    blog2FormContext.setValue("blog2ResultList", updatedList, {shouldValidate: true});
  };

  return (
    <div className={"relative flex w-full flex-col rounded-[1rem] p-0"}>
      <article className="sticky left-2 top-[4.5rem] z-10 flex w-fit -translate-x-2 -translate-y-2 gap-2 bg-primary-60 p-1 opacity-80 primary-border-radius hover:opacity-100">
        <ModalButton
          buttonClassName={
            "primary-border-radius px-4 font-bold h-[2.5rem] bg-white-80  hover:bg-primary-20"
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
      {/* TODO : Blog2ResultContentItem 만들어서 처리할 것 */}
      <ul className={EditorUlStyle}>
        <>
          {blog2FormContext
            .getValues("blog2ResultList")
            ?.map((i: IBlog2Result) => (
              <li key={i.id} className={EditorLiStyle}>
                <h2 className={EditorTitleStyle} id={i.title}>
                  {i.title}
                </h2>
                {modalState.isOpen && <MarkdownPreview content={i.content} />}
                <div
                  className={
                    "absolute right-2 top-2 flex h-[2rem] items-center gap-x-1"
                  }
                >
                  <button
                    className="h-8 w-8"
                    onClick={() =>
                      modalState.isOpen
                        ? modalState.closeModal()
                        : modalState.openModal()
                    }
                  >
                    {!modalState.isOpen ? (
                      <FiMaximize2 size="28" />
                    ) : (
                      <FiMinimize2 size="28" />
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
                    onClick={() => () => deleteBlog2Result(i.id!)}
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
