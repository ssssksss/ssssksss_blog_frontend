import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import Image from 'next/image';
import { forwardRef, useCallback, useRef, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Textarea.tsx
 * @version 0.0.1 "2023-10-02 21:37:33"
 * @description 설명
 */

interface ITextareaProps {
  placeholder?: string;
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  register?: any;
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  field?: any;
  disabled?: boolean;
  defaultValue?: any;
  color?: string;
  placeholderColor?: string;
  onKeyPress?: any;
  value?: string | number | boolean;
  name?: string;
  id?: string;
  display?: string;
  errorMessage?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  pd?: string;
  w?: string;
  h?: string;
  minH?: string;
  brR?: string;
  state?: number;
  bg?: string;
  outline?: boolean;
  resizeMode?: boolean;
}

const Textarea = (props: ITextareaProps, ref) => {
  const textRef = ref || useRef(null);
  const [textareaValue, setTextareaValue] = useState(props.defaultValue);
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'rem';
    setTextareaValue(textRef.current.value);
  }, []);

  return (
    <Container>
      <TextareaStyle
        rows={1}
        ref={textRef}
        onInput={props.resizeMode && handleResizeHeight}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          // if (e.key === 'Enter' && props.onKeyPress) {
          //   onKeyPress();
          // }
          if (e.which == 13 && e.ctrlKey) {
            props.submit();
          }
        }}
        {...props.field}
        {...props.register}
        {...props}
      />
      {props.defaultValue != textareaValue && (
        <button>
          <Image
            src={Icons.RightArrowIcon}
            alt=""
            onClick={() => props.submit()}
          />
        </button>
      )}
      {props.errorMessage ? <span> {props.errorMessage} </span> : <></>}
    </Container>
  );
};
export default forwardRef(Textarea);

const Container = styled.div`
  position: relative;
  height: 100%;
  button {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    background: transparent;
    width: 2.4rem;
    height: 2.4rem;
  }
`;
const TextareaStyle = styled.textarea`
  width: 100%;
  min-height: max-content;
  appearance: none;
  resize: none;
  border-radius: 1rem;
  padding: ${(props) => props.pd || '0.2rem'};
  height: ${(props) => props.h};
  box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);

  &:focus {
    outline: solid ${(props) => `${props.theme.main.primary80}2f`} 0.5rem;
  }
`;
