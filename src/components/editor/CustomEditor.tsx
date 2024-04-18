import styled from '@emotion/styled';
import {
  MutableRefObject,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CustomEditor.tsx
 * @version 0.0.1 "2024-04-17 15:24:14"
 * @description 설명
 */

interface ICustomEditorProps {
  textChangeHandler: (value: string) => void;
}

const CustomEditor = (
  props: ICustomEditorProps,
  ref: MutableRefObject<HTMLTextAreaElement>,
) => {
  let tempString = '';
  let textChangeValue = '';
  const textRef = ref || useRef(null);
  let flag = false;
  const [cursor, setCursor] = useState(0);

  useEffect(() => {
    const textarea = document.getElementById('custom-textarea');
    const onKeyDownHandler = (e: KeyboardEvent) => {
      tempString = '';
      flag = false;
      if (e.key == 'Tab') {
        e.preventDefault();
        tempString = '    ';
      }
      if (e.ctrlKey) {
        flag = true;
      }
    };
    const onKeyUpHandler = () => {
      if (flag) return;
      const value = textRef.current.value;
      textChangeValue =
        value.substring(0, textRef.current.selectionStart) +
        tempString +
        value.substring(textRef.current.selectionStart, value.length);
      //  tab key 누를경우 간격 벌려줌
      const len =
        tempString.length == 1
          ? textRef.current.selectionStart + 1
          : textRef.current.selectionStart + tempString.length;
      setCursor(len);
      props.textChangeHandler(textChangeValue);
      textRef.current.value = textChangeValue;
    };
    textarea.addEventListener('keydown', onKeyDownHandler);
    textarea.addEventListener('keyup', onKeyUpHandler);
    return () => {
      textarea.removeEventListener('keydown', onKeyDownHandler);
      textarea.removeEventListener('keyup', onKeyUpHandler);
    };
  }, []);

  useEffect(() => {
    textRef.current.setSelectionRange(cursor, cursor);
  }, [cursor]);

  return <TextareaStyle ref={textRef} id={'custom-textarea'} />;
};
export default forwardRef(CustomEditor);

const TextareaStyle = styled.textarea`
  width: 100%;
  border: none;
  appearance: none;
  resize: none;
  border-radius: 1rem;
  height: 100%;
  box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  padding: 0.5rem;

  &:focus {
    outline: solid ${(props) => `${props.theme.main.primary80}2f`} 0.5rem;
  }
`;
