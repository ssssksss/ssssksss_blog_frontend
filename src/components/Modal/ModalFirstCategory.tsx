import { store } from "@/redux/store";
import theme from "@/styles/theme";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import BasicCustomModal from "./BasicCustomModal";
import { CF } from "../../../styles/commonComponentStyle";
import Input from "@/components/common/input/Input";
import Space from "@/components/common/space/Space";

type FirstCategoryTypes = {
  id: number;
  name: string;
  firstHref: string;
  line: number;
  position: number;
  count: number;
};

const ModalFirstCategory = (modalHandler: any) => {
  const [name, setName] = useState("");
  const [firstHref, setFirstHref] = useState("");
  const [line, setLine] = useState(0);
  const [removeFirstHref, setRemoveFirstHref] = useState("");
  const [firstCategory, setFirstCategory] = useState<FirstCategoryTypes[]>([]);

  const submitHandler = async () => {
    if (name === "") {
      alert("카테고리명을 입력하세요");
    } else if (firstHref === "") {
      alert("경로를 입력하세요");
    } else if (line < 1 && line > 4) {
      alert("라인은 1~4의 숫자를 넣어야 합니다.");
    } else {
      await AxiosInstance({
        url: "/api/first-category",
        method: "POST",
        data: {
          name: name,
          firstHref: "/" + firstHref,
          line: line,
          nickName: store.getState().authStore.nickname,
        },
      })
        .then((response) => {
          alert("첫번째 카테고리가 작성되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };
  const removeHandler = async () => {
    if (removeFirstHref === "") {
      alert("삭제할 URL을 입력하세요");
    } else {
      await AxiosInstance({
        url: "/api/first-category",
        method: "DELETE",
        data: {
          firstHref: removeFirstHref,
        },
      })
        .then((response) => {
          setFirstCategory(
            firstCategory.filter((el: any) => el.firstHref !== removeFirstHref)
          );
          alert("카테고리가 삭제되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };

  useEffect(() => {
    AxiosInstance({
      url: "/api/first-category",
      method: "GET",
    })
      .then((response) => {
        setFirstCategory(response.data.data.firstCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Overlay onClick={() => modalHandler.modalHandler()} />
      <Container>
        <FormContainer>
          <CF.RowCenterDiv
            height="30px"
            color="#fff"
            fontSize={theme.fontSizes.lg}
            padding={"10px 0px 0px 0px"}
          >
            1차 카테고리 추가
          </CF.RowCenterDiv>
          <CF.ColumnDiv gap={20} padding={"20px 20px 20px 20px"} color={"#fff"}>
            <Space title4="카테고리 이름" titleWidth={"140px"} gap={6}>
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="카테고리명을 입력하세요."
              />
            </Space>
            <Space title4="카테고리 경로" titleWidth={"140px"} gap={6}>
              <Input
                value={firstHref}
                onChange={(e) => {
                  setFirstHref(e.target.value);
                }}
                placeholder="영어와'_'만 이용해서 경로를 입력하세요"
              />
            </Space>
            <Space title4="메뉴" titleWidth={"140px"} gap={6}>
              <RadioDiv>
                <CF.RowDiv gap={22}>
                  <div>
                    <input
                      type="radio"
                      name="menu"
                      value="1"
                      id="frontend"
                      defaultChecked={true}
                      onChange={(e: any) => setLine(e.target.value)}
                    />
                    <label htmlFor="frontend"> 프론트엔드 </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="menu"
                      value="2"
                      id="backend"
                      onChange={(e: any) => setLine(e.target.value)}
                    />
                    <label htmlFor="backend"> 백엔드 </label>
                  </div>
                </CF.RowDiv>
                <CF.RowDiv gap={80}>
                  <div>
                    <input
                      type="radio"
                      name="menu"
                      value="3"
                      id="server"
                      onChange={(e: any) => setLine(e.target.value)}
                    />
                    <label htmlFor="server"> 서버 </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="menu"
                      value="4"
                      id="etc"
                      onChange={(e: any) => setLine(e.target.value)}
                    />
                    <label htmlFor="etc"> 기타 </label>
                  </div>
                </CF.RowDiv>
              </RadioDiv>
            </Space>
            <CF.RowDiv gap={10}>
              <SubmitButton onClick={() => submitHandler()}>제출</SubmitButton>
              <CancelButton onClick={() => modalHandler.modalHandler()}>
                취소
              </CancelButton>
            </CF.RowDiv>
            <CF.RowCenterDiv
              height="30px"
              color="#fff"
              fontSize={theme.fontSizes.lg}
              padding={"10px 0px 0px 0px"}
            >
              1차 카테고리 삭제
            </CF.RowCenterDiv>
            <InputContainer>
              <select
                name="firstHref"
                onChange={(e: any) => setRemoveFirstHref(e.target.value)}
              >
                {firstCategory.map((el: any, index: number) => (
                  <option key={index} value={el.firstHref}>
                    {el.firstHref}
                  </option>
                ))}
              </select>
            </InputContainer>
            <CF.RowDiv gap={10}>
              <SubmitButton onClick={() => removeHandler()}>삭제</SubmitButton>
              <CancelButton onClick={() => modalHandler.modalHandler()}>
                취소
              </CancelButton>
            </CF.RowDiv>
          </CF.ColumnDiv>
        </FormContainer>
      </Container>
    </>
  );
};

export default ModalFirstCategory;

const UpDownAnimation = keyframes`
        from {
          opacity: 0;
          transform: translate(0, 0);
          border-radius: 0px 0px 0px 0px;
        }
        
        to {
            opacity: 1;
            transform: translate(10px, 10px);
          border-radius: 50px 0px 4px 4px;
        }
`;
const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(174, 174, 174, 0.8);
  border: 0px;
  z-index: 2;

  &:hover {
    cursor: pointer;
  }
`;
const Container = styled.div`
  position: absolute;
  top: 30vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  background: ${theme.backgroundColors.primary};
  border-radius: 50px 4px 4px 4px;
  width: 50%;
  min-width: 300px;
  height: 80%;
  min-height: 500px;
  border: 0px;
  z-index: 3;
`;
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColors.secondary};
  animation: ${UpDownAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 3fr 2fr);
  color: ${({ theme }) => theme.customColors.second};
  height: 40px;
`;
const RadioDiv = styled(CF.ColumnDiv)`
  gap: 4px;
  input[type="radio"],
  label {
    cursor: pointer;
  }
`;
const ButtonCommon = css`
  height: 100%;
  border: none;
  background: ${({ theme }) => theme.customColors.second};
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
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
