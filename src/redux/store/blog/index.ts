import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  blogListOrderOption: string;
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
  activeFirstCategoryList: [];
  activeSecondCategoryList: [];
  activeBlogUserId: number | null;
  blogCategoryList: [];
  blogList: {
    [key: string]: [{
      id: number,
      title: string,
      description: string,
      userId: number,
      likeNumber: number,
      commentNumber: number,
      viewNumber: number,
      firstCategoryId: number,
      secondCategoryId: number,
      thumbnailImageUrl: null | string,
      baseTimeEntity: {
        createdAt: string,
        modifiedAt: string,
        deleteAt: string,
        accessYn: boolean,
      },
      blogStatus: string,
    }];
  };
};

const initialState: InitialState = {
  blogListOrderOption: '',
  firstCategoryList: {},
  secondCategoryList: {},
  activeFirstCategory: null,
  activeSecondCategory: null,
  activeFirstCategoryList: [],
  activeSecondCategoryList: [],
  activeBlogUserId: null,
  blogCategoryList: [],
  blogList: {},
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
    setActiveFirstCategoryList: (state, action) => {
      state.activeFirstCategoryList = action.payload;
    },
    setActiveSecondCategoryList: (state, action) => {
      state.activeSecondCategoryList = action.payload;
    },
    setActiveFirstCategory: (state, action) => {
      state.activeFirstCategory = action.payload;
    },
    setActiveSecondCategory: (state, action) => {
      state.activeSecondCategory = action.payload;
    },
    setActiveBlogUserId: (state, action) => {
      state.activeBlogUserId = action.payload;
    },
    setBlogCategoryList: (state, action) => {
      state.blogCategoryList = action.payload;
    },
    setBlogList: (state, action) => {
      state.blogList = action.payload;
    }
  },
});
export const blogReducer = blogSlice.reducer;
export const blogAction = blogSlice.actions;
