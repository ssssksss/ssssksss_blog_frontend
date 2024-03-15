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
  height: 100vh;
  transition: all 1.2s ease-in-out;
  transition-property: background-color;
  animation-fill-mode: forwards;
  display: grid;
  grid-template-columns: 44px auto;
  @media (min-width: ${(props) => props.theme.deviceSizes.pc}) {
    grid-template-columns: 120px calc(100vw - 120px);
  }
`;
const Container1 = styled.div`
  display: grid;
  grid-template-rows: 44px calc(100vh - 44px);

  @media (pointer: coarse) {
    grid-template-rows: 44px calc(100vh - 44px - 52px);
  }
`;

const MainContainer = styled.main`
  container-name: main-container;
  container-type: inline-size;
  padding: 2px;
  max-width: 1440px;
  margin: 0px auto;
  width: 100%;
  & > div {
    width: 100%;
  }
`;
