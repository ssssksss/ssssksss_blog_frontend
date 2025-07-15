declare interface IBlog2FirstCategory {
  id: number;
  name: string;
  userId: number;
  blog2SecondCategoryList?: IBlog2SecondCategoryList[];
}
declare interface IBlog2SecondCategoryList {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
  userId: number;
  templateContent: string;
}

declare interface responseCreateBlog2FirstCategory {
  status: number;
  msg: string;
  data: IBlog2FirstCategory;
}

declare interface responseCreateBlog2SecondCategory {
  status: number;
  msg: string;
  data: {
    createBlog2SecondCategory: ISecondCategory;
  };
}

declare interface responseUpdateBlog2SecondCategory {
  status: number;
  msg: string;
  data: ISecondCategory;
}

declare interface ISecondCategory {
  blogCount: number;
  id: number;
  name: string;
  thumbnailImageUrl: string;
  templateContent;
}

declare interface responseCreateUpdateBlog2BasicContent {
  status: number;
  msg: string;
  data: {
    blog2BasicContent: IBlog2BasicContent;
  };
}

declare interface IBlog2BasicContent {
  blog2FirstCategoryId: number;
  blog2SecondCategoryId: number;
  content: string;
  id: number;
  title: string;
  // 내용 추가 필요
}
declare interface responseSearchBlog2BasicContentList {
  status: number;
  msg: string;
  data: {
    blog2BasicList: {
      content: IBlog2BasicContent[];
      pageable: Pageable;
      last: boolean;
      totalElements: number;
      totalPages: number;
      first: boolean;
      size: number;
      number: number;
      sort: Sort;
      numberOfElements: number;
      empty: boolean;
    };
  };
}

declare interface resBlog2Create {
  status: number;
  msg: string;
  data: IBlog2;
}

// readBlog2List

declare interface responseBlog2List {
  data: IBlog2[];
  msg: string;
  statusCode: number;
}

declare interface IBlog2 {
  id: number;
  title: string;
  description: string;
  userId: number;
  firstCategoryId: number;
  thumbnailImageUrl: string;
  createdAt: string;
  modifiedAt: string;
  deleteAt: string;
  accessYn: boolean;
  blog2Status: string; // 블로그 상태가 여러 개일 수 있음을 고려
}

// readBlog2

declare interface responseReadBlog2 {
  blog2: IBlog2;
  blog2SecondCategory: ISecondCategory;
  blog2BasicList: IBlog2Basic[];
  blog2StructureList: IBlog2Structure[];
  blog2ResultList: IBlog2Result[];
}

declare interface IBlog2Basic {
  id: number;
  position: number;
  blog2BasicContent: IBlog2BasicContent;
}

declare interface ResBlog2Update {
  blog2: IBlog2;
  blog2SecondCategory: ISecondCategory;
  blog2BasicList: IBlog2Basic[];
  blog2StructureList: IBlog2Structure[];
  blog2ResultList: IBlog2Result[];
  categoryList: IBlog2FirstCategory[];
  isEdit: boolean;
}

// structure

declare interface IBlog2Structure {
  id: number;
  position: number;
  blog2StructureContent: IBlog2StructureContent;
}
declare interface IBlog2StructureContent {
  id: number;
  content: string;
  directory: string;
  project: string;
  version: string;
}

declare interface IResultSearchBlog2StructureContentList {
    content: IBlog2StructureContent[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}

// result

declare interface IBlog2Result {
  id: number;
  position: number;
  content: string;
  title: string;
}

declare interface responseCreateUpdateBlog2Result {
  status: number;
  msg: string;
  data: {
    blog2Result: IBlog2Result;
  };
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

// 블로그 기초 섹션 관련 [Blog2BasicContentContainer.tsx]
declare interface IBlog2BasicContentContainer {
  addBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  updateBlog2Content: (
    data: IBlog2BasicContent | IBlog2StructureContent,
    type: "basic" | "structure",
  ) => void;
  removeBlog2Content: (type: "basic" | "structure", id: number) => void;
}

declare interface IBlog2BasicCreateUpdateContentModal extends IModalComponent {
  edit?: boolean;
  blog2BasicContentItem?: IBlog2BasicContent;
  updateBlog2BasicContent?: (data: IBlog2BasicContent) => void;
  addBlog2BasicContent?: (data: IBlog2BasicContent) => void;
}

// 블로그 기초 글 작성에 사용하는 formContext
interface IBlog2BasicFormContext {
  title: string;
  content: string;
  firstCategoryId: number;
  secondCategoryId: number;
  s3ImageUrlList: {keyPath: string}[];
  deleteImageBucketDirectory?: string[];
}

interface IBlog2ResultFormContext {
  id: number;
  position: number;
  title: string;
  content: string;
  s3ImageUrlList: {keyPath: string}[];
  deleteImageBucketDirectory?: string[];
}