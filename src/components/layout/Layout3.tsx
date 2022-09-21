import React from "react";
import styled from "styled-components";

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout3 = ({ children }: AppLayoutProps) => {
  return <Container>{children}</Container>;
};

export default Layout3;

const Container = styled.div`
  margin: auto;
  min-width: 400px;
  max-width: 1440px;
  padding: 0px 10px;
  min-height: 100vh;
`;
