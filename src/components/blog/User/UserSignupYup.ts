import * as yup from "yup";

export const UserSignupYup = yup.object().shape({
  nickname: yup
    .string()
    .required("닉네임은 필수 입력 사항입니다.")
    .matches(
      /^[a-zA-Z0-9ㄱ-힣]{2,8}$/,
      "닉네임은 특수문자 제외하고 2자리이상 8자리이하로 구성됩니다."
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
  passwordConfirm: yup
    .string()
    .required("비밀번호는 필수 입력 사항입니다.")
    .oneOf([yup.ref("password"), null], "패스워드가 일치하지 않습니다."),
  email: yup
    .string()
    .required("이메일은 필수 입력 사항입니다.")
    .matches(
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/g,
      "example@test.com과 같은 이메일 형식이 아닙니다."
    ),
  gender: yup.string().nullable().required("남/여 중에 선택해주세요"),
  birthDate: yup
    .string()
    .required("생년월일은 필수 입력사항입니다.")
    .matches(
      /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
      "8자리로 생년월일을 입력해주세요"
    ),
});
