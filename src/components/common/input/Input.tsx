import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Animations from '@/components/common/animations/Animations';
import { css } from '@emotion/react';
import Image from 'next/image';
import { Icons } from '../icons/Icons';
import { CC } from '@/styles/commonComponentStyle';
import { AWSS3Prefix } from '@/utils/variables/url';


/**
 * Author : Sukyung Lee
 * FileName: Input.tsx
 * Date: 2022-06-17 02:19:41
 * Description : 커스텀 Input 컴포넌트
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
  /**
   * react-hook-form 사용시 필요한 파라미터
   */
  field?: any;
  disabled?: boolean;
  defaultValue?: any;
  checked?: boolean;
  color?: string;
  placeholderColor?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPressAction?: (e: KeyboardEventEvent) => void;
  value?: string | number | boolean;
  name?: string;
  id?: string;
  display?: string;
  errorMessage?: string;
  size?: 'sm' | 'md' ;
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
  defaultImageUrl?: string
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input = React.forwardRef((props,ref) => {
  const [imageUrl, setImageUrl] = useState("");
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
      alert("파일이 없습니다!");
      return;
    }
    const dataTranster = new DataTransfer();
  Array.from(e.dataTransfer.files)
    .forEach(file => {
        dataTranster.items.add(file);
    });
    ref.current.files = dataTranster.files;
    const result = URL.createObjectURL(file);
    setImageUrl(result);
    setIsDragging(false);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) {
      alert("파일이 없습니다!");
      return;
    }
    const result = URL.createObjectURL(file);
    setImageUrl(result);
  };

  useEffect(()=>{
    if(props.type === "file") {
      setImageUrl();
      if(props.defaultImageUrl) {
        setImageUrl(`${AWSS3Prefix}${props.defaultImageUrl}`);
      }
    }
  },[props.defaultImageUrl])

  return (
    <Container>
      <InputStyle
        type={props.type ?? 'text'}
        placeholder={props.placeholder ?? "입력창"}
        disabled={props.disabled}
        defaultValue={props.defaultValue}
        checked={props.checked}
        onChange={props.type === "file" ? onChangeFile : props.onChange}
        onDrop={props.type === "file" && onDrop}
        value={props.value}
        ref={ref ?? null}
        color={props.color}
        placeholderColor={props.placeholderColor}
        name={props.name}
        id={props.id}
        display={props.display}
        checked={props.checked}
        size={props.size || "md"}
        errorMessage={props.errorMessage}
        padding={props.pd}
        leftIconImage={props.leftIconImage}
        background={props.bg}
        width={props.w}
        height={props.h}
        borderRadius={props.brR}
        styleTypes={props.styleTypes}
        outline={props.outline}
        errorLocation={props.errorLocation}
        defaultImageUrl={props.defaultImageUrl}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (
            // props.defaultValue !== ref?.current.value &&
            e.key == 'Enter' &&
            // (props.type === 'text' ||
            // props.type === 'password' ||
            // props.type === 'email' ||
            // props.type === 'search')
            props.onKeyPressAction
          ) {
            props.onKeyPressAction();
          }
        }}
        {...props.field}
        {...props.register}
        {...props}
      />
      {props.errorMessage ? (
        <ErrorMessageSpan height={props.h}> {props.errorMessage} </ErrorMessageSpan>
      ) : (
        <></>
      )}
      {props.type === "file" && (
        <InputLabel 
          color={props.color}
          htmlFor={props.id} 
          role="button" 
          styleTypes={props.styleTypes}
          width={props.w}
          height={props.h}
          isImageUrl={imageUrl}         
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          background={props.bg}
        > 
        {imageUrl && <button onClick={()=>{
          event.preventDefault();
          setImageUrl("");
        }}> <Image src={Icons.DeleteIcon} width={24} height={24}/> </button>} 
        {imageUrl ? <Image src={imageUrl} layout='fill'/> : <CC.ColumnCenterDiv h={"100%"} > 
            <Image src={Icons.CloudIcon} width={48} height={48}/>
            <CC.RowCenterDiv> drag file to upload  </CC.RowCenterDiv>
           </CC.ColumnCenterDiv>} 
        </InputLabel>
      )}
    </Container>
  );
});


// 제거할 부분

const Container = styled.div`
  position: relative;
`;

