export type ACTION_INSTANCE =
  | ReturnType<typeof SET_MEMO_LIST>
  | ReturnType<typeof SET_MEMO_CATEGORY_LIST>;

export const SET_MEMO_LIST = (payload: []) => {
  return {
    type: 'MEMO_LIST',
    payload: payload,
  };
};

export const SET_MEMO_CATEGORY_LIST = (payload: []) => {
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
