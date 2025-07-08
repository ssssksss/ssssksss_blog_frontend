"use client";

import { ButtonHTMLAttributes, useState } from "react";
import { MdDelete } from "react-icons/md";
import ConfirmModal from "../modal/hybrid/ConfirmModal";
import NestedModalButton from "../modal/hybrid/NestedModalButton";

interface IDeleteConfirmButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  mainMessage?: string[];
  subMessage?: string[];
  ariaLabel?: string;
  size?: string;
}
const DeleteConfirmButton = ({
  onConfirmClick,
  onCancelClick,
  className,
  size,
  ...props
}: IDeleteConfirmButton) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setLoading(true);
      await onConfirmClick(); // Promise 기반 함수라고 가정
    } finally {
      setLoading(false);
    }
  };

  return (
    <NestedModalButton
      buttonClassName={`relative aspect-square default-flex text-contrast-1 disabled:disabled-set primary-border-radius hover:bg-primary-80 ${className || ""}`}
      aria-label={props.ariaLabel}
      disabled={loading}
      modal={
        <ConfirmModal
          {...props}
          loading={loading}
          onConfirmClick={handleConfirm}
          onCancelClick={onCancelClick}
        />
      }
    >
      {loading ? (
        <div className="h-full py-1 default-flex">
          <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-b-2"></div>
        </div>
      ) : (
        <MdDelete size={`${size || "28"}`} />
      )}
    </NestedModalButton>
  );
};

export default DeleteConfirmButton;
