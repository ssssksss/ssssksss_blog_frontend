import * as actions from "./actions";
const initialState = {
  type: "info",
  message: "가출한토토로의 블로그에 오신것을 환영합니다.",
};

export const toastifyReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "TOASTIFY_MESSAGE":
      return {
        ...state,
        type: action.payload.type,
        message: action.payload.message,
      };
    default:
      return state;
  }
};
