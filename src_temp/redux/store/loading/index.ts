import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: false },
  reducers: {
    setIsLoading: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setIsLoading } = loadingSlice.actions;
export default loadingSlice.reducer;

const loadingAction = {
  setIsLoading,
};

export { loadingAction };
