import React, { useState } from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import ModalSignup from "@/components/Modal/ModalSignup";

const BlogHeader = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  const modalHandler = (e: any) => {
    setModalOpen(modalOpen ? false : true);
    if (modalOpen === true) {
      //setCategoryChange(!categoryChange);
    }
  };

  return (
    <Header>
      {modalOpen && <ModalSignup modalHandler={modalHandler} />}
      <HitsContainer>
        <HitsItem>
          <span> 0 </span>
          <span> 어제 </span>
        </HitsItem>
        <HitsItem>
          <span> 0 </span>
          <span> 오늘 </span>
        </HitsItem>
        <HitsItem>
          <span> 0 </span>
          <span> 전체 </span>
        </HitsItem>
      </HitsContainer>
      <Logo>
        <Link href="/">
          <a>
            <Img alt="logo" src="/img/logo.svg"></Img>
          </a>
        </Link>
      </Logo>
      <ButtonContainer>
        <SigninButton> 로그인 </SigninButton>
        <SignupButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          {" "}
          회원가입{" "}
        </SignupButton>
      </ButtonContainer>
    </Header>
  );
};

export default BlogHeader;

const Header = styled.header`
  height: 60px;
  margin: 10px auto;
  border-radius: 10px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  background: #aeaeae;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;
const rotation = keyframes`
0%,100%{
  transform: rotate(0deg);
}
50%{
  transform: rotate(360deg);
}
`;
const Logo = styled.div`
  ${({ theme }) => theme.flex.flexCenter};
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  background: #ffffff;
  border-radius: 30px;
  //애니메이션을 사용하면 css 그리는 순서때문에? 모달창에서 위로보이는 문제 발생
  animation: ${rotation} 8s ease-in-out infinite;
`;
const HitsContainer = styled.div`
  padding-left: 5px;
  ${({ theme }) => theme.flex.flexBetween};
`;
const HitsItem = styled.div`
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
  gap: 5px 0px;
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: nowrap row;
  ${({ theme }) => theme.flex.flexRight};
  padding-right: 5px;
  gap: 0px 5px;
`;
const CommonButton = css`
  ${({ theme }) => theme.customButton};
  width: 80px;
  height: 50px;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    width: 60px;
    font-size: 0.6rem;
  }
`;
const SigninButton = styled.button`
  ${CommonButton}
`;
const SignupButton = styled.button`
  ${CommonButton}
`;
