import * as actions from "./actions";
import { dateFormat4y2m2d } from "../../../utils/fucntion/dateFormat";

const initialState = {
  nowTodoDate: dateFormat4y2m2d(new Date()),
  monthTodoDates: {},
};

export const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "NOW_TODO_DATE":
      return { ...state, nowTodoDate: action.payload };
    case "MONTH_TODO_DATE":
      return { ...state, monthTodoDates: action.payload };
    default:
      return state;
  }
};
