export type propsType = {
  firstCategoryList: {
    [key: string]: string;
  };
  secondCategoryList?: {
    [firstCategoryId: string | number]: {
      secondCategoryId?: {
        name?: string;
        thumbnailImageUrl: string;
      };
    };
  };
};
