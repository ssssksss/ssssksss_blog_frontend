import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MouseEventHandler, ReactNode, useCallback } from "react";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import theme from "@/styles/theme";
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
  size?: string;
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
  size,
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
      size={size}>
      {children}
    </ButtonStyle>
  );
};

export default Button;

type colorListType = {
  [key: string]: any;
};

const colorList: colorListType = {
  orange: {
    backgroundColor: theme.backgroundColors.orange,
    color: "black",
  },
  purple: {
    backgroundColor: theme.backgroundColors.purple,
    color: theme.backgroundColors.white,
  },
  skyblue: {
    backgroundColor: theme.backgroundColors.skyblue,
    color: "black",
  },
  lightred: {
    backgroundColor: theme.backgroundColors.lightred,
    color: theme.backgroundColors.white,
  },
  green: {
    backgroundColor: theme.backgroundColors.green,
    color: theme.backgroundColors.white,
  },
  turquoise: {
    backgroundColor: theme.backgroundColors.turquoise,
    color: "black",
  },
  blue: {
    backgroundColor: theme.backgroundColors.blue,
    color: "black",
  },
  yellow: {
    backgroundColor: theme.backgroundColors.yellow,
    color: "black",
  },
  danger: {
    backgroundColor: theme.backgroundColors.danger,
    color: "black",
  },
  red: {
    backgroundColor: theme.backgroundColors.danger,
    color: "black",
  },
  white1: {
    backgroundColor: theme.backgroundColors.white1,
    color: "black",
  },
};

const ButtonStyle = styled.button<IButtonProps>`
  ${theme.flex.row.center.center}
  width: ${(props) => props.size || props.width};
  height: ${(props) => props.size || props.height || "auto"};
  padding: ${(props) => props.padding};
  border: none;
  font-size: ${(props) => (props.fontSize ? props.fontSize : theme.fontSizes.sm)};
  border-radius: ${(props) => props.borderRadius || "0.6em"};

  background-color: ${(props) =>
    // props.status ? colorList[props.status].backgroundColor : theme.backgroundColors.orange};
    props.status ? colorList[props.status].backgroundColor : "#fafafa"};

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${theme.backgroundColors.disabled};
      color: ${theme.colors.disabled};
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    `}
  color: ${(props) => (props.status ? colorList[props.status].color : "black")};
  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeat} 2s infinite;
  }
`;
