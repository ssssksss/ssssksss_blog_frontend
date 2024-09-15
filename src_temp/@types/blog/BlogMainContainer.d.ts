export interface IBlogProps {
  id: number;
  title: string;
  description: string;
  userId: number;
  likeNumber: number;
  commentNumber: number;
  viewNumber: number;
  firstCategoryId: number;
  secondCategoryId: number;
  thumbnailImageUrl: null | string;
  baseTimeEntity: {
    createdAt: string;
    modifiedAt: string;
    deleteAt: string;
    accessYn: boolean;
  };
  blogStatus: string;
}
