import { IBlogCategoryListResProps } from '@api/type/BlogAPI';
import * as actions from './actions';

type initialStateType = {
  blogList: [];
  activeBlogFirstCategoryId: number;
  activeBlogSecondCategoryId: number;
  activeBlogFirstCategoryName: number;
  activeBlogSecondCategoryName: number;
  activeBlogUserId: number;
  blogCategoryList: IBlogCategoryListResProps;
};
const initialState: initialStateType = {
  blogList: [],
  activeBlogFirstCategoryId: -1,
  activeBlogSecondCategoryId: -1,
  activeBlogUserId: -1,
  blogCategoryList: [],
};
export const blogReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE,
) => {
  switch (action.type) {
    case 'BLOG_POST_LIST':
      return {
        ...state,
        blogList: action.payload,
      };
    // case 'ACTIVE_BLOG_FIRST_CATEGORY':
    case 'ACTIVE_BLOG_FIRST_CATEGORY':
      return {
        ...state,
        activeBlogFirstCategoryId: action.payload.activeBlogFirstCategoryId,
        activeBlogFirstCategoryName: action.payload.activeBlogFirstCategoryName,
      };
    case 'ACTIVE_BLOG_SECOND_CATEGORY':
      return {
        ...state,
        activeBlogSecondCategoryId: action.payload.activeBlogSecondCategoryId,
        activeBlogSecondCategoryName:
          action.payload.activeBlogSecondCategoryName,
      };
    case 'ACTIVE_BLOG_USER_ID':
      return {
        ...state,
        activeBlogUserId: action.payload,
      };
    case 'BLOG_CATEGORY_LIST':
      return {
        ...state,
        blogCategoryList: action.payload,
      };
    default:
      return state;
  }
};
