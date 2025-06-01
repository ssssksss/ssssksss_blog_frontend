import usePreventBodyScroll from "@hooks/usePreventBodyScroll";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalProps extends React.PropsWithChildren {
  className?: React.HTMLProps<HTMLElement>["className"];
  modalState: IModalState;
}

export const NestedModal = ({children, modalState}: ModalProps) => {
  const [documentBody, setDocumentBody] = useState<HTMLElement | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  usePreventBodyScroll(modalState.isOpen);
  const [isFirstNestedModal, setIsFirstNestedModal] = useState(false);

  useEffect(() => {
    setDocumentBody(document.body);
  }, []);

  const handlePopState = () => {
    if (modalState.isOpen) {
      modalState.closeModal();
    }
  };

  const handleBeforeUnload = () => {
    if (isFirstNestedModal) {
      window.history.back();
    }
  };

  useEffect(() => {
    if (modalState.isOpen) {
      if (!window.history.state.isModal) {
        window.history.pushState({isModal: true}, "");
        setIsFirstNestedModal(true);
      }
      window.addEventListener("popstate", handlePopState);
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
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
              onClick={() => {
                modalState.closeModal();
                if (isFirstNestedModal) {
                  history.back();
                }
              }}
              className="absolute right-[1.5rem] top-[1rem] h-[2rem] w-[2rem] scale-100 transform text-contrast-1 transition-transform duration-300"
              style={{zIndex: 200}}
            >
              <AiOutlineCloseCircle size={"44"} />
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
      style={{zIndex: "100"}}
    >
      <div
        onClick={() => {
          modalState.closeModal();
          if (isFirstNestedModal) {
            history.back();
          }
        }}
        className="fixed h-full w-full cursor-pointer bg-black-60/40"
      ></div>
      <div
        ref={ref}
        className="-z-1 relative flex h-auto w-auto max-w-[75rem] items-center"
      >
        {childComponent}
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement,
  );
};
