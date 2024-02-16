const HamburgerMenu = dynamic(() => import('@/components/common/button/HamburgerMenu'), {
  loading: () => <p>Loading...</p>
});

// const ReactPlayerContainer = dynamic(() => import('../reactPlayer/ReactPlayerContainer'), {
//   loading: () => <p>Loading...</p>
// });

import Animations from '@/components/common/animations/Animations';
import { Icons } from '@/components/common/icons/Icons';
import { store } from '@/redux/store';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@/redux/store/leftNav';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
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
  const authStore = useSelector((state: RootState) => state.authStore);
  const boardStore = useSelector((state: RootState) => state.boardStore);
  const router = useRouter();

  useEffect(() => {

    if(router.isReady) {
      store.dispatch(
        SET_LEFT_NAV_ITEM_ACTIVE('/'+window.location.pathname.split('/')[1])
      );
    }
  }, [router.isReady]);

  const LeftNavItems = [
    [Icons.HomeIcon, '홈', '/'],
    [Icons.BlogIcon, '블로그', '/blog'],
    [Icons.BoardIcon, '게시판', `/board?page=${boardStore.page > 0 ? boardStore.page : 1}&size=${boardStore.size ?? 10}&sort=${boardStore.sort ?? 'latest'}&keyword=${boardStore.keyword ?? ''}`],
    [Icons.WorkListIcon, '할일', '/todo'],
    // [Icons.DashBoardIcon, '대시보드', 'dashboard'],
    [Icons.CalendarIcon, '일정', '/schedule'],
    [Icons.SettingIcon, '설정', '/setting'],
  ];

  return (
    <Container isNavbarOpen={isNavbarOpen}>
      <FoldDiv isNavbarOpen={isNavbarOpen}>
        <CC.ColumnBetweenDiv>
          <HamburgerMenu
            isHideMenu={isNavbarOpen}
            onClickHideMenu={() => setIsNavbarOpen(prev => !prev)}
          />
          {LeftNavItems.map((i, index) => (
            <Link href={`${i[2]}`} prefetch={false} key={'sideBarItem' + index}>
              <NavItemContainer
                isNavbarOpen={isNavbarOpen}
                onClick={() => {
                  store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE(i[2]));
                }}
                active={activeMenu.leftNavActiveItem.split('?')[0] === i[2].split('?')[0]}
              >
                  <Image src={i[0]} alt={i[1]} />
                  <span> {i[1]} </span>
              </NavItemContainer>
            </Link>
          ))}
        </CC.ColumnBetweenDiv>
        <CC.ColumnBetweenDiv gap={4} bg={"blue"}>
        {/* {
          typeof window != 'undefined' && 
            <ReactPlayerContainer isNavbarOpen={isNavbarOpen}/>
        } */}
        </CC.ColumnBetweenDiv>
      </FoldDiv>
    </Container>
  );
};
export default SideBar;

interface IContainerProps {
  isNavbarOpen: boolean;
}

const Container = styled.aside<IContainerProps>`
  ${props => props.theme.flex.column.between};
  background: ${props => props.theme.main.contrast};
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: 600;
  position: relative;
  width: 44px;
  z-index: 40;

  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    width: 120px;
  }

`;

const FoldDiv = styled.div`
  ${props => props.theme.flex.column.between};
  height: 100vh;
  width: 100%;
  z-index: 20;
  ${props=>props.theme.scroll.hidden};
  
  @media (max-width: ${props => props.theme.deviceSizes.pc}) {
    ${props =>
      props.isNavbarOpen &&
      `
      width: 120px;
      background: ${props.theme.main.contrast};
      outline: solid ${props.theme.main.primary40} 2px;
      `}
  }
`;

const UserBox = styled.div`
width: 100%;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const NavItemContainer = styled.div<{
  outline: boolean;
  height: string;
  IContainerProps;
  active?: boolean;
}>`
  display: grid;
  grid-template-columns: 24px calc(100% - 24px);
  align-items: center;
  padding: 0px 10px;
  gap: 20px;
  width: 120px;
  height: 32px;
  cursor: pointer;
  /* 호버일때 */
  &:hover {
    background: ${props => props.theme.main.primary20};
  }
  /* outline 속성일 떄 */
  ${props =>
    props.outline &&
    `
    outline: solid ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.main.primary80} 1px;
    background: transparent;
    `}
  /* 디폴트 상태일 때 */
  & > :nth-last-of-type(1) {
    justify-content: flex-start;
    animation-name: ${Animations.LeftToRightFadein};
    animation-duration: 0.6s;
  }

  ${props =>
    props.active &&
    `
    background: ${props.theme.main.primary20};
  `};

  /* pc크기보다 작을 경우 */
  @media (max-width: ${props => props.theme.deviceSizes.pc}) {
    ${props =>
      props.isNavbarOpen
        ? `
      align-items: center;
      padding: 0px 10px;
      width: 120px;
    `
        : `
        align-items: center;
        grid-template-columns: 44px;
        width: 44px;
        padding: 0px;
        &> :nth-last-of-type(1) {
          display: none;
        }
        `}
  }

  height: ${props => props.h};

`;

