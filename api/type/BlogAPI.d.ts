interface ICreateFirstCategoryHandlerProps {
  name: string;
  href: string;
}

interface IRemoveFirstCategoryHandlerProps {
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

interface IRemoveSecondCategoryHandlerProps {
  id: number;
  name: string;
}

export const BlogAPIType = {
  ICreateFirstCategoryHandlerProps,
  IRemoveFirstCategoryHandlerProps,
  ICreateSecondCategoryHandlerProps,
  IUpdateSecondCategoryHandlerProps,
  IRemoveSecondCategoryHandlerProps,
};
