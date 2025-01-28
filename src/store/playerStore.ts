import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의

interface playerStoreState {
  currentYoutube: IYoutube;
  currentYoutubePlaylist: IYoutubePlaylist;
  youtubePlay: boolean;
  isFetchYoutubePlaylist: boolean;
  playlist: IYoutubePlaylist[];
  playRepeatType: string | null;
  isPlayRandom: boolean;
  isMuted: boolean;
}

// 2. 액션 인터페이스 정의
interface playerStoreActions {
  initialize: () => void;
  removeCurrentYoutube: () => void;
  setPlayer: (data: Partial<playerStoreState>) => void;
}

// 3. 초기 상태 정의
const initialState: playerStoreState = {
  currentYoutube: {
    id: 0,
    imageUrl: "",
    tags: "",
    title: "",
    youtubeUrl: "",
  },
  currentYoutubePlaylist: {
    id: 0,
    title: "",
    youtubeList: [],
  },
  playRepeatType: null,
  isPlayRandom: false,
  playlist: [],
  youtubePlay: false,
  isFetchYoutubePlaylist: false, // 한번 서버에 요청을 하면 이후에 모달창을 열 경우 요청을 보내지 않음
  isMuted: false,
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
    }),
  removeCurrentYoutube: () =>
    set((state) => ({
      ...state,
      youtubePlay: false,
      currentYoutube: {
        id: 0,
        imageUrl: "",
        tags: "",
        title: "",
        youtubeUrl: "",
      },
    })),
  setPlayer: (data) =>
    set((state) => ({
      ...state,
      ...data, // 기존 상태와 병합
    })),
});

const usePlayerStore = create<playerStoreState & playerStoreActions>(
  // devtools와 관련된 타입에러인데 나중에 해결
  // @ts-ignore
  process.env.NODE_ENV === "development" ? devtools(playerStore) : playerStore,
);

export type usePlayerStoreType = playerStoreState & playerStoreActions;

export default usePlayerStore;
