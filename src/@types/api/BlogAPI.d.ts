export interface ICreateFirstCategoryHandlerProps {
  name: string;
  href: string;
}

export interface IDeleteFirstCategoryHandlerProps {
  href: string;
}

export interface ICreateSecondCategoryHandlerProps {
  name: string;
  firstCategoryId: number;
  files: File;
  directory: string;
}

export interface IUpdateSecondCategoryHandlerProps {
  id: number;
}

export interface IDeleteSecondCategoryHandlerProps {
  id: number;
  name: string;
}

export interface IBlogCategoryListResProps {
  statusCode: number;
  msg: string;
  json: {
    blogFirstCategoryList: [
      {
        name: string;
        secondCategoryList: [
          {
            name: string;
            thumbnailImageUrl: string;
            id: number;
          }
        ];
      }
    ];
    userId: number;
  };
}
