// export type ACTION_INSTANCE = ReturnType<
//   typeof SET_USER_INFO | typeof SET_ACCESS_TOKEN
// >;

export type AuthActionType =
  | ReturnType<typeof SET_USER_INFO>
  | ReturnType<typeof SET_ACCESS_TOKEN>;

// 타입의 역할 : 파라미터로 들어오는 인자값들의 변수 타입을 정의한다.
type USER_INFO_STATE = {
  email: string;
  role: string;
  nickname: string;
  id: number;
  suid: string;
};

// 액션 함수의 역할 : 파라미터로 인자값을 받아서 redux의 state값을 어떻게 바꿀지를 작성한다.
export const SET_USER_INFO = (user: USER_INFO_STATE) => {
  return {
    type: 'SET_USER_INFO',
    payload: {
      email: user.email,
      role: user.role,
      nickname: user.nickname,
      id: user.id,
      suid: user.suid,
    },
  };
};

type ACCESS_TOKEN_STATE = {
  accessToken: string;
};
export const SET_ACCESS_TOKEN = (accessToken: ACCESS_TOKEN_STATE) => {
  return {
    type: 'SET_ACCESS_TOKEN',
    payload: {
      accessToken: accessToken,
    },
  };
};

const authAction = {
  SET_USER_INFO,
  SET_ACCESS_TOKEN,
};

export default authAction;
