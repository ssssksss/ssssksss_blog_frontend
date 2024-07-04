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
  thumbnailImageUrl: string;
  createdAt: string;
  blogContentId: string;
  blogFirstCategoryName: string;
  blogSecondCategoryName: string;
  content: string;
  status?: string;
}
