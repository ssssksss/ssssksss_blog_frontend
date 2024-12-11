import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface LoadingStoreState {
  loading: boolean;
}

// 2. 액션 인터페이스 정의
interface LoadingStoreActions {
  initialize: () => void;
  startLoading: () => void;
  stopLoading: () => void;
}

// 3. 초기 상태 정의
const initialState: LoadingStoreState = {
  loading: false,
};

// 4. 상태 및 액션 생성
const loadingStore: StateCreator<LoadingStoreState & LoadingStoreActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      loading: false,
    }),
  startLoading: () => 
    set(() => ({loading: true})),
  stopLoading: () => 
    set(() => ({loading: false})),
});

const useLoadingStore = create<
  LoadingStoreState & LoadingStoreActions
>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(loadingStore)
    : loadingStore,
);

export type useLoadingStoreType = LoadingStoreState & LoadingStoreActions;

export default useLoadingStore;
