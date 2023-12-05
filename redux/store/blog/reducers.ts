import * as actions from './actions';
const initialState = {
  firstCategoryId: '',
  firstCategoryName: '',
  secondCategoryId: '',
  secondCategoryName: '',
  firstCategoryList: [],
  secondCategoryList: [],
  blogPostList: [],
};
export const blogReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'FIRST_CATEGORY_ID_AND_NAME':
      return {
        ...state,
        firstCategoryId: action.payload.firstCategoryId,
        firstCategoryName: action.payload.firstCategoryName,
      };
    case 'SECOND_CATEGORY_ID_AND_NAME':
      return {
        ...state,
        secondCategoryId: action.payload.secondCategoryId,
        secondCategoryName: action.payload.secondCategoryName,
      };
    case 'FIRST_CATEGORY_LIST':
      return {
        ...state,
        firstCategoryList: action.payload,
      };
    case 'SECOND_CATEGORY_LIST':
      return {
        ...state,
        secondCategoryList: action.payload,
      };
    case 'BLOG_POST_LIST':
      return {
        ...state,
        blogPostList: action.payload,
      };
    default:
      return state;
  }
};
