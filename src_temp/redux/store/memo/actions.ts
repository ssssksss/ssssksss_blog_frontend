
export type ACTION_INSTANCE =
  | ReturnType<typeof SET_ACTIVE_CATEGORY_ID>;
  // | ReturnType<typeof SET_MEMO_LIST>
  // | ReturnType<typeof SET_MEMO_CATEGORY_LIST>;

export const SET_ACTIVE_CATEGORY_ID = (payload: number) => {
  return {
    type: 'ACTIVE_CATEGORY_ID',
    payload: payload,
  };
};

// export const SET_MEMO_LIST = (payload: IMemoItem[]) => {
//   return {
//     type: 'MEMO_LIST',
//     payload: payload,
//   };
// };

// export const SET_MEMO_CATEGORY_LIST = (payload: []) => {
//   return {
//     type: 'SET_MEMO_CATEGORY_LIST',
//     payload: payload,
//   };
// };

const memoAction = {
  SET_ACTIVE_CATEGORY_ID,
  // SET_MEMO_LIST,
  // SET_MEMO_CATEGORY_LIST,
};

export default memoAction;
