"use client";

import useToastifyStore from "@store/toastifyStore";
import useUserStore from "@store/userStore";
import { format } from "date-fns";
import { SquareArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IBoardDetailContainer {
  result: IResponseReadBoard;
}
const BoardDetailContainer = (props: IBoardDetailContainer) => {
  const router = useRouter();
  const userStore = useUserStore();
  const toastifyStore = useToastifyStore();

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
      <div className="relative min-h-[2rem] w-full default-flex">
        {userStore.nickname == props.result.data.nickname && (
          // <button
          //   onClick={() =>
          //     router.push(
          //       `/board/update/${props.result.data.id}?timestamp=${new Date()}`,
          //     )
          //   }
          //   className="absolute right-0 top-1/2 -translate-y-[calc(50%+0.25rem)] px-4 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80">
          //   수정하기
          // </button>
          <div className="absolute right-0 top-1/2 flex h-[2.5rem] -translate-y-[calc(50%+0.25rem)] gap-x-1">
            <button
              onClick={() =>
                router.push(
                  `/board/update/${props.result.data.id}?timestamp=${new Date()}`,
                )
              }
              className="px-4 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80">
              수정 하기
            </button>
            <button
              onClick={() => deleteBoardHandler()}
              className="h-full px-4 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80">
              <Image
                alt=""
                src={"/images/icons/ic-trash.svg"}
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
        <button
          onClick={() => router.push("/board")}
          className="absolute left-0 top-1/2 -translate-y-[calc(50%+0.25rem)] px-4 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80">
          <SquareArrowLeft />
        </button>
      </div>
      <div className="flex justify-between px-4 py-2 primary-border-radius">
        <div> 게시판 번호 : {props.result.data.id} </div>
        <div> 게시판 작성자 : {props.result.data.nickname} </div>
        <div>
          작성 날짜 :
          {format(new Date(props.result.data.createdAt), "yyyy-MM-dd")}
        </div>
      </div>
      <div className="h-auto w-full whitespace-pre-wrap break-words break-all p-4 text-[24px] font-bold primary-border-radius default-flex">
        {props.result.data.title}
      </div>

      <div className="h-full w-full flex-grow p-4 primary-border-radius">
        {props.result.data.content}
      </div>
    </div>
  );
};
export default BoardDetailContainer;
