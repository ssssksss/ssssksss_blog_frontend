import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useModalState from '@hooks/useModalState';
import React, {
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

export interface IButtonProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClickCapture?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
  buttonClassName?: string;
  modalClassName?: string;
  id?: string;
  modal?: React.ReactElement;
  modalOverlayVisible?: boolean;
  beforeCloseFunction?: () => void;
  isHeaderBar?: boolean;
  headerBarStyle?: string;
}

const ModalButton: React.FC<IButtonProps> = ({
  onClick: _onClick,
  onClickCapture: _onClickCapture,
  children,
  ...props
}) => {
  const modalState = useModalState();
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      if (props.modal && !modalState.isOpen) {
        event.stopPropagation();
        modalState.openModal();
      }
      _onClick?.(event);
    },
    [_onClick, props.disabled, modalState],
  );

  const onClickCapture: MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (props.disabled) return;
      _onClickCapture?.(event);
    },
    [_onClickCapture, props.disabled],
  );

  const closeModal = useCallback(() => {
    if (props.beforeCloseFunction) {
      props.beforeCloseFunction();
    }
    modalState.closeModal();
  }, [props.beforeCloseFunction, modalState]);

  useEffect(() => {
    if (!modalState.isOpen) return;
    document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
    `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, [modalState.isOpen]);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  return (
    <button
      className={`${props.buttonClassName}`}
      onClick={onClick}
      onClickCapture={onClickCapture}
      disabled={props.disabled}
      id={props.id}
    >
      {children}
      {/* {props.badgeValue && (
        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
          {props.badgeValue}
        </span>
      )} */}
      {documentBody &&
        modalState.isOpen &&
        props.modal &&
        createPortal(
          <div
            className="fixed inset-0 flex h-full w-full items-center justify-center"
            style={{ zIndex: '100' }}
          >
            <div className="absolute h-full w-full cursor-pointer bg-black-100/30" onClick={()=>modalState.closeModal()}></div>
            <div
              ref={ref}
              className={`-z-1 relative flex h-[calc(100vh-1rem)] items-center justify-center flex-col ${props.modalClassName}`}
              onClick={(e) => {
                if (e.target == ref.current) {
                  modalState.closeModal();
                }
              }}
            >
              {props.isHeaderBar && (
                <div
                  className={`flex w-full justify-end ${props.headerBarStyle}`}
                >
                  <button
                    onClick={() => modalState.closeModal()}
                    className="relative transform-origin-center h-full aspect-square scale-100 transform transition-transform duration-300 hover:scale-150"
                  >
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
              )}
              {React.cloneElement(props.modal, {
                closeModal: closeModal,
              })}
            </div>
          </div>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </button>
  );
};
export default React.memo(ModalButton);
