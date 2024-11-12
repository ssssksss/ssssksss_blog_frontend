declare interface Blog2SecondCategoryCreateForm {
  createSecondCategoryName: string;
  firstCategoryId: string;
  createSecondCategoryImageFile: File | undefined; // File or undefined
}

declare interface Blog2SecondCategoryUpdateForm {
  id: number;
  updateSecondCategoryName: string;
  firstCategoryId: string;
  updateSecondCategoryImageFile: File | undefined; // File or undefined
}
