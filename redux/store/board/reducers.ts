import * as actions from './actions';
type initialStateType = {
  keyword: string;
  page: number;
  size: number;
  sort: string;
};

const initialState: initialStateType = {
  keyword: undefined,
  page: undefined,
  size: undefined,
  sort: undefined,
};
export const boardReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'BOARD_LIST_OPTION':
      return {
        ...state,
        keyword: action.payload.keyword,
        page: action.payload.page,
        size: action.payload.size,
        sort: action.payload.sort,
      };
    default:
      return state;
  }
};
