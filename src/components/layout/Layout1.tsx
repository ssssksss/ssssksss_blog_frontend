import LoadingComponent from '@components/common/loading/LoadingComponent';
import styled from '@emotion/styled';
import React from 'react';
import TopBar from './TopBar';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <TopBar />
      <MainContainer id={'main-container'}>{children}</MainContainer>
      <LoadingComponent w={'100vw'} h={'100vh'} position={'fixed'} />
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* transition: all 1.2s ease-in-out; */
  /* transition-property: background-color; */
  /* animation-fill-mode: forwards; */
  padding: 4.5rem 0.5rem 5rem 0.5rem;
`;

const MainContainer = styled.main`
  margin: 0rem auto;
  width: 100%;
  max-height: calc(100vh - 4.5rem);
  max-width: 1440px;
`;
