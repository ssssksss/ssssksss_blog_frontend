// 외부에서 정의한 액션 함수를 가져온다.
import { Reducer } from "react";
import * as actions from "./actions";
import { setUserInfo, setAccessToken } from "./actions";

type initialStateType = {
  email: string;
  role: string;
  nickname: string;
  accessToken: string;
};

// 리듀서 역할 1 : state를 정의한다. 실제 사용한 state값들
const initialState: initialStateType = {
  email: "",
  role: "",
  nickname: "",
  accessToken: "",
};

// 리듀서 역할 2 : state를 변경시키는 함수를 정의한다.
// 타입스크립트 state하고 액션인데 나중에 해결
export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER_INFO":
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
        nickname: action.payload.nickname,
      };
    case "SET_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload.accessToken,
      };
    default:
      return state;
  }
};
