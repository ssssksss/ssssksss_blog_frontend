interface ICreateFirstCategoryHandlerProps {
  name: string;
  href: string;
}

interface IDeleteFirstCategoryHandlerProps {
  href: string;
}

interface ICreateSecondCategoryHandlerProps {
  name: string;
  firstCategoryId: number;
  files: File;
  directory: string;
}

interface IUpdateSecondCategoryHandlerProps {
  id: number;
}

interface IDeleteSecondCategoryHandlerProps {
  id: number;
  name: string;
}

export const BlogAPIType = {
  ICreateFirstCategoryHandlerProps,
  IDeleteFirstCategoryHandlerProps,
  ICreateSecondCategoryHandlerProps,
  IUpdateSecondCategoryHandlerProps,
  IDeleteSecondCategoryHandlerProps,
};
