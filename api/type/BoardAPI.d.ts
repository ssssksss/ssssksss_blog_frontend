import { NextRouter } from 'next/router';

interface IGetBoardListDataProps {
  keyword?: string;
  page?: number;
  sort?: 'latest' | 'view' | 'like';
  size?: number;
}

export const BoardAPIType = {
  IGetBoardListDataProps,
};
