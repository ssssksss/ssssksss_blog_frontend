import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import { PanelBottomClose, PanelBottomOpen, Save } from "lucide-react";

interface IBlog2SubCreateUpdateHeaderView {
  type: "basic" | "structure" | "result";
  saveHandler: () => void;
  saveDisabled: boolean;
  edit: boolean;
  modalState: IModalState;
}
const Blog2SubCreateUpdateHeaderView = (
  props: IBlog2SubCreateUpdateHeaderView,
) => {
  return (
    <div
      className={
        "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] primary-border relative gap-x-2 py-2 font-bold default-flex"
      }
    >
      {props.type == "basic" && (
        <h2> 블로그 기초 글 {props.edit ? "수정" : "생성"} </h2>
      )}
      {props.type == "structure" && (
        <h2> 블로그 구조 글 {props.edit ? "수정" : "생성"} </h2>
      )}
      {props.type == "result" && (
        <h2> 블로그 결과 글 {props.edit ? "수정" : "생성"} </h2>
      )}
      <ThemeActiveButton1
        isActive={!props.modalState.isOpen}
        className={"p-2 default-flex"}
        onClick={() =>
          props.modalState.isOpen
            ? props.modalState.closeModal()
            : props.modalState.openModal()
        }
      >
        {props.modalState.isOpen ? <PanelBottomClose /> : <PanelBottomOpen />}
      </ThemeActiveButton1>
      <ThemeButton1
        onClick={() => props.saveHandler()}
        disabled={props.saveDisabled}
        className={"absolute right-[.5rem] h-[2.5rem] w-[2.5rem] default-flex"}
      >
        <Save />
      </ThemeButton1>
    </div>
  );
};
export default Blog2SubCreateUpdateHeaderView;