// import { IMemoCategory } from 'src/@types/memo/memoCategory';
// import { IMemoItem } from 'src/@types/memo/memoItem';
import * as actions from './actions';
// 상태 타입 정의
interface MemoState {
  // memoList: IMemoItem[];
  // memoCategoryList: IMemoCategory[];
  memoActiveCategoryId: number;
}

// 초기 상태 정의
const initialState: MemoState = {
  // memoList: [],
  // memoCategoryList: [],
  memoActiveCategoryId: 0,
};

export const memoReducer = (
  state = initialState,
  action: actions.ACTION_INSTANCE
) => {
  switch (action.type) {
    case 'ACTIVE_CATEGORY_ID':
      return { ...state, memoActiveCategoryId: action.payload };
    // case 'MEMO_LIST':
    //   return { ...state, memoList: action.payload };
    // case 'SET_MEMO_CATEGORY_LIST':
    //   return {
    //     ...state,
    //     memoCategoryList: [...state.memoCategoryList, ...action.payload as []],
    //   };
    default:
      return state;
  }
};