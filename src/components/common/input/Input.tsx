import { CC } from '@/styles/commonComponentStyle';
import { AWSS3Prefix } from '@/utils/variables/url';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { Icons } from '../icons/Icons';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Input.tsx
 * @version 0.0.1 "2022-06-17 02:19:41"
 * @description 커스텀 Input 컴포넌트
 * @description react-hook-form 이미지
 * <Input
 *   type={'file'}
 *   register={register('레지스터명')}
 *   setValue={setValue}
 *   trigger={trigger}
 * />
 * @description react-hook-form 텍스트
 */

interface IInputProps {
  type?:
    | 'password'
    | 'text'
    | 'radio'
    | 'checkbox'
    | 'email'
    | 'search'
    | 'range'
    | 'color';
  placeholder?: string;
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  register?: any;
  setValue?: any;
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  field?: any;
  disabled?: boolean;
  defaultValue?: any;
  checked?: boolean;
  color?: string;
  placeholderColor?: string;
  value?: string | number | boolean;
  name?: string;
  id?: string;
  display?: string;
  errorMessage?: string;
  size?: 'sm' | 'md';
  outline?: boolean;
  pd?: string;
  leftIconImage?: string;
  w?: string;
  h?: string;
  brR?: string;
  styleTypes?: number;
  bg?: string;
  outline?: boolean;
  errorLocation?: string;
  defaultImageUrl?: string;
  center?: string;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressAction?: (e: KeyboardEventEvent) => void;
}

export const Input = React.forwardRef((props, ref) => {
  const [imageUrl, setImageUrl] = useState('/');
  const [isDragging, setIsDragging] = useState(false);

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const file = e.dataTransfer.files?.[0];
    e.preventDefault();
    e.stopPropagation();
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    // if(!props.register) {
    //   const dataTransfer = new DataTransfer();
    //   Array.from(e.dataTransfer.files)
    //   .forEach(file => {
    //       dataTransfer.items.add(file);
    //   });
    //   ref.current.files = dataTransfer.files;
    // }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
    setIsDragging(false);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      alert('파일이 없습니다!');
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
  };

  useEffect(() => {
    // 만일 props로 초기에 이미지가 존재한다면 이미지 경로를 넣어준다.
    if (props.type == 'file') {
      setImageUrl('/');
      if (props.defaultImageUrl) {
        setImageUrl(`${AWSS3Prefix}${props.defaultImageUrl}`);
      }
    }
  }, [props.defaultImageUrl]);

  // ! type을 변수로 주게되면 id값을 무시해서 htmlFor이 제대로 작동되지 않는 문제 존재
  return (
    <Container>
      {props.type == 'file' ? (
        <InputStyle
          type={'file'}
          placeholder={props.placeholder ?? '입력창'}
          id={'imageUpload'}
          ref={ref ?? null}
          {...props}
          {...props.register}
          onChange={e => {
            // ! onChangeFile(e)와 아래 조건문 순서 바꾸지 말것 바꾸면 e의 값이 초기화 되면서 제대로 작동이 되지를 않는다.
            onChangeFile(e);
            if (props.register) {
              // props.register.onChange(e);
              props.setValue(props.register.name, e.target.files[0]);
              props.trigger(props.register.name);
            }
          }}
        />
      ) : (
        <InputStyle
          type={props.type ? props.type : 'text'}
          placeholder={props.placeholder ?? '입력창'}
          onChange={e => {
            if (props.register) {
              // ? react-hook-form 사용시 필요한 코드
              props.register.onChange(e);
            }
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          defaultValue={props.defaultValue}
          ref={ref ?? null}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key == 'Enter' && props.onKeyPressAction) {
              props.onKeyPressAction(e.target.value);
            }
          }}
          {...props}
          {...props.register}
        />
      )}

      {props.errorMessage ? (
        <ErrorMessageSpan height={props.h}>
          {' '}
          {props.errorMessage}{' '}
        </ErrorMessageSpan>
      ) : (
        <></>
      )}
      {props.type == 'file' && (
        <ImageFileContainer
          color={props.color}
          htmlFor={'imageUpload'}
          styleTypes={props.styleTypes}
          w={props.w}
          h={props.h}
          isImageUrl={imageUrl}
          bg={props.bg}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={e => {
            if (props.register) {
              // ? react-hook-form 사용시 필요한 코드
              let event = e;
              event.target.value = e.dataTransfer.files?.[0];
              event.target.name = props.register.name;
              props.register.onChange(event);
            }
            onDrop(e);
          }}
        >
          {imageUrl && (
            <button
              onClick={e => {
                e.preventDefault();
                setImageUrl('/');
                if (props.register) {
                  props.setValue(props.register.name, '');
                  props.trigger(props.register.name);
                }
              }}
            >
              {' '}
              <Image src={Icons.ExitIcon} width={24} height={24} />{' '}
            </button>
          )}
          {imageUrl != '/' ? (
            <Image src={imageUrl} layout="fill" />
          ) : (
            <CC.ColumnCenterDiv h={'100%'}>
              <Image src={Icons.CloudIcon} width={48} height={48} />
              <CC.RowCenterDiv> drag file to upload </CC.RowCenterDiv>
            </CC.ColumnCenterDiv>
          )}
        </ImageFileContainer>
      )}
    </Container>
  );
});

// 제거할 부분

