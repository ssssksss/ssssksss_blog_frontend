import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 1. 상태 인터페이스 정의
interface playerStoreState {
  youtubePlay: boolean;
  youtubeTitle: string;
}

// 2. 액션 인터페이스 정의
interface playerStoreActions {
  initialize: () => void;
  setPlayer: (data: Partial<playerStoreState>) => void;
}

// 3. 초기 상태 정의
const initialState: playerStoreState = {
  youtubePlay: false,
  youtubeTitle: '',
};

// 4. 상태 및 액션 생성
const playerStore: StateCreator<playerStoreState & playerStoreActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
      youtubePlay: false,
      youtubeTitle: "",
    }),
  setPlayer: (data) =>
    set(() => ({
      ...data,
    })),
});

const usePlayerStore = create<
  playerStoreState & playerStoreActions
>()<any>(
  process.env.NODE_ENV === 'development'
    ? devtools(playerStore)
    : playerStore,
);

export type usePlayerStoreType = playerStoreState & playerStoreActions;

export default usePlayerStore;
