/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BoardCommentContainer.tsx
 * @version 0.0.1 "2024-04-12 05:51:58"
 * @description 댓글 작성 컴포넌트 + 댓글 갯수 UI + 댓글 리스트 UI
 */

import LoadingCommentSpinner from "@component/common/spinner/LoadingCommentSpinner";
import useFetchCSR from "@hooks/useFetchCSR";
import useLoading from "@hooks/useLoading";
import useBoardCommentStore from "@store/useBoardComment";
import useUserStore from "@store/userStore";
import { useEffect } from "react";
import CommentBox from "../../common/comment/CommentBox";
import CreateMainCommentBox from "../../common/comment/CreateMainCommentBox";

type IBoardCommentContainerType = {
  boardUserNickname: string;
  boardId: number;
};

const BoardCommentContainer = (props: IBoardCommentContainerType) => {
  const userStore = useUserStore();
  const boardCommentStore = useBoardCommentStore();
  const fetchCSR = useFetchCSR();
  const loadingFunc = useLoading();

  useEffect(() => {
    const temp = async () => {
      loadingFunc.startLoading(); // 로딩 시작
      try {
        const result: IBoardComment[] = await fetchCSR.requestWithHandler({
          url: `/api/board/comment?boardId=${props.boardId}`,
          method: "GET",
          showLoading: false,
          handleSuccess: () => {
            boardCommentStore.setBoardCommentList(result);
          },
        });
      } finally {
        loadingFunc.stopLoading(); // 로딩 종료
      }
    };
    temp();
  }, [props.boardId]);


  const createBoardCommentHandler = async ({
    text,
    parentId,
  }: {
    text: string;
    parentId?: number;
  }) => {
    const result: IBoardComment = await fetchCSR.requestWithHandler({
      url: "/api/board/comment",
      method: "POST",
      body: {
        content: text,
        boardId: props.boardId,
        parentId: parentId,
      },
      showSuccessToast: true,
      successMessage: `${parentId == undefined ? "댓글" : "답글"} 등록에 성공했습니다.`,
      handleSuccess: () => {
        if (parentId == undefined) {
          boardCommentStore.setBoardCommentList([
            result,
            ...boardCommentStore.boardCommentList,
          ]);
        } else {
          // 답글 로직
          const updatedList = boardCommentStore.boardCommentList.map(
            (comment) => {
              if (comment.id === result.parentId) {
                const updatedChildren = comment.childComments
                  ? [...comment.childComments]
                  : [];
                updatedChildren.unshift(result);
                return {
                  ...comment,
                  childComments: updatedChildren,
                };
              }
              return comment;
            },
          );
          boardCommentStore.setBoardCommentList(updatedList);
        }
      }
    });


    
  };

  const updateBoardCommentHandler = async ({
    id,
    text,
    parentId,
  }: {
    id: number;
    text: string;
    parentId?: number;
  }) => {
    await fetchCSR.requestWithHandler({
      url: "/api/board/comment",
      method: "PUT",
      body: {
        id,
        content: text,
        parentId,
      },
      showSuccessToast: true,
      successMessage: `${parentId == undefined ? "댓글" : "답글"} 수정에 성공했습니다.`,
      handleSuccess: () => {
        const updatedList = boardCommentStore.boardCommentList.map(
          (comment) => {
            if (comment.id === id) {
              // 최상위 댓글 수정
              return {
                ...comment,
                content: text,
                modifiedAt: new Date().toString(),
              };
            } else if (comment.id === parentId) {
              const _childComments = Array.isArray(comment.childComments)
                ? comment.childComments
                : [];
              // 답글 수정
              const updatedChildComments = _childComments.map((child) =>
                child.id === id
                  ? {
                    ...child,
                    content: text,
                    modifiedAt: new Date().toString(),
                  }
                  : child,
              );
              return {
                ...comment,
                childComments: updatedChildComments,
              };
            }

            return comment;
          },
        );

        boardCommentStore.setBoardCommentList([...updatedList]);
      }
    });
  };

  const deleteBoardCommentHandler = async ({
    id,
    parentId,
  }: {
    id: number;
    parentId?: number;
  }) => {
    await fetchCSR.requestWithHandler({
      url: `/api/board/comment?id=${id}`,
      method: "DELETE",
      showSuccessToast: true,
      successMessage: `${parentId == undefined ? "댓글" : "답글"} 삭제에 성공했습니다.`,
      handleSuccess: () => {
        const updatedList = boardCommentStore.boardCommentList.map((comment) => {
          if (comment.id === id) {
            return {
              ...comment,
              content: "삭제된 댓글입니다.",
              isDeleted: true,
            };
          } else if (comment.id === parentId) {
            const _childComments = Array.isArray(comment.childComments)
              ? comment.childComments
              : [];

            const updatedChildComments = _childComments.map((child) =>
              child.id === id
                ? {...child, content: "삭제된 댓글입니다.", isDeleted: true}
                : child,
            );
            return {
              ...comment,
              childComments: [...updatedChildComments],
            };
          }
          return comment;
        });
        boardCommentStore.setBoardCommentList([...updatedList]);
      },
    });

    
  };

  return (
    <div className={"flex animate-fadeUp flex-col gap-2"}>
      {userStore.id < 0 ? (
        ""
      ) : userStore.id > 0 ? (
        <CreateMainCommentBox
          boardId={props.boardId}
          createBoardCommentHandler={createBoardCommentHandler}
        />
      ) : (
        <div className="h-[7rem] w-full animate-pulseSkeleton rounded-2xl"></div>
      )}
      {loadingFunc.loading ? (
        <div className="bg-gray-30 default-flex">
          <div className="w-[15rem]">
            <LoadingCommentSpinner loading={true} />
          </div>
        </div>
      ) : (
        <div className={"px-2 pb-[1rem]"}>
          <div className="flex h-btn-md items-center rounded-2xl text-lg">
            댓글 {boardCommentStore.boardCommentList.length} 개
          </div>
          <div className={"flex flex-col gap-y-1 pb-1"}>
            {boardCommentStore.boardCommentList?.map(
              (parentComment: IBoardComment) => (
                <CommentBox
                  key={parentComment.id}
                  writer={props.boardUserNickname}
                  boardId={props.boardId}
                  boardComment={parentComment}
                  createBoardCommentHandler={createBoardCommentHandler}
                  updateBoardCommentHandler={updateBoardCommentHandler}
                  deleteBoardCommentHandler={deleteBoardCommentHandler}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BoardCommentContainer;
