"use client";

import AuthModal from "@component/auth/hybrid/AuthModal";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import { FaRegUser } from "react-icons/fa";

import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import { useInitGetUser } from "@hooks/useInitGetUser";
import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import useToastifyStore from "@store/toastifyStore";
import { auth } from "@utils/lib/firebaseConfig";
import { AWSS3Prefix } from "@utils/variables/s3url";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import AuthProfileUpdateContainer from "../hybrid/AuthProfileUpdateContainer";

interface IAuthButtonView {
}

const AuthButtonView = (props : IAuthButtonView) => {
  const modalState = useModalState();
  const router = useRouter();
  const optionRef = useRef<any>();
  const { userStore } = useInitGetUser();
  const toastifyStore = useToastifyStore();

  //* 로그아웃 함수
  const signOutHandler = async () => {
    const response = await fetch("/api/user", {
      method: "DELETE",
    });

    if (response.ok) {
      if (userStore.role == "ROLE_ADMIN") {
        await signOut(auth);
      }
      userStore.initialize();
      (await import("@store/planStore")).default.getState().initialize();
      (await import("@store/memoStore")).default.getState().initialize();
      (await import("@store/siteBookmarkStore")).default
        .getState()
        .initialize();

      toastifyStore.setToastify({
        type: "success",
        message: "로그아웃 되었습니다.",
      });
      router.push("/");
      router.refresh();
    }
  };

  useOutsideClick(optionRef, () => {
    if (modalState.isOpen) {
      modalState.closeModal();
      return;
    }
  });

  if (userStore.id === 0) {
    return (
      <div className="h-btn-md w-[2.75rem] animate-pulseSkeleton p-2 primary-border-radius" />
    );
  }

  if (userStore.id > 0) {
    return (
      <div className="relative" ref={optionRef}>
        <button
          onClick={() =>
            modalState.isOpen ? modalState.closeModal() : modalState.openModal()
          }
          className="aspect-square h-btn-md rounded-[50%] border-2 border-primary-60 default-flex hover:bg-primary-80"
          aria-label="사용자 메뉴 열기"
        >
          {userStore.profileImagePath ? (
            <Image
              className="object-contain"
              src={`${AWSS3Prefix}${userStore.profileImagePath}`}
              alt={""}
              fill
              priority
            />
          ) : (
            <FaRegUser />
          )}
        </button>

        <article
          className={`absolute top-[3.25rem] z-50 w-[12rem] overflow-hidden bg-default-1 text-contrast-1 shadow-lg transition-all primary-border-radius ${modalState.isOpen ? "opacity-1 right-[0.125rem]" : "right-[-10rem] -z-10 opacity-0"}`}
        >
          <NestedModalButton
            buttonClassName="w-full px-4 py-2 text-left hover:bg-primary-20"
            modal={<AuthProfileUpdateContainer />}
            onClick={() => modalState.closeModal()}
          >
            설정
          </NestedModalButton>
          <button
            className="w-full px-4 py-2 text-left hover:bg-primary-20"
            onClick={() => {
              modalState.closeModal();
              signOutHandler();
            }}
          >
            로그아웃
          </button>
        </article>
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
