import * as actions from "./actions";
const initialState = {
  email: "",
  role: "",
};

export const authReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case "AUTH":
      return {
        ...state,
        email: action.payload.email,
        role: action.payload.role,
      };
    default:
      return state;
  }
};
