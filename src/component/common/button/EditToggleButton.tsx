import { ButtonHTMLAttributes } from "react";
import { MdEdit, MdOutlineCancel } from "react-icons/md";

interface IEditToggleButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isModifyStatus: boolean;
  className?: string;
}
const EditToggleButton = (props: IEditToggleButton) => {
  return (
    <button className={props.className} {...props} aria-label={props.isModifyStatus ? "수정취소 버튼" : "수정하기 버튼"}>
      {props.isModifyStatus ? <MdOutlineCancel size="28" /> : <MdEdit size="28" />}
    </button>
  );
};
export default EditToggleButton;