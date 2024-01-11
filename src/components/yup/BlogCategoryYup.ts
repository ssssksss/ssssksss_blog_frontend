import * as yup from 'yup';

export const BlogFirstCategoryCreateYup = yup.object().shape({
  createFirstCategoryName: yup.string().required('필수 입력'),
});

export const BlogFirstCategoryUpdateYup = yup.object().shape({
  updateFirstCategoryId: yup.string().required('필수 입력'),
  updateFirstCategoryName: yup.string().required('필수 입력'),
});

export const BlogFirstCategoryDeleteYup = yup.object().shape({
  deleteFirstCategoryId: yup.string().required('필수 입력'),
});

const validFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName, fileType) {
  return (
    fileName &&
    validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1
  );
}

export const BlogSecondCategoryCreateYup = yup.object().shape({
  createSecondCategoryName: yup.string().required('필수 입력'),
  createSecondCategoryImageFile: yup
    .mixed()
    .required('필수 입력')
    .test('is-valid-type', 'Not a valid image type', value =>
      isValidFileType(value && value.name.toLowerCase(), 'image')
    ),
  // .test("is-valid-size", "Max allowed size is 100KB",
  // value => value && value.size <= MAX_FILE_SIZE)
});

export const BlogSecondCategoryUpdateYup = yup.object().shape({
  updateSecondCategory: yup.string().required('필수 입력'),
  updateSecondCategoryName: yup.string().required('필수 입력'),
});

export const BlogSecondCategoryDeleteYup = yup.object().shape({
  deleteSecondCategoryId: yup.string().required('필수 입력'),
});
