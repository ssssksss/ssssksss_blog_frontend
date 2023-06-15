import theme from "@/styles/theme";
import React from "react";
import styled from "@emotion/styled";
import BlogFirstMenu from "../blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "../blog/BlogUI/BlogSecondMenu";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout2 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      {/*  */}
      {children}
      {/*  */}
    </Container>
  );
};

export default Layout2;

const Container = styled.div`
  padding-left: 44px;
  margin: auto;
  min-width: 360px;
  max-width: 1440px;
`;
