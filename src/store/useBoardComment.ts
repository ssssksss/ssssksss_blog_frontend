import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스
interface BoardCommentState {
  boardCommentList: IBoardComment[];
}

// 2. 액션 인터페이스
interface BoardCommentActions {
  initialize: () => void;
  setBoardCommentList: (list: IBoardComment[]) => void;
}

// 3. 초기 상태
const initialState: BoardCommentState = {
  boardCommentList: [],
};

// 4. 상태 및 액션 생성
const boardCommentStore: StateCreator<
  BoardCommentState & BoardCommentActions
> = (set) => ({
  ...initialState,

  // 상태 초기화
  initialize: () => set({...initialState}),

  // 댓글 리스트를 새로 설정 (가공된 데이터 처리도 가능)
  setBoardCommentList: (list) => set((state) => ({boardCommentList: list})),
});

// 5. 스토어 생성
const useBoardCommentStore = create<BoardCommentState & BoardCommentActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(boardCommentStore)
    : boardCommentStore,
);

// 타입 export
export type UseBoardCommentStoreType = BoardCommentState & BoardCommentActions;
export default useBoardCommentStore;
