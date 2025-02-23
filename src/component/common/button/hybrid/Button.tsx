import { MouseEventHandler, ReactNode, useCallback } from "react";

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickCapture?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: "xs" | "sm" | "md" | "lg" | "xl" | string;
  minW?: string;
  minH?: string;
  bg?: string;
  brR?: string; // border-radius
  mg?: string;
  pd?: string;
  color?: string;
  outline?: boolean | string | number;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  state?: "danger" | "warning" | number;
  active?: boolean;
  activeBg?: string;
  activeColor?: string;
  hover?: boolean;
  hoverBg?: string;
  badgeValue?: number | string;
  className?: string;
  id?: string;
}

const Button = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  className,
  ...props
}: IButtonProps) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      _onClick?.(event);
    },
    [_onClick, props.disabled],
  );

  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      _onClickCapture?.(event);
    },
    [_onClickCapture, props.disabled],
  );


  return (
    <button
      onClick={onClick}
      onClickCapture={onClickCapture}
      className={className}
      disabled={props.disabled}
      style={{
        padding: props.pd,
        margin: props.mg,
        minWidth: props.minW,
        minHeight: props.minH,
        width: props.w,
        height: props.h || props.w,
      }}
    >
      {children}
      {/* {props.badgeValue !== undefined && <Badge>{props.badgeValue}</Badge>} */}
    </button>
  );
};

export default Button;
