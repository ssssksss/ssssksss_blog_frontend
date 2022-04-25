import * as actions from "./actions";
const initialState = {
  accessToken: "",
  secretKey: "",
};

export const authReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case "AUTH_ACCESS_TOKEN":
      return { ...state, accessToken: action.payload };
    default:
      return state;
  }
};
