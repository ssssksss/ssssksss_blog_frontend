export type ACTION_INSTANCE =
  | ReturnType<typeof SET_CURRENT_SCHEDULE_DATE>
  | ReturnType<typeof SET_MONTH_SCHEDULE_DATA>;

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
    type: "CURRENT_SCHEDULE_DATE",
    payload: payload,
  };
};

type SET_MONTH_SCHEDULE_DATA_STATE = {
  monthScheduleDate: [];
};
/**
 * @param 한달정도의 날짜에 대한 일정을 담아두는 action
 */
export const SET_MONTH_SCHEDULE_DATA = (
  payload: SET_MONTH_SCHEDULE_DATA_STATE
) => {
  return {
    type: "MONTH_SCHEDULE_DATA",
    payload: payload,
  };
};
