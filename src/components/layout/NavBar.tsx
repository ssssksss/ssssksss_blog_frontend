import ReactPlayerComponent from '../externalLibrary/react-player/ReactPlayerComponent';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { css, keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { setAccessToken, setUserInfo } from '@/redux/store/auth';
import { store } from '@/redux/store';
import UserSignUp from 'src/components/blog/User/UserSignUp';
import UserLogin from 'src/components/blog/User/UserLogin';
import theme from '@/styles/theme';
import BasicCustomModal from '@/components/Modal/BasicCustomModal';
import Image from 'next/image';
import navbarTheme from '@/styles/navbarTheme';
import Button from '../common/button/Button';
import HamburgerMenu from './../common/button/HamburgerMenu';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import { animationKeyFrames } from '@/styles/animationKeyFrames';
import {
  FIRST_CATEGORY_ACTION,
  SECOND_CATEGORY_ACTION,
} from '@/redux/store/category';
import { Spinner4 } from '@/components/common/spinner/Spinners';
import { SET_NAVBAR_THEME } from '@/redux/store/theme';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file NavBar.tsx
 * @version 0.0.1 "2023-03-27 00:14:02"
 * @description 좌측 및 위쪽 네비게이션 바
 */
const NavBar = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltipInfo, setTooltipInfo] = useState({
    x: 0,
    y: 0,
    message: '',
  });
  const [active, setActive] = useState('');
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };
  const authStore = useSelector((state: RootState) => state.authStore);
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const categoryStore = useSelector((state: RootState) => state.categoryStore);
  const [blogView, setBlogView] = useState({
    todayView: 0,
    yesterdayView: 0,
    alldayView: 0,
  });

  //* 버튼 누르면 제일 위로 이동하는 함수
  const goToTheTopMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  //* 버튼 누르면 제일 아래로 이동하는 함수
  const goToTheBottomMoveHandler = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  //* 로그아웃 함수
  const logoutHandler = () => {
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
      })
        .then(response => {
          store.dispatch(
            setUserInfo({
              email: '',
              role: '',
              nickname: '',
            })
          );
          store.dispatch(setAccessToken({ accessToken: '' }));
        })
        .catch(error => {});
    })();
  };

  //* 페이지 홈으로 이동하는 함수
  const homeLogoHandler = () => {
    router.push('/');
  };

  const themeChangeHandler = (number: any) => {
    dispatch(
      SET_NAVBAR_THEME({
        menuBackground: navbarTheme.theme.theme2.menuBackground,
        menuIconBackground: navbarTheme.theme.theme2.menuIconBackground,
        menuIconFont: navbarTheme.theme.theme2.menuIconFont,
        menuIconFontColor: navbarTheme.theme.theme2.menuIconFontColor,
        HoverMenuIconBackground:
          navbarTheme.theme.theme2.HoverMenuIconBackground,
        HoverMenuIconFontColor: navbarTheme.theme.theme2.HoverMenuIconFontColor,
      })
    );
  };

  useEffect(() => {
    //* 처음 페이지에 들어오면 사용자의 정보를 받아오는 함수
    AxiosInstance({
      url: '/api/user',
      method: 'GET',
    })
      .then(response => {
        store.dispatch(setUserInfo(response.data.data.user));
        setIsLoading(false);
      })
      .catch(error => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner4 />
      ) : (
        <>
          <Container>
            <GoToTheTopButton
              onClick={goToTheTopMoveHandler}
              src="/img/ui-icon/top_button_icon.png"
            />
            <GoToTheBottomButton
              onClick={goToTheBottomMoveHandler}
              src="/img/ui-icon/bottom_button_icon.png"
            />
            {isModalOpen && (
              <BasicCustomModal toggleModal={handleCloseModal}>
                <UserSignUp toggleModal={handleCloseModal} />
              </BasicCustomModal>
            )}
            {isModalOpen1 && (
              <BasicCustomModal toggleModal={handleCloseModal}>
                <UserLogin toggleModal={handleCloseModal} />
              </BasicCustomModal>
            )}
            <TopMenuContainer theme={themeStore}>
              <ReactPlayerComponent />
              <HamburgerMenu
                isHideMenu={isNavbarOpen}
                onClickHideMenu={() => setIsNavbarOpen(prev => !prev)}
              />
              <CC.RowRightDiv padding={'8px 28px 8px 8px'} gap={8}>
                {authStore.nickname ? (
                  <CC.Img
                    alt="notifications_none"
                    src="/img/ui-icon/notifications_none.png"
                  />
                ) : (
                  <div> </div>
                )}
                <Button
                  onClick={() => {
                    if (authStore.nickname) {
                      logoutHandler();
                    } else {
                      setIsModalOpen(false);
                      setIsModalOpen1(true);
                    }
                  }}
                >
                  {authStore.nickname ? '로그아웃' : '로그인'}
                </Button>
                {authStore.nickname || (
                  <Button
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsModalOpen1(false);
                    }}
                  >
                    회원가입
                  </Button>
                )}
                {authStore.nickname ? (
                  <div> </div>
                ) : (
                  <CC.Img alt="userInfo" src="/img/ui-icon/userInfo_icon.png" />
                )}
              </CC.RowRightDiv>
            </TopMenuContainer>
            <LeftMenuContainer isNavbarOpen={isNavbarOpen} theme={themeStore}>
              <IconContainer
                onClick={() => {
                  router.push('/');
                  setActive('home');
                }}
                active={active === 'home'}
              >
                <CC.Img alt="home" src="/img/ui-icon/home_icon.png" />
                <span> 홈 </span>
              </IconContainer>
              <IconContainer
                onClick={() => {
                  router.push(
                    '/blog/' +
                      categoryStore.firstCategory +
                      '/' +
                      categoryStore.secondCategory
                  );
                  setActive('blog');
                }}
                active={active === 'blog'}
              >
                <CC.Img alt="blog" src="/img/ui-icon/blog_icon.png" />
                <span> 블로그 </span>
              </IconContainer>
              <IconContainer
                onClick={() => {
                  router.push('/board');
                  setActive('board');
                }}
                active={active === 'board'}
              >
                <CC.Img
                  alt="bulletin_board"
                  src="/img/ui-icon/bulletin_board_icon.png"
                />
                <span> 게시판 </span>
              </IconContainer>
              <IconContainer
                isActiveButton={authStore.role === ''}
                onClick={() => {
                  if (authStore.role !== '') {
                    router.push('/todo');
                    setActive('todo');
                  } else {
                    alert('로그인이 필요한 메뉴입니다.');
                  }
                }}
                active={active === 'todo'}
                isUnableStyle={authStore.role === ''}
              >
                <CC.Img alt="TODO" src="/img/ui-icon/todo_list_icon.png" />
                <span> TODO </span>
              </IconContainer>
              <IconContainer
                isActiveButton={authStore.role === ''}
                onClick={() => {
                  if (authStore.role !== '') {
                    router.push('/schedule');
                    setActive('schedule');
                  } else {
                    alert('로그인이 필요한 메뉴입니다.');
                  }
                }}
                active={active === 'schedule'}
                isUnableStyle={authStore.role === ''}
              >
                <CC.Img alt="schedule" src="/img/ui-icon/schedule_icon.png" />
                <span> 일정 </span>
              </IconContainer>
              {authStore.role === 'ROLE_ADMIN' && (
                <IconContainer
                  onClick={() => {
                    router.push('/user-dashboard');
                    setActive('user-dashboard');
                  }}
                  active={active === 'user-dashboard'}
                >
                  <CC.Img
                    alt="dashboard"
                    src="/img/ui-icon/userInfo_icon.png"
                  />
                  <span> 대시보드 </span>
                </IconContainer>
              )}
              <IconContainer
                onClick={() => {
                  themeChangeHandler();
                }}
              >
                <CC.Img alt="logout" src="/img/ui-icon/setting_icon.png" />
                <span> 설정 </span>
              </IconContainer>
            </LeftMenuContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default NavBar;

const Container = styled.nav<{ isNavbar: boolean }>`
  font-family: ${theme.fontFamily.gmarketSansBold};
`;

interface IMenuContainerProps {
  isNavbarOpen: boolean;
  theme: {
    menuBackground: string;
    menuIconBackground: string;
    menuIconFont: string;
    menuIconFontColor: string;
    HoverMenuIconBackground: string;
    HoverMenuIconFontColor: string;
  };
}

const TopMenuContainer = styled.section<IMenuContainerProps>`
  width: 100vw;
  height: 44px;
  padding-left: 10px;
  border-radius: 10px 10px 0px 0px;
  /* background: ${props => props.theme.menuBackground}; */
  background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
  background-color: rgba(255, 255, 255, 0.2);
  color: ${props => props.theme.menuIconFontColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 200;
  box-shadow: 0 1px 1px 0 rgba(31, 38, 135, 0.24);

  & > div > div,
  img {
    height: 24px;
  }

  & > div > button {
    height: 24px;
    color: ${props => props.theme.menuBackground};
    background-color: ${props => props.theme.menuIconFontColor};
    border-radius: 10px;
    padding: 0px 2px;
  }
`;

const LeftToRightFadein = keyframes`
0%{
  opacity: 0;
  display: : : "none";
  transform: translate(-10px,0%);
}
68%{
  opacity: 0;
  display: : : "none";
  transform: translate(-10px,0%);
}
100%{
  opacity: 1;
  display: : "inline";
  transform: translate(0%,0%);
}
`;

const LeftMenuContainer = styled.section<IMenuContainerProps>`
  width: ${props => (props.isNavbarOpen ? '120px' : '44px')};
  height: calc(100vh - 44px);
  /* background: ${props =>
    `linear-gradient( to right, ${props.theme.menuBackground} 95%, white 100%)`}; */
  /* background-color: rgba(255, 255, 255, 0.2); */
  /* background-color: ${props =>
    props.isNavbarOpen
      ? 'rgba(255, 255, 255, 0.9)'
      : 'rgba(255, 255, 255, 0.2)'}; */
  /* color: ${props => props.theme.menuIconFontColor}; */
  background: linear-gradient(lightCyan, skyBlue, deepSkyBlue);
  gap: 8px;
  position: fixed;
  z-index: 100;
  display: flex;
  flex-direction: column;
  top: 44px;
  padding-bottom: 8px;
  border-radius: 0px 0px 20px 0px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  transition: all 0.5s ease-in-out;
  min-height: 200px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  } /* Chrome, Safari, Opera*/
  overscroll-scroll-behavior: none;

  & > button:hover {
    background: ${props => props.theme.HoverMenuIconBackground};
    color: ${props => props.theme.HoverMenuIconFontColor};
  }

  & > button {
    /* background: ${props =>
      `linear-gradient( to right, ${props.theme.menuBackground} 30%, ${props.theme.menuBackground} 95%, white 100%)`}; */
    /* color: ${props => props.theme.menuIconFontColor}; */
    color: rgba(51, 51, 51, 1);
    font-weight: 600;
    background-color: transparent;
  }

  @media (max-width: ${theme.deviceSizes.laptop}) {
    span {
      display: ${props => (props.isNavbarOpen ? 'block' : 'none')};
      width: ${props => (props.isNavbarOpen ? 'auto' : '0px')};
      mix-blend-mode: normal;
      background-color: rgba(255, 255, 255, 0.2);
      ${props =>
        props.isNavbarOpen &&
        css`
          animation-name: ${LeftToRightFadein};
          animation-duration: 0.6s;
        `}
    }
  }

  @media (min-width: ${theme.deviceSizes.laptop}) {
    width: 120px;
    span {
      display: inline;
      ${props =>
        props.isNavbarOpen ||
        css`
          animation-name: ${LeftToRightFadein};
          animation-duration: 0.6s;
        `}
    }
  }
`;

interface IIconContainerProps {
  active?: boolean;
  isUnableStyle?: boolean;
  isActiveButton: Boolean;
}

const IconContainer = styled.button<IIconContainerProps>`
  width: 100%;
  height: 28px;
  padding: 0px 8px;
  gap: 16px;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  position: relative;

  ${props =>
    props.isActiveButton &&
    css`
      cursor: not-allowed;
    `}

  ${props =>
    props.active &&
    css`
      animation: ${animationKeyFrames.UpToDownRepeat} infinite 1s;
    `}

  ${props =>
    props.isUnableStyle &&
    css`
      opacity: 0.2;
    `}

  img {
    width: 24px;
    aspect-ratio: 1;
  }
`;

const GoToTheTopButton = styled.img`
  position: fixed;
  width: 24px;
  aspect-ratio: 1;
  right: 4px;
  bottom: calc(10% + 30px);
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite
      alternate-reverse;
  }
`;

const GoToTheBottomButton = styled.img`
  position: fixed;
  width: 24px;
  aspect-ratio: 1;
  right: 4px;
  bottom: calc(10%);
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite
      alternate;
  }
`;
