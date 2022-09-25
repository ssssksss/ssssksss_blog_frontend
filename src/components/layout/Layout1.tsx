import React from "react";
import BlogFirstMenu from "src/components/blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "src/components/blog/BlogUI/BlogSecondMenu";
import styled from "styled-components";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <BlogFirstMenu />
      <BlogSecondMenu />
      {children}
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  margin: auto;
  max-width: 1440px;
  min-height: 100vh;
`;
