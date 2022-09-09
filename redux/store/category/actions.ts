const FIRST_CATEGORY_PATH = "FIRST_CATEGORY_PATH";
const SECOND_CATEGORY_STATE = "SECOND_CATEGORY_STATE";

export type ACTION_INSTANCE =
  | ReturnType<typeof FIRST_CATEGORY_ACTION>
  | ReturnType<typeof SECOND_CATEGORY_ACTION>;

type FIRST_CATEGORY_STATE = {
  firstCategoryPath: string;
};
export const FIRST_CATEGORY_ACTION = (payload: FIRST_CATEGORY_STATE) => {
  return {
    type: FIRST_CATEGORY_PATH,
    payload: payload.firstCategoryPath,
  };
};

type SECOND_CATEGORY_STATE = {
  secondCategoryPath: string;
};
export const SECOND_CATEGORY_ACTION = (payload: SECOND_CATEGORY_STATE) => {
  return {
    type: SECOND_CATEGORY_STATE,
    payload: payload.secondCategoryPath,
  };
};
