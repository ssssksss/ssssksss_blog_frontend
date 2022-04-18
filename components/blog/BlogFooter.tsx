import React from "react";
import styled from "styled-components";

const BlogFooter = () => {
  return (
    <Container>
      <div> footter 공간 </div>
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
