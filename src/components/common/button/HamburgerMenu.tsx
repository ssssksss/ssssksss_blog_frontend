import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
  return (
    <Container
      onClick={props.onClickHideMenu}
      isHideMenu={props.isHideMenu}
      type="button"
    >
      <div> </div>
      <div> </div>
      <div> </div>
    </Container>
  );
};
export default HamburgerMenu;
const Container = styled.button<{ isHideMenu: boolean }>`
  width: 40px;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 30;
  padding: 6px;
  background-color: ${(props) => props.isHideMenu || "#aeaeae"};

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
            transform: translate(200px, -50%) rotate(405deg);
          }

          & > div:nth-of-type(2) {
            opacity: 0;
            transform: translate(200px, -50%) rotate(360deg);
          }

          & > div:nth-of-type(3) {
            top: 50%;
            transform: translate(200px, -50%) rotate(-405deg);
          }
        `
      : css`
          & > div {
            position: absolute;
            width: 28px;
            height: 4px;
            background-color: #000;
            border-radius: 4px;
            transition: all 0.4s ease-in-out;
            opacity: 0.6;
          }

          & > div:nth-of-type(1) {
            top: 8px;
          }

          & > div:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
          }

          & > div:nth-of-type(3) {
            bottom: 8px;
          }
        `}

  @media (min-width: 769px) {
    display: none;
  }
`;
