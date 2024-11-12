import React, {useCallback, useState} from "react";
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
    <div
      className={
        "bg-white relative h-full max-h-[28rem] w-[20rem] overflow-scroll rounded-b-2xl bg-white-100 scrollbar-hide"
      }>
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
    </div>
  );
};
export default React.memo(AuthModal);
