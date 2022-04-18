import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useRouter } from "next/router";
import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/store/reducers";

const ModalSecondCategory = (modalHandler: any) => {
  const [name, setName] = useState("");
  const [secondHref, setSecondHref] = useState("");
  const [removeSecondHref, setRemoveSecondHref] = useState("");
  const firstCategory = useSelector(
    (state: RootState) => state.category.firstCategoryPath
  );

  const submitHandler = async () => {
    if (name === "") {
      alert("카테고리명을 입력하세요");
    } else if (secondHref === "") {
      alert("경로를 /을 넣어서 입력하세요");
    } else {
      await AxiosInstance({
        url: "/ssssksss/second-category/add",
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
        url: "/ssssksss/second-category/remove",
        method: "POST",
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
    <>
      <Overlay
        onClick={(e: React.MouseEvent) => {
          modalHandler.modalHandler();
        }}
      ></Overlay>
      <Container>
        <FormContainer>
          <Block>
            <div>
              <p>name :</p>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="카테고리명을 입력하세요."
              />
            </div>
            <div>
              <p>secondHref : </p>
              <input
                value={secondHref}
                onChange={(e) => {
                  setSecondHref(e.target.value);
                }}
                placeholder="경로를 입력하세요."
              />
            </div>
            <Center>
              <button onClick={() => submitHandler()}> 제출 </button>
              <button
                onClick={(e: React.MouseEvent) => {
                  modalHandler.modalHandler();
                }}
              >
                취소
              </button>
            </Center>
          </Block>
          <Block>
            <div>
              <p>href :</p>
              <input
                value={removeSecondHref}
                onChange={(e) => {
                  setRemoveSecondHref(e.target.value);
                }}
                placeholder="삭제할 경로를 입력하세요."
              />
            </div>
            <Center>
              <button onClick={() => removeHandler()}> 삭제 </button>
            </Center>
          </Block>
        </FormContainer>
      </Container>
    </>
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
  cursor: pointer;
  border: 0px;
  z-index: auto;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background: white;
  width: 60%;
  height: calc(100% - 100px);
  transform: translate(-50%, -50%);
  border: 0px;
  color: black;
  ${({ theme }) => theme.flex.flexLeftTop};
`;
const FormContainer = styled.div`
  margin: 40px auto;
  width: 80%;
  height: calc(100% - 80px);
  background: #aeaeae;
  padding: 20px 20px 0px 0px;
`;
const Block = styled.div`
  div {
    height: 40px;
    ${({ theme }) => theme.flex.flexLeft};
    display: grid;
    grid-template-columns: 100px calc(100% - 100px);
  }
`;
const Center = styled.p`
  ${({ theme }) => theme.flex.flexCenter};
`;
