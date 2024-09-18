import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

// 1. 상태 인터페이스 정의
interface BlogState {
}

// 2. 액션 인터페이스 정의
interface BlogActions {
  initialize: () => void;
  setBlog: (data: Partial<BlogState>) => void;
}

// 3. 초기 상태 정의
const initialState: BlogState = {
};

// 4. 상태 및 액션 생성
const blogStore: StateCreator<BlogState & BlogActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setBlog: (data) =>
    set(() => ({
      ...data,
    })),
});

const useBlogStore = create<BlogState & BlogActions>()<any>(
  process.env.NODE_ENV === 'development' ? devtools(blogStore) : blogStore,
);

export type useBlogStoreType = BlogState & BlogActions;

export default useBlogStore;
