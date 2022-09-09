import theme from "@/styles/theme";
import styled, { css } from "styled-components";
import { MouseEventHandler, ReactNode, useCallback } from "react";

interface IButtonProps {
  onClick?: (event: any) => void | any;
  disabled?: boolean;
  children: ReactNode;
  status?: string;
  width?: string;
  height?: string;
  padding?: string;
  fontSize?: string;
  borderRadius?: string;
  value?: string | number | [];
  type?: "button" | "reset" | "submit";
  backgroundColor?: string;
  color?: string;
}

const Button = ({
  onClick: _onClick,
  // onClick,
  disabled,
  children,
  status,
  width,
  height,
  padding,
  fontSize,
  borderRadius,
  type,
  value,
  backgroundColor,
  color,
}: IButtonProps) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (disabled) return;
      _onClick?.(event);
    },
    [_onClick, disabled]
  );

  return (
    <ButtonStyle
      onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
      disabled={disabled}
      status={status}
      height={height}
      width={width}
      type={type || "button"}
      fontSize={fontSize}
      borderRadius={borderRadius}
      padding={padding}
      value={value}
      backgroundColor={backgroundColor}
      color={color}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
  ${theme.flex.row.center.center}
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "54px"};
  padding: ${(props) => props.padding || "0px 4px"};
  border: none;
  font-size: ${(props) => props.fontSize || "16px"};
  border-radius: ${(props) => props.borderRadius || "10px"};

  &:hover {
    box-shadow: 0 0 0 2px #000 inset;
    cursor: pointer;
  }

  ${(props) =>
    (props.status === undefined || props.status === "primary") &&
    css`
      background-color: ${props.backgroundColor ||
      theme.backgroundColors.primary};
      color: ${props.color || theme.colors.primary};
    `}

  ${(props) =>
    props.status === "secondary" &&
    css`
      background: ${theme.backgroundColors.secondary};
      color: ${theme.colors.secondary};
    `}

  ${(props) =>
    props.status === "third" &&
    css`
      background-color: ${theme.backgroundColors.third};
      color: ${theme.colors.third};
    `}

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${theme.backgroundColors.disabled};
      color: ${theme.colors.disabled};
      border: none;

      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    `}

  ${(props) =>
    props.status === "error" &&
    css`
      background-color: ${theme.backgroundColors.error};
      color: ${theme.colors.error};
    `}

  ${(props) =>
    props.status === "danger" &&
    css`
      background-color: ${theme.backgroundColors.danger};
      color: ${theme.colors.danger};
    `}
    
    ${(props) =>
    props.status === "cancel" &&
    css`
      background-color: ${theme.backgroundColors.cancel};
      color: ${theme.colors.cancel};
    `}

    ${(props) =>
    props.status === "red" &&
    css`
      background-color: #fbeff2;
      color: #fd748d;
    `}

  ${(props) =>
    props.status === "blue" &&
    css`
      background-color: #e1e5f6;
      color: #7c93de;
    `}

    ${(props) =>
    props.status === "green" &&
    css`
      background-color: #cce4e1;
      color: #70c7b9;
    `}
`;
