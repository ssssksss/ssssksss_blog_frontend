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
  version: yup
    .string()
    .required("필수 입력")
    .matches(
      /^\d+\.\d+\.\d+$/,
      "버전 형식은 0.0.0과 같이 숫자.숫자.숫자 형식이어야 합니다.",
    ),
});

export const Blog2ResultYup = yup.object().shape({
  id: yup.number(),
  position: yup.number(),
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
});
