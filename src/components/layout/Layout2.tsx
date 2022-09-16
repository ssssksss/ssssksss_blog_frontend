import React from "react";
import styled from "styled-components";

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
`;
