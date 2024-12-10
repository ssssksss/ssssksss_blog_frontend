import useOutsideClick from "@hooks/useOutsideClick";
import usePreventBodyScroll from "@hooks/usePreventBodyScroll";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.PropsWithChildren {
  className?: React.HTMLProps<HTMLElement>["className"];
  modalState: IModalState;
}

export const Modal = ({children, modalState}: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  let flag = modalState.isOpen;
  usePreventBodyScroll(modalState.isOpen);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  useOutsideClick(ref, () => {
    if (history.state.isModal) {
      window.history.back();
    }
    modalState.closeModal();
  });

  const handlePopState = () => {
    flag = false;
    if (modalState.isOpen) {
      modalState.closeModal();
    }
  };

  const handleBeforeUnload = () => {
    // 모달창이 열린 상태로 새로고침을 하게되면 나중에 헤더에서 뒤로가기를 실행하는 용도로 사용
    if (modalState.isOpen) {
      window.history.back();
      //   localStorage.setItem("isModal", "true");
    }
  };

  useEffect(() => {
    if (modalState.isOpen) {
      history.pushState({isModal: true}, "");
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      // if (flag) {
      //   window.history.back();
      // }
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.isOpen]);

  if (!documentBody || !modalState.isOpen) return null;

  const childrenArray = React.Children.toArray(children);
  const childComponent = childrenArray.map((child, index) => {
    if (index === 0 && React.isValidElement(child)) {
      // child의 props를 변경하려면 React.cloneElement 사용
      return React.cloneElement(
        child as React.ReactElement<{
          closeModal: () => void;
          closeButtonComponent: JSX.Element;
        }>,
        {
          closeModal: modalState.closeModal,
          closeButtonComponent: (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (history.state.isModal) {
                  window.history.back();
                }
                modalState.closeModal();
              }}
              className="absolute right-[1rem] top-[1rem] h-[2rem] w-[2rem] scale-100 transform transition-transform duration-300"
              style={{zIndex: 200}}>
              <Image
                src={"/images/icons/ic-exit.svg"}
                alt={"close-icon"}
                width={48}
                height={48}
              />
            </button>
          ),
        },
      );
    }
    return child;
  });

  return createPortal(
    <div
      className="fixed inset-0 left-1/2 z-10 flex h-full w-full -translate-x-1/2 items-center justify-center"
      style={{zIndex: "100"}}>
      <div className="fixed h-full w-full cursor-pointer bg-black-60/40"></div>
      <div
        ref={ref}
        className="-z-1 relative my-2 flex h-auto w-auto max-w-[75rem] items-center">
        {childComponent}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
