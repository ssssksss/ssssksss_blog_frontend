export type ACTION_INSTANCE =
  | ReturnType<typeof SET_CURRENT_SCHEDULE_DATE>
  | ReturnType<typeof SET_MONTH_SCHEDULE_DATA>
  | ReturnType<typeof SET_CALENDAR_YEAR>
  | ReturnType<typeof SET_CALENDAR_MONTH>
  | ReturnType<typeof SET_CALENDAR_DAY>
  | ReturnType<typeof SET_CALENDAR_DAY_OF_WEEK>
  | ReturnType<typeof SET_CALENDAR_START_DATE_OF_WEEK_LIST>;

type CURRENT_SCHEDULE_DATE_STATE = {
  currentScheduleDate: string;
};
/**
 * @param 달력에서 날짜를 클릭하였을 떄의 날짜를 담아두는 action
 */
export const SET_CURRENT_SCHEDULE_DATE = (
  payload: CURRENT_SCHEDULE_DATE_STATE
) => {
  return {
    type: 'CURRENT_SCHEDULE_DATE',
    payload: payload,
  };
};

type MONTH_SCHEDULE_DATA_STATE = {
  monthScheduleDate: [];
};
/**
 * @param 한달정도의 날짜에 대한 일정을 담아두는 action
 */
export const SET_MONTH_SCHEDULE_DATA = (payload: MONTH_SCHEDULE_DATA_STATE) => {
  return {
    type: 'MONTH_SCHEDULE_DATA',
    payload: payload,
  };
};
type SET_CALENDAR_YEAR_STATE = {
  calendarYear: string;
};
/**
 * @param 달력에서 보이는 연도(year) 설정
 */
export const SET_CALENDAR_YEAR = (payload: CALENDAR_YEAR_STATE) => {
  return {
    type: 'CALENDAR_YEAR',
    payload: payload,
  };
};
type SET_CALENDAR_MONTH_STATE = {
  calendarMonth: string;
};
/**
 * @param 달력에서 보이는 월(month, 0~11) 설정
 */
export const SET_CALENDAR_MONTH = (payload: SET_CALENDAR_MONTH_STATE) => {
  return {
    type: 'CALENDAR_MONTH',
    payload: payload,
  };
};
type SET_CALENDAR_DAY_STATE = {
  calendarDay: string;
};
/**
 * @param 달력에서 보이는 일(day) 설정
 */
export const SET_CALENDAR_DAY = (payload: SET_CALENDAR_DAY_STATE) => {
  return {
    type: 'CALENDAR_DAY',
    payload: payload,
  };
};
type SET_CALENDAR_DAY_OF_WEEK_STATE = {
  calendarDayOFWeeK: string;
};
/**
 * @param 달력에서 보이는 요일(day of week) 설정
 */
export const SET_CALENDAR_DAY_OF_WEEK = (
  payload: SET_CALENDAR_DAY_OF_WEEK_STATE
) => {
  return {
    type: 'CALENDAR_DAY_OF_WEEK',
    payload: payload,
  };
};
type SET_CALENDAR_START_DATE_OF_WEEK_LIST_STATE = {
  calendarStartDateOfWeekList: [];
};
/**
 * @param 달력에서 각주의 첫재날짜를 모아놓은 배열
 */
export const SET_CALENDAR_START_DATE_OF_WEEK_LIST = (
  payload: SET_CALENDAR_START_DATE_OF_WEEK_LIST_STATE
) => {
  return {
    type: 'CALENDAR_START_DATE_OF_WEEK_LIST',
    payload: payload,
  };
};
