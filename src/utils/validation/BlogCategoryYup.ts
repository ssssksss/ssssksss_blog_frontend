import * as yup from "yup";

export const Blog2FirstCategoryCreateYup = yup.object().shape({
  createFirstCategoryName: yup.string().required("필수 입력"),
});

export const BlogFirstCategoryUpdateYup = yup.object().shape({
  updateFirstCategoryId: yup.string().required("필수 입력"),
  updateFirstCategoryName: yup.string().required("필수 입력"),
});

export const BlogFirstCategoryDeleteYup = yup.object().shape({
  deleteFirstCategoryId: yup.number().required("필수 입력"),
});

const validFileExtensions = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

function isValidFileType(
  fileName: string | undefined,
  fileType: keyof typeof validFileExtensions,
): boolean {
  if (!fileName) return false;

  const fileExtension = fileName.split(".").pop()?.toLowerCase(); // Get the file extension and convert to lowercase
  return fileExtension
    ? validFileExtensions[fileType].includes(fileExtension)
    : false; // Check if the extension is valid
}

export const Blog2SecondCategoryCreateYup = yup.object().shape({
  createSecondCategoryName: yup.string().required("필수 입력"),
  createSecondCategoryImageFile: yup
    .mixed()
    .required("필수 입력")
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value && value.name, "image"),
    ),
  // .test("is-valid-size", "Max allowed size is 100KB",
  // value => value && value.size <= MAX_FILE_SIZE)
});

export const Blog2SecondCategoryUpdateYup = yup
  .object()
  .shape({
    id: yup.number().min(1),
    updateSecondCategoryName: yup.string(),
    updateSecondCategoryImageFile: yup.mixed(),
  })
  .test(
    "custom-validation",
    "이름과 이미지 파일 중 하나는 필수입니다",
    function (values) {
      const {updateSecondCategoryName, updateSecondCategoryImageFile} = values;
      if (!updateSecondCategoryName && !updateSecondCategoryImageFile) {
        return this.createError({
          path: "updateSecondCategoryName",
          message: "이름과 이미지 파일 중 하나는 필수입니다",
        });
      }
      return true;
    },
  );

export const Blog2SecondCategoryDeleteYup = yup.object().shape({
  deleteSecondCategoryId: yup.number().min(1).required("필수 입력"),
});

export const Blog2CreateYup = yup.object().shape({
  firstCategoryId: yup.string().required("필수 입력"),
  selectFirstCategoryName: yup.string().required("필수 입력"),
  secondCategoryId: yup.string().required("필수 입력"),
  selectSecondCategoryName: yup.string().required("필수 입력"),
  title: yup.string().required("필수 입력"),
  description: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  // thumbnailImageFile:
  //   yup.string()
  //   yup
  //     .mixed()
  //     .required('필수 입력')
  //     .test('is-valid-type', 'Not a valid image type', value =>
  //       isValidFileType(value && value.name.toLowerCase(), 'image')
  //     ),
});

export const Blog2UpdateYup = yup.object().shape({
  firstCategoryId: yup.string().required("필수 입력"),
  selectFirstCategoryName: yup.string().required("필수 입력"),
  secondCategoryId: yup.string().required("필수 입력"),
  selectSecondCategoryName: yup.string().required("필수 입력"),
  title: yup.string().required("필수 입력"),
  description: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  // thumbnailImageFile: yup
  //   .mixed()
  //   .required('필수 입력')
  //   .test('is-valid-type', 'Not a valid image type', value =>
  //     isValidFileType(value && value.name.toLowerCase(), 'image')
  //   ),
});
