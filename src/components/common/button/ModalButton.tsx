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
  w?: string;
  h?: string;
  bg?: string;
  brR?: string;
  color?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  outline?: boolean;
  outlineColor?: string;
  fontFamily?: string;
  fontWeight?: number;
  styleTypes?: number;
  active?: boolean;
  modal?: ReactNode;
  modalW?: string;
  modalMinW?: string;
  modalMaxW?: string;
  modalH?: string;
  modalMinH?: string;
  modalMaxH?: string;
  modalOverlayVisible?: boolean;
  modalBg?: string;
  beforeCloseFunction?: ()=>void;
}

/**
 * @Param onClick = () => void;
 * @Param disable = "true | false"
 * @param modalOverlayVisible
 * @param modal = {모달컴포넌트}
 */
const ModalButton: IModalButtonProps = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  ...props
}: IModalButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (props.disabled) return;
    if(props.modal && !isOpen) {
      setIsOpen(true);
      _onClick?.(event);
    };
  };
  
  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    event => {
    _onClickCapture?.(event);
  },
  [_onClickCapture, props.disabled]
);


  const closeModal = useCallback(() => {
    setIsOpen(false);
  },[])

  return (
    <ModalButtonStyle
    onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
    onClickCapture={onClickCapture}
      {...props}
    >
        {children}
      {isOpen && <Overlay modalOverlayVisible={props.modalOverlayVisible} onClickCapture={(e) => 
        {
          e.stopPropagation();
          setIsOpen(false);
        }} />}
      {isOpen && (
        <ModalComponent width={props.modalW} height={props.modalH} background={props.modalBg} maxH={props.modalMaxH} maxW={props.modalMaxW}>
          <Exit onClickCapture={(e) =>{ 
            e.stopPropagation();
            setIsOpen(false);
          }}>
            <Image src={Icons.ExitIcon} alt="exit" width={"36px"} height={"36px"}/>
          </Exit>
          {{...props.modal, props: {...props.modal.props, "closeModal": ()=>{
            {props.beforeCloseFunction && props.beforeCloseFunction()}
            closeModal();
          }}}}
        </ModalComponent>
      )}
    </ModalButtonStyle>
  );
};

export default React.memo(ModalButton);

const ModalButtonStyle = styled(Button)<IModalButtonProps>`
// ! Button(커스텀태그)에 있는 속성을 상속받아서 사용
// 외곽 디자인(border-radius, outline, box-shadow) //

// 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  position: relative;
  max-width: ${props => props.maxW};
// 배경색(background) //

// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //

// 애니메이션(animation) //

// 이벤트(active, focus, hover, visited, focus-within, disabled) //
-webkit-tap-highlight-color: rgba(0,0,0,0);

// 반응형(media-query) //
// 커스텀(custom css) //


`;


const Overlay = styled.div<{modalOverlayVisible: boolean}>`

    ${props =>
    props.modalOverlayVisible &&
    css`
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      opacity: 0.8;
      border: 0px;
      z-index: 90;
      background: ${props.theme.colors.gray60};
    `}

`;

const ModalComponent = styled(CC.ColumnDiv)<{ width: string, height: string, maxH: string, maxW: string }>`
// 외곽 디자인(border-radius, outline, box-shadow) //
  border-radius: ${props => props.theme.borderRadius.br10};
  outline: solid ${props=>props.theme.colors.black80} 2px;


// 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  position: fixed;
  padding-top: 40px;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  height: ${props => props.height};
  max-height: ${props => props.maxH || `calc(100% - 80px)` };
  width: ${props => `calc(${props.width})`};
  max-width: ${props => props.maxW};

// 배경색(background) //
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background || props.theme.linearGradientColors.purple40deg70blue40};

// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //


// 애니메이션(animation) //


// 이벤트(active, focus, hover, visited, focus-within, disabled) //


// 반응형(media-query, overflow, scroll) //
  cursor: default;
  ${props=>props.theme.scroll.hidden};
  & > * {
    ${props=>props.theme.scroll.hidden};
  }

// 커스텀(custom css) //

`;
const Exit = styled(CC.RowRightDiv)`
// 외곽 디자인(border-radius, outline, box-shadow) //
  outline: solid black 1px;
  border-radius: 10px 10px 0px 0px;
// 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px; 
  z-index: 20;
// 배경색(background) //
  background: ${props=>props.theme.colors.white80};
// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
// 애니메이션(animation) //
// 이벤트(active, focus, hover, visited, focus-within, disabled) //
// 반응형(media-query, overflow, scroll) //
// 커스텀(custom css) //
`;
