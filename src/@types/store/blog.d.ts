declare interface IBlogFirstCategory {
  id: number;
  name: string;
  userId: number;
  blogSecondCategoryList?: IBlogSecondCategoryList[];
}
declare interface IBlogSecondCategoryList {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
  userId: number;
}

interface ISecondCategory {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
  userId: number;
}

// readBlogList

declare interface responseBlogList {
  data: responseBlog[];
  msg: string;
  statusCode: number;
}

declare interface responseBlog {
  id: number;
  title: string;
  description: string;
  userId: number;
  firstCategoryId: number;
  thumbnailImageUrl: string;
  baseTimeEntity: BaseTimeEntity;
  blogStatus: string; // 블로그 상태가 여러 개일 수 있음을 고려
  blogSecondCategory: ISecondCategory;
}

// readBlog

declare interface responseReadBlog {
  statusCode: number;
  msg: string;
  data: IBlog;
}

declare interface IBlog {
  commentNumber: number;
  blogFirstCategoryName: string;
  blogSecondCategoryName: string;
  description: string;
  viewNumber: number;
  title: string;
  blogContentId: number;
  firstCategoryId: number;
  userId: number;
  content: string;
  createdAt: string;
  thumbnailImageUrl: string;
  id: number;
  secondCategoryId: number;
  likeNumber: number;
  status: "HIDE" | "SHOW";
}

// 공통 시간
interface BaseTimeEntity {
  createdAt: string;
  modifiedAt: string;
  deleteAt: string;
  accessYn: boolean;
}

// Sort 타입 정의
interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

// Pageable 타입 정의
interface Pageable {
  sort: Sort;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}
