import theme from "@/styles/theme";
import { ChangeEvent } from "react";
import styled from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: Input.tsx
 * Date: 2022-06-17 02:19:41
 * Description : 커스텀 Input 컴포넌트
 */

interface IInputProps {
  type?: string;
  placeholder?: string;
  register?: any; // react-hook-form 용도로 사용
  field?: any; // react-hook-form 용도로 사용
  disabled?: boolean;
  defaultValue?: string | undefined | number;
  height?: string;
  width?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  borderRadius?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | boolean;
  border?: string;
  ref?: any;
  name?: string;
  id?: string;
  display?: string;
  defaultChecked?: boolean;
}

const Input = ({
  type,
  placeholder,
  disabled,
  register,
  height,
  width,
  padding,
  borderRadius,
  defaultValue,
  onChange,
  value,
  margin,
  ref,
  border,
  backgroundColor,
  field,
  name,
  id,
  display,
  defaultChecked,
  ...props
}: IInputProps) => {
  return (
    <InputStyle
      type={type ?? "text"}
      placeholder={placeholder}
      disabled={disabled}
      width={width}
      height={height}
      padding={padding}
      margin={margin}
      borderRadius={borderRadius}
      defaultValue={defaultValue}
      defaultChecked={defaultChecked}
      onChange={onChange}
      value={value}
      ref={ref}
      backgroundColor={backgroundColor}
      border={border}
      name={name}
      id={id}
      display={display}
      {...field}
      {...register}
      {...props}
    />
  );
};
export default Input;

const InputStyle = styled.input<{
  width?: string;
  height?: string;
  padding?: string;
  backgroundColor?: string;
  borderRadius?: string;
  disabled?: any;
  border?: string;
  margin?: string;
  id?: string;
  display?: string;
}>`
  font-size: 1rem;
  border: ${(props) => (props.border ? props.border : "1px solid #acebe7")};
  width: ${(props) => (props.width ? props.width : "100%")};
  height: ${(props) => (props.height ? props.height : "40px")};
  padding: ${(props) => (props.padding ? props.padding : "0px 0px 0px 8px")};
  margin: ${(props) => (props.margin ? props.margin : "0px")};
  background-color: ${(props) => props.backgroundColor || "#fff"};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "10px"};
  outline: none;
  display: ${(props) => (props.display ? props.display : "block")};
  &:hover {
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }

  ::placeholder {
    transition: all 0.6s ease-in-out;
    ${theme.fontSizes.base};
    color: #999999;

    @media (max-width: 768px) {
      ${theme.fontSizes.small};
    }
  }
  :focus::placeholder {
    color: transparent;
  }
`;
