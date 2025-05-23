import { getAccessibleColorPair } from "@utils/function/colorContrasts";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface ColorState {
  foreground: string;
  background: string;
}

// 2. 액션 인터페이스 정의
interface ColorActions {
  regenerate: () => void;
  initialize: () => void;
  setColorPair: (foreground: string, background: string) => void;
}

// 3. 초기 상태 정의
const initialState: ColorState = {
  foreground: "#000000",
  background: "#ffffff",
};

// 4. 상태 및 액션 생성
const colorStore: StateCreator<ColorState & ColorActions> = (set, get) => ({
  ...initialState,
  regenerate: () => set(getAccessibleColorPair()),
  initialize: () => set({...initialState}),
  setColorPair: (foreground, background) => set({foreground, background}),
});

// 5. store 생성
const useColorStore = create<ColorState & ColorActions>(
  // @ts-ignore - devtools 미들웨어 타입 충돌 무시
  process.env.NODE_ENV === "development" ? devtools(colorStore) : colorStore,
);

export type useColorStoreType = ColorState & ColorActions;

export default useColorStore;
