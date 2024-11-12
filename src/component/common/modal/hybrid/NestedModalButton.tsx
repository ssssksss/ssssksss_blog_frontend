import { NestedModal } from "@component/common/modal/hybrid/NestedModal";
import useModalState from "@hooks/useModalState";
import React, {
  MouseEventHandler,
  ReactNode,
} from "react";

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickCapture?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  buttonClassName?: string;
  modal?: React.ReactElement;
  style?: React.CSSProperties;
}

const NestedModalButton: React.FC<IButtonProps> = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  style,
  ...props
}) => {
  const modalState = useModalState();
  const onClick: MouseEventHandler<HTMLButtonElement> =
    (event) => {
      if (props.disabled) return;
      if (props.modal && !modalState.isOpen) {
        event.stopPropagation();
        modalState.openModal();
      }
      event.preventDefault();
      _onClick?.(event);
    };
  
  return (
    <button
      className={`${props.buttonClassName}`}
      onClick={onClick}
      disabled={props.disabled}
      style={{...style}}
    >
      {children}
      <NestedModal modalState={modalState}>
        {props.modal}
      </NestedModal>
    </button>
  );
};
export default React.memo(NestedModalButton);
