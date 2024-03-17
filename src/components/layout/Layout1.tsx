import styled from '@emotion/styled';
import React from 'react';
import LoadingComponent from '../common/loading/LoadingComponent';
import SideBar from './SideBar';
import TopBar from './TopBar';

type AppLayoutProps = {
  children: React.ReactNode;
};

// 블로그 용도의 레이아웃
const Layout1 = ({ children }: AppLayoutProps) => {
  return (
    <Container>
      <SideBar />
      <Container1>
        <TopBar id={'top-bar'} />
        <MainContainer id={'main-container'}>{children}</MainContainer>
      </Container1>
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
`;
const Container1 = styled.div`
  padding-top: ${(props) => props.theme.calcRem(44)};
`;

const MainContainer = styled.main`
  container-name: main-container;
  container-type: inline-size;
  margin: 0px auto;
  width: 100%;
  height: calc(100vh - ${(props) => props.theme.calcRem(44)});
  max-width: 1440px;
  outline: solid ${(props) => props.theme.main.primary40} 1px;
  outline-offset: -1px;
`;
