declare interface IResponseReadBoardList {
  status: number;
  msg: string;
  data: PaginationResponse;
}

declare interface IResponseCreateBoard {
  status: number;
  msg: string;
  data: number;
}

declare interface IResponseReadBoard {
  status: number;
  msg: string;
  data: IBoard;
}

declare interface IBoard {
  id: number; // 게시글 ID
  title: string; // 게시글 제목
  content: string; // 게시글 내용
  nickname: string; // 작성자 이름
  views: number; // 조회수
  createdAt: string;
}

interface BaseTimeEntity {
  createdAt: string; // ISO date string
  modifiedAt: string; // ISO date string
  deleteAt: string; // ISO date string, '9999-12-31T23:59:59' is often used as a placeholder for non-deleted items
  accessYn: boolean; // Access 여부 (true: accessible, false: not accessible)
}

interface Pageable {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

interface PaginationResponse {
  content: IBoard[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  totalElements: number;
  totalPages: number;
}
