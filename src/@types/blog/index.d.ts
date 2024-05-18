export type propsType = {
  blogFirstCategoryList: [
    {
      id: number,
      name: string,
      userId: number,
      blogSecondCategoryList: [
        {
          id: number,
          name: string,
          thumbnailImageUrl: string,
          userId: number,
          blogList: []
        }
      ]
    }
  ]
};
