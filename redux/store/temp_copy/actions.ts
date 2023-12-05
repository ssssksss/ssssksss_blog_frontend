export type ACTION_INSTANCE =
  | ReturnType<typeof SET_COPY1>
  | ReturnType<typeof SET_COPY2>;

type COPY1_STATE = {
  temp1: string;
};
export const SET_COPY1 = (payload: COPY1_STATE) => {
  return {
    type: 'COPY1_ACTION',
    payload: payload,
  };
};
type COPY2_STATE = {
  temp2: string;
};
export const SET_COPY2 = (payload: COPY2_STATE) => {
  return {
    type: 'COPY2_ACTION',
    payload: payload,
  };
};
