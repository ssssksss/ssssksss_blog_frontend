import theme from "@/styles/theme";
import styled from "styled-components";
import { KeyboardEvent } from "react";

/**
 * Author : Sukyung Lee
 * FileName: InputHashTag.tsx
 * Date: 2022-07-09 14:19:28
 * Description : 해시태그를 위한 input 태그
 */

type InputHashTagType = {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  register?: any;
  height?: string;
  width?: string;
  padding?: string;
  onKeyUp?: KeyboardEvent<HTMLInputElement>;
  borderRadius?: string;
  backgroundColor?: string;
  onKeyPress?: any;
  outline?: string;
  border?: string;
};

const InputHashTag = ({
  type,
  placeholder,
  disabled,
  register,
  height,
  width,
  padding,
  onKeyUp,
  borderRadius,
  backgroundColor,
  border,
  onKeyPress,
  outline,
  ...props
}: InputHashTagType) => {
  return (
    <InputStyle
      type={type ?? "text"}
      placeholder={placeholder}
      disabled={disabled}
      width={width}
      height={height}
      padding={padding}
      onKeyUp={onKeyUp}
      borderRadius={borderRadius}
      border={border}
      backgroundColor={backgroundColor}
      onKeyPress={onKeyPress}
      outline={outline}
      {...register}
      {...props}
    />
  );
};
export default InputHashTag;

const InputStyle = styled.input<{
  padding: string;
  backgroundColor: string;
  borderRadius: string;
  outline: string;
  border: string;
}>`
  font-size: 1rem;
  border: ${(props) => (props.border ? props.border : "1px solid #acebe7")};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "40px")};
  padding: ${(props) => (props.padding ? props.padding : "0px 0px 0px 8px")};
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  outline: ${(props) => props.outline || "none"};

  &:focus {
    animation: s1 1s infinite;
    animation-direction: alternate;

    @keyframes s1 {
      0% {
        background-color: ${theme.backgroundColors.secondary};
      }
      50% {
        background-color: ${theme.backgroundColors.secondary} - 500;
      }
      100% {
        background-color: ${theme.backgroundColors.secondary} - 1000;
      }
    }
  }
`;
