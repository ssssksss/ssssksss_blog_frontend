import ThemeButton1 from "@component/common/button/ThemeButton1";
import { PanelBottomClose, PanelBottomOpen } from "lucide-react";
import { FiSave } from "react-icons/fi";
interface IBlog2SubCreateUpdateHeader {
  type: "basic" | "structure" | "result";
  saveHandler: () => void;
  saveDisabled: boolean;
  edit: boolean;
  modalState: IModalState;
}
const Blog2SubCreateUpdateHeader = (
  props: IBlog2SubCreateUpdateHeader,
) => {
  return (
    <div
      className={
        "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] relative gap-x-2 py-2 font-bold primary-border default-flex"
      }
    >
      {props.type == "basic" && (
        <h2> {props.edit ? "블로그 기초 글 수정" : "블로그 기초 글 생성"} </h2>
      )}
      {props.type == "structure" && (
        <h2> {props.edit ? "블로그 구조 글 수정" : "블로그 구조 글 생성"} </h2>
      )}
      {props.type == "result" && (
        <h2> {props.edit ? "블로그 결과 글 수정" : "블로그 결과 글 생성"} </h2>
      )}
      <ThemeButton1
        className={"p-2 default-flex"}
        onClick={() =>
          props.modalState.isOpen
            ? props.modalState.closeModal()
            : props.modalState.openModal()
        }
      >
        {props.modalState.isOpen ? <PanelBottomClose /> : <PanelBottomOpen />}
      </ThemeButton1>
      <ThemeButton1
        onClick={() => props.saveHandler()}
        disabled={props.saveDisabled}
        className={
          "absolute right-[.5rem] h-[2.5rem] w-[2.5rem] default-flex"
        }
      >
        <FiSave size="28" className="text-contrast-1" />
      </ThemeButton1>
    </div>
  );
};
export default Blog2SubCreateUpdateHeader;