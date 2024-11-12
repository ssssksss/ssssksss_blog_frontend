import * as yup from "yup";

export const BoardUpdateYup = yup.object().shape({
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
});

export const BoardCreateYup = yup.object().shape({
  title: yup.string().required("필수 입력"),
  content: yup.string().required("필수 입력"),
});
