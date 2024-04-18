import Animations from '@components/common/animations/Animations';
import Button from '@components/common/button/Button';
import HamburgerMenu from '@components/common/button/HamburgerMenu';
import { Icons } from '@components/common/icons/Icons';
import ReactPlayerContainer from '@components/reactPlayer/ReactPlayerContainer';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useState } from 'react';
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
        isHideMenu={isNavbarOpen}
        onClickHideMenu={() => setIsNavbarOpen((prev) => !prev)}
      />
      <FoldContainer isNavbarOpen={isNavbarOpen} className="fold-container">
        <NavContainer>
          {LeftNavItems.map((i, index) => (
            <Link href={`${i[2]}`} key={'sideBarItem' + index} prefetch={false}>
              <NavItem
                blur={i[3].isRequiredAuth === true && !authStore.id === true}
                onClick={(e: MouseEvent) => {
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
          <CC.ColumnBetweenDiv gap={4}>
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

const Container = styled.aside<IContainerProps>`
  font-weight: 600;
  z-index: 50;
  width: 2.75rem;
  display: flex;
  flex-flow: nowrap column;
`;

const FoldContainer = styled.div<IContainerProps>`
  height: calc(100vh - 4rem);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: ${(props) => (props.isNavbarOpen ? 'flex' : 'none')};
  flex-flow: nowrap column;
  justify-content: flex-start;
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  outline-offset: -0.1rem;
  background: ${(props) => props.theme.main.contrast};
  position: fixed;
  top: 3.5rem;
  left: 0.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
  z-index: ${(props) => props.isNavbarOpen && 50};
`;
const NavContainer = styled.nav`
  width: 12rem;
  height: 100%;
  display: flex;
  flex-flow: nowrap column;
  & > :nth-last-child(1) {
    margin-top: auto;
  }
`;

const NavItem = styled(Button)<{
  active?: boolean;
  blur?: boolean;
}>`
  width: 100%;
  height: 100%;
  border-radius: 0rem;
  display: grid;
  padding: 0.5rem 0rem;
  grid-template-columns: 3.2rem auto;
  justify-content: flex-start;
  & > :nth-last-of-type(1) {
    animation-name: ${Animations.LeftToRightFadein};
    animation-duration: 0.6s;
  }
  color: ${(props) => props.active && props.theme.colors.white};
  background: ${(props) =>
    props.active ? props.theme.main.primary80 : 'none'};
`;
