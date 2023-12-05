import { commonTheme } from '@/styles/theme';
import React from 'react';
import styled from '@emotion/styled';

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
  padding-left: 44px;
  min-height: 100vh;
`;
