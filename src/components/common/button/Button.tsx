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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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
      active={  active}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
  padding: ${props=>props.padding};
  min-width: 24px;
  min-height: 24px;
  ${props => props.theme.flex.row.center.center};
  border: none;
  border-radius: ${props => props.theme.borderRadius.[props.borderRadius] || props.theme.borderRadius.br10};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] ||  props.theme.main.contrast};
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background || props.theme.main.primary80};
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: ${props=>props.theme.calcRem(16)};
  /* background-color: ${props => commonTheme.backgroundColors[props.color]}; */
  /* border-radius: ${props =>
    commonTheme.btnSizes[props.size].borderRadius}; */
  /* width: ${props => commonTheme.btnSizes[props.size].width}; */

  &:hover {
    cursor: pointer;
    transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
    outline: 1px solid ${props => props.theme.main.contrast};
    outline-offset: 3px;
  }
  /* 순서주의 */
  ${props =>
    props.disabled &&
    `
    background-color: ${props=>props.theme.colors.disabled};
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
    outline: solid ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.main.primary80} 1px;
    background: transparent;
    `}

${props=>props.styleTypes === 1 && `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
    color: ${props.theme.colors.white80};
  `}

  ${props =>
      props.active &&
      css`
        color: white;
        animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
        border-radius: 10px;
      `}
  font-size: ${props => props.size === "xs" ? "0.6rem" : props.size === "sm" ? "0.7rem" : "1rem"};
  height: ${props => props.height};
  ${props => `width: ${props.width || 'max-content'}`};

  /* @keyframes animate-in {
    0% {
      background-size: 0 var(--active-outline), 0 0, 0 0, 0 0; 
    }

    25% {
      background-size: 100% var(--active-outline), 0 0, 0 0, 0 0; 
    }

    50% {
      background-size: 100% var(--active-outline), var(--active-outline) 100%, 0 0, 0 0; 
    }

    75% {
      background-size: 100% var(--active-outline), var(--active-outline) 100%, 100% var(--active-outline), 0 0; 
    }

    100% {
      background-size: 100% var(--active-outline), var(--active-outline) 100%, 100% var(--active-outline), var(--active-outline) 100%;
    }
  } */

&:focus {
      /* --active-outline: 2px; */
      /* --clr: ${props=>props.theme.main.primary60}; */

      /* background-image: linear-gradient(to right, var(--clr), var(--clr)),  */
      /* linear-gradient(to bottom, var(--clr), var(--clr)),  */
      /* linear-gradient(to right, var(--clr), var(--clr)), */
      /* linear-gradient(to bottom, var(--clr), var(--clr));  */
      /* background-position: 0 0, 100% 0, 100% 100%, 0 100%;  */
      /* background-size: 100% var(--active-outline), var(--active-outline) 100%, 100% var(--active-outline), var(--active-outline) 100%;  */
      /* background-repeat: no-repeat;    */
      /* animation-name: animate-in;  */
      /* animation-duration: 1s; */
      /* animation-fill-mode: both; */

    }

`;
