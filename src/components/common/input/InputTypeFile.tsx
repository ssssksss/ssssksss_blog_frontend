import styled from "@emotion/styled";
import { RefObject } from "react";

/**
 * Author : Sukyung Lee
 * FileName: InputTypeFile.tsx
 * Date: 2022-07-02 10:29:42
 * Description : 파일 업로드를 할 때 사용하는 input 태그
 */

interface IInputTypeFileProps {
  type?: string;
  placeholder?: string;
  register?: any;
  disabled?: boolean;
  display?: string;
  fileRef?: RefObject<HTMLInputElement>;
  multiple?: boolean;
  onChange?: any;
}

const InputTypeFile = ({
  type,
  placeholder,
  disabled,
  register,
  fileRef,
  onChange,
  ...props
}: IInputTypeFileProps) => {
  return (
    <Container
      type="file"
      placeholder={placeholder}
      disabled={disabled}
      ref={fileRef}
      onChange={onChange}
      {...register}
      {...props}
    />
  );
};
export default InputTypeFile;

const Container = styled.input<{ display: string }>`
  display: ${(props) => props.display || "visible"};
`;
