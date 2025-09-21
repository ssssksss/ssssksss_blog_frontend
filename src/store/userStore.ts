import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface UserState {
  email: string;
  id: number;
  nickname: string;
  role: string;
  suid: string;
  profileImagePath: string;
}

// 2. 액션 인터페이스 정의
interface UserActions {
  initialize: () => void;
  setUser: (data: Partial<UserState>) => void;
}

// 3. 초기 상태 정의
const initialState: UserState = {
  email: "",
  role: "",
  nickname: "",
  id: 0,
  suid: "",
  profileImagePath: "",
};

// 4. 상태 및 액션 생성
const userStore: StateCreator<UserState & UserActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      id: -1,
    }),
  setUser: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
});

const useUserStore = create<UserState & UserActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(userStore) : userStore,
);

export type useUserStoreType = UserState & UserActions;

export default useUserStore;
