import AuthModal from "@component/auth/hybrid/AuthModal";
import Button from "@component/common/button/hybrid/Button";
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
        <Button
          onClick={() => props.signOutHandler()}
          className={"px-2 h-btn-md primary-border-radius"}
        >
          로그아웃
        </Button>
      ) : (
        <ModalButton
          modal={<AuthModal />}
          buttonClassName={"px-2 h-btn-md w-[78px] primary-border-radius hover:bg-primary-20"}
        >
          로그인
        </ModalButton>
      )}
    </>
  );
};
export default React.memo(AuthButtonView);