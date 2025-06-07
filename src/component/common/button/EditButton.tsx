import { ButtonHTMLAttributes } from "react";
import { MdEdit } from "react-icons/md";

interface IEditButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  ariaLabel?: string;
  size?: string;
}
const EditButton = (props: IEditButton) => {
  return (
    <button
      className={`relative aspect-square text-contrast-1 primary-border-radius default-flex hover:bg-primary-80 ${props.className || ""}`}
      aria-label={props.ariaLabel}
      onClick={props.onClick}
    >
      <MdEdit size={`${props.size || "28"}`} />
    </button>
  );
};
export default EditButton;
