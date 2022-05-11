import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";
import React, { useState } from "react";
import styled, { css } from "styled-components";

const ModalSecondCategory = (modalHandler: any) => {
  const [name, setName] = useState("");
  const [secondHref, setSecondHref] = useState("");
  const [removeSecondHref, setRemoveSecondHref] = useState("");
  const firstCategory = useSelector(
    (state: RootState) => state.categoryStore.firstCategoryPath
  );

  const submitHandler = async () => {
    if (name === "") {
      alert("카테고리명을 입력하세요");
    } else if (secondHref === "") {
      alert("경로를 /을 넣어서 입력하세요");
    } else {
      await AxiosInstance({
        url: "/ssssksss/second-category",
        method: "POST",
        data: {
          name: name,
          firstHref: "/" + firstCategory,
          secondHref: "/" + firstCategory + "/" + secondHref,
        },
      })
        .then((response) => {
          alert("두번째 카테고리가 작성되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };

  const removeHandler = async () => {
    if (removeSecondHref === "") {
      alert("삭제할 URL을 전체 경로를 입력하세요");
    } else {
      await AxiosInstance({
        url: "/ssssksss/second-category",
        method: "DELETE",
        data: {
          secondHref: "/" + firstCategory + "/" + removeSecondHref,
        },
      })
        .then((response) => {
          alert("카테고리 삭제되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };

  return (
    <React.Fragment>
      <Overlay></Overlay>
      <Container>
        <FormContainer>
          <Title> 두번째 카테고리 </Title>
          <InputContainer>
            <Label>
              <span> 두번째 카테고리명 </span>
            </Label>
            <InputCommon
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="카테고리명을 입력하세요."
            />
          </InputContainer>
          <InputContainer>
            <Label>
              <span> 두번째 카테고리 경로 </span>
            </Label>
            <InputCommon
              value={secondHref}
              onChange={(e) => {
                setSecondHref(e.target.value);
              }}
              placeholder="영어와'_'만 이용해서 경로를 입력하세요"
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitButton onClick={() => submitHandler()}> 제출 </SubmitButton>
            <CancelButton onClick={() => modalHandler.modalHandler()}>
              취소
            </CancelButton>
          </SubmitContainer>
          <InputContainer>
            <Label>
              <span> 두번째 카테고리를 삭제할 경로 </span>
            </Label>
            <InputCommon
              value={removeSecondHref}
              onChange={(e) => {
                setRemoveSecondHref(e.target.value);
              }}
              placeholder="삭제할 URL경로를 입력하세요."
            />
          </InputContainer>
          <SubmitContainer>
            <SubmitButton onClick={() => removeHandler()}> 삭제 </SubmitButton>
            <CancelButton onClick={() => modalHandler.modalHandler()}>
              취소
            </CancelButton>
          </SubmitContainer>
        </FormContainer>
      </Container>
    </React.Fragment>
  );
};

export default ModalSecondCategory;

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
  color: ${({ theme }) => theme.customColors.second};
`;
const Label = styled.div`
  color: ${({ theme }) => theme.customColors.second};
  display: grid;
  grid-template-columns: 1fr;
  justify-content: flex-start;
  font-size: 1rem;
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
const InputCommon = styled.input`
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
