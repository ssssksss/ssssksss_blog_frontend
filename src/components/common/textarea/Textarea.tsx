import styled from '@emotion/styled';
import Image from 'next/image';
import { forwardRef, useCallback, useRef, useState } from 'react';
import { Icons } from '@/components/common/icons/Icons';
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
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
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
  brR?: string;
  styleTypes?: number;
  bg?: string;
  outline?: boolean;
  submit?: (e: Event) => void;
  resizeMode?: boolean;
}

const Textarea = (props: ITextareaProps, ref) => {
  const textRef = ref || useRef(null);
  const [textareaValue, setTextareaValue] = useState(props.defaultValue);
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = 'auto';
    textRef.current.style.height = textRef.current.scrollHeight + 'px';
    setTextareaValue(textRef.current.value);
  }, []);

  return (
    <Container>
      <TextareaStyle
        rows={1}
        placeholder={props.placeholder}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        value={props.value}
        ref={textRef}
        color={props.color}
        placeholderColor={props.placeholderColor}
        name={props.name}
        id={props.id}
        display={props.display}
        size={props.size}
        errorMessage={props.errorMessage}
        padding={props.pd}
        background={props.bg}
        width={props.w}
        height={props.h}
        borderRadius={props.brR}
        styleTypes={props.styleTypes}
        outline={props.outline}
        onInput={props.resizeMode && handleResizeHeight}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' && props.onKeyPress) {
            onKeyPress();
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
      {props.errorMessage ? (
        <ErrorMessageSpan> {props.errorMessage} </ErrorMessageSpan>
      ) : (
        <></>
      )}
    </Container>
  );
};
export default forwardRef(Textarea);

const Container = styled.div`
  position: relative;
  height: 100%;
  button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: transparent;
    width: 24px;
    height: 24px;
  }
`;
const TextareaStyle = styled.textarea`
  width: 100%;
  min-height: max-content;
  appearance: none;
  resize: none;
  border-radius: 10px;
  padding: ${props => props.padding || '2px'};
  height: ${props => props.height};
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: solid ${props => `${props.theme.main.primary80}2f`} 5px;
  }
`;
