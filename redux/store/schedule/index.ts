import { createSlice } from '@reduxjs/toolkit';

export * from './actions';
export * from './reducers';

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState: { calendarMonthAllDates: [] },
  reducers: {
    setIsCalendarMonthAllDates: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { setIsCalendarMonthAllDates } = scheduleSlice.actions;
export default scheduleSlice.reducer;
