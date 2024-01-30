export type ACTION_INSTANCE =
  | ReturnType<typeof SET_FIRST_CATEGORY_ID_AND_NAME>
  | ReturnType<typeof SET_FIRST_CATEGORY_LIST>
  | ReturnType<typeof SET_SECOND_CATEGORY_ID_AND_NAME>
  | ReturnType<typeof SET_SECOND_CATEGORY_LIST>
  | ReturnType<typeof SET_BLOG_POST_LIST>
  | ReturnType<typeof SET_ACTIVE_BLOG_FIRST_CATEGORY>
  | ReturnType<typeof SET_ACTIVE_BLOG_SECOND_CATEGORY>
  | ReturnType<typeof SET_ACTIVE_BLOG_USER_ID>
  | ReturnType<typeof SET_BLOG_CATEGORY_LIST>;

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

type ACTIVE_BLOG_FIRST_CATEGORY_STATE = {
  activeBlogFirstCategoryId: string;
};
export const SET_ACTIVE_BLOG_FIRST_CATEGORY = (
  payload: ACTIVE_BLOG_FIRST_CATEGORY_STATE
) => {
  return {
    type: 'ACTIVE_BLOG_FIRST_CATEGORY',
    payload: payload,
  };
};

type ACTIVE_BLOG_SECOND_CATEGORY_STATE = {
  activeBlogSecondCategoryId: string;
};
export const SET_ACTIVE_BLOG_SECOND_CATEGORY = (
  payload: ACTIVE_BLOG_SECOND_CATEGORY_STATE
) => {
  return {
    type: 'ACTIVE_BLOG_SECOND_CATEGORY',
    payload: payload,
  };
};

type ACTIVE_BLOG_USER_ID_STATE = {
  activeBlogUserId: number;
};
export const SET_ACTIVE_BLOG_USER_ID = (payload: ACTIVE_BLOG_USER_ID_STATE) => {
  return {
    type: 'ACTIVE_BLOG_USER_ID',
    payload: payload,
  };
};

type BLOG_CATEGORY_LIST_STATE = {
  blogCategoryList: number;
};
export const SET_BLOG_CATEGORY_LIST = (payload: BLOG_CATEGORY_LIST_STATE) => {
  return {
    type: 'BLOG_CATEGORY_LIST',
    payload: payload,
  };
};

const blogAction = {
  SET_FIRST_CATEGORY_ID_AND_NAME,
  SET_SECOND_CATEGORY_ID_AND_NAME,
  SET_FIRST_CATEGORY_LIST,
  SET_SECOND_CATEGORY_LIST,
  SET_BLOG_POST_LIST,
  SET_ACTIVE_BLOG_FIRST_CATEGORY,
  SET_ACTIVE_BLOG_SECOND_CATEGORY,
  SET_ACTIVE_BLOG_USER_ID,
  SET_BLOG_CATEGORY_LIST,
};

export default blogAction;
