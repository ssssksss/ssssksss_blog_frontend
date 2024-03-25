import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface IModalButtonProps {
  onClick?: (_event: unknown) => void;
  onClickCapture?: (_event: unknown) => void;
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
  state?: number;
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
  beforeCloseFunction?: () => void;
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
    if (props.modal && !isOpen) {
      setIsOpen(true);
      _onClick?.(event);
    }
  };

  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      _onClickCapture?.(event);
    },
    [_onClickCapture, props.disabled],
  );

  const closeModal = useCallback(() => {
    if (props.beforeCloseFunction) {
      props.beforeCloseFunction();
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [isOpen]);

  return (
    <ModalButtonStyle
      onClick={onClick} // {onClick}은 위에서 정의한 함수이다.
      onClickCapture={onClickCapture}
      {...props}
    >
      {children}
      {isOpen && (
        <Overlay
          modalOverlayVisible={props.modalOverlayVisible}
          onClickCapture={closeModal}
        />
      )}
      {isOpen && (
        <ModalComponent
          className={'modal-component'}
          width={props.modalW}
          height={props.modalH}
          background={props.modalBg}
          maxH={props.modalMaxH}
          maxW={props.modalMaxW}
          minW={props.modalMinW}
        >
          <Exit onClickCapture={closeModal}>
            <CC.ImgContainer w={'2.4rem'} h={'2.4rem'}>
              <Image src={Icons.ExitIcon} alt="exit" width={'1'} height={'1'} />
            </CC.ImgContainer>
          </Exit>
          {{
            ...props.modal,
            props: { ...props.modal.props, closeModal: () => closeModal() },
          }}
        </ModalComponent>
      )}
    </ModalButtonStyle>
  );
};

export default React.memo(ModalButton);

const ModalButtonStyle = styled(Button)<IModalButtonProps>`
  // ! Button(커스텀태그)에 있는 속성을 상속받아서 사용
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

const Overlay = styled.div<{ modalOverlayVisible: boolean }>`
  ${(props) =>
    props.modalOverlayVisible &&
    css`
      position: fixed;
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      opacity: 0.8;
      border: 0rem;
      z-index: 90;
      background: ${props.theme.colors.gray60};
    `}
`;

const ModalComponent = styled(CC.ColumnDiv)<{
  width: string;
  height: string;
  maxH: string;
  maxW: string;
  minW: string;
}>`
  border-radius: ${(props) => props.theme.borderRadius.br10};
  outline: solid ${(props) => props.theme.colors.black80} 0.2rem;
  position: fixed;
  padding-top: 2.4rem;
  top: 50%;
  left: 50%;
  z-index: 100;
  transform: translate(-50%, -50%);
  height: ${(props) => props.height};
  max-height: ${(props) => props.maxH || `calc(100% - 1rem)`};
  width: ${(props) => `calc(${props.width})`};
  max-width: ${(props) => props.maxW};
  min-width: ${(props) => props.minW};
  background: ${(props) =>
    props.theme.colors?.[props.background] ||
    props.theme.main?.[props.background] ||
    props.background ||
    `linear-gradient(45deg, ${props.theme.main.primary40} 0%,${props.theme.main.secondary40} 100%)`};
  cursor: default;
  ${(props) => props.theme.scroll.hidden};
  & > * {
    ${(props) => props.theme.scroll.hidden};
  }
`;
const Exit = styled(CC.RowRightDiv)`
  border-radius: 1rem 1rem 0rem 0rem;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 20;
  cursor: pointer;
`;
