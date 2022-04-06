import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const ModalFirstCategory = (modalHandler: any) => {
  const [name, setName] = useState("");
  const [firstHref, setFirstHref] = useState("");
  const [line, setLine] = useState(0);
  const [removeFirstHref, setRemoveFirstHref] = useState("");

  const submitHandler = async () => {
    if (name === "") {
      alert("카테고리명을 입력하세요");
    } else if (firstHref === "") {
      alert("경로를 입력하세요");
    } else if (line < 1 && line > 4) {
      alert("라인은 1~4의 숫자를 넣어야 합니다.");
    } else {
      await AxiosInstance({
        url: "/ssssksss/first-category/add",
        method: "POST",
        data: {
          name: name,
          firstHref: "/" + firstHref,
          line: line,
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
        url: "/ssssksss/first-category/remove",
        method: "POST",
        data: {
          firstHref: "/" + removeFirstHref,
        },
      })
        .then((response) => {
          alert("카테고리가 삭제되었습니다.");
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
            <p> firstHref : </p>
            <input
              value={firstHref}
              onChange={(e) => {
                setFirstHref(e.target.value);
              }}
              placeholder="경로를 입력하세요."
            />
          </div>
          <div>
            <p> line : </p>
            <input
              value={line}
              onChange={(e) => {
                setLine(Number(e.target.value));
              }}
              placeholder="1~4까지의 수를 입력하세요."
            />
          </div>
          <button onClick={() => submitHandler()}> 제출 </button>
          <button
            onClick={(e: React.MouseEvent) => {
              modalHandler.modalHandler();
            }}
          >
            취소
          </button>
          <div>
            <p> firstHref :</p>
            <input
              value={removeFirstHref}
              onChange={(e) => {
                setRemoveFirstHref(e.target.value);
              }}
              placeholder="삭제할 URL경로를 입력하세요."
            />
          </div>
          <button onClick={() => removeHandler()}> 삭제 </button>
        </FormContainer>
      </Container>
    </>
  );
};
export default ModalFirstCategory;

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
  font-size: 16px;
  ${({ theme }) => theme.flex.flexLeftTop};
`;
const FormContainer = styled.div`
  margin: 40px auto;
  width: 80%;
  height: calc(100% - 80px);
  background: #aeaeae;
  padding: 20px 20px 0px 0px;

  div {
    height: 40px;
    ${({ theme }) => theme.flex.flexLeft};
    display: grid;
    grid-template-columns: 120px calc(100% - 120px);
  }
`;
