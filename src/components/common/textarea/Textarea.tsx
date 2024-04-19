import styled from '@emotion/styled';
import SendIcon from '@mui/icons-material/Send';
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
  register?: unknown;
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  field?: unknown;
  disabled?: boolean;
  defaultValue?: unknown;
  color?: string;
  placeholderColor?: string;
  onKeyPress?: unknown;
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
  resizeMode?: boolean;
  submit?: () => void;
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
          //   props.submit();
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
        <button onClick={() => props.submit()}>
          <SendIcon />
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
  padding-bottom: 2rem;
  button {
    position: absolute;
    right: 0.25rem;
    bottom: 2.75rem;
    width: 2.25rem;
    height: 2.25rem;
    /* transform: translate(0%,-50%); */
    background: transparent;
    outline: solid black 1px;
    outline-offset: -1px;
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    opacity: 0.4;
    :hover {
      opacity: 1;
      background: white;
    }
  }
`;
const TextareaStyle = styled.textarea`
  width: 100%;
  border: none;
  appearance: none;
  resize: none;
  border-radius: 0.5rem;
  padding: ${(props) => props.pd || '0.2rem'};
  height: ${(props) => props.h || '100%'};
  box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
`;
