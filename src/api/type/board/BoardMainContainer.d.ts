export interface IBoardListProps {
  id: number;
  title: string;
  content: string;
  writer: string;
  baseTimeEntity: {
    createdAt: string;
    modifiedAt: string;
    deleteAt: string;
    accessYn: boolean;
  };
  views: number;
  userId: number;
}

export interface IBoardListResData {
  boardCount: number;
  boardList: IBoardListProps;
}
