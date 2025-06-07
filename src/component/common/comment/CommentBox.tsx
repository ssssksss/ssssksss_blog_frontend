import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUserStore from "@store/userStore";
import { timeFunction } from "@utils/function/timeFunction";
import { useEffect, useReducer, useRef, useState } from "react";
import { BiCommentAdd, BiCommentX } from "react-icons/bi";
import DeleteConfirmButton from "../button/DeleteConfirmButton";
import EditToggleButton from "../button/EditToggleButton";
import SubmitButton from "../button/SubmitButton";
import AutoHeightTextarea from "../textarea/AutoHeightTextarea";

type ICommentBox = {
  key?: number;
  boardId: number; // 게시판 id
  writer: string; // 글 작성자 확인용
  boardComment: IBoardComment;
  createBoardCommentHandler?: ({
    text,
    parentId,
  }: {
    text: string;
    parentId?: number;
  }) => void;
  updateBoardCommentHandler: ({
    id,
    text,
    parentId,
  }: {
    id: number;
    text: string;
    parentId?: number | undefined;
  }) => void;
  deleteBoardCommentHandler: ({
    id,
    parentId,
  }: {
    id: number;
    parentId?: number;
  }) => void;
};

const CommentBox = (props: ICommentBox) => {
  const userStore = useUserStore();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [isModifyStatus, setIsModifyStatus] = useState(false);
  const [isShowChildren, toggleShowChildren] = useReducer((s) => !s, true);
  const [isShowChildrenReply, toggleShowChildrenReply] = useReducer(
    (s) => !s,
    false,
  );

  const isOwner = userStore.nickname == props.boardComment.nickname; // 댓글의 작성자인지 판단
  const isParentComment = props.boardComment.parentId == undefined; // 댓글인진 판단, false면 답글(대댓글)
  const isWriter = props.writer == props.boardComment.nickname; // 댓글을 쓴 사람이 게시글에 작성와 동일한 지

  useEffect(() => {
    if (textRef.current) textRef.current.value = props.boardComment?.content;
  }, [props.boardComment?.content]);
  
  // 입력 포커스시 제일 뒷줄로 이동
  useEffect(() => {
    if (isModifyStatus && textRef.current) {
      const el = textRef.current;
      el.focus();

      // 커서를 텍스트 맨 끝으로 이동
      const length = el.value.length;
      el.setSelectionRange(length, length);
    }
  }, [isModifyStatus]);

  
  return (
    <div
      className={`flex flex-col gap-1 ${isParentComment ? "" : "ml-2"} rounded-2xl`}
    >
      <div
        className={`flex flex-col gap-y-1 p-1 ${isParentComment ? "secondary-border-radius" : "third-border-radius"}`}
      >
        {/* 헤더 */}
        <div className="flex items-center gap-2">
          <span className="text-sm">{props.boardComment.nickname}</span>
          <span className="text-sm text-black-80">
            {timeFunction.timeFromToday(
              new Date(props.boardComment.modifiedAt),
            )}
            {props.boardComment.createdAt == props.boardComment.modifiedAt
              ? ""
              : "(수정됨)"}
          </span>
          {isWriter && (
            <span className="rounded-2xl px-2 font-typoHelloPOP text-sm font-bold primary-border-radius">
              작성자
            </span>
          )}
        </div>

        {/* 내용 */}
        <AutoHeightTextarea
          // className={`w-full rounded-2xl text-sm ${isParentComment ? "bg-secondary-80 text-secondary-contrast" : "bg-third-80 text-third-contrast"} px-2 py-1`}
          className={`w-full rounded-2xl text-sm ${isModifyStatus && (isParentComment ? "bg-secondary-80 text-secondary-contrast" : "bg-third-80 text-third-contrast")} px-2 py-1`}
          ref={textRef}
          defaultValue={props.boardComment.content}
          disabled={!isModifyStatus}
          maxLength={255}
        />

        {/* 버튼 영역 */}
        <div
          className={`flex ${isParentComment ? "justify-between" : "justify-end"} gap-2`}
        >
          {isParentComment && (
            <div className="flex h-btn-md items-center gap-x-2">
              {props.boardComment?.childComments?.length != 0 && (
                <button
                  onClick={toggleShowChildren}
                  className="flex h-btn-md items-center gap-1 rounded-2xl border border-contrast-1 px-2"
                >
                  <FontAwesomeIcon
                    icon={isShowChildren ? faArrowUp : faArrowDown}
                    className={`${props.boardComment?.childComments?.length != 0 && ""}`}
                  />
                  <span
                    className={`${props.boardComment?.childComments?.length != 0 && ""}`}
                  >
                    답글 {props.boardComment.childComments?.length || 0}
                  </span>
                </button>
              )}
              {/* 댓글 작성 접기, 펼치기 */}
              {userStore.id > 0 && !props.boardComment?.isDeleted && (
                <button
                  onClick={toggleShowChildrenReply}
                  className="h-btn-md gap-1 rounded-2xl border border-contrast-1 px-2 default-flex"
                  aria-label={
                    isShowChildrenReply ? "댓글 작성 접기" : "댓글 작성 펼치기"
                  }
                >
                  {isShowChildrenReply ? (
                    <BiCommentX size={"28"} />
                  ) : (
                    <BiCommentAdd size={"28"} />
                  )}
                </button>
              )}
            </div>
          )}
          {/* 댓글인 경우와 답글인 경우 */}
          {isParentComment ? (
            <div className="flex gap-2">
              {isOwner && !props.boardComment.isDeleted && (
                <>
                  {isModifyStatus && !props.boardComment.isDeleted && (
                    <SubmitButton
                      className="h-btn-md rounded-2xl border border-contrast-1 px-2"
                      isActive={true}
                      aria-label="댓글 수정 제출 버튼"
                      onClick={async () => {
                        await props.updateBoardCommentHandler({
                          id: props.boardComment.id,
                          text: textRef.current?.value || "",
                          parentId: props.boardComment.parentId,
                        });
                        await setIsModifyStatus(false);
                      }}
                    />
                  )}
                  <EditToggleButton
                    onClick={() => {
                      setIsModifyStatus((prev) => !prev);
                      if (isModifyStatus)
                        (textRef.current as any).value =
                          props.boardComment?.content;
                      if (isModifyStatus)
                        (textRef.current as any).style.height = "auto";
                    }}
                    className="h-btn-md rounded-2xl border border-contrast-1 px-2"
                    isModifyStatus={isModifyStatus}
                  />
                  <DeleteConfirmButton
                    className={
                      "h-btn-md px-2"
                    }
                    aria-label="댓글 삭제 버튼"
                    onCancelClick={() => {}}
                    onConfirmClick={async () => {
                      await props.deleteBoardCommentHandler({
                        id: props.boardComment.id,
                      });
                      await setIsModifyStatus(false);
                    }}
                    mainMessage={["댓글을 삭제하시겠습니까?"]}
                    loading={false}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              {isOwner && !props.boardComment.isDeleted && (
                <>
                  {isModifyStatus && (
                    <SubmitButton
                      className="h-btn-md rounded-2xl border border-contrast-1 px-2"
                      isActive={true}
                      aria-label="답글 제출 버튼"
                      onClick={async () => {
                        await props.updateBoardCommentHandler({
                          id: props.boardComment.id,
                          text: textRef.current?.value || "",
                          parentId: props.boardComment.parentId,
                        });
                        await setIsModifyStatus(false);
                      }}
                    />
                  )}
                  <EditToggleButton
                    onClick={() => {
                      setIsModifyStatus((prev) => !prev);
                      if (isModifyStatus)
                        (textRef.current as any).value =
                          props.boardComment?.content;
                      if (isModifyStatus)
                        (textRef.current as any).style.height = "auto";
                      if (!isModifyStatus)
                        (textRef.current as HTMLTextAreaElement).focus();
                    }}
                    className="h-btn-md rounded-2xl border border-contrast-1 px-2"
                    isModifyStatus={isModifyStatus}
                  />
                  <DeleteConfirmButton
                    className={
                      "h-btn-md px-2"
                    }
                    ariaLabel="댓글 삭제 버튼"
                    onCancelClick={() => {}}
                    onConfirmClick={async () => {
                      await props.deleteBoardCommentHandler({
                        id: props.boardComment.id,
                        parentId: props.boardComment.parentId,
                      });
                      await setIsModifyStatus(false);
                    }}
                    mainMessage={["댓글을 삭제하시겠습니까?"]}
                    loading={false}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 대댓글 작성창 */}
      {isParentComment &&
        isShowChildren &&
        isShowChildrenReply &&
        userStore.id > 0 && (
        <div className="ml-2 flex flex-col gap-1 rounded-2xl px-2 py-1 primary-border-radius">
          <div> {userStore.nickname} </div>
          <AutoHeightTextarea
            placeholder="답글 작성을 해주세요."
            ref={textRef}
            className={`rounded-2xl bg-primary-60 px-2 py-1 text-primary-contrast primary-border-radius placeholder:text-primary-contrast ${isModifyStatus && ""}`}
            maxLength={255}
          />
          <div className="flex justify-end gap-2">
            <SubmitButton
              className="h-btn-md rounded-2xl border border-contrast-1 px-2"
              isActive={true}
              aria-label="답글 제출 버튼"
              onClick={async () => {
                try {
                  await props.createBoardCommentHandler!({
                    text: textRef.current?.value || "",
                    parentId: props.boardComment.id,
                  });
                  if (textRef.current) {
                    textRef.current.value = ""; // 입력값 초기화
                  }
                  await toggleShowChildrenReply(); // 대댓글 토글
                } catch (error) {}
              }}
            />
          </div>
        </div>
      )}

      {/* 자식 댓글 */}
      {isShowChildren &&
        props.boardComment.childComments?.map((childComment) => (
          <CommentBox
            key={childComment.id}
            writer={props.writer}
            boardId={props.boardId}
            boardComment={childComment}
            updateBoardCommentHandler={props.updateBoardCommentHandler}
            deleteBoardCommentHandler={props.deleteBoardCommentHandler}
          />
        ))}
    </div>
  );
};
export default CommentBox;