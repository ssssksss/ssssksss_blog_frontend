import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { MouseEventHandler, ReactNode, useCallback, useState } from 'react';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
import { commonTheme } from '@/styles/theme';
import { CC } from '@/styles/commonComponentStyle';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { Button } from '@/components/common/button/Button';

interface IModalButtonProps {
  onClick?: (event: any) => void;
  children: ReactNode;
  disabled?: boolean;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  w?: string;
  h?: string;
  brR?: string;
  fontFamily?: string;
  fontWeight?: number;
  modal?: ReactNode;
  modal1W?: string;
  modal1MaxW?: string;
  modal1H?: string;
  overlayVisible?: boolean;
  bg?: string;
  btnBg?: string;
  beforeCloseFunction?: ()=>void;
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param overlayVisible
 * @param modal = {모달컴포넌트}
 */
const ModalButton: IModalButtonProps = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  disabled = false,
  color,
  size,
  w,
  h,
  maxH,
  pd,
  brR,
  fontFamily, 
  fw,
  fontSize,
  outline,
  modal,
  modalW,
  modal1MaxW,
  modalH,
  overlayVisible = false,
  bg,
  btnBg,
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
  
  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
    // if (props.disabled) return;
    // event.stopPropagation();
    _onClickCapture?.(event);
  },
  [_onClickCapture, disabled]
);


  const closeModal = useCallback(() => {
    setIsOpen(false);
  },[])

  return (
    <ModalButtonStyle
    onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
    onClickCapture={onClickCapture}
    disabled={disabled}
    color={color}
    size={size}
    width={w}
    height={h}
    padding={pd}
    borderRadius={brR}
    outline={outline}
    fontFamily={fontFamily}
    fontWeight={fw}
    fontSize={fontSize}
    background={btnBg ?? bg}
      {...props}
    >
        {children}
      {isOpen && <Overlay overlayVisible={overlayVisible} onClickCapture={(e) => 
        {
          e.stopPropagation();
          setIsOpen(false);
        }} />}
      {isOpen && (
        <ModalComponent width={modalW} height={modalH} background={bg} maxH={maxH} maxW={props.modalMaxW}>
          <Exit onClickCapture={(e) =>{ 
            e.stopPropagation();
            setIsOpen(false);
          }}>
            <Image src={Icons.ExitIcon} alt="exit" width={"36px"} height={"36px"}/>
          </Exit>
          {{...modal, props: {...modal.props, "closeModal": ()=>{
            {props.beforeCloseFunction && props.beforeCloseFunction()}
            closeModal();
          }}}}
        </ModalComponent>
      )}
    </ModalButtonStyle>
  );
};

export default React.memo(ModalButton);

const ModalButtonStyle = styled.button<IModalButtonProps>`
  padding: ${props=>props.padding};
  border: none;
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background};
  /* background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.theme.main.primary80}; */
  border-radius: ${props => props.theme.borderRadius.[props.borderRadius] || props.theme.borderRadius.br10};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color]};
  font-family: ${props=>props.theme.fontFamily.[props.fontFamily]};
  font-weight: ${props=>props.fontWeight};
  font-size: ${props=>props.fontSize};
  height: ${props => props.height || '24px'};
  max-width: ${props => props.maxW};
  position: relative;

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
  width: ${props => props.width || 'max-content'};

`;
const Overlay = styled.div<{overlayVisible: boolean}>`
      ${props =>
    props.overlayVisible &&
    css`
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      opacity: 0.8;
      border: 0px;
      z-index: 90;
      background: ${props=>props.overlayVisible && props.theme.colors.gray60};
    `}

`;
const ModalComponent = styled(CC.ColumnDiv)<{ width: string, height: string, maxH: string, maxW: string }>`
  position: fixed;
  max-height: calc(100% - 80px);
  max-height: ${props => props.maxH && props.maxH };
  padding-top: 40px;
  top: 50%;
  left: 50%;
  z-index: 100;
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background || props.theme.linearGradientColors.purple40deg70blue40};
  border-radius: ${props => props.theme.borderRadius.br10};
  outline: solid ${props=>props.theme.colors.black80} 2px;
  cursor: default;
  ${props=>props.theme.scroll.hidden};
  transform: translate(-50%, -50%);
  
  & > * {
    ${props=>props.theme.scroll.hidden};
  }
  max-width: ${props => props.maxW};
  height: ${props => props.height};
  width: ${props => `calc(${props.width})`};
`;
const Exit = styled(CC.RowRightDiv)`
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px; 
  background: ${props=>props.theme.colors.white100};
    border-radius: 10px 10px 0px 0px;
  outline: solid black 1px;
  z-index: 20;
  & img:hover {
    cursor: pointer
  }
`;
