import AxiosInstance from "@/utils/axios/AxiosInstance";
import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Valid } from "@/components/common/function/UserValidation";

const ModalSignup = (modalHandler: any) => {
  const [userData, setUserData] = useState({
    id: "",
    password: "",
    email: "",
    gender: "",
    birthDate: "",
  });
  const [errors, setErrors] = useState({
    id: "",
    password: "",
    email: "",
    gender: "",
    birthDate: "",
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
      case "id":
        setErrors({ ...errors, id: Valid.ValidId(userData.id) });
        break;
      case "password":
        setErrors({
          ...errors,
          password: Valid.ValidPassword(userData.password),
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
      //case "phone":
      //setErrors({ ...errors, phone: Valid.ValidPhone(userData.phone) });
      //break;
      default:
        break;
    }
  }, [userData]);

  const UserDataCheck = () => {
    setErrors({
      ...errors,
      id: Valid.ValidId(userData.id),
      password: Valid.ValidPassword(userData.password),
      email: Valid.ValidEmail(userData.email),
      birthDate: Valid.ValidBirthDate(userData.birthDate),
      gender: Valid.ValidGender(userData.gender),
    });
  };

  const SubmitHandler = () => {
    UserDataCheck();
    if (errors.id === "") {
      console.log("test");
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
              <span> {errors.id} </span>
            </Label>
            <InputId
              type="text"
              name="id"
              placeholder="첫글자는 영문, 대소문자,숫자 8~16자리 조합"
              onBlur={handleValidation}
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
              onBlur={handleValidation}
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 이메일 </span>
              <span> {errors.email} </span>
            </Label>
            <InputPassword
              type="email"
              name="email"
              placeholder="이메일을 입력하세요"
              onBlur={handleValidation}
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
                onBlur={handleValidation}
              />{" "}
              남
              <InputGender
                type="radio"
                name="gender"
                value="w"
                onBlur={handleValidation}
              />{" "}
              여
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
              onBlur={handleValidation}
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitButton onClick={() => SubmitHandler()}> 제출 </SubmitButton>
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
  cursor: pointer;
  border: 0px;
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
