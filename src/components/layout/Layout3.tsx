import styled from '@emotion/styled';
import React from 'react';
import TopBar from './TopBar';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout3 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <TopBar />
      {children}
    </Container>
  );
};

export default Layout3;
const Container = styled.div`
visibility: hidden;
`;


