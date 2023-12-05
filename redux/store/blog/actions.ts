export type ACTION_INSTANCE =
  | ReturnType<typeof SET_FIRST_CATEGORY_ID_AND_NAME>
  | ReturnType<typeof SET_FIRST_CATEGORY_LIST>
  | ReturnType<typeof SET_SECOND_CATEGORY_ID_AND_NAME>
  | ReturnType<typeof SET_SECOND_CATEGORY_LIST>
  | ReturnType<typeof SET_BLOG_POST_LIST>;

type FIRST_CATEGORY_STATE = {
  firstCategoryId: string;
  firstCategoryName: string;
};
export const SET_FIRST_CATEGORY_ID_AND_NAME = (
  payload: FIRST_CATEGORY_STATE
) => {
  return {
    type: 'FIRST_CATEGORY_ID_AND_NAME',
    payload: payload,
  };
};

type SECOND_CATEGORY_STATE = {
  secondCategoryId: string;
  secondCategoryName: string;
};
export const SET_SECOND_CATEGORY_ID_AND_NAME = (
  payload: SECOND_CATEGORY_STATE
) => {
  return {
    type: 'SECOND_CATEGORY_ID_AND_NAME',
    payload: payload,
  };
};

type FIRST_CATEGORY_LIST_STATE = {
  firstCategoryList: string;
};
export const SET_FIRST_CATEGORY_LIST = (payload: FIRST_CATEGORY_LIST_STATE) => {
  return {
    type: 'FIRST_CATEGORY_LIST',
    payload: payload,
  };
};

type SECOND_CATEGORY_LIST_STATE = {
  secondCategoryList: string;
};
export const SET_SECOND_CATEGORY_LIST = (
  payload: SECOND_CATEGORY_LIST_STATE
) => {
  return {
    type: 'SECOND_CATEGORY_LIST',
    payload: payload,
  };
};

type BLOG_POST_LIST_STATE = {
  blogPostList: [];
};
export const SET_BLOG_POST_LIST = (payload: BLOG_POST_LIST_STATE) => {
  return {
    type: 'BLOG_POST_LIST',
    payload: payload,
  };
};
