export interface IGetBoardListDataProps {
  keyword?: string;
  page?: number;
  sort?: 'latest' | 'view' | 'like';
  size?: number;
}
