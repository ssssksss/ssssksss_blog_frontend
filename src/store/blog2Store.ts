import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface Blog2State {
  categoryList: IBlog2FirstCategory[];
  blogItemList: {
    blog2SecondCategoryId: number;
    list: IBlog2[];
  };
  activeBlog2FirstCategoryId: number;
  activeBlog2SecondCategoryId: number;
  isDataFetched: boolean;
  blog2ChoiceSecondCategory: {
    id: number;
    name: string;
    templateContent: string;
  };
}

// 2. 액션 인터페이스 정의
interface BlogActions {
  initialize: () => void;
  setBlogItemList: (data: {
    id: number;
    list: IBlog2[];
    isDataFetched?: boolean;
  }) => void;
  setBlog2CategoryList: (data: IBlog2FirstCategory[]) => void;
  setBlog2ActiveFirstCategoryId: (id: number) => void;
  setBlog2ActiveSecondCategoryId: (id: number) => void;
  setBlog2ChoiceSecondCategory: (data: {
    id: number;
    name: string;
    templateContent: string;
  }) => void;
}

// 3. 초기 상태 정의
const initialState: Blog2State = {
  categoryList: [],
  blogItemList: {
    blog2SecondCategoryId: 0,
    list: [],
  },
  isDataFetched: false,
  activeBlog2FirstCategoryId: 0,
  activeBlog2SecondCategoryId: 0,
  blog2ChoiceSecondCategory: {
    id: 0,
    name: "",
    templateContent: "",
  },
};


// 4. 상태 및 액션 생성
const blog2Store: StateCreator<Blog2State & BlogActions> = (set, get) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setBlogItemList: (data) =>
    set(() => ({
      blogItemList: {
        blog2SecondCategoryId: data.id,
        list: data.list,
      },
      isDataFetched: data.isDataFetched || false,
    })),
  setBlog2CategoryList: (data) =>
    set(() => ({
      categoryList: data,
    })),
  setBlog2ActiveFirstCategoryId: (id: number) =>
    set(() => ({
      activeBlog2FirstCategoryId: id,
    })),
  setBlog2ActiveSecondCategoryId: (id: number) =>
    set(() => ({
      activeBlog2SecondCategoryId: id,
    })),
  setBlog2ChoiceSecondCategory: (data) =>
    set(() => ({
      blog2ChoiceSecondCategory: {
        id: data.id,
        name: data.name,
        templateContent: data.templateContent,
      },
    })),
});

const useBlog2Store = create<Blog2State & BlogActions>()<any>(
  process.env.NODE_ENV === "development" ? devtools(blog2Store) : blog2Store,
);

export type useBlog2StoreType = Blog2State & BlogActions;

export default useBlog2Store;
