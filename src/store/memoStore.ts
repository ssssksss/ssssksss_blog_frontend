import {StateCreator, create} from "zustand";
import {devtools} from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface memoStoreState {
  memoList: IMemo[];
}

// 2. 액션 인터페이스 정의
interface memoStoreActions {
  initialize: () => void;
  setMemoList: (data: IMemo[]) => void;
}

// 3. 초기 상태 정의
const initialState: memoStoreState = {
  memoList: [],
};

// 4. 상태 및 액션 생성
const memoStore: StateCreator<memoStoreState & memoStoreActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setMemoList: (data: IMemo[]) =>
    set(() => ({
      memoList: [...data],
    })),
});

const useMemoStore = create<memoStoreState & memoStoreActions>(
  // devtools와 관련된 타입에러인데 나중에 해결
  // @ts-ignore
  process.env.NODE_ENV === "development" ? devtools(memoStore) : memoStore,
);

export type useMemoStoreType = memoStoreState & memoStoreActions;

export default useMemoStore;