const Container = styled.div`
  position: relative;
  label {
    z-index: 2;
  }
`;

const InputStyle = styled.input<IInputProps>`
  // 외곽 디자인(border-radius, outline, box-shadow) //
  // ! border-radius를 넣으니 focus 되었을 때 다른 요소가 흐려지는 버그 발생
  border-radius: ${props => `calc(10px)`};
  ${props => props.brR && `border-radius: calc( ${props.brR} + 10px)`};
  /* border-radius: ${props => `calc(1% + 10px)`}; */
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.5),
    inset 1px 1px 2px 0px rgba(0, 0, 0, 0.5);
  outline: ${props =>
    `inset ${
      props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]
    } 1px`};
  width: ${props => props.w || '100%'};
  height: ${props =>
    props.h ||
    (props.size && props.size === 'sm'
      ? '32px'
      : props.size === 'md'
      ? '48px'
      : '32px')};

  // 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  display: ${props => (props.display ? props.display : 'block')};
  border: none;
  padding: ${props => props.pd || '2px 0px 2px 4px'};
  position: relative;
  text-align: ${props => props.center && 'center'};

  // 배경색(background) //
  background: ${props =>
    props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]};

  // 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  font-size: ${props => props.theme.fontSize.md};
  color: ${props =>
    props.theme.colors?.[props.color] || props.theme.main?.[props.color]};

  // 애니메이션(animation) //

  // 이벤트(active, focus, hover, visited, focus-within, disabled) //
  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  &:focus {
    outline: inset ${props => `${props.theme.main.primary80}2f`} 5px;
  }

  ${props =>
    props.disabled &&
    `
    background-color: ${props.theme.colors.disabled};
    cursor: not-allowed;
    &:hover {
      box-shadow: none;
      cursor: not-allowed;
    }
  `}

  &[type='search'] {
    padding-left: 4px;
  }

  &[type='checkbox'] {
    appearance: none;
    outline: solid ${props => props.theme.main.contrast} 1px;
    ${props =>
      props.size === 'sm' &&
      `
      width: 32px;
      webkit-aspect-ratio: 1;
    `}
    ${props =>
      props.size === 'md' &&
      `
          width: 48px;
      webkit-aspect-ratio: 1;
    `}
  }

  &[type='checkbox']:checked {
    position: relative;
    cursor: pointer;
  }

  &[type='checkbox']:checked::after {
    content: '✔';
    width: 80%;
    height: 80%;
    border-radius: 50%;
    /* background: ${props => props.theme.main.primary100}; */
    color: ${props => props.theme.main.primary100};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    ${props => props.theme.flex.row.center.center};
    font-size: 1em;
  }

  &[type='datetime-local']::-webkit-calendar-picker-indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    &:hover {
      cursor: pointer;
    }
  }

  &[type='file'] {
    height: 100%;
    appearance: none;
    display: none;
  }

  /* 왼쪽에 이미지를 넣은 경우 padding left에 값을 주어 이미지 크기 만큼은 밀어준다. */
  ${props =>
    props.leftIconImage &&
    `
      background-image: url(${props.leftIconImage});
      padding: 0px 0px 0px calc(${props.h ? props.h : '32px'} + 8px);
      background-position: 4px center;
      background-repeat: no-repeat;
      background-size: contain;
      ::placeholder {
        transition: all 0.6s ease-in-out;
        opacity: 0.7;
        font-size: ${props.theme.fontSize.sm};
        color: ${
          props.theme.colors?.[props.color] ||
          props.theme.main?.[props.color] ||
          props.theme.colors.white80
        };
    }
    &[type='search'] {
      padding-left: calc(${props.h ? props.h : '32px'} + 8px);
    }
  `}

  // 반응형(media-query, overflow, scroll) //


// 커스텀(custom css) //
${props =>
    props.styleTypes === 1 &&
    `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
    height: ${props.h || '40px'};
    color: ${
      props.theme.colors?.[props.color] ||
      props.theme.main?.[props.color] ||
      props.theme.colors.white80
    };
    ::placeholder {
      transition: all 0.6s ease-in-out;
      font-size: ${props.theme.fontSize.sm};
      color: ${props.theme.colors.black60};
      padding: '6px';
    }
  `}
`;

const ErrorMessageSpan = styled.span`
  --height: ${props =>
    props.errorLocation ||
    props.h ||
    (props.size && props.size === 'sm'
      ? '32px'
      : props.size === 'md'
      ? '48px'
      : '32px')};
  top: calc(var(--height) + 0.6rem);
  color: red;
  position: absolute;
  font-size: 1rem;
  display: flex;
  align-items: center;
  word-break: keep-all;
`;

const ImageFileContainer = styled.label`
  width: ${props => props.w || '100%'};
  height: ${props => props.h || '32px'};
  display: block;
  ${props => props.theme.flex.row.center.center};
  border-radius: 10px;
  position: relative;
  background: ${props =>
    props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]};
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.styleTypes === 1 &&
    `
      outline: solid ${props.theme.colors.white80} 1px;
      background: rgba(0, 0, 0, 0.01);
      box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
      color: ${props.theme.colors.white80};
  `}
  ${props =>
    props.isImageUrl &&
    css`
      outline: none;
      box-shadow: none;
    `}
  color:  ${props =>
    props.theme.colors?.[props.color] || props.theme.main?.[props.color]};

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 4;
    background: transparent;
  }
`;
