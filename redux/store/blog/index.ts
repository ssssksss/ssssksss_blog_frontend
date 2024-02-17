import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './reducers';

type InitialState = {
  blogListOrderOption: number;
};

const initialState: InitialState = {
  blogListOrderOption: '',
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogListOrderOption: (state, action) => {
      state.blogListOrderOption = action.payload.blogListOrderOption;
    },
  },
});
export const { setBlogOrderListOption } = blogSlice.actions;
export default blogSlice;
