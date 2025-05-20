import { useRef } from "react";
import BasicTextarea from "../textarea/BasicTextarea";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CreateSubCommentBox.tsx
 * @version 0.0.1 "2024-04-14 13:23:15"
 * @description 댓글 작성 컴포넌트
 */
type ICommentType = {
  username?: string;
  articleId?: number;
  commentId?: number;
};

const CreateSubCommentBox = (props: ICommentType) => {
  // const createCommentMutation = CommentAPI.createSubComment();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const createCommentHandler = () => {
    // createCommentMutation.mutate({
    //   commentId: props.commentId as number,
    //   content: (textRef.current as any).value,
    // });
  };

  return (
    <div
      id={"create-comment"}
      className={"ml-4 flex flex-col gap-2 rounded-lg bg-primary-20 p-2"}
    >
      <div> {props.username} </div>
      <BasicTextarea
        placeholder={"댓글 작성"}
        ref={textRef}
        className="h-[10rem] rounded-2xl bg-default-1 p-2 text-contrast-1 primary-border-radius placeholder:text-contrast-1"
      />
      <div className={"flex justify-end gap-2"}>
        <div className={"flex justify-end gap-2"}>
          <button onClick={createCommentHandler}> 제출 </button>
        </div>
      </div>
    </div>
  );
};
export default CreateSubCommentBox;
