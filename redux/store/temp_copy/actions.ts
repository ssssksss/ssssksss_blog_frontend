export type ACTION_INSTANCE =
  | ReturnType<typeof SET_COPY1>
  | ReturnType<typeof SET_COPY2>;

type MEMO_LIST_STATE = {
  memoList: [];
};
export const SET_MEMO_LIST = (payload: MEMO_LIST_STATE) => {
  return {
    type: 'MEMO_LIST',
    payload: payload,
  };
};
