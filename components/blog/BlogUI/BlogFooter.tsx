import React from "react";
import styled from "styled-components";

const BlogFooter = () => {
  return (
    <Container>
      <div>
        <p> TIL 용도 위주의 블로그 </p>
        <p> 이메일 : ssssksss@naver.com </p>
        <p> 깃허브(프로젝트용도) : https://github.com/ssssksss </p>
        <p> 깃허브(테스트코드용도) : https://github.com/ssssksss1 </p>
        <p> </p>
      </div>
    </Container>
  );
};

export default BlogFooter;

const Container = styled.footer`
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  height: 300px;
  background: #eaeaea;
  margin: 10px auto 0px;
`;
