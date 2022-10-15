import * as actions from "./actions";
import { dateFormat4y2m2d } from "../../../utils/fucntion/dateFormat";

const initialState = {
  nowPlanDate: dateFormat4y2m2d(new Date()),
  monthPlanDates: {},
};

export const planReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "NOW_PLAN_DATE":
      return { ...state, nowPlanDate: action.payload };
    case "MONTH_PLAN_DATE":
      return { ...state, monthPlanDates: action.payload };
    default:
      return state;
  }
};
