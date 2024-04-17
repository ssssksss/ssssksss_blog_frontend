export interface IGetBoardListDataProps {
  keyword?: string;
  page?: number;
  sort?: 'latest' | 'view' | 'like' | string;
  size?: number;
  enabled?: boolean;
}

export interface ICreateBoardProps {
  title: string;
  content: string;
  writer: string;
}

export interface IUpdateBoardProps {
  id: number;
  title: string;
  content: string;
}
