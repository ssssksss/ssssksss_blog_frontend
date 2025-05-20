import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface RefreshState {
  isRefresh: boolean;
}

// 2. 액션 인터페이스 정의
interface RefreshActions {
  initialize: () => void;
  setRefresh: (data: boolean) => void;
}

// 3. 초기 상태 정의
const initialState: RefreshState = {
  isRefresh: false,
};

// 4. 상태 및 액션 생성
const RefreshStore: StateCreator<RefreshState & RefreshActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () => set({...initialState}),
  setRefresh: (data) => set(() => ({isRefresh: data})),
});

const useRefreshStore = create<RefreshState & RefreshActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(RefreshStore)
    : RefreshStore,
);

export type useRefreshStoreType = RefreshState & RefreshActions;

export default useRefreshStore;
