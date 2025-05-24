"use client";

import BasicButton from "@component/common/button/hybrid/BasicButton";
import Input from "@component/common/input/Input";
import BasicTextarea from "@component/common/textarea/BasicTextarea";
import useFetchCSR from "@hooks/useFetchCSR";
import useRefreshStore from "@store/refreshStore";
import useToastifyStore from "@store/toastifyStore";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { BsSend } from "react-icons/bs";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
interface IBoardCreateUpdateContainer {
  isEdit?: boolean;
  data?: IBoard;
}
const BoardCreateUpdateContainer = (props: IBoardCreateUpdateContainer) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const toastifyStore = useToastifyStore();
  const fetchCSR = useFetchCSR();
  const refreshStore = useRefreshStore();

  const createUpdateBoardHandler = async () => {
    if (!titleRef.current?.value || !contentRef.current?.value) {
      toastifyStore.setToastify({
        type: "error",
        message: "제목이나 내용이 없습니다.",
      });
      return;
    }
    const result: number = await fetchCSR.requestWithHandler({
      url: `/api/board${props.isEdit ? "?id=" + props.data?.id : ""}`,
      method: props.isEdit ? "PUT" : "POST",
      body: {
        title: titleRef.current?.value,
        content: contentRef.current?.value,
        id: props.data?.id,
      },
      showSuccessToast: true,
      successMessage: props.isEdit
        ? "게시글 수정에 성공"
        : "게시글 작성에 성공",
      handleRevalidateTags: props.isEdit ? [`getBoard/${props.data?.id}`] : [],
    });
    if (result == undefined) return;
    if (props.isEdit) {
      refreshStore.setRefresh(true);
      router.back();
    } else {
      refreshStore.setRefresh(true);
      router.replace(`/board/${result}`);
    }
  };

  return (
    <div className={"flex h-full w-full flex-col gap-y-2 py-4"}>
      <div className="relative w-full default-flex">
        <h1 className="text-2xl"> 게시판 {props.isEdit ? "수정" : "생성"} </h1>
        <div className="absolute right-0 top-1/2 flex h-[2.5rem] -translate-y-[calc(50%+0.25rem)] gap-x-1">
          <BasicButton
            onClick={() => createUpdateBoardHandler()}
            className="h-btn-md rounded-2xl p-2 primary-border hover:primary-set"
            aria-label={props.isEdit ? "게시판 수정 완료" : "게시판 생성 완료"}
          >
            <BsSend size="28" />
          </BasicButton>
        </div>
        <button
          onClick={() => router.back()}
          className="absolute left-0 top-1/2 h-btn-md -translate-y-[calc(50%+0.25rem)] px-2 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80"
          aria-label="뒤로가기"
        >
          <FaRegArrowAltCircleLeft size="28" />
        </button>
      </div>
      <Input
        className="max-h-[4rem] w-full p-4 text-center primary-border-radius"
        placeholder="제목을 입력하세요"
        ref={titleRef}
        defaultValue={props.data?.title || ""}
      />
      <BasicTextarea
        className="h-full w-full flex-grow p-4 primary-border-radius"
        placeholder="내용을 입력하세요"
        ref={contentRef}
        defaultValue={props.data?.content || ""}
      />
    </div>
  );
};
export default BoardCreateUpdateContainer;
