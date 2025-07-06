declare interface Blog2SecondCategoryCreateForm {
  createSecondCategoryName: string;
  firstCategoryId: string;
  createSecondCategoryImageFile: File | undefined; // File or undefined
  templateContent: string;
  s3ImageUrlList: {keyPath: string}[];
}

declare interface Blog2SecondCategoryUpdateForm {
  id: number;
  updateSecondCategoryName: string;
  firstCategoryId: string;
  updateSecondCategoryImageFile: File | undefined; // File or undefined
  templateContent: string;
  s3ImageUrlList: {keyPath: string}[];
  s3ImageUrlDeleteList: {keyPath: string}[];
}

declare interface Blog2SecondCategoryDeleteForm {
  deleteSecondCategoryId: number;
}
