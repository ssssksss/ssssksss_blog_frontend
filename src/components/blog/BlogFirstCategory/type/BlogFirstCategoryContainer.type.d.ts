export interface IBlogCategoryListResDataProps {
  status: string;
  isLoading?: boolean;
  data: {
    msg: string;
    statusCode: number;
    json?: {
      userId: number;
      blogFirstCategoryList: [
        {
          id: number;
          name: string;
          secondCategoryList: [
            {
              id: string;
              name: string;
              thumbnailImageUrl: string;
            }
          ];
        }
      ];
    };
  };
}
