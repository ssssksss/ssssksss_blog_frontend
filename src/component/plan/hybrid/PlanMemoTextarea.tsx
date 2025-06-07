import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import useFetchCSR from "@hooks/useFetchCSR";
import useMemoStore from "@store/memoStore";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

interface IPlanMemoTextarea {
  data: IMemo;
}
const PlanMemoTextarea = (props: IPlanMemoTextarea) => {
  const [active, setActive] = useState(false);
  const [content, setContent] = useState(props.data.content);
  const fetchCSR = useFetchCSR();
  const memoStore = useMemoStore();

  const changeText = (text: string) => {
    if (props.data.content == text) {
      setActive(false);
    } else {
      setActive(true);
    }

    setContent(text);
  };

  const updateMemoHandler = async () => {
    const result = await fetchCSR.requestWithHandler({
      url: "/api/plan/memo",
      method: "PUT",
      body: {
        id: props.data.id,
        content: content,
      },
      showSuccessToast: true,
      successMessage: "메모 수정 완료",
    });
    if (result == undefined) return;
    const temp = memoStore.memoList.map((i) => {
      if (i.id == props.data.id) {
        i.content = content;
      }
      return i;
    });
    memoStore.setMemoList(temp);
    setActive(false);
  };

  const deleteMemoHandler = async () => {
    const result = await fetchCSR.requestWithHandler(
      {
        url: `/api/plan/memo?id=${props.data.id}`,
        method: "DELETE",
        showSuccessToast: true,
        successMessage: "메모 삭제"
      },
    );
    if (result == undefined) return;
    memoStore.setMemoList(
      memoStore.memoList.filter((i) => i.id != props.data.id),
    );
  };

  return (
    <>
      <textarea
        placeholder="메모작성"
        defaultValue={props.data.content}
        onChange={(e) => changeText(e.target.value)}
        maxLength={1023}
        className={
          "text-md min-h-[30rem] w-full resize-none rounded-[.5rem] bg-default-1 p-1 text-contrast-1 max-[480px]:text-sm"
        }
      />
      <div className={"flex w-full justify-end"}>
        <div className="w-18 grid grid-cols-2 items-center justify-end gap-x-4">
          <DeleteConfirmButton
            className={
              "start-1 h-8 w-8 glassmorphism"
            }
            ariaLabel="게시판 삭제 버튼"
            onCancelClick={() => {}}
            onConfirmClick={() => {
              () => deleteMemoHandler();
            }}
            mainMessage={["게시판을 삭제하시겠습니까?"]}
            loading={false}
            size="16"
          />
          {active && (
            <button
              disabled={!active}
              onClick={() => updateMemoHandler()}
              className={
                "h-8 w-8 rounded-[1rem] outline outline-2 default-flex glassmorphism"
              }
            >
              <SendHorizontal />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default PlanMemoTextarea;
