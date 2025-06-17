import AuthModal from "@component/auth/hybrid/AuthModal";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { FaRegUser } from "react-icons/fa";

import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

interface IAuthButtonView {
  userId: number;
  signOutHandler: () => void;
}

const AuthButtonView = (props : IAuthButtonView) => {
  const modalState = useModalState();
  const optionRef = useRef<any>();
  const router = useRouter();

  useOutsideClick(optionRef, () => {
    if (modalState.isOpen) {
      modalState.closeModal();
      return;
    }
  });

  if (props.userId === 0) {
    return (
      <div className="h-btn-md w-[5rem] animate-pulseSkeleton p-2 primary-border-radius" />
    );
  }

  if (props.userId > 0) {
    return (
      <div className="relative" ref={optionRef}>
        <button
          onClick={() => modalState.isOpen ? modalState.closeModal() : modalState.openModal()  }
          className="aspect-square h-btn-md px-2 primary-border-radius default-flex hover:bg-primary-80"
          aria-label="사용자 메뉴 열기"
        >
          <FaRegUser />
        </button>

        {modalState.isOpen && (
          <article className="absolute right-[0.125rem] top-[3.25rem] z-50 w-[12rem] bg-default-1 py-2 text-contrast-1 shadow-lg primary-border-radius">
            <button
              className="w-full px-4 py-2 text-left hover:bg-primary-20"
              onClick={() => {
                modalState.closeModal();
                router.push("/setting");
              }}
            >
              설정
            </button>
            <button
              className="w-full px-4 py-2 text-left hover:bg-primary-20"
              onClick={() => {
                modalState.closeModal();
                props.signOutHandler();
              }}
            >
              로그아웃
            </button>
          </article>
        )}
      </div>
    );
  }

  return (
    <ModalButton
      modal={<AuthModal />}
      buttonClassName="px-2 h-btn-md w-[78px] primary-border-radius hover:bg-primary-20"
    >
      로그인
    </ModalButton>
  );
};

export default React.memo(AuthButtonView);
