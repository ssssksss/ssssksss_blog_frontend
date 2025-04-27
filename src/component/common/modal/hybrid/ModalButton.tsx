import useModalState from "@hooks/useModalState";
import React, { MouseEventHandler, ReactNode } from "react";
import { Modal } from "./Modal";

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickCapture?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  buttonClassName?: string;
  modal?: React.ReactElement;
  style?: React.CSSProperties;
}

const ModalButton: React.FC<IButtonProps> = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  style,
  ...props
}) => {
  const modalState = useModalState();
  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (props.disabled) return;
    if (props.modal && !modalState.isOpen) {
      event.stopPropagation();
      modalState.openModal();
    }
    // 이거를 막으면 모달창 내부에서 이벤트가 전부 막혀버린다., 근데 이거를 작동시켜야 하는 이유는?
    // event.preventDefault();
    _onClick?.(event);
  };

  return (
    <button
      className={`${props.buttonClassName}`}
      onClick={onClick}
      disabled={props.disabled}
      style={{...style}}>
      {children}
      <Modal modalState={modalState}>{props.modal}</Modal>
    </button>
  );
};
export default React.memo(ModalButton);
