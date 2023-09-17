import theme from '@/styles/theme';
import { ChangeEvent, KeyboardEvent } from 'react';
import styled from '@emotion/styled';

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
  color?:
    | 'red'
    | 'orange'
    | 'yellow'
    | 'green'
    | 'purple'
    | 'blue'
    | 'skyblue'
    | 'purple'
    | 'pink';
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: any;
  value?: string | number | boolean;
  ref?: any;
  name?: string;
  id?: string;
  display?: string;
  errorMessage?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  padding?: String;
  leftIconImage?: String;
  width?: String;
  height?: String;
}

const Input = ({
  type,
  placeholder = '설명',
  register,
  field,
  disabled,
  defaultValue,
  checked,
  onChange,
  value,
  ref,
  color,
  name,
  id,
  display,
  onKeyPress,
  errorMessage,
  size = 'md',
  padding,
  leftIconImage,
  width,
  height,
  ...props
}: IInputProps) => {
  return (
    <>
      <InputStyle
        type={type ?? 'text'}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        checked={checked}
        onChange={onChange}
        value={value}
        ref={ref}
        color={color}
        name={name}
        id={id}
        display={display}
        checked={checked}
        size={size}
        errorMessage={errorMessage}
        padding={padding}
        leftIconImage={leftIconImage}
        width={width}
        height={height}
        onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
          if (
            e.key === 'Enter' &&
            onKeyPress &&
            (type === 'text' ||
              type === 'password' ||
              type === 'email' ||
              type === 'search')
          ) {
            onKeyPress();
          }
        }}
        {...field}
        {...register}
        {...props}
      />
      {errorMessage ? (
        <ErrorMessageSpan> {errorMessage} </ErrorMessageSpan>
      ) : (
        <></>
      )}
    </>
  );
};
export default Input;

// 제거할 부분
const ErrorMessageSpan = styled.span`
  color: red;
  position: absolute;
  font-size: 10px;
  display: flex;
  align-items: center;
  transform: translate(0, 20px);
  word-break: keep-all;
`;

const InputStyle = styled.input<IInputProps>`
  font-size: 1rem;
  outline: none;
  border: none;
  /* border-radius: 4px; */
  display: ${props => (props.display ? props.display : 'block')};
  width: ${props =>
    props.width && theme.inputSizes[props.type][props.size]?.width};
  /* height: ${props => theme.inputSizes[props.type][props.size].height}; */
  height: ${props => props.height || '24px'};
  padding: ${props => props.padding || '2px 0px 2px 4px'};
  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
  position: relative;

  background-color: ${props =>
    theme.backgroundColors[props.color] || '#fafafa'};
  color: ${theme.colors['black']};
  /* 순서주의 */
  ${props =>
    props.disabled &&
    `
    background-color: ${theme.backgroundColors['disabled']};
      cursor: not-allowed;
      &:hover {
        box-shadow: none;
        cursor: not-allowed;
      }
    `}
  /* 순서주의 */
  ${props =>
    props.outline &&
    `
    background-color: ${theme.backgroundColors['white']};
    outline: solid ${theme.backgroundColors[props.color] || 'black'} 1px;
    color: ${theme.colors['default']};
  `}

  ${props =>
    props.leftIconImage &&
    `
      background-image: url(${props.leftIconImage});
      padding: 0px 0px 0px calc(${props.height ? props.height : '24px'} + 4px);
      background-position: 4px center;
      background-repeat: no-repeat;
      background-size: contain;
  `}

  &[type='radio'] + label {
    display: flex;
    align-items: center;
    position: relative;
  }

  &[type='radio']:checked {
    appearance: none;
    box-shadow: none;
    background: ${props => theme.backgroundColors[props.color]};
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }

  &[type='checkbox'] + label {
    display: flex;
    align-items: center;
  }

  &[type='checkbox']:checked {
    appearance: none;
    box-shadow: none;
    background: ${props => theme.backgroundColors[props.color]};
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

  ::placeholder {
    transition: all 0.6s ease-in-out;
    color: ${theme.colors['placeholder']};
    opacity: 0.7;
    font-size: ${theme.fontSizes.md};

    @media (max-width: ${theme.deviceSizes.laptop}) {
      font-size: ${theme.fontSizes.sm};
    }
  }
  :focus::placeholder {
    transform: translate(-2px, -50%);

    ${props =>
      props.type === 'search' &&
      `
    color: transparent;
  `}
  }
`;
