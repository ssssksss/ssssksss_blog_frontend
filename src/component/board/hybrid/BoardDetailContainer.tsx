"use client";

import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useFetchCSR from "@hooks/useFetchCSR";
import useRefreshStore from "@store/refreshStore";
import useUserStore from "@store/userStore";
import { format } from "date-fns";
import { SquareArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const BoardCommentContainer = dynamic(() => import("./BoardCommentContainer"), {
  ssr: false,
});
interface IBoardDetailContainer {
  data: IBoard;
}
const BoardDetailContainer = (props: IBoardDetailContainer) => {
  const router = useRouter();
  const userStore = useUserStore();
  const fetchCSR = useFetchCSR();
  const refreshStore = useRefreshStore();

  const deleteBoardHandler = async () => {
    const result = await fetchCSR.requestWithHandler({
      url: `/api/board?id=${props.data.id}`,
      method: "DELETE",
      showSuccessToast: true,
      successMessage: "게시글이 삭제되었습니다."
    });
    if (result == undefined) return;
    router.replace("/board");
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("timestamp");
    url.search = params.toString();
    window.history.replaceState({}, "", url.toString());
    if (refreshStore.isRefresh) {
      setTimeout(() => {
        refreshStore.setRefresh(false);
        router.refresh();
      }, 1000);
    }
  }, []);

  if (refreshStore.isRefresh) {
    return <LoadingSpinner loading={true} /> ;
  }

  return (
    <div
      className={
        "flex w-full flex-col gap-y-2 overflow-y-scroll py-4 scrollbar-hide"
      }
    >
      <section className="relative min-h-[2rem] w-full default-flex">
        {userStore.nickname == props.data.nickname && (
          <div className="absolute right-0 top-1/2 flex h-[2.5rem] -translate-y-[calc(50%+0.25rem)] gap-x-1">
            <button
              onClick={() => router.push(`/board/update/${props.data.id}`)}
              className="px-2 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80 default-flex"
              aria-label="게시판 수정하기 버튼"
            >
              <FaPencilAlt size="24" />
            </button>
            <button
              onClick={() => deleteBoardHandler()}
              className="h-full px-2 py-2 primary-border-radius default-flex hover:bg-primary-80 hover:text-white-80"
              aria-label="게시판 삭제 버튼"
            >
              <MdDelete size="28" />
            </button>
          </div>
        )}
        <button
          onClick={() => router.push("/board")}
          className="absolute left-0 top-1/2 -translate-y-[calc(50%+0.25rem)] px-4 py-2 primary-border-radius hover:bg-primary-80 hover:text-white-80"
        >
          <SquareArrowLeft />
        </button>
      </section>
      <section className="flex justify-between px-4 py-2 primary-border-radius">
        <div> 게시판 번호 : {props.data.id} </div>
        <div> 게시판 작성자 : {props.data.nickname} </div>
        <div>
          작성 날짜 :{format(new Date(props.data.createdAt), "yyyy-MM-dd")}
        </div>
      </section>
      <h1 className="h-auto w-full whitespace-pre-wrap break-words break-all p-4 text-[24px] font-bold primary-border-radius default-flex">
        {props.data.title}
      </h1>
      <div className="mb-4 h-auto min-h-[calc(100%-16rem)] w-full p-4 primary-border-radius">
        {props.data.content}
      </div>
      <BoardCommentContainer
        boardId={props.data.id}
        boardUserNickname={props.data.nickname}
      />
    </div>
  );
};
export default BoardDetailContainer;