import { IBlogCategoryListResProps } from '@api/type/BlogAPI';
import * as actions from './actions';

type initialStateType = {
  firstCategoryId: number | string;
  firstCategoryName: string;
  secondCategoryId: number | string;
  secondCategoryName: string;
  firstCategoryList: [];
  secondCategoryList: [];
  blogList: [];
  activeBlogFirstCategoryId: number;
  activeBlogSecondCategoryId: number;
  activeBlogFirstCategoryName: number;
  activeBlogSecondCategoryName: number;
  activeBlogUserId: number;
  blogCategoryList: IBlogCategoryListResProps;
};
const initialState: initialStateType = {
  firstCategoryId: '',
  firstCategoryName: '',
  secondCategoryId: '',
  secondCategoryName: '',
  firstCategoryList: [],
  secondCategoryList: [],
  blogList: [],
  activeBlogFirstCategoryId: -1,
  activeBlogSecondCategoryId: -1,
  activeBlogUserId: -1,
  blogCategoryList: [],
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
