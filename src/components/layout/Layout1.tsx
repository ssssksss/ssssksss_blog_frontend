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
        <TopBar />
        <MainContainer>{children}</MainContainer>
      </Container1>
      <LoadingComponent w={'100vw'} h={'100vh'} position={'fixed'} />
    </Container>
  );
};

export default Layout1;
const Container = styled.div`
  border-radius: ${(props) => props.theme.borderRadius.br10};
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 44px auto;
  @media (min-width: ${(props) => props.theme.deviceSizes.pc}) {
    grid-template-columns: max-content auto;
    margin: auto;
  }
  @media (pointer: coarse) {
    height: calc(100vh - 120px);
  }
  transition: all 1.2s ease-in-out;
  transition-property: background-color;
  animation-fill-mode: forwards;
`;
const Container1 = styled.div`
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
`;

const MainContainer = styled.main`
  container-name: main-container;
  container-type: inline-size;
  width: 100%;
  padding: 1px 1px 0px 1px;
  height: calc(100vh - 44px);
  & > div {
    height: 100%;
    width: 100%;
    max-width: 1440px;
    margin: auto;
  }
`;
