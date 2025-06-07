import { ButtonHTMLAttributes } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../modal/hybrid/ConfirmModal";
import ModalButton from "../modal/hybrid/ModalButton";

interface IDeleteConfirmButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading: boolean;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  mainMessage?: string[];
  subMessage?: string[];
  ariaLabel?: string;
  size?: string;
}
const DeleteConfirmButton = (props: IDeleteConfirmButton) => {
  return (
    <ModalButton
      buttonClassName={`relative aspect-square default-flex text-contrast-1 primary-border-radius hover:bg-primary-80 ${props.className || ""}`}
      aria-label={props.ariaLabel}
      modal={<ConfirmModal {...props} />}
    >
      <MdDelete size={`${props.size || "28"}`} />
    </ModalButton>
  );
};
export default DeleteConfirmButton;