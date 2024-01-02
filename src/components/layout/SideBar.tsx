import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import HamburgerMenu from '@/components/common/button/HamburgerMenu';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Animations from '@/components/common/animations/Animations';
import ReactPlayerContainer from '../reactPlayer/ReactPlayerContainer';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { store } from '@/redux/store';
import { SET_LEFT_NAV_ITEM_ACTIVE } from '@/redux/store/leftNav';
import Link from 'next/link';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file SideBar.tsx
 * @version 0.0.1 "2023-09-20 10:42:22"
 * @description 설명
 */
const SideBar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [youtubePlay, setYoutubePlay] = useState(false);
  const activeMenu = useSelector((state: RootState) => state.leftNavItemStore);
  const authStore = useSelector((state: RootState) => state.authStore);

  useEffect(() => {
    store.dispatch(
      SET_LEFT_NAV_ITEM_ACTIVE(window.location.pathname.split('/')[1] + '')
    );
  }, []);

  const LeftNavItems = [
    [Icons.HomeIcon, '홈', 'home'],
    [Icons.BlogIcon, '블로그', 'blog'],
    [Icons.BoardIcon, '게시판', 'board'],
    [Icons.WorkListIcon, '할일', 'todo'],
    // [Icons.CalendarIcon, '일정', 'calendar'],
    // [Icons.DashBoardIcon, '대시보드', 'dashboard'],
    // [Icons.SettingIcon, '설정', 'setting'],
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
            <Link href={`/${i[2]}`} prefetch={false}>
              <NavItemContainer
                isNavbarOpen={isNavbarOpen}
                onClick={() => {
                  store.dispatch(SET_LEFT_NAV_ITEM_ACTIVE(i[2]));
                }}
                active={activeMenu.leftNavActiveItem === i[2]}
              >
                <>
                  <Image src={i[0]} alt={i[1]} />
                  <span> {i[1]} </span>
                </>
              </NavItemContainer>
            </Link>
          ))}
        </CC.ColumnBetweenDiv>
        <CC.ColumnBetweenDiv gap={4}>
          <NavItemContainer
            outline={true}
            isNavbarOpen={isNavbarOpen}
            h={'40px'}
          >
            <Image
              src={youtubePlay ? Icons.PauseIcon : Icons.PlayIcon}
              alt="플레이어"
              onClick={() => setYoutubePlay(prev => !prev)}
            />
            <ReactPlayerContainer play={youtubePlay} />
          </NavItemContainer>
          <NavItemContainer
            outline={true}
            isNavbarOpen={isNavbarOpen}
            h={'40px'}
          >
            <Image src={Icons.UserIcon} alt="nav home" width={24} height={24} />
            <UserBox> {authStore.email || '로그인이 필요합니다.'} </UserBox>
          </NavItemContainer>
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

  /* @media (max-width: ${props => props.theme.deviceSizes.pc}) {
    ${props =>
    props.isNavbarOpen &&
    `
      width: 120px;
      &>:nth-of-type(1)>:nth-of-type(n+1) {
        padding: 0px 10px;
        gap: 20px;
      }
      `}
  } */
`;

const FoldDiv = styled.div`
  ${props => props.theme.flex.column.between};
  height: 100vh;
  width: 100%;
  z-index: 20;

  @media (min-width: ${props => props.theme.deviceSizes.pc}) {
    & > :nth-of-type(1) > :nth-of-type(n + 1) {
      padding: 0px 10px;
      gap: 20px;
    }
  }

  @media (max-width: ${props => props.theme.deviceSizes.pc}) {
    ${props =>
      props.isNavbarOpen &&
      `
      width: 120px;
      background: ${props.theme.main.contrast};
      outline: solid ${props.theme.main.primary40} 2px;
      &>:nth-of-type(1)>:nth-of-type(n+1) {
        padding: 0px 10px;
        gap: 20px;
      }
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
  padding: 2px 0px;
  width: 100%;
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
      padding: 0px;
      width: 120px;
    `
        : `
        align-items: center;
        grid-template-columns: 44px;
        &> :nth-last-of-type(1) {
          display: none;
        }
        `}
  }

  height: ${props => props.h};

`;

