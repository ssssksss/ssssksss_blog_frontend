import Animations from '@components/common/animations/Animations';
import Button from '@components/common/button/Button';
import HamburgerMenu from '@components/common/button/HamburgerMenu';
import { Icons } from '@components/common/icons/Icons';
import ReactPlayerContainer from '@components/reactPlayer/ReactPlayerContainer';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SideBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:22"
 * @description 설명
 */

const SideBar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const activeMenu = useSelector((state: RootState) => state.leftNavItemStore);
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const router = useRouter();

  useEffect(() => {
    const sideBarActiveCheck = () => {
      if (window.document.location.pathname == '/') {
        store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE('/'));
      }
    };
    window.addEventListener('popstate', sideBarActiveCheck);
    return () => {
      window.removeEventListener('popstate', sideBarActiveCheck);
    };
  }, []);

  useEffect(() => {
    if (router.isReady) {
      store.dispatch(
        SET_LEFT_NAV_ITEM_ACTIVE('/' + window.location.pathname.split('/')[1]),
      );
    }
  }, [router.isReady]);

  const LeftNavItems = [
    [Icons.HomeIcon, '홈', '/', { isRequiredAuth: false }],
    [Icons.BlogIcon, '블로그', '/blog', { isRequiredAuth: false }],
    [
      Icons.BoardIcon,
      '게시판',
      `/board?page=${boardStore.page > 0 ? boardStore.page : 1}&size=${boardStore.size ?? 10}&sort=${boardStore.sort ?? 'latest'}&keyword=${boardStore.keyword ?? ''}`,
      { isRequiredAuth: false },
    ],
    [Icons.WorkListIcon, '할일', '/todo', { isRequiredAuth: true }],
    [Icons.MemoIcon, '메모', '/memo', { isRequiredAuth: true }],
    // [Icons.DashBoardIcon, '대시보드', 'dashboard'],
    [Icons.CalendarIcon, '일정', '/schedule', { isRequiredAuth: true }],
    [Icons.SettingIcon, '설정', '/setting', { isRequiredAuth: false }],
  ];

  return (
    <Container isNavbarOpen={isNavbarOpen}>
      <HamburgerMenu
        className={'hamburger-menu'}
        isHideMenu={isNavbarOpen}
        onClickHideMenu={() => setIsNavbarOpen((prev) => !prev)}
      />
      <FoldContainer isNavbarOpen={isNavbarOpen} className="fold-container">
        <NavContainer>
          {LeftNavItems.map((i, index) => (
            <Link href={`${i[2]}`} key={'sideBarItem' + index} prefetch={false}>
              <NavItem
                blur={i[3].isRequiredAuth === true && !authStore.id === true}
                isNavbarOpen={isNavbarOpen}
                onClick={(e) => {
                  if (i[2] == window.document.location.pathname.split('?')[0]) {
                    e.preventDefault();
                  }
                  store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE(i[2]));
                }}
                active={
                  activeMenu.leftNavActiveItem.split('?')[0] ===
                  i[2].split('?')[0]
                }
              >
                <CC.ImgContainer h={'2.4rem'} w={'100%'}>
                  <Image src={i[0]} alt={i[1]} width={'1'} height={'1'} />
                </CC.ImgContainer>
                <div className={'nav-item-text'}> {i[1]} </div>
              </NavItem>
            </Link>
          ))}
          <CC.ColumnBetweenDiv gap={4} padding={'0rem 0.1rem'}>
            {typeof window != 'undefined' && authStore.id && (
              <ReactPlayerContainer isNavbarOpen={isNavbarOpen} />
            )}
          </CC.ColumnBetweenDiv>
        </NavContainer>
      </FoldContainer>
    </Container>
  );
};
export default SideBar;

interface IContainerProps {
  isNavbarOpen: boolean;
}

const hideAnimation = keyframes`
  0%,90% {
    height: 100vh;
    opacity: 1;
  }
  100% {
    height: 0vh;
    opacity: 0.2;
  }
`;

const Container = styled.aside<IContainerProps>`
  font-weight: 600;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 50;
  width: 3.2rem;
  display: flex;
  flex-flow: nowrap column;
  /* 일반 */

  height: ${(props) => props.isNavbarOpen && '100vh'};
  .fold-container {
    animation: ${hideAnimation} 1s linear;
    animation-fill-mode: forwards;
    animation: ${(props) => props.isNavbarOpen && 'none'};
  }

  &:hover {
    height: 100vh;
    .fold-container {
      animation: none;
      display: flex;
    }
  }
`;

const FoldContainer = styled.div<IContainerProps>`
  animation-name: ${Animations.LeftToRightFadein};
  animation-duration: 0.6s;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-start;
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  outline-offset: -0.1rem;
  &::-webkit-scrollbar: {
    display: none;
  }

  ${(props) =>
    props.isNavbarOpen &&
    `
      z-index: 50;
      width: 12rem;
      `}
`;
const NavContainer = styled.nav`
  height: 100%;
  padding: 0rem 0.1rem;
  display: flex;
  flex-flow: nowrap column;
  & > :nth-last-child(1) {
    margin-top: auto;
  }
  background: ${(props) => props.theme.main.contrast};
`;

const NavItem = styled(Button)<{
  outline: boolean;
  height: string;
  IContainerProps;
  active?: boolean;
  blur?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 0rem;
  display: grid;
  padding: 0.8rem 0rem;
  grid-template-columns: 3.2rem auto;
  justify-content: flex-start;
  background: none;
  & > :nth-last-of-type(1) {
    animation-name: ${Animations.LeftToRightFadein};
    animation-duration: 0.6s;
  }

  ${(props) =>
    props.blur &&
    `
    background: ${props.theme.colors.gray40};
  `};

  ${(props) =>
    props.active &&
    `
    background: ${props.theme.main.primary20};
  `};

  ${(props) =>
    props.isNavbarOpen
      ? `
      width: 12rem;
      `
      : `
      width: 4.4rem;
      div:last-child {
        display: none;
      }
    `}
`;
