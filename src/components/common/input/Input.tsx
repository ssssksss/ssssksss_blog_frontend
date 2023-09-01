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
        <ErrorMessageSpan padding={padding}> {errorMessage} </ErrorMessageSpan>
      ) : (
        <></>
      )}
    </>
  );
};
export default Input;

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
  border-radius: 4px;
  display: ${props => (props.display ? props.display : 'block')};
  width: ${props => theme.inputSizes[props.type][props.size].width};
  /* height: ${props => theme.inputSizes[props.type][props.size].height}; */
  padding: 2px 0px 2px 4px;
  &:hover {
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  }
  position: relative;

  background-color: ${props => theme.backgroundColors[props.color]};
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
    outline: solid ${theme.backgroundColors[props.color]} 1px;
    color: ${theme.colors['default']};
  `}

  &[type='radio'] + label {
    display: flex;
    align-items: center;
  }

  &[type='radio']:checked {
    appearance: none;
    box-shadow: none;
    background: ${props => theme.backgroundColors[props.color]};
  }

  &[type='checkbox'] + label {
    display: flex;
    align-items: center;
  }

  &[type='checkbox']:checked {
    appearance: none;
    box-shadow: none;
    border-radius: 2px;
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
    ${theme.fontSizes.sm};
    color: ${theme.colors['placeholder']};
    opacity: 0.7;

    @media (max-width: 768px) {
      ${theme.fontSizes.xs};
    }
  }
  :focus::placeholder {
    font-size: 14px;
    transform: translate(0px, -50%);
  }
`;
