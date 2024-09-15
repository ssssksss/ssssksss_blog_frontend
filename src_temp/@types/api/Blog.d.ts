interface IBlogResDataProps {
  status: number;
  msg: string;
  json: {
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
  };
}

type BlogType = {
  IBlogResDataProps;
};

export default BlogType;