const InputLabel = styled.label`
width: ${props => props.width || '100%'};
height: ${props => props.height || '32px'};
display: block;
${props=>props.theme.flex.row.center.center};
border-radius: 10px;
position: relative;
background:  ${props => props.theme.colors.[props.background] || props.theme.main.[props.background]};
  &:hover {
    cursor: pointer;
  }
  ${props=>props.styleTypes === 1 && `
      outline: solid ${props.theme.colors.white80} 1px;
      background: rgba(0, 0, 0, 0.01);
      box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
      height: 40px;
      color: ${props.theme.colors.white80};
  `}
  ${props => props.isImageUrl && css`
    outline: none;
    box-shadow: none;
  `}
  color:  ${props => props.theme.colors.[props.color] || props.theme.main.[props.color]};

  button {
    position: absolute;
    top: 4px;
    right: 4px;
    z-index: 4;
  }
`

const InputStyle = styled.input<IInputProps>`
  width: ${props => props.width || '100%'};
  height : ${props => props.height || (props.size && props.size === 'sm' ? "32px" : props.size === "md" ? "48px" : "32px") };
  font-size: ${props=>props.theme.fontSize.md};
  border: none;
  display: ${props => (props.display ? props.display : 'block')};
  padding: ${props => props.padding || '2px 0px 2px 4px'};
  border-radius: ${props => props.borderRadius || "10px"};
  position: relative;
  background:  ${props => props.theme.colors.[props.background] || props.theme.main.[props.background]};
  color:  ${props => props.theme.colors.[props.color] || props.theme.main.[props.color]};

      /* 순서주의 */
  ${props =>
    props.outline &&
    css`
      outline: solid ${(props.theme.colors.[props.background] || props.theme.main.[props.background])} 1px;
      background: transparent;
    `}

  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }

  &:focus {
  outline: solid ${props => `${props.theme.main.primary80}2f`} 5px;
  /* outline: solid black 4px; */
}



  /* 순서주의 */
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


&[type='file'] {
    height: 100%;
    appearance: none;
    display: none;

    /* &::file-selector-button {
        display: none;
    } */
  }

  &[type='checkbox'] {
    appearance: none;
    outline: solid ${props=>props.theme.main.contrast} 1px;
  }

  &[type='checkbox']:checked { 
    position: relative;
    cursor: pointer;
  }
  
  &[type='checkbox']:checked::after {
    content: "✔";
    width: 80%;
    height: 80%;
    border-radius: 50%;
    /* background: ${props=>props.theme.main.primary100}; */
    color: ${props=>props.theme.main.primary100};
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    ${props=>props.theme.flex.row.center.center};
    font-size: 1.4em;
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


  ${props =>
    props.leftIconImage &&
    `
      background-image: url(${props.leftIconImage});
      padding: 0px 0px 0px calc(${props.height ? props.height : '24px'} + 4px);
      background-position: 4px center;
      background-repeat: no-repeat;
      background-size: contain;
  `}

  ${props=>props.styleTypes === 1 && `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
    height: ${props.height || "40px"};
    color: ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.colors.white80};
    ::placeholder {
      transition: all 0.6s ease-in-out;
      opacity: 0.7;
      font-size: ${props.theme.fontSize.sm};
      color: ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.colors.white80};
      padding: '6px';
    }
  `}




/* &:focus {
      --clr: ${props=>props.theme.main.primary60};

      animation-name: animate-in; 
      animation-duration: 1s;
      background-image: linear-gradient(to right, var(--clr), var(--clr)), 
      linear-gradient(to bottom, var(--clr), var(--clr)), 
      linear-gradient(to right, var(--clr), var(--clr)),
      linear-gradient(to bottom, var(--clr), var(--clr)); 
      background-position: 0 0, 100% 0, 100% 100%, 0 100%; 
      background-size: 100% 4px, 4px 100%, 100% 4px, 4px 100%; 
      background-repeat: no-repeat;   
    }

    @keyframes animate-in {
  0% {
    background-size: 0 4px, 0 0, 0 0, 0 0; 
  }

  25% {
    background-size: 100% 4px, 0 0, 0 0, 0 0; 
    border-radius: 10px 10px 0px 0px;
  }

  50% {
    background-size: 100% 4px, 4px 100%, 0 0, 0 0; 
    border-radius: 10px 10px 10px 0px;
  }

  75% {
    background-size: 100% 4px, 4px 100%, 100% 4px, 0 0; 
    border-radius: 10px 10px 10px 10px;
  }

  100% {
    background-size: 100% 4px, 4px 100%, 100% 4px, 4px 100%;
    border-radius: 10px 10px 10px 10px; 
  }
} */
`;


const ErrorMessageSpan = styled.span`
  --height: ${props=> props.errorLocation || "44px"};
  top: var(--height);
  color: red;
  position: absolute;
  font-size: 10px;
  display: flex;
  align-items: center;
  word-break: keep-all;
`;
