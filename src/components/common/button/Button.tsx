import { animationKeyFrames } from '@/styles/Animations';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEventHandler, ReactNode, useCallback } from 'react';
interface ButtonProps {
  onClick?: (event: any) => void;
  onClickCapture?: (event: any) => void;
  children: ReactNode;
  disabled?: boolean;
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
  size?: 'sm' | 'md' | 'lg' ;
  outline?: boolean;
  w?: string;
  h?: string;
  bg?: string;
  brR?: string;
  fontFamily?: string;
  fontWeight?: number;
  styleTypes?: number;
  active?: boolean;
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param color = "red" | "orange" | "yellow" | "green" | "blue" | "skyblue" | "purple" | "pink" | "white" | "disabled";
 * @param size = "xs" | "sm" | "md" | "lg" | "xl";
 */
export const Button = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children = 'button',
  disabled = false,
  color,
  size,
  w,
  h,
  pd,
  brR,
  bg,
  fontFamily, 
  fontWeight,
  outline,
  styleTypes,
  active,
  ...props
}: ButtonProps) => {

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (props.disabled) return;
      _onClick?.(event);
    },
    [_onClick, disabled]
    );
    
    const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
      event => {
      if (props.disabled) return;
      _onClickCapture?.(event);
    },
    [_onClickCapture, disabled]
  );

  return (
    <ButtonStyle
      onClick={onClick} 
      onClickCapture={onClickCapture}// {onClick}은 위에서 정의한 함수이다.
      disabled={disabled}
      color={color}
      size={size}
      width={w}
      height={h}
      padding={pd}
      background={bg}
      borderRadius={brR}
      outline={outline}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      styleTypes={styleTypes}
      active={active}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
  min-width: max-content;
  min-height: 32px;
  width: ${props => props.width};
  height : ${props => props.height || (props.size && props.size === 'sm' ? "32px" : props.size === "md" ? "48px" : props.size === "lg" ? "60px" : "32px") };
  ${props => props.theme.flex.row.center.center};
  padding: ${props=>props.padding || "2px"};
  border: none;
  border-radius: ${props => props.theme.borderRadius.[props.borderRadius] || props.theme.borderRadius.br10};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.colors.black80 };
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background};
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: ${props=>props.theme.fontSize.md};

  &:hover {
    cursor: pointer;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    outline: inset ${props => props.theme.main.secondary80} 1px;
    outline-offset: 1px;
  }
  ${props =>
    props.outline &&
    `
    outline: solid ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.main.primary80} 1px;
    background: transparent;
    `}

  ${props=>props.styleTypes === 1 && `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  `}

  ${props =>
      props.active &&
      css`
        color: white;
        background: ${props.theme.main.primary40};
        animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
        border-radius: 10px;
      `}

    ${props =>
    props.disabled &&
    css`
        background: ${props.theme.colors.gray80};
        &:hover {
          box-shadow: none;
          cursor: not-allowed;  
        }
    `}
  font-size: ${props => props.size === "xs" ? "0.6rem" : props.size === "sm" ? "0.7rem" : "1rem"};
`;
