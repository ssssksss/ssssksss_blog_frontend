import { useRef } from "react";
import SubmitButton from "../button/SubmitButton";
import AutoHeightTextarea from "../textarea/AutoHeightTextarea";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateMainCommentBox.tsx
 * @version 0.0.1 "2024-04-14 13:23:15"
 * @description 댓글 작성 컴포넌트
 */
type ICreateMainCommentBox = {
  boardId: number;
  createBoardCommentHandler: ({
    text,
    parentId,
  }: {
    text: string;
    parentId?: number;
  }) => void;
};

const CreateMainCommentBox = (props: ICreateMainCommentBox) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div
      id={"create-comment"}
      className={
        "flex flex-col justify-between gap-2 rounded-lg p-2 primary-border-radius"
      }
    >
      <AutoHeightTextarea
        placeholder={"댓글 작성을 해주세요."}
        ref={textRef}
        className="rounded-2xl bg-primary-60 p-2 text-primary-contrast primary-border-radius placeholder:text-primary-contrast"
        maxLength={1024}
      />
      <div className={"flex justify-end gap-2"}>
        <div className={"flex justify-end gap-2"}>
          <SubmitButton
            className="h-btn-md rounded-2xl border border-contrast-1 px-2"
            isActive={true}
            aria-label="댓글 작성 제출 버튼"
            onClick={async () => {
              try {
                await props.createBoardCommentHandler!({
                  text: textRef.current?.value || "",
                });
                if (textRef.current) {
                  textRef.current.value = ""; // 입력값 초기화
                }
              } catch (error) {}
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default CreateMainCommentBox;
