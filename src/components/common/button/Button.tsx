import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colorTypes } from '@styles/theme';
import { MouseEventHandler, ReactNode, useCallback } from 'react';

interface IButtonProps {
  onClick?: (_event: any) => void;
  onClickCapture?: (_event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  w?: string;
  h?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  bg?: colorTypes;
  brR?: string; // border-radius
  color?: colorTypes;
  outline?: boolean;
  outlineColor?: colorTypes;
  fontFamily?: string;
  fontWeight?: number;
  state?: 'danger' | 'warning';
  active?: boolean;
  activeBg?: string;
  hover?: boolean;
}

const Button = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children = 'button',
  hover = true,
  ...props
}: IButtonProps) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      _onClick?.(event);
    },
    [_onClick, props.disabled],
  );

  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      _onClickCapture?.(event);
    },
    [_onClickCapture, props.disabled],
  );

  return (
    <ButtonStyle
      onClick={onClick}
      onClickCapture={onClickCapture} // {onClick}은 위에서 정의한 함수이다.
      hover={hover}
      {...props}
    >
      {children}
    </ButtonStyle>
  );
};

export default Button;

const ButtonStyle = styled.button<IButtonProps>`
  // TODO 일반적으로 버튼은 가운데 텍스트가 있어서 가운데 정렬 만약에 변경이 필요하다면 수정
  ${(props) => props.theme.flex?.row.center.center};
  color: ${(props) => props.theme?.colors?.black80};

  // ? 커스텀한 버튼들 약간 테마에 맞춰서 변경을 시도하려고 노력중 (겨울, 비, 크리스마스 등등)
  ${(props) =>
    props.state === 'danger' &&
    `
      background: #FF3232;
      color: #fafafa;
      `}
  ${(props) =>
    props.state === 'warning' &&
    `
      background: #FF8E0D;
      color: #fafafa;
    `}
    ${(props) =>
    props.state === 1 &&
    `
      outline: solid ${props.theme.colors.white100} 1px;
      background: rgba(0, 0, 0, 0.01);
    `}

      
${(props) =>
    props.hover &&
    css`
      &:hover {
        cursor: pointer;
        transition: all 1250ms cubic-bezier(0.19, 1, 0.22, 1);
        outline: solid ${props.theme.main?.secondary80} 1px;
        outline-offset: 1px;
      }
    `}
      
      ${(props) =>
    props.active &&
    css`
      color: ${props.theme.main?.contrast};
      background: ${props.theme.colors?.[props.activeBg] ||
      props.theme.main?.[props.activeBg] ||
      props.activeBg ||
      props.theme.main?.primary60};
    `}
      
      
      ${(props) =>
    props.disabled &&
    css`
      background: ${props.theme.colors?.gray80};
      &:hover {
        cursor: not-allowed;
      }
    `}
      
      ${(props) =>
    props.disabled != undefined &&
    props.disabled != true &&
    css`
      color: ${props.theme.main?.contrast};
      background: ${props.theme.colors?.[props.activeBg] ||
      props.theme.main?.[props.activeBg] ||
      props.activeBg ||
      props.theme.main?.primary60};
    `}
        
  padding: ${(props) => props.pd || '4px'};
  border: none;
  border-radius: ${(props) =>
    props.theme.borderRadius?.[props.brR] ||
    props.theme.btnSizes?.[props.h]?.borderRadius ||
    props.theme.btnSizes?.md?.borderRadius};
  background: ${(props) =>
    props.theme.colors?.[props.bg] || props.theme.main?.[props.bg] || props.bg};
  outline: ${(props) =>
    props.outline &&
    css`solid  ${
      props.theme.colors?.[props.outlineColor] ||
      props.theme.main?.[props.outlineColor] ||
      props.theme.main?.primary80
    } 1px`};
  width: ${(props) => props.w || 'max-content'};
  height: ${(props) =>
    props.theme.btnSizes?.[props.h]?.height ||
    props.h ||
    props.theme.btnSizes?.md?.height};
  font-family: ${(props) => props.theme.fontFamily?.[props.fontFamily]};
  font-weight: ${(props) => props.fontWeight};
  font-size: ${(props) => props.theme.fontSize?.md};
  color: ${(props) =>
    props.theme.colors?.[props.color] || props.theme.main?.[props.color]};
`;
