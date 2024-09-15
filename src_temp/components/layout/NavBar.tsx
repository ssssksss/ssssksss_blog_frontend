import { ThemeProvider } from '@emotion/react';
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

const NavBar = (props: {children: React.ReactNode}) => {
  const themeStore = useSelector((state: RootState) => state.themeStore);


  return (
    <div id="nav">
      <ReactToastifyComponents />
      <ThemeProvider theme={rootTheme[themeStore.theme]}>
        <div>{props.children}</div>
      </ThemeProvider>
    </div>
  );
};
export default NavBar;

