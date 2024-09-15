
export interface IMemoItem {
id: number;
content: string;
memoCategory: {
    id: number;
    name: string;
    backgroundColor: string;
    userId?: number;
};
}

export interface IMemoItemProps {
  data?: IMemoItem;
  edit?: boolean;
  deleteMemoHandler?: () => void;
  category?: {
    categoryId?: number;
  };
  key?: number;
}
