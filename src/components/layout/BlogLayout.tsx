import theme from "@/styles/theme";
import React from "react";
import styled from "@emotion/styled";
import BlogFirstMenu from "../blog/BlogUI/BlogFirstMenu";
import BlogSecondMenu from "../blog/BlogUI/BlogSecondMenu";

type AppLayoutProps = {
  children: React.ReactNode;
};

const BlogLayout = ({ children }: AppLayoutProps) => {
  return <Container>{children}</Container>;
};

export default BlogLayout;

const Container = styled.div`
  padding-left: 44px;
  padding-top: 44px;
  margin: auto;
  max-width: 1440px;

  @media (min-width: ${theme.deviceSizes.laptop}) {
    padding-left: 120px;
  }
`;
