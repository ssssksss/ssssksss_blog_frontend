export type ACTION_INSTANCE =
  | ReturnType<typeof SET_NOW_PLAN_DATE>
  | ReturnType<typeof SET_MONTH_PLAN_DATE>;

type NOW_PLAN_DATE_STATE = {
  nowPlanDate: string;
};
export const SET_NOW_PLAN_DATE = (payload: NOW_PLAN_DATE_STATE) => {
  return {
    type: "NOW_PLAN_DATE",
    payload: payload,
  };
};

type SET_MONTH_PLAN_DATE_STATE = {
  monthPlanDate: object;
};
export const SET_MONTH_PLAN_DATE = (payload: SET_MONTH_PLAN_DATE_STATE) => {
  return {
    type: "MONTH_PLAN_DATE",
    payload: payload,
  };
};
