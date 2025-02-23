import Button from "@component/common/button/hybrid/Button";
import { PanelBottomClose, PanelBottomOpen, Save } from "lucide-react";
import { useState } from "react";

interface IBlog2SubCreateUpdateHeader {
  type: "basic" | "structure" | "result"
  saveHandler: () => void;
  saveDisabled: boolean;
  edit: boolean,
  modalState: IModalState

}
const Blog2SubCreateUpdateHeader = (props: IBlog2SubCreateUpdateHeader) => {

  const [type, setType] = useState(props.type);

  return (
    <div
      className={
        "max-w-[576px]:text-[2rem] min-w-[576px]:text-[3rem] relative gap-x-2 py-2 font-bold default-primary-outline default-flex"
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
      <button
        className={`p-2 default-primary-outline default-flex ${props.modalState.isOpen ? "bg-primary-20" : ""} `}
        onClick={() =>
          props.modalState.isOpen
            ? props.modalState.closeModal()
            : props.modalState.openModal()
        }
      >
        {props.modalState.isOpen ? <PanelBottomClose /> : <PanelBottomOpen />}
      </button>
      <Button
        onClick={() => props.saveHandler()}
        disabled={props.saveDisabled}
        className={
          "absolute right-[.5rem] h-[2.5rem] w-[2.5rem] bg-primary-60 text-white-80 default-primary-outline default-flex hover:bg-primary-20 disabled:bg-gray-80"
        }
      >
        <Save />
      </Button>
    </div>
  );
};
export default Blog2SubCreateUpdateHeader;