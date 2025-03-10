import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import React, { useCallback, useState } from "react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AuthModal.tsx
 * @version 0.0.1 "2023-09-24 15:57:48"
 * @description 설명
 */

const AuthModal = (props: IModalComponent) => {
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthScreen = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <ModalTemplate>
      {props.closeButtonComponent}
      {isLogin ? (
        <LoginModal
          changeAuthScreen={changeAuthScreen}
          closeModal={() => props.closeModal && props.closeModal()}
        />
      ) : (
        <SignupModal
          changeAuthScreen={changeAuthScreen}
          closeModal={() => props.closeModal && props.closeModal()}
        />
      )}
    </ModalTemplate>
  );
};
export default React.memo(AuthModal);
