import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  keyword: string;
  page: number;
  size: number;
  sort: string;
};

const initialState: InitialState = {
  keyword: '',
  page: 0,
  size: 10,
  sort: '',
};

const boardSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBoardListOption: (state, action) => {
      state.keyword = action.payload.keyword;
      state.page = action.payload.page;
      state.size = action.payload.size;
      state.sort = action.payload.sort;
    },
  },
});
export const boardReducer = boardSlice.reducer;
export const boardAction = boardSlice.actions;
