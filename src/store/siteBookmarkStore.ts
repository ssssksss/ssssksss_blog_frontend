import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface SiteBookmarkState {
  siteBookmarkCategoryList: ISiteBookmarkCategory[];
}

// 2. 액션 인터페이스 정의
interface SiteBookmarkActions {
  initialize: () => void;
  setInit: (siteBookmarkCategoryList: ISiteBookmarkCategory[]) => void;
  setSiteBookmarkCategory: ({
    id,
    name,
    siteBookmark,
  }: {
    id: number;
    name: string;
    siteBookmark: ISiteBookmark[];
  }) => void;
  setSiteBookmark: ({
    categoryId,
    id,
    name,
    url,
  }: {
    categoryId: number;
    id: number;
    name: string;
    url: string;
  }) => void;
}

// 3. 초기 상태 정의
const initialState: SiteBookmarkState = {
  siteBookmarkCategoryList: [],
};

// 4. 상태 및 액션 생성
const siteBookmarkStore: StateCreator<
  SiteBookmarkState & SiteBookmarkActions
> = (set, get) => ({
  ...initialState,

  initialize: () => set(initialState),
  setInit: (siteBookmarkCategoryList) =>
    set(() => {
      return {
        siteBookmarkCategoryList,
      };
    }),
  setSiteBookmarkCategory: ({id, name}: {id: number; name: string}) =>
    set((state) => {
      const existingCategory = state.siteBookmarkCategoryList.find(
        (i) => i.id === id,
      );

      if (existingCategory) {
        // 이미 존재하면 업데이트 (또는 무시)
        return {
          siteBookmarkCategoryList: state.siteBookmarkCategoryList.map(
            (category) =>
              category.id === id
                ? {...category, name} // 이름만 업데이트 (siteBookmarkList는 유지)
                : category,
          ),
        };
      } else {
        // 존재하지 않으면 새로 추가
        return {
          siteBookmarkCategoryList: [
            ...state.siteBookmarkCategoryList,
            {id, name, siteBookmarkList: []},
          ],
        };
      }
    }),

  setSiteBookmark: ({
    categoryId,
    id,
    name,
    url,
  }: {
    categoryId: number;
    id: number;
    name: string;
    url: string;
  }) =>
    set((state) => ({
      siteBookmarkCategoryList: state.siteBookmarkCategoryList.map(
        (category) =>
          category.id === categoryId
            ? {
              ...category,
              siteBookmarkList: [
                ...category.siteBookmarkList,
                {id, name, url},
              ],
            }
            : category,
      ),
    })),
});

// 5. 스토어 생성
const useSiteBookmarkStore = create<SiteBookmarkState & SiteBookmarkActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(siteBookmarkStore)
    : siteBookmarkStore,
);

export type UseSiteBookmarkStoreType = SiteBookmarkState & SiteBookmarkActions;
export default useSiteBookmarkStore;
