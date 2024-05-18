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
      className={'hamburger-menu'}
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
  width: 3.2rem;
  height: 3.2rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  position: relative;
  padding: 0rem;
  flex-shrink: 0;
  z-index: auto;
  &:focus-visible {
    outline: none;
  }

  ${(props) =>
    props.isHideMenu
      ? css`
          & > div {
            position: absolute;
            width: 3.2rem;
            height: 0.4rem;
            background-color: #000;
            border-radius: 0.4rem;
            transition: all 0.4s ease-in-out;
          }

          & > div:nth-of-type(1) {
            top: 50%;
            transform: translate(0rem, -50%) rotate(405deg);
          }

          & > div:nth-of-type(2) {
            opacity: 0;
            transform: translate(0rem, -50%) rotate(360deg);
          }

          & > div:nth-of-type(3) {
            top: 50%;
            transform: translate(0rem, -50%) rotate(-405deg);
          }
        `
      : css`
          & > div {
            position: absolute;
            width: 2.4rem;
            height: 0.4rem;
            background-color: #000;
            border-radius: 0.4rem;
            transition: all 0.4s ease-in-out;
            opacity: 0.6;
          }

          & > div:nth-of-type(1) {
            top: 0.6rem;
          }

          & > div:nth-of-type(2) {
            top: 50%;
            transform: translateY(-50%);
          }

          & > div:nth-of-type(3) {
            bottom: 0.6rem;
          }
        `}
`;
