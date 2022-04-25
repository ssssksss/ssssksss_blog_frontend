import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import ModalSignup from "@/components/Modal/ModalSignup";
import ModalLogin from "@/components/Modal/ModalLogin";

const BlogHeader = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);

  const modalHandler = (e: any) => {
    setModalOpen(modalOpen ? false : true);
  };

  const modalHandler1 = (e: any) => {
    setModalOpen1(modalOpen1 ? false : true);
  };

  return (
    <Header>
      {modalOpen && <ModalSignup modalHandler={modalHandler} />}
      {modalOpen1 && <ModalLogin modalHandler={modalHandler1} />}
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
        <LoginButton
          onClick={() => {
            setModalOpen1(true);
          }}
        >
          {" "}
          로그인{" "}
        </LoginButton>
        <SignupButton
          onClick={() => {
            setModalOpen(true);
          }}
        >
          회원가입
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
  background: ${({ theme }) => theme.customColors.second};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
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
  animation: ${rotation} 8s ease-in-out infinite;
`;
const HitsContainer = styled.div`
  padding-left: 10px;
  ${({ theme }) => theme.flex.flexBetween};
  color: white;
`;
const HitsItem = styled.div`
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px 0px;
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
const LoginButton = styled.button`
  ${CommonButton}
`;
const SignupButton = styled.button`
  ${CommonButton}
`;