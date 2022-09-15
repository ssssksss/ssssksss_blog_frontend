export type ACTION_INSTANCE =
  | ReturnType<typeof SET_NOW_TODO_DATE>
  | ReturnType<typeof SET_MONTH_TODO_DATE>;

type NOW_TODO_DATE_STATE = {
  nowTodoDate: string;
};
export const SET_NOW_TODO_DATE = (payload: NOW_TODO_DATE_STATE) => {
  return {
    type: "NOW_TODO_DATE",
    payload: payload,
  };
};

type SET_MONTH_TODO_DATE_STATE = {
  // monthTodoDate: Object | ;
  monthTodoDate: any;
  // monthTodoDate: { [keys: string]: any };
};
export const SET_MONTH_TODO_DATE = (payload: SET_MONTH_TODO_DATE_STATE) => {
  return {
    type: "MONTH_TODO_DATE",
    payload: payload,
  };
};
