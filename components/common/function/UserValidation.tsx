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
  let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
  if (password === "") {
    return "값이 존재하지 않습니다.";
  } else if (password.length < 8 || password.length > 16) {
    return "패스워드의 길이는 8~16자 이내입니다.";
  } else if (!regExp.test(password)) {
    return "패스워드는 소문자,대문자,특수문자 조합으로 구성되어있습니다.";
  } else {
    return "";
  }
};
const ValidEmail = (email: string) => {
  if (email === "") {
    return "값이 존재하지 않습니다.";
  }
  return "";
};
const ValidBirthDate = (birthDate: string) => {
  if (birthDate === "") {
    return "값이 존재하지 않습니다.";
  } else {
    return "";
  }
};
const ValidGender = (gender: string) => {
  if (gender === "") {
    return "값이 존재하지 않습니다.";
  } else {
    return "";
  }
};
const ValidPhone = (phone: string) => {
  let regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
  let regExp2 = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
  if (phone === "") {
    return "값이 존재하지 않습니다.";
  } else {
    return "";
  }
};
export const Valid = {
  ValidId,
  ValidPassword,
  ValidEmail,
  ValidBirthDate,
  ValidGender,
  ValidPhone,
};
