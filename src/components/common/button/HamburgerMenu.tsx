import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
/**
 * @param isHideMenu: boolean;
 * @param onClickHideMenu: () => void;
 */
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

interface IContainerProps {
  isHideMenu: boolean;
}

const Container = styled.button<IContainerProps>`
  width: ${(props) => props.theme.calcRem(44)};
  height: ${(props) => props.theme.calcRem(44)};
  border-radius: ${(props) => props.theme.calcRem(8)} 0px 0px 0px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0px;
  flex-shrink: 0;
  outline: solid ${(props) => props.theme.main.primary40} 1px;
  outline-offset: -1px;
  z-index: auto;

  ${(props) =>
    props.isHideMenu
      ? css`
          & > div {
            position: absolute;
            width: ${props.theme.calcRem(32)};
            height: ${props.theme.calcRem(4)};
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
            width: ${props.theme.calcRem(24)};
            height: ${props.theme.calcRem(4)};
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
