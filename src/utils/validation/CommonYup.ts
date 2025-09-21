import * as yup from "yup";

export const commonSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
});

