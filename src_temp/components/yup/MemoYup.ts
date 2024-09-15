import * as yup from 'yup';

export const MemoCreateYup = yup.object().shape({
  createMemoCategoryName: yup.string().required('필수 입력'),
  createMemoCategoryColor: yup.string().required('필수 입력'),
});

export const MemoUpdateYup = yup.object().shape({
  pickUpdateMemoCategoryId: yup.string().required('필수 입력'),
  updateMemoCategoryName: yup.string().required('필수 입력'),
  updateMemoCategoryColor: yup.string().required('필수 입력'),
});

export const MemoDeleteYup = yup.object().shape({
  pickDeleteMemoCategoryId: yup.string().required('필수 입력'),
});
