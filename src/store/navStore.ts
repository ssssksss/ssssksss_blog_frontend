import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface NavStoreState {
  leftPath: string;
}

// 2. 액션 인터페이스 정의
interface NavStoreActions {
  initialize: () => void;
  setState: ({ leftPath }: { leftPath: string }) => void;
}

// 3. 초기 상태 정의
const initialState: NavStoreState = {
  leftPath: "", // 왼쪽 경로 저장
};

// 4. 상태 및 액션 생성
const navStore: StateCreator<NavStoreState & NavStoreActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      leftPath: "",
    }),
  setState: ({ leftPath }: { leftPath: string }) =>
    set(() => ({
      leftPath: leftPath,
    })),
});

const useNavStore = create<NavStoreState & NavStoreActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(navStore) : navStore,
);

export type useNavStoreType = NavStoreState & NavStoreActions;

export default useNavStore;
