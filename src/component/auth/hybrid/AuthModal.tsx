import React, { useCallback, useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AuthModal.tsx
 * @version 0.0.1 "2023-09-24 15:57:48"
 * @description 설명
 */

interface IAuthModal {
    closeModal: () => void;
}

const AuthModal = (props: IAuthModal) => {
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthScreen = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <div
      className={
        'bg-white-100 relative rounded-b-2xl h-full w-[20rem] max-h-[28rem] overflow-scroll bg-white scrollbar-hide'
      }
    >
      {isLogin ? (
        <LoginModal
          changeAuthScreen={changeAuthScreen}
          closeModal={props.closeModal}
        />
      ) : (
        <SignupModal
          changeAuthScreen={changeAuthScreen}
          closeModal={props.closeModal}
        />
      )}
    </div>
  );
};
export default React.memo(AuthModal);
