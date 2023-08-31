import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { MouseEventHandler, ReactNode, useCallback } from 'react';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
import theme from '@/styles/theme';

interface ButtonProps {
  onClick?: (event: any) => void;
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
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param color = "red" | "orange" | "yellow" | "green" | "blue" | "skyblue" | "purple" | "pink" | "white" | "disabled";
 * @param size = "xs" | "sm" | "md" | "lg" | "xl";
 */
export const Button = ({
  onClick: _onClick,
  children = 'button',
  disabled = false,
  color = 'blue',
  size = 'md',
  ...props
}: ButtonProps) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
      if (props.disabled) return;
      _onClick?.(event);
    },
    [_onClick, disabled]
  );
  return (
    <ButtonStyle
      onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
      disabled={disabled}
      color={color}
      size={size}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
  padding: 2px;
  min-width: 24px;
  min-height: 24px;
  ${theme.flex.row.center.center}
  border: none;
  color: ${theme.colors.white};
  background-color: ${props => theme.backgroundColors[props.color]};
  border-radius: ${props => theme.btnSizes[props.size].borderRadius};
  width: ${props => theme.btnSizes[props.size].width};
  height: ${props => theme.btnSizes[props.size].height};
  &:hover {
    cursor: pointer;
  }
  font-size: 1em;
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
    color: ${theme.backgroundColors[props.color]};
  `}
`;
