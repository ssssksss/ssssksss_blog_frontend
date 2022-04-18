import React from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";

const BlogHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <HitsContainer>
        <p> 오늘 조회수 : </p>
        <p> 전체 조회수 : </p>
      </HitsContainer>
      <Link href="/">
        <a>
          <Img alt="logo" src="/img/logo.svg"></Img>
        </a>
      </Link>
      <ButtonContainer>
        <SigninButton> 로그인 </SigninButton>
        <SignupButton> 회원가입 </SignupButton>
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
  padding: 0px 5px;
  position: relative;
  display: flex;
  flex-flow: wrap row;
  justify-content: space-between;
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
const Img = styled.img`
  width: 50px;
  height: 50px;
  position: absolute;
  padding: 5px;
  background: #ffffff;
  border-radius: 30px;
  left: calc(50% - 25px);
  top: 5px;
  animation: ${rotation} 8s ease-in-out infinite;
`;
const HitsContainer = styled.div``;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: nowrap row;
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
