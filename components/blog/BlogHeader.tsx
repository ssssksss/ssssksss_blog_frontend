import React from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";

const BlogHeader = () => {
  const router = useRouter();

  return (
    <Header>
      <Link href="/">
        <a>
          <Img alt="logo" src="/img/logo.svg"></Img>
        </a>
      </Link>
      <div>
        <p> 오늘 조회수 : </p>
        <p> 전체 조회수 : </p>
      </div>
      <SigninButton> 로그인 </SigninButton>
      <SignupButton> 회원가입 </SignupButton>
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
  padding: 0px 10px;
  position: relative;
  ${({ theme }) => theme.flex.flexLeft};
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
const CommonButton = css`
  ${({ theme }) => theme.customButton};
  width: 80px;
  height: 50px;
  position: absolute;
  top: 5px;
`;
const SigninButton = styled.button`
  ${CommonButton}
  right: 100px;
`;
const SignupButton = styled.button`
  ${CommonButton}
  right: 10px;
`;
