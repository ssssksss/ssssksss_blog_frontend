export type ACTION_INSTANCE = ReturnType<typeof SET_BLOG_CONTENT_TEMPLATE_LIST>;

type BLOG_CONTENT_TEMPLATE_LIST_STATE = {
  blogContentTemplateList: [];
};
export const SET_BLOG_CONTENT_TEMPLATE_LIST = (
  payload: BLOG_CONTENT_TEMPLATE_LIST_STATE
) => {
  return {
    type: 'BLOG_CONTENT_TEMPLATE_LIST',
    payload: payload,
  };
};
