import * as actions from "./actions";
const initialState = {
  firstCategory: "frontend",
  secondCategory: "html",
};
export const categoryReducer = (state = initialState, action: actions.ACTION_INSTANCE) => {
  switch (action.type) {
    case "FIRST_CATEGORY_PATH":
      return { ...state, firstCategory: action.payload };
    case "SECOND_CATEGORY_PATH":
      return { ...state, secondCategory: action.payload };
    default:
      return state;
  }
};
