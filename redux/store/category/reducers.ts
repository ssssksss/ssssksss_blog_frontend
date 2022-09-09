import * as actions from "./actions";
const initialState = {
  firstCategoryPath: "",
  secondCategoryPath: "",
};
export const categoryReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case "FIRST_CATEGORY_PATH":
      return { ...state, firstCategoryPath: action.payload };
    case "SECOND_CATEGORY_STATE":
      return { ...state, secondCategoryPath: action.payload };
    default:
      return state;
  }
};
