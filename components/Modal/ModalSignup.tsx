import AxiosInstance from "@/utils/axios/AxiosInstance";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Valid } from "@/components/common/function/UserValidation";

const ModalSignup = (modalHandler: any) => {
  const [userData, setUserData] = useState({
    cuid: "",
    password: "",
    passwordCopy: "",
    email: "",
    gender: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    cuid: "값을 입력하세요",
    password: "값을 입력하세요",
    passwordCopy: "값을 입력하세요",
    email: "값을 입력하세요",
    gender: "값을 입력하세요",
    birthDate: "값을 입력하세요",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [target, setTarget] = useState("");

  //입력을 하고 포커스에서 벗어날때 작동
  const handleValidation = (e: any) => {
    const { name, value } = e.target;
    setTarget(name);
    setUserData({ ...userData, [e.target.name]: value });
  };

  // handleValidation 이후에 작동
  useEffect(() => {
    switch (target) {
      case "cuid":
        setErrors({ ...errors, cuid: Valid.ValidId(userData.cuid) });
        break;
      case "password":
        setErrors({
          ...errors,
          password: Valid.ValidPassword(userData.password),
          passwordCopy: Valid.ValidPasswordCopy(
            userData.password,
            userData.passwordCopy
          ),
        });
        break;
      case "passwordCopy":
        setErrors({
          ...errors,
          passwordCopy: Valid.ValidPasswordCopy(
            userData.password,
            userData.passwordCopy
          ),
        });
        break;
      case "email":
        setErrors({ ...errors, email: Valid.ValidEmail(userData.email) });
        break;
      case "birthDate":
        setErrors({
          ...errors,
          birthDate: Valid.ValidBirthDate(userData.birthDate),
        });
        break;
      case "gender":
        setErrors({ ...errors, gender: Valid.ValidGender(userData.gender) });
        break;
      default:
        break;
    }
  }, [userData]);

  const userDataCheck = () => {
    setErrors({
      ...errors,
      cuid: Valid.ValidId(userData.cuid),
      password: Valid.ValidPassword(userData.password),
      passwordCopy: Valid.ValidPasswordCopy(
        userData.password,
        userData.passwordCopy
      ),
      email: Valid.ValidEmail(userData.email),
      birthDate: Valid.ValidBirthDate(userData.birthDate),
      gender: Valid.ValidGender(userData.gender),
    });
  };

  useEffect(() => {
    if (
      errors.cuid === "" &&
      errors.password === "" &&
      errors.passwordCopy === "" &&
      errors.email === "" &&
      errors.gender === "" &&
      errors.birthDate === ""
    ) {
      setIsSubmit(true);
    } else {
      setIsSubmit(false);
    }
  }, [errors]);

  const submitHandler = () => {
    if (isSubmit) {
      (async () => {
        await AxiosInstance({
          url: "/ssssksss/user/signup",
          method: "POST",
          data: {
            cuid: userData.cuid,
            password: userData.password,
            email: userData.email,
            gender: userData.gender,
            birthDate: userData.birthDate,
          },
        })
          .then((response) => {
            alert("회원가입 성공");
            modalHandler.modalHandler();
          })
          .catch((error) => {
            alert(error.response.data.errorMsg);
          });
      })();
    } else {
      userDataCheck();
      alert("잘못 입력된 내용이 있거나 입력이 되지 않는 내용이 있습니다.");
    }
  };

  return (
    <React.Fragment>
      {/*<Overlay onClick={() => modalHandler.modalHandler()}></Overlay>*/}
      <Overlay></Overlay>
      <Container>
        <FormContainer>
          <Title> 회원가입 </Title>
          <InputContainer>
            <Label>
              <span> 아이디 </span>
              <span> {errors.cuid} </span>
            </Label>
            <InputId
              type="text"
              name="cuid"
              placeholder="첫글자는 영문, 대소문자,숫자 8~16자리 조합"
              onChange={handleValidation}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 비밀번호 </span>
              <span> {errors.password} </span>
            </Label>
            <InputPassword
              type="password"
              name="password"
              placeholder="대소문자+숫자+특수문자 8~16자리 조합"
              onChange={handleValidation}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 비번확인 </span>
              <span> {errors.passwordCopy} </span>
            </Label>
            <InputPassword
              type="password"
              name="passwordCopy"
              placeholder="비밀번호 확인"
              onChange={handleValidation}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 이메일 </span>
              <span> {errors.email} </span>
            </Label>
            <InputEmail
              type="email"
              name="email"
              placeholder="example@test.com"
              onChange={handleValidation}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 성별 </span>
              <span> {errors.gender} </span>
            </Label>
            <GenderContainer>
              <InputGender
                type="radio"
                name="gender"
                value="m"
                onChange={handleValidation}
                id="m"
              />{" "}
              <label htmlFor="m">남</label>
              <InputGender
                type="radio"
                name="gender"
                value="w"
                onChange={handleValidation}
                id="w"
              />{" "}
              <label htmlFor="w">여</label>
            </GenderContainer>
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 생년월일 </span>
              <span> {errors.birthDate} </span>
            </Label>
            <InputBirth
              type="text"
              name="birthDate"
              placeholder="생년월일8자리를 입력해주세요"
              onChange={handleValidation}
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitButton onClick={() => submitHandler()}> 제출 </SubmitButton>
            <CancelButton onClick={() => modalHandler.modalHandler()}>
              취소
            </CancelButton>
          </SubmitContainer>
        </FormContainer>
      </Container>
    </React.Fragment>
  );
};

export default ModalSignup;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.8);
  border: 0px;
  z-index: 2;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.customColors.first};
  width: 30%;
  min-width: 300px;
  height: 60%;
  min-height: 400px;
  border: 0px;
  z-index: 3;
