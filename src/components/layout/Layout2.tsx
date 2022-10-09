import theme from "@/styles/theme";
import React from "react";
import styled from "styled-components";
import BlogFirstMenu from "../blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "../blog/BlogUI/BlogSecondMenu";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout2 = ({ children }: AppLayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout2;

const Container = styled.div`
  margin: auto;
  min-width: 400px;
  max-width: 1440px;
  padding: 0px 10px;
  min-height: 100vh;
  background-color: ${theme.backgroundColors.background2};
`;
