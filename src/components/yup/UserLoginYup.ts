import * as yup from "yup";

export const UserLoginYup = yup.object().shape({
  email: yup
    .string()
    .required("이메일은 필수 입력 사항입니다.")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g,
      "example@test.com과 같은 이메일 형식이 아닙니다."
    ),
  password: yup
    .string()
    // .min(8, "비밀번호는 최소 8자리 이상 입력해 주세요")
    // .max(16, "비밀번호를 최대 16자리로 입력해 주세요")
    .required("비밀번호는 필수 입력 사항입니다.")
    .min(8, "8자리 이상입니다.")
    .max(16, "16자리 이하입니다.")
    .matches(
      // /^(?=.*([a-z]|[A-Z]))(?=.*\d)[A-Za-z\d]{8,16}$/,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()-_=+])[A-Za-z\d`~!@#$%^&*()-_=+]{8,16}$/,
      "최소 소문자1, 대문자1, 숫자1, 특수문자1로 구성되야합니다."
    ),
});
