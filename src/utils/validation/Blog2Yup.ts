import * as yup from "yup";

export const Blog2CreateYup = yup.object().shape({
  firstCategoryId: yup.number().required("필수 입력"),
  secondCategoryId: yup.number().required("필수 입력"),
  title: yup.string().required("필수 입력"),
  description: yup.string().required("필수 입력"),
});
