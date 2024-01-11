import * as yup from 'yup';

export const BoardCreateUpdateYup = yup.object().shape({
  title: yup.string().required('필수 입력'),
  content: yup.string().required('필수 입력'),
});
