const SideBar = dynamic(() => import('@/components/layout/SideBar'), {
  loading: () => <p>Loading...</p>,
});

const TopBar = dynamic(() => import('@/components/layout/TopBar'), {
  loading: () => <p>Loading...</p>,
});

import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import rootTheme from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import ReactToastifyComponents from './../react-toastify/ReactToastifyComponents';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file NavBar.tsx
 * @version 0.0.1 "2023-09-20 10:40:44"
 * @description 설명
 */

const NavBar = ({ children }) => {
  const themeStore = useSelector((state: RootState) => state.themeStore);

  return (
    <Container id="nav" themeStore={themeStore}>
      <ThemeProvider theme={rootTheme[themeStore.theme]}>
        <ReactToastifyComponents />
        <SideBar />
        <CC.ColumnDiv w={'100%'} h={'100%'}>
          <TopBar />
          <Main>{children}</Main>
        </CC.ColumnDiv>
      </ThemeProvider>
    </Container>
  );
};
export default NavBar;

const Container = styled.div<{ themeStore: any }>`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: nowrap row;
  @media (pointer: coarse) {
    height: calc(100vh - 80px);
  }
  background: ${props => rootTheme[props.themeStore.theme].main.primary20};
  transition: all 1.2s ease-in-out;
  transition-property: background-color;
  animation-fill-mode: forwards;
`;
const Main = styled.main`
  height: 100%;
  -webkit-transition-property: none;
  -moz-transition-property: none;
  -o-transition-property: none;
  transition-property: none;
`;
