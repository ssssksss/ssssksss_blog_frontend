import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import useMemoStore from "@store/memoStore";
import { useState } from "react";

interface IPlanMemoCreateModal extends IModalComponent {

}
const PlanMemoCreateModal = (props: IPlanMemoCreateModal) => {
  const memoStore = useMemoStore();
  const fetchCSR = useFetchCSR();
  const [content, setContent] = useState(""); // State for the textarea content
  const crateMemoHandler = async () => {
    const result: IMemo = await fetchCSR.requestWithHandler({
      url: "/api/plan/memo",
      method: "POST",
      body: { content },
      showSuccessToast: true,
      successMessage: "메모 생성 성공"
    });
    if (result == undefined) return;
    setContent(""); // Clear the content state after adding a memo
    memoStore.setMemoList([result, ...memoStore.memoList]);
    props.closeModal!();
  };

  return (
    <ModalTemplate>
      {props.closeButtonComponent}
      <textarea
        placeholder="새로운 메모작성를 작성해주세요. 좌측은 닫기, 우측은 추가하기"
        value={content} // Bind value to content state
        onChange={(e) => setContent(e.target.value)} // Update content state on change
        className="h-[calc(100%-2.5rem)] w-full resize-none rounded-[.5rem] outline min-h-[480px] bg-default-1 p-2 placeholder:text-contrast-1"
      />
      <div className="flex h-[2rem] w-full justify-between pr-2 mt-4">
        <button
          onClick={() => crateMemoHandler()}
          className="h-8 w-full rounded-[1rem] outline outline-2 default-flex glassmorphism"
        >
          메모 추가
        </button>
      </div>
    </ModalTemplate>
  );
};
export default PlanMemoCreateModal;