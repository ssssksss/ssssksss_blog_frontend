const HamburgerMenu = dynamic(
  () => import('@components/common/button/HamburgerMenu'),
  {
    loading: () => <p>Loading...</p>,
  },
);

const ReactPlayerContainer = dynamic(
  () => import('../reactPlayer/ReactPlayerContainer'),
  {
    loading: () => <p>Loading...</p>,
  },
);

import Animations from '@components/common/animations/Animations';
import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@redux/store/leftNav';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import dynamic from 'next/dynamic';
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
    <Container>
      <FoldDiv isNavbarOpen={isNavbarOpen}>
        <NavStyle>
          <HamburgerMenu
            isHideMenu={isNavbarOpen}
            onClickHideMenu={() => setIsNavbarOpen((prev) => !prev)}
          />
          {LeftNavItems.map((i, index) => (
            <Link href={`${i[2]}`} key={'sideBarItem' + index} prefetch={false}>
              <a>
                <NavItem
                  blur={i[3].isRequiredAuth === true && !authStore.id === true}
                  isNavbarOpen={isNavbarOpen}
                  onClick={() => {
                    store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE(i[2]));
                  }}
                  active={
                    activeMenu.leftNavActiveItem.split('?')[0] ===
                    i[2].split('?')[0]
                  }
                >
                  <Image src={i[0]} alt={i[1]} width={'24px'} height={'24px'} />
                  <span> {i[1]} </span>
                </NavItem>
              </a>
            </Link>
          ))}
        </NavStyle>
        <CC.ColumnBetweenDiv gap={4}>
          {typeof window != 'undefined' && authStore.id && (
            <ReactPlayerContainer isNavbarOpen={isNavbarOpen} />
          )}
        </CC.ColumnBetweenDiv>
      </FoldDiv>
    </Container>
  );
};
export default SideBar;

interface IContainerProps {
  isNavbarOpen: boolean;
}

const Container = styled.aside`
  ${(props) => props.theme.flex.column.between};
  background: ${(props) => props.theme.main.contrast};
  font-size: ${(props) => props.theme.fontSize.sm};
  font-weight: 600;
  position: relative;
  width: 44px;

  @media (min-width: ${(props) => props.theme.deviceSizes.pc}) {
    width: 120px;
  }
`;

const NavStyle = styled(CC.ColumnDiv.withComponent('nav'))` {
}`;

const FoldDiv = styled.div<IContainerProps>`
  ${(props) => props.theme.flex.column.between};
  height: 100vh;
  width: 100%;
  z-index: 20;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar: {
    display: none;
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.pc}) {
    ${(props) =>
      props.isNavbarOpen &&
      `
      width: 120px;
      background: ${props.theme.main.contrast};
      outline: solid ${props.theme.main.primary40} 2px;
      `}
  }
`;

const NavItem = styled(Button)<{
  outline: boolean;
  height: string;
  IContainerProps;
  active?: boolean;
  blur?: boolean;
}>`
  padding-left: 10px;
  gap: 10px;
  border-radius: 0px;
  justify-content: left;
  width: 100%;
  & > :nth-last-of-type(1) {
    justify-content: flex-start;
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

  /* pc크기보다 작을 경우 */
  @media (max-width: ${(props) => props.theme.deviceSizes.pc}) {
    ${(props) =>
      props.isNavbarOpen
        ? `
      width: 120px;
        `
        : `
        width: 44px;
        padding-left: 10px;
        &> :nth-last-of-type(1) {
          display: none;
        }
        `}
  }
`;
