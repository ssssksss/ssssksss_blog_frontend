import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogListOrderOption: number | string;
  firstCategoryList: {
    [key: string]: string;
  };
  secondCategoryList: {
    [key: string]: {
      [key: string]: {
        name: string;
        thumbnailImageUrl: string;
        count: number;
      };
    };
  };
  activeFirstCategory: string;
  activeSecondCategory: string;
  activeBlogUserId: number | null;
};

const initialState: InitialState = {
  blogListOrderOption: '',
  firstCategoryList: {},
  secondCategoryList: {},
  activeFirstCategory: '',
  activeSecondCategory: '',
  activeBlogUserId: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogListOrderOption: (state, action) => {
      state.blogListOrderOption = action.payload.blogListOrderOption;
    },
    setFirstCategoryList: (state, action) => {
      state.firstCategoryList = action.payload;
    },
    setSecondCategoryList: (state, action) => {
      state.secondCategoryList = action.payload;
    },
    setActiveFirstCategory: (state, action) => {
      state.activeFirstCategory = action.payload;
    },
    setActiveSecondCategory: (state, action) => {
      state.activeSecondCategory = action.payload;
    },
    setActiveBlogUserId: (state, action) => {
      state.activeSecondCategory = action.payload;
    },
  },
});
export const blogReducer = blogSlice.reducer;
export const blogAction = blogSlice.actions;
