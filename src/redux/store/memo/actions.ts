export type ACTION_INSTANCE =
  | ReturnType<typeof SET_MEMO_LIST>
  | ReturnType<typeof SET_MEMO_CATEGORY_LIST>;

type MEMO_LIST_STATE = {
  memoList: [];
};
export const SET_MEMO_LIST = (payload: MEMO_LIST_STATE) => {
  return {
    type: 'MEMO_LIST',
    payload: payload,
  };
};

type MEMO_CATEGORY_LIST_STATE = {
  memoCategoryList: [];
};
export const SET_MEMO_CATEGORY_LIST = (payload: MEMO_CATEGORY_LIST_STATE) => {
  return {
    type: 'MEMO_CATEGORY_LIST',
    payload: payload,
  };
};

const memoAction = {
  SET_MEMO_LIST,
  SET_MEMO_CATEGORY_LIST,
};

export default memoAction;
