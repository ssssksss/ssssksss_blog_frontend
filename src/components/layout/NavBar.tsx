import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import rootTheme from '@styles/theme';
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
      <ReactToastifyComponents />
      <ThemeProvider theme={rootTheme[themeStore.theme]}>
        <Main>{children}</Main>
      </ThemeProvider>
    </Container>
  );
};
export default NavBar;

const Container = styled.div<{ themeStore: any }>`
  /* background: ${(props) =>
    rootTheme[props.themeStore.theme].main?.primary20}; */
`;
const Main = styled.div`
  -webkit-transition-property: none;
  -moz-transition-property: none;
  -o-transition-property: none;
  transition-property: none;
`;
