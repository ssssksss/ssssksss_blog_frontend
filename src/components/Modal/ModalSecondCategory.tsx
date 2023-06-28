import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import React, { useState, useEffect } from "react";
import { store } from "@/redux/store";
import { CC } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import Space from "@/components/common/space/Space";
import Input from "../common/input/Input";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

type SecondCategoryTypes = {
  id: number;
  name: string;
  firstHref: string;
  line: number;
  position: number;
  count: number;
  // nickName: string;
  secondHref: string;
};

const ModalSecondCategory = (modalHandler: any) => {
  const [name, setName] = useState("");
  const [secondHref, setSecondHref] = useState("");
  const [removeSecondHref, setRemoveSecondHref] = useState("");
  const [updateSecondHref, setUpdateSecondHref] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [secondCategory, setSecondCategory] = useState<SecondCategoryTypes[]>([]);
  const firstCategory = useSelector((state: RootState) => state.categoryStore.firstCategoryPath);

  const submitHandler = async () => {
    if (name === "" || name === "null") {
      alert("카테고리명을 입력하세요");
    } else if (secondHref === "") {
      alert("경로를 /을 넣어서 입력하세요");
    } else {
      await AxiosInstance({
        url: "/api/second-category",
        method: "POST",
        data: {
          name: name,
          firstHref: "/" + firstCategory,
          secondHref: "/" + firstCategory + "/" + secondHref,
          nickName: store.getState().authStore.nickname,
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
    if (removeSecondHref === "" || removeSecondHref === "null") {
      alert("삭제할 URL을 전체 경로를 입력하세요");
    } else {
      await AxiosInstance({
        url: "/api/second-category",
        method: "DELETE",
        data: {
          secondHref: removeSecondHref,
        },
      })
        .then((response) => {
          setSecondCategory(secondCategory.filter((el: any) => el.secondHref !== removeSecondHref));
          alert("카테고리 삭제되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };

  const updateCategoryNameHadler = () => {
    if (updateName === "" || updateName === "null") {
      alert("변경할 이름을 입력하세요");
    } else {
      AxiosInstance({
        url: "/api/second-category",
        method: "PUT",
        data: {
          secondHref: updateSecondHref,
          updateName: updateName,
        },
      })
        .then((response) => {
          setSecondCategory(
            secondCategory.map((el: any) => (el.secondHref !== updateSecondHref ? el : { ...el, name: updateName }))
          );
          alert("카테고리 이름이 변경되었습니다.");
        })
        .catch((error) => {
          alert("에러가 발생하였습니다.");
        });
    }
  };

  useEffect(() => {
    AxiosInstance({
      url: "/api/second-category",
      method: "GET",
      params: {
        firstHref: firstCategory,
      },
    })
      .then((response) => {
        console.log("ModalSecondCategory.tsx : ", response.data);
        setSecondCategory(response.data.data.secondCategory);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Overlay onClick={() => modalHandler.modalHandler()} />
      <Container>
        <Container1>
          <FormContainer>
            <CC.RowCenterDiv height="30px" color="#fff" fontSize={theme.fontSizes.lg} padding={"10px 0px 0px 0px"}>
              2차 카테고리 추가
            </CC.RowCenterDiv>
            <CC.ColumnDiv gap={20} padding={"20px 20px 20px 20px"} color={"#fff"}>
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
                  value={secondHref}
                  onChange={(e) => {
                    setSecondHref(e.target.value);
                  }}
                  placeholder="영어와'_'만 이용해서 경로를 입력하세요"
                />
              </Space>
              <Button onClick={() => submitHandler()}>제출</Button>
              <CC.RowDiv border={"solid #333333 3px"} />
              <CC.RowCenterDiv height="30px" color="#fff" fontSize={theme.fontSizes.lg} padding={"10px 0px 0px 0px"}>
                2차 카테고리 삭제
              </CC.RowCenterDiv>
              <InputContainer>
                <select name="secondHref" onChange={(e: any) => setRemoveSecondHref(e.target.value)}>
                  <option value={"null"} selected disabled>
                    삭제할 경로를 선택해주세요.
                  </option>
                  {secondCategory.map((el: any, index: number) => (
                    <option key={index} value={el.secondHref}>
                      {el.name} - {el.secondHref}
                    </option>
                  ))}
                </select>
              </InputContainer>
              <Button onClick={() => removeHandler()}>삭제</Button>
              <CC.RowDiv border={"solid #333333 3px"} />
              <CC.RowCenterDiv height="30px" color="#fff" fontSize={theme.fontSizes.lg} padding={"10px 0px 0px 0px"}>
                2차 카테고리 이름 변경
              </CC.RowCenterDiv>
              <InputContainer>
                <select name="secondHref" onChange={(e: any) => setUpdateSecondHref(e.target.value)}>
                  <option value={"null"} selected disabled>
                    변경할 이름를 선택해주세요.
                  </option>
                  {secondCategory.map((el: any, index: number) => (
                    <option key={index} value={el.secondHref}>
                      이름 : {el.name} - 경로 : {el.secondHref}
                    </option>
                  ))}
                </select>
              </InputContainer>
              <Space title4="변경할 이름" titleWidth={"140px"} gap={6}>
                <Input placeholder="변경할 이름" onChange={(e: any) => setUpdateName(e.target.value)} />
              </Space>
              <CC.RowDiv gap={10} padding={"10px"}>
                <Button onClick={updateCategoryNameHadler}>변경</Button>
                <Button onClick={() => modalHandler.modalHandler()}>취소</Button>
              </CC.RowDiv>
            </CC.ColumnDiv>
          </FormContainer>
        </Container1>
      </Container>
    </>
  );
};

export default ModalSecondCategory;

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
  position: fixed;
  top: 90px;
  left: 50vw;
  transform: translate(-50%, 0%);
  z-index: 10;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  min-width: 400px;
  height: calc(100% - 90px);
  padding: 10px;
`;
const Container1 = styled.div`
  background: ${theme.backgroundColors.orange};
  border-radius: 50px 4px 4px 4px;
  min-height: 500px;
  z-index: 3;
`;
const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${theme.backgroundColors.purple};
  animation: ${UpDownAnimation} 1s ease-in-out;
  animation-fill-mode: forwards;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 3fr 2fr);
  color: ${theme.backgroundColors.purpleDark};
  height: 40px;
`;
const RadioDiv = styled(CC.ColumnDiv)`
  gap: 4px;
  input[type="radio"],
  label {
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: none;
  background: ${theme.backgroundColors.purpleDark};
  color: white;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    color: ${theme.backgroundColors.purpleDark};
    background: white;
  }
`;
