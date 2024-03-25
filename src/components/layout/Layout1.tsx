import styled from '@emotion/styled';
import React from 'react';
import LoadingComponent from '../common/loading/LoadingComponent';
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
  border-radius: ${(props) => props.theme.borderRadius.br10};
  width: 100vw;
  transition: all 1.2s ease-in-out;
  transition-property: background-color;
  animation-fill-mode: forwards;
  padding-top: 3.2rem;
`;

const MainContainer = styled.main`
  margin: 0rem auto;
  width: 100%;
  min-height: calc(100vh - 3.2rem);
  max-width: 144rem;
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  outline-offset: -0.1rem;
`;
