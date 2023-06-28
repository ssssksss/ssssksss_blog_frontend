export type ACTION_INSTANCE = ReturnType<typeof SET_FIRST_CATEGORY_PATH> | ReturnType<typeof SET_SECOND_CATEGORY_PATH>;

type FIRST_CATEGORY_STATE = {
  firstCategory: string;
};
export const SET_FIRST_CATEGORY_PATH = (payload: FIRST_CATEGORY_STATE) => {
  return {
    type: "FIRST_CATEGORY_PATH",
    payload: payload,
  };
};

type SECOND_CATEGORY_STATE = {
  secondCategory: string;
};
export const SET_SECOND_CATEGORY_PATH = (payload: SECOND_CATEGORY_STATE) => {
  return {
    type: "SECOND_CATEGORY_PATH",
    payload: payload,
  };
};
