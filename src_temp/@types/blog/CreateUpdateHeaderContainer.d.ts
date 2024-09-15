export interface CreateUpdateHeaderProps {
  edit?: boolean;
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
  status: string;
  status: "PUBLIC" | "DEVELOP" | "HIDE";
}