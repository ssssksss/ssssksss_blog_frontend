import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { store } from "@/redux/store";
import { RootState } from "@/redux/store/reducers";
import theme from "@/styles/theme";

/**
 * Author : Sukyung Lee
 * FileName: HamburgerMenu.tsx
 * Date: 2022-07-17 03:08:42
 * Description : 햄버거 메뉴 버튼
 */

interface IHamburgerMenuProps {
  isHideMenu: boolean;
  onClickHideMenu: () => void;
}

const HamburgerMenu = (props: IHamburgerMenuProps) => {
  const themeStore = useSelector((state: RootState) => state.themeStore);
  return (
    <Container onClick={props.onClickHideMenu} isHideMenu={props.isHideMenu} type="button" themeStore={themeStore}>
      <div> </div>
      <div> </div>
      <div> </div>
    </Container>
  );
};
export default HamburgerMenu;

interface IContainerProps {
  isHideMenu: boolean;
  themeStore: {
    menuBackground: string;
    menuIconBackground: string;
    menuIconFont: string;
    menuIconFontColor: string;
    HoverMenuIconBackground: string;
    HoverMenuIconFontColor: string;
  };
}

const Container = styled.button<IContainerProps>`
  width: 44px;
  height: 44px;
  position: fixed;
  border-radius: 10px 0px 0px 0px;
  top: 0;
  left: 0;
  z-index: 200;
  padding: 6px;
  background-color: transparent;
  display: flex;
  justify-content: center;

  @media (min-width: ${theme.deviceSizes.laptop}) {
    display: none;
  }

  ${(props) =>
    props.isHideMenu
      ? css`
          & > div {
            position: absolute;
            width: 32px;
            height: 4px;
            background-color: #000;
            border-radius: 4px;
            transition: all 0.4s ease-in-out;
          }

          & > div:nth-of-type(1) {
            top: 50%;
            transform: translate(0px, -50%) rotate(405deg);
          }

          & > div:nth-of-type(2) {
            opacity: 0;
            transform: translate(0px, -50%) rotate(360deg);
          }

          & > div:nth-of-type(3) {
            top: 50%;
            transform: translate(0px, -50%) rotate(-405deg);
          }
        `
      : css`
          & > div {
            position: absolute;
            width: 24px;
            height: 4px;
            background-color: #000;
            border-radius: 4px;
            transition: all 0.4s ease-in-out;
            opacity: 0.6;
          }

          & > div:nth-of-type(1) {
            top: 10px;
          }

          & > div:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
          }

          & > div:nth-of-type(3) {
            bottom: 10px;
          }
        `}
`;
