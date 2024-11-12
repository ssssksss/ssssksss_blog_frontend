"use client";

import Input from "@component/common/input/Input";
import useToastifyStore from "@store/toastifyStore";
import {SquareArrowLeft} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";

interface IBoardCreateUpdateContainer {
  isEdit?: boolean;
  result?: IResponseReadBoard;
}
const BoardCreateUpdateContainer = (props: IBoardCreateUpdateContainer) => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const toastifyStore = useToastifyStore();

  const createUpdateBoardHandler = async () => {
    if (!titleRef.current?.value || !contentRef.current?.value) {
      toastifyStore.setToastify({
        type: "error",
        message: "제목이나 내용이 없습니다.",
      });
      return;
    }
    const response = await fetch(
      `/api/board${props.isEdit ? "?id=" + props.result?.data.id : ""}`,
      {
        method: props.isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleRef.current?.value,
          content: contentRef.current?.value,
          id: props.result?.data.id,
        }),
      },
    );
    if (!response.ok) {
      alert("에러 상단에서 처리하는 거 찾아보기");
      return;
    }
    if (props.isEdit) {
      toastifyStore.setToastify({
        type: "success",
        message: "게시글 수정에 성공",
      });
      router.replace(`/board/${props.result?.data.id}?timestamp=${new Date()}`);
    } else {
      const result: IResponseCreateBoard = await response.json();
      toastifyStore.setToastify({
        type: "success",
        message: "게시글 작성에 성공",
      });
      router.replace(`/board/${result.data}`);
    }
  };

  const deleteBoardHandler = async () => {
    const response = await fetch(`/api/board?id=${props.result?.data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "게시글 삭제에 실패",
      });
      return;
    }
    router.replace("/board");
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("timestamp");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  }, []);

  return (
    <div className={"flex h-full w-full flex-col gap-y-2 py-4"}>
      <div className="relative w-full default-flex">
        <h1 className="text-2xl"> 게시판 {props.isEdit ? "수정" : "생성"} </h1>
        <div className="absolute right-0 top-1/2 flex h-[2.5rem] -translate-y-[calc(50%+0.25rem)] gap-x-1">
          <button
            onClick={() => createUpdateBoardHandler()}
            className="h-full px-4 py-2 default-outline hover:bg-primary-80 hover:text-white-80">
            {props.isEdit ? "수정 완료" : "등록 하기"}
          </button>
        </div>
        <button
          onClick={() => router.push("/board")}
          className="absolute left-0 top-1/2 -translate-y-[calc(50%+0.25rem)] px-4 py-2 default-outline hover:bg-primary-80 hover:text-white-80">
          <SquareArrowLeft />
        </button>
      </div>
      <Input
        className="max-h-[4rem] w-full p-4 default-outline"
        placeholder="제목을 입력하세요"
        ref={titleRef}
        defaultValue={props.result?.data.title || ""}
      />
      <textarea
        className="h-full w-full flex-grow p-4 default-outline"
        placeholder="내용을 입력하세요"
        ref={contentRef}
        defaultValue={props.result?.data.content || ""}
      />
    </div>
  );
};
export default BoardCreateUpdateContainer;
