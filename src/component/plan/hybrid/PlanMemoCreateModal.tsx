import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
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
        className="h-[calc(100%-4rem)] w-full min-h-[22.5rem] resize-none rounded-[.5rem] bg-default-1 p-2 outline placeholder:text-contrast-1"
      />
      <ThemeActiveButton1
        onClick={() => crateMemoHandler()}
        className="mt-4 h-8 w-full"
        isActive={content.length > 0}
      >
        메모 추가
      </ThemeActiveButton1>
    </ModalTemplate>
  );
};
export default PlanMemoCreateModal;