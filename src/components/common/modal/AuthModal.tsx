import React, { useCallback, useState } from 'react';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file AuthModal.tsx
 * @version 0.0.1 "2023-09-24 15:57:48"
 * @description 설명
 */
const AuthModal = (props) => {
  const [isLogin, setIsLogin] = useState(true);
  const changeAuthScreen = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <>
      {isLogin ? (
        <LoginModal changeAuthScreen={changeAuthScreen} {...props} />
      ) : (
        <SignupModal changeAuthScreen={changeAuthScreen} {...props} />
      )}
    </>
  );
};
export default React.memo(AuthModal);
