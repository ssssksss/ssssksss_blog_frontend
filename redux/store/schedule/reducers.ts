import * as actions from "./actions";
import { dateFormat4y2m2d } from "../../../utils/fucntion/dateFormat";

const initialState = {
  // currentScheduleDate: dateFormat4y2m2d(new Date()),
  currentScheduleDate: "",
  monthScheduleData: [],
};

export const scheduleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "CURRENT_SCHEDULE_DATE":
      return { ...state, currentScheduleDate: action.payload };
    // 저번달, 이번달, 다음달의 일정을 모두 보관하는 state
    case "MONTH_SCHEDULE_DATA":
      return { ...state, monthScheduleData: action.payload };
    default:
      return state;
  }
};
