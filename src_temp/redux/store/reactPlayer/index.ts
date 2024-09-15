import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
  youtubePlay: boolean,
  youtubeTitle: string,
};

const initialState: InitialState = {
  youtubePlay: false,
  youtubeTitle: '',
};

const reactPlayerSlice = createSlice({
  name: 'react-player',
  initialState,
  reducers: {
    setYoutubePlay: (state, action) => {
      state.youtubePlay = action.payload;
    },
    setYoutubeTitle: (state, action) => {
      state.youtubeTitle = action.payload;
    }
  },
});
export const reactPlayerReducer = reactPlayerSlice.reducer;
export const reactPlayerAction = reactPlayerSlice.actions;