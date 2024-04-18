export type ACTION_INSTANCE =
  | ReturnType<typeof SET_CURRENT_SCHEDULE_DATE>
  | ReturnType<typeof SET_MONTH_SCHEDULE_DATA>
  | ReturnType<typeof SET_CALENDAR>
  | ReturnType<typeof SET_CALENDAR_YEAR>
  | ReturnType<typeof SET_CALENDAR_MONTH>
  | ReturnType<typeof SET_CALENDAR_DAY>
  | ReturnType<typeof SET_CALENDAR_DAY_OF_WEEK>
  | ReturnType<typeof SET_CALENDAR_START_DATE_OF_WEEK_LIST>
  | ReturnType<typeof SET_TODAY_SCHEDULE_LIST>
  | ReturnType<typeof SET_SCHEDULE_CATEGORY_LIST>
  | ReturnType<typeof SET_MONTH_SCHEDULE_LIST>
  | ReturnType<typeof SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE>;

/**
 * @param 달력에서 날짜를 클릭하였을 떄의 날짜를 담아두는 action
 */
export const SET_CURRENT_SCHEDULE_DATE = (payload: string) => {
  return {
    type: 'CURRENT_SCHEDULE_DATE',
    payload: payload,
  };
};

/**
 * @param 한달정도의 날짜에 대한 일정을 담아두는 action
 */
export const SET_MONTH_SCHEDULE_DATA = (payload: []) => {
  return {
    type: 'MONTH_SCHEDULE_DATA',
    payload: payload,
  };
};
/**
 * @param 달력
 */
type SET_CALENDAR_STATE = {
  calendar: [];
};
export const SET_CALENDAR = (payload: SET_CALENDAR_STATE) => {
  return {
    type: 'CALENDAR',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 연도(year) 설정
 */
export const SET_CALENDAR_YEAR = (payload: string) => {
  return {
    type: 'CALENDAR_YEAR',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 월(month, 0~11) 설정
 */
export const SET_CALENDAR_MONTH = (payload: string) => {
  return {
    type: 'CALENDAR_MONTH',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 일(day) 설정
 */
export const SET_CALENDAR_DAY = (payload: string) => {
  return {
    type: 'CALENDAR_DAY',
    payload: payload,
  };
};
/**
 * @param 달력에서 보이는 요일(day of week) 설정
 */
export const SET_CALENDAR_DAY_OF_WEEK = (payload: string) => {
  return {
    type: 'CALENDAR_DAY_OF_WEEK',
    payload: payload,
  };
};

/**
 * @description 달력에서 각주의 첫재날짜를 모아놓은 배열
 */
export const SET_CALENDAR_START_DATE_OF_WEEK_LIST = (payload: []) => {
  return {
    type: 'CALENDAR_START_DATE_OF_WEEK_LIST',
    payload: payload,
  };
};

/**
 * @description 오늘의 할일들을 모아놓는 배열
 */
export const SET_TODAY_SCHEDULE_LIST = (payload: []) => {
  return {
    type: 'TODAY_SCHEDULE_LIST',
    payload: payload,
  };
};

/**
 * @description 할일의 카테고리를 모아놓은 배열
 */
export const SET_SCHEDULE_CATEGORY_LIST = (payload: []) => {
  return {
    type: 'SCHEDULE_CATEGORY_LIST',
    payload: payload,
  };
};

/**
 * @description 할일의 1달의 일정을 모아놓은 배열
 */
export const SET_MONTH_SCHEDULE_LIST = (payload: []) => {
  return {
    type: 'MONTH_SCHEDULE_LIST',
    payload: payload,
  };
};

type TOGGLE_UP_TO_DATE_MONTH_SCHEDULE_STATE = {
  toggleUptoDateMonthSchedule: boolean;
};
/**
 * @description 할일의 1달의 일정을 모아놓은 배열
 */
export const SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE = (
  payload: TOGGLE_UP_TO_DATE_MONTH_SCHEDULE_STATE,
) => {
  return {
    type: 'TOGGLE_UP_TO_DATE_MONTH_SCHEDULE',
    payload: payload,
  };
};

const scheduleAction = {
  SET_CURRENT_SCHEDULE_DATE,
  SET_MONTH_SCHEDULE_DATA,
  SET_CALENDAR,
  SET_CALENDAR_YEAR,
  SET_CALENDAR_MONTH,
  SET_CALENDAR_DAY,
  SET_CALENDAR_DAY_OF_WEEK,
  SET_CALENDAR_START_DATE_OF_WEEK_LIST,
  SET_TODAY_SCHEDULE_LIST,
  SET_SCHEDULE_CATEGORY_LIST,
  SET_MONTH_SCHEDULE_LIST,
  SET_TOGGLE_UP_TO_DATE_MONTH_SCHEDULE,
};

export default scheduleAction;
