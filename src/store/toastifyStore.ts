import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface ToastifyStoreState {
  // type: "success" | "error" | "warning" | "info" | "default",
  type: string,
  message: string,
  duration?: number
}

// 2. 액션 인터페이스 정의
interface ToastifyStoreActions {
  initialize: () => void;
  setToastify: (data: Partial<ToastifyStoreState>) => void;
}

// 3. 초기 상태 정의
const initialState: ToastifyStoreState = {
  type: "",
  message: "",
  duration: 1000
};

// 4. 상태 및 액션 생성
const toastifyStore: StateCreator<ToastifyStoreState & ToastifyStoreActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      type: "default",
      message: "",
      duration: 1000,
    }),
  setToastify: (data) =>
    set(() => ({
      type: data.type || "success",
      message: data.message,
      duration: data.duration || 1000
    })),
});

const useToastifyStore = create<ToastifyStoreState & ToastifyStoreActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(toastifyStore) : toastifyStore,
);

export type useToastifyStoreType = ToastifyStoreState & ToastifyStoreActions;

export default useToastifyStore;
