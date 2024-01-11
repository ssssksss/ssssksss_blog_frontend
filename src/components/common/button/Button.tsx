import { animationKeyFrames } from '@/styles/Animations';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEventHandler, ReactNode, useCallback } from 'react';
interface ButtonProps {
  onClick?: (event: any) => void;
  onClickCapture?: (event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: string;
  bg?: string;
  brR?: string; // border-radius
  color?: string;
  size?:  'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  styleTypes?: number;
  active?: boolean;
  hover?: boolean;
}

export const Button = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children = 'button',
  hover = true,
  ...props
}: ButtonProps) => {

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (props.disabled) return;
      _onClick?.(event);
    },
    [_onClick, props.disabled]
    );
    
    const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
      event => {
      if (props.disabled) return;
      _onClickCapture?.(event);
    },
    [_onClickCapture, props.disabled]
  );

  return (
    <ButtonStyle
      onClick={onClick} 
      onClickCapture={onClickCapture}// {onClick}은 위에서 정의한 함수이다.
      hover={hover}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
// 외곽 디자인(border-radius, outline, box-shadow) //
  border-radius: ${props => props.theme.borderRadius.[props.brR] || props.theme.borderRadius.br10};
  ${props =>
    (props.outline || !props.bg) &&
    `
    outline: inset ${props.theme.colors.[props.outlineColor] || props.theme.main.[props.outlineColor] || props.theme.main.primary80} 1px;
    background: transparent;
  `}

// 컨테이너(width, height, margin, padding, border, flex, grid) //
// ! height와 border-radius 설정도 안에 포함되어 있음
  height : ${props => props.h || props.theme.btnSizes.md };
  width: ${props => props.w || 'max-content'};
  padding: ${props=>props.pd};
  border: none;
  ${props => props.theme.flex.row.center.center};
  ${props => props.size && 
    props.size === "xs" ? props.theme.btnSizes.xs :
    props.size === "sm" ? props.theme.btnSizes.sm :
    props.size === "lg" ? props.theme.btnSizes.lg :
    props.size === "xl" ? props.theme.btnSizes.xl :
    props.theme.btnSizes.md
  }

// 배경색(background) //
  background: ${props => props.theme.colors.[props.bg] || props.theme.main.[props.bg] || props.bg};

// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.colors.black80 };
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: ${props=>props.theme.fontSize.md};

// 애니메이션(animation) //


// 이벤트(active, focus, hover, visited, focus-within) //


  ${props =>
    props.hover &&
    css`
      &:hover {
        cursor: pointer;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
        outline: inset ${props.theme.main.secondary80} 1px;
        outline-offset: 1px;
      }
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

  ${props =>
    props.active &&
    css`
      color: ${props.theme.main.contrast};
      background: ${props.theme.main.primary40};
      animation: ${animationKeyFrames.UpToDownRepeat} 1s infinite;
  `}

// 반응형(media-query) //


// 커스텀(custom css) //
${props=>props.styleTypes === 1 && `
    outline: solid ${props.theme.colors.white80} 1px;
    background: rgba(0, 0, 0, 0.01);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.25);
  `}
`;
