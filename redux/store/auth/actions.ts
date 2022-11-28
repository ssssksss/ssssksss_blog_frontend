// export type ACTION_INSTANCE = ReturnType<
//   typeof setUserInfo | typeof setAccessToken
// >;

export type AuthActionType =
  | ReturnType<typeof setUserInfo>
  | ReturnType<typeof setAccessToken>;

// 타입의 역할 : 파라미터로 들어오는 인자값들의 변수 타입을 정의한다.
type USER_INFO_STATE = {
  email: string;
  role: string;
  nickname: string;
};

// 액션 함수의 역할 : 파라미터로 인자값을 받아서 redux의 state값을 어떻게 바꿀지를 작성한다.
export const setUserInfo = (user: USER_INFO_STATE) => {
  return {
    type: "SET_USER_INFO",
    payload: {
      email: user.email,
      role: user.role,
      nickname: user.nickname,
    },
  };
};

type ACCESS_TOKEN_STATE = {
  accessToken: string;
};
export const setAccessToken = (accessToken: ACCESS_TOKEN_STATE) => {
  return {
    type: "SET_ACCESS_TOKEN",
    payload: {
      accessToken: accessToken,
    },
  };
};
