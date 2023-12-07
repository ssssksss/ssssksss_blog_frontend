import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
import { commonTheme } from '@/styles/theme';
import { CC } from '@/styles/commonComponentStyle';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';

interface IModalButtonProps {
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
  w?: string;
  h?: string;
  brR?: string;
  fontFamily?: string;
  fontWeight?: number;
  modal?: ReactNode;
  modal1W?: string;
  modal1H?: string;
  overlayVisible?: boolean;
  bg?: string;
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param color = "red" | "orange" | "yellow" | "green" | "blue" | "skyblue" | "purple" | "pink" | "white" | "disabled";
 * @param size = "xs" | "sm" | "md" | "lg" | "xl";
 */
const ModalButton = ({
  onClick: _onClick,
  children,
  disabled = false,
  color,
  size,
  w,
  h,
  pd,
  brR,
  fontFamily, 
  fontWeight,
  fontSize,
  outline,
  modal,
  modalW,
  modalH,
  overlayVisible = true,
  bg,
  ...props
}: IModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (props.disabled) return;
    if(modal && !isOpen) {
      // event.preventDefault();
      // event.stopPropagation();
      setIsOpen(true);
      _onClick?.(event);
    };
  };


  const closeModal = useCallback(() => {
    setIsOpen(false);
  },[])

  return (
    <ModalButtonStyle
    onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
    disabled={disabled}
    color={color}
    size={size}
    width={w}
    height={h}
    padding={pd}
    borderRadius={brR}
    outline={outline}
    fontFamily={fontFamily}
    fontWeight={fontWeight}
    fontSize={fontSize}
      {...props}
    >
      {children}
      {isOpen && <Overlay overlayVisible={overlayVisible} onClickCapture={(e) => 
        {
          e.stopPropagation();
          setIsOpen(false);
        }} />}
      {isOpen && (
        <ModalComponent width={modalW} height={modalH} background={bg}>
          <Exit onClickCapture={(e) =>{ 
            e.stopPropagation();
            setIsOpen(false);
          }}>
            <Image src={Icons.ExitIcon} alt="exit" />
          </Exit>
          {{...modal, props: {...modal.props, "closeModal": ()=>closeModal()}}}
        </ModalComponent>
      )}
    </ModalButtonStyle>
  );
};

export default React.memo(ModalButton);

const ModalButtonStyle = styled.button<IModalButtonProps>`
  padding: ${props=>props.padding};
  ${props => props.theme.flex.row.center.center};
  border: none;
  background: transparent;
  /* background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.theme.main.primary80}; */
  border-radius: ${props => props.theme.borderRadius.[props.borderRadius] || props.theme.borderRadius.br10};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] ||  props.theme.main.contrast};
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: ${props=>props.fontSize};
  height: ${props => props.height || '24px'};

  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:hover {
    cursor: pointer;
  }
  /* 순서주의 */
  ${props =>
    props.disabled &&
    `
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
${props => `width: ${props.width || 'max-content'}`};

`;
const Overlay = styled.div<{overlayVisible: boolean}>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  opacity: 0.8;
  border: 0px;
  z-index: 90;
  background: ${props=>props.overlayVisible && props.theme.colors.gray60};
`;
const ModalComponent = styled.section<{ width: string, height: string }>`
  position: fixed;
  width: ${props => props.width};
  height: ${props => props.height};
  min-width: max-content;
  max-height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background || props.theme.linearGradientColors.purple40deg70blue40};
  border-radius: ${props => props.theme.borderRadius.br10};
  overflow: scroll;
  outline: solid ${props=>props.theme.colors.black80} 2px;
  cursor: default;

-ms-overflow-style: none; /* IE and Edge */
scrollbar-width: none; /* Firefox */
&::-webkit-scrollbar { display: none; } /* Chrome, Safari, Opera*/ 
`;
const Exit = styled(CC.RowCenterDiv)`
  width: 40px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 0px;
`;
