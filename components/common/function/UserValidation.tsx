const ValidId = (id: string) => {
  let regExp = /^[a-zA-Z]+[a-z0-9A-Z]{7,15}$/g;
  if (id === "") {
    return "값이 존재하지 않습니다.";
  } else if (id.length < 8 || id.length > 16) {
    return "아이디의 길이는 8~16자 이내입니다.";
  } else if (!regExp.test(id)) {
    return "아이디는 영문으로 시작하고 영문,숫자,대문자로만 구성되야 합니다.";
  } else {
    return "";
  }
};
const ValidPassword = (password: string) => {
  let regExp =
    /(?=.*\d{1,20})(?=.*[~`!@#$%^&*()-+=]{1,20})(?=.*[a-z]{1,20})(?=.*[A-Z]{1,20})[a-zA-Z0-9~`!@#$%^&*()-+=]{8,20}$/;
  if (password === "") {
    return "값이 존재하지 않습니다.";
  } else if (password.length < 8 || password.length > 16) {
    return "길이는 8~16자 이내입니다.";
  } else if (!regExp.test(password)) {
    return "최소 소문자1개, 대문자1개, 숫자1개, 특수문자1개로 구성되야합니다.";
  } else {
    return "";
  }
};
const ValidPasswordCopy = (password: string, passwordCopy: string) => {
  if (password === passwordCopy) {
    return "";
  } else {
    return "비밀번호가 일치하지 않습니다.";
  }
};
const ValidEmail = (email: string) => {
  let regExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
  if (email === "") {
    return "값이 존재하지 않습니다.";
  } else if (!regExp.test(email)) {
    return "이메일 양식과 일치하지 않습니다.";
  } else {
    return "";
  }
};
const ValidGender = (gender: string) => {
  let regExp = /[m|w]/g;
  if (gender === "") {
    return "값이 존재하지 않습니다.";
  } else if (!regExp.test(gender)) {
    return "올바른 8자리의 숫자로 구성되야합니다.";
  } else {
    return "";
  }
};
const ValidBirthDate = (birthDate: string) => {
  let regExp =
    /^(19[0-9][0-9]|20[0-9]{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/g;
  if (birthDate === "") {
    return "값이 존재하지 않습니다.";
  } else if (!regExp.test(birthDate)) {
    return "올바른 8자리의 숫자로 구성되야합니다.";
  } else {
    return "";
  }
};

export const Valid = {
  ValidId,
  ValidPassword,
  ValidPasswordCopy,
  ValidEmail,
  ValidGender,
  ValidBirthDate,
};
