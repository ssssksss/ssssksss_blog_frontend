import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './reducers';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'purpleTheme' },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;

const themeAction = {
  setTheme,
};

export { themeAction };
