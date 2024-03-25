import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './reducers';

type InitialState = {
  blogListOrderOption: number;
  blogListOrderOption: '';
  firstCategoryList: {
    String: string;
  };
  secondCategoryList: {
    [key: string]: {
      [key: string]: {
        name: string;
        thumbnailImageUrl: string;
      };
    };
  };
  activeFirstCategory: string;
  activeSecondCategory: string;
};

const initialState: InitialState = {
  blogListOrderOption: '',
  firstCategoryList: {},
  secondCategoryList: {},
  activeFirstCategory: '',
  activeSecondCategory: '',
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
  },
});
export const blog1Reducer = blogSlice.reducer;
export const blog1Action = blogSlice.actions;
