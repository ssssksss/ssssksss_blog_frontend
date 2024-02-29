export type ACTION_INSTANCE =
  | ReturnType<typeof SET_BLOG_POST_LIST>
  | ReturnType<typeof SET_ACTIVE_BLOG_FIRST_CATEGORY>
  | ReturnType<typeof SET_ACTIVE_BLOG_SECOND_CATEGORY>
  | ReturnType<typeof SET_ACTIVE_BLOG_USER_ID>
  | ReturnType<typeof SET_BLOG_CATEGORY_LIST>;

type BLOG_POST_LIST_STATE = {
  blogList: [];
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
  payload: ACTIVE_BLOG_FIRST_CATEGORY_STATE,
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
  payload: ACTIVE_BLOG_SECOND_CATEGORY_STATE,
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
  SET_BLOG_POST_LIST,
  SET_ACTIVE_BLOG_FIRST_CATEGORY,
  SET_ACTIVE_BLOG_SECOND_CATEGORY,
  SET_ACTIVE_BLOG_USER_ID,
  SET_BLOG_CATEGORY_LIST,
};

export default blogAction;
