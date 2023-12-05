import * as actions from './actions';
const initialState = {
  blogContentTemplateList: [],
};
export const blogContentTemplateReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'BLOG_CONTENT_TEMPLATE_LIST':
      return { ...state, blogContentTemplateList: action.payload };
    default:
      return state;
  }
};
