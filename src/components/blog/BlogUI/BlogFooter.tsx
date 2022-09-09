import Link from "next/link";
import React from "react";
import styled from "styled-components";

const BlogFooter = () => {
  return (
    <Container>
      <p> TIL 용도 위주의 블로그 </p>
      <p> 이메일 : ssssksss@naver.com </p>
      <p>
        <Link href="https://github.com/ssssksss">
          <a>깃허브(프로젝트용도)</a>
        </Link>
      </p>
      <p>
        <Link href="https://github.com/ssssksss1">
          <a>깃허브(테스트코드용도)</a>
        </Link>
      </p>
      <p>
        <Link href="https://www.acmicpc.net/user/ssssksss">
          <a>백준 알고리즘</a>
        </Link>
      </p>
    </Container>
  );
};

export default BlogFooter;

const Container = styled.footer`
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  height: 300px;
  background: #eaeaea;
  margin: auto;
  padding: 20px 0px;

  & > p {
    padding: 20px 0px;
    background: #ffffff;
  }
`;