`;
const FormContainer = styled.div`
  margin: auto;
  margin: 20px;
  height: calc(100% - 40px);
  background: white;
  display: grid;
  grid-template-columns: repeat(minmax(60px, 7fr));
`;
const Title = styled.div`
  background: ${({ theme }) => theme.customColors.second};
  color: white;
  ${({ theme }) => theme.flex.flexCenter};
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.lg}) {
    font-size: 1rem;
  }
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 3fr 2fr);
`;
const Label = styled.div`
  color: ${({ theme }) => theme.customColors.second};
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: flex-start;
  font-size: 0.8rem;
  font-weight: 800;

  span {
    padding-left: 5px;
    ${({ theme }) => theme.flex.flexLeft};
  }
  span:nth-child(1) {
    border-right: dashed ${({ theme }) => theme.customColors.second} 1px;

    @media only screen and (max-width: ${({ theme }) =>
        theme.customScreen.sm}) {
      font-size: 0.6rem;
    }
  }
  span:nth-child(2) {
    color: red;
    font-size: 0.8rem;

    @media only screen and (max-width: ${({ theme }) =>
        theme.customScreen.lg}) {
      font-size: 0.6rem;
    }
  }
`;
const InputCommon = css`
  ${({ theme }) => theme.flex.flexLeft};
  padding-left: 10px;
  border: none;
  background: #f4f4f4;
  font-size: 1rem;
  cursor: pointer;

  &::-webkit-input-placeholder {
    color: ${({ theme }) => theme.customColors.first};
  }

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.8rem;
  }
`;
const InputId = styled.input`
  ${InputCommon}
`;
const InputPassword = styled.input`
  ${InputCommon}
`;
const InputEmail = styled.input`
  ${InputCommon}
`;
const InputGender = styled.input`
  ${InputCommon}
`;
const GenderContainer = styled.div`
  ${InputCommon}
`;
const InputBirth = styled.input`
  ${InputCommon}
`;
const SubmitContainer = styled.div``;
const ButtonCommon = css`
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.customColors.second};
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  pointer: cursor;
  &:hover {
    color: ${({ theme }) => theme.customColors.second};
    background: white;
  }
`;
const SubmitButton = styled.button`
  width: 50%;
  ${ButtonCommon}
`;
const CancelButton = styled.button`
  width: 50%;
  ${ButtonCommon}
`;
