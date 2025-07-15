import * as yup from "yup";

export const Blog2CreateBasicContentYup = yup.object().shape({
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  firstCategoryId: yup.number().min(1).required("필수 입력"),
  secondCategoryId: yup.number().min(1).required("필수 입력"),
});

export const Blog2CreateStructureContentYup = yup.object().shape({
  directory: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
  project: yup.string().required("필수 입력"),
  version: yup.string().required("필수 입력"),
});

export const Blog2ResultYup = yup.object().shape({
  id: yup.number(),
  position: yup.number(),
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
});
