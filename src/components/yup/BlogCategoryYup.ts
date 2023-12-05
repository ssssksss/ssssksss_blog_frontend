import * as yup from 'yup';

export const BlogFirstCategoryYup = yup.object().shape({
  createFirstCategoryName: yup
    .string()
    .required('필수 입력')
    .matches(/^(?=.*[a-z])}$/, '소문자로만 되어야 합니다.'),
  createFirstHref: yup
    .string()
    .required('필수 입력')
    .matches(/^(?=.*[a-z])$/, '소문자로만 되어야 합니다.'),
});
