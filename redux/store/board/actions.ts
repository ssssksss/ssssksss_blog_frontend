export type ACTION_INSTANCE = ReturnType<typeof SET_BOARD_LIST_OPTION>;

type BOARD_LIST_OPTION_STATE = {
  keyword: string;
  page: number;
  size: number;
  sort: string;
};
export const SET_BOARD_LIST_OPTION = (payload: BOARD_LIST_OPTION_STATE) => {
  return {
    type: 'BOARD_LIST_OPTION',
    payload: payload,
  };
};

const boardAction = {
  SET_BOARD_LIST_OPTION,
};

export default boardAction;
