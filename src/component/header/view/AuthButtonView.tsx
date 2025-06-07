import AuthModal from "@component/auth/hybrid/AuthModal";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import React from "react";

interface IAuthButtonView {
  userId: number;
  signOutHandler: () => void;
}
const AuthButtonView = (props: IAuthButtonView) => {

  return (
    <>
      {props.userId == 0 ? (
        <div
          className={
            "h-btn-md w-[5rem] animate-pulseSkeleton p-2 primary-border-radius"
          }
        ></div>
      ) : props.userId > 0 ? (
        <button
          onClick={() => props.signOutHandler()}
          className={"h-btn-md px-2 primary-border-radius hover:bg-primary-80"}
          aria-label="로그아웃 버튼"
        >
          로그아웃
        </button>
      ) : (
        <ModalButton
          modal={<AuthModal />}
          buttonClassName={
            "px-2 h-btn-md w-[78px] primary-border-radius hover:bg-primary-20"
          }
        >
          로그인
        </ModalButton>
      )}
    </>
  );
};
export default React.memo(AuthButtonView);