import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { setAccessToken, setUserInfo } from "@/redux/store/auth";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import BasicCustomModal from "@/components/Modal/BasicCustomModal";
import UserSignUp from "src/components/blog/User/UserSignUp";
import { CC } from "@/styles/commonComponentStyle";
import UserLogin from "src/components/blog/User/UserLogin";
import { store } from "@/redux/store";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { FIRST_CATEGORY_ACTION, SECOND_CATEGORY_ACTION } from "@/redux/store/category";
import theme from "@/styles/theme";
import Image from "next/image";
import { Spinner4 } from "@/components/common/spinner/Spinners";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { SET_THEMA } from "@/redux/store/thema";

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MainLeftSideBar.tsx
 * @version 0.0.1 "2023-03-27 00:14:02"
 * @description 좌측 사이드바 UI
 */
const MainLeftSideBar = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isNavbar, setIsNavbar] = useState(true);
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };
  const authStore = useSelector((state: RootState) => state.authStore);
  const themaStore = useSelector((state: RootState) => state.themaStore);
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
        url: "/api/user",
        method: "DELETE",
      })
        .then((response) => {
          store.dispatch(
            setUserInfo({
              email: "",
              role: "",
              nickname: "",
            })
          );
          store.dispatch(setAccessToken({ accessToken: "" }));
        })
        .catch((error) => {});
    })();
  };

  //* 페이지 홈으로 이동하는 함수
  const homeLogoHandler = () => {
    router.push("/");
  };

  useEffect(() => {
    setActive(router.asPath.split("/")[1]);
    // async () => {
    //   await AxiosInstance({
    //     url: "/api/visit",
    //     method: "GET",
    //   })
    //     .then((response) => {
    //       const resView = response.data.data.view;
    //       setBlogView({
    //         todayView: resView.todayView,
    //         yesterdayView: resView.yesterdayView,
    //         alldayView: resView.alldayView,
    //       });
    //     })
    //     .catch((error) => {
    //       // console.log(error.response);
    //     });
    // };

    //* 처음 페이지에 들어오면 사용자의 정보를 받아오는 함수
    AxiosInstance({
      url: "/api/user",
      method: "GET",
    })
      .then((response) => {
        store.dispatch(setUserInfo(response.data.data.user));
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const themaTestHandler = () => {
    store.dispatch(
      SET_THEMA({
        mainBackgroundColor: "white",
        mainFontColor: "wthie",
        hoverBackgroundStyle: "blue",
        hoverFontStyle: "white",
        hoverBorderRadius: "4px",
      })
    );
  };

  return (
    <>
      {isLoading ? (
        <Spinner4 />
      ) : (
        <>
          <Container isNavbar={isNavbar}>
            <GoToTheTopButton onClick={goToTheTopMoveHandler} src="/img/ui-icon/top_button_icon.png" />
            <GoToTheBottomButton onClick={goToTheBottomMoveHandler} src="/img/ui-icon/bottom_button_icon.png" />
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

            {/* <Logo
              onClick={() => {
                homeLogoHandler();
              }}>
              <Img alt="logo" src="/img/logo/logo.png" width={30} height={30} />
            </Logo> */}
            <ToggleMenuImgContainer
              onClick={() => {
                setIsNavbarOpen((prev) => !prev);
              }}>
              <CC.Img alt="toggle_menu" src="/img/ui-icon/list_icon.png" />
              <span> 메뉴 </span>
            </ToggleMenuImgContainer>
            <MenuContainer isNavbarOpen={isNavbarOpen} thema={themaStore}>
              <ImgContainer
                onClick={() => {
                  router.push("/");
                  setActive("");
                }}
                active={active === ""}>
                <CC.Img alt="bulletin_board" src="/img/ui-icon/home_icon.png" />
                <span> 홈 </span>
              </ImgContainer>
              <ImgContainer
                onClick={() => {
                  router.push("/blog");
                  setActive("blog");
                }}
                active={active === "blog"}>
                <CC.Img alt="bulletin_board" src="/img/ui-icon/blog_box_icon.png" />
                <span> 블로그 </span>
              </ImgContainer>
              <ImgContainer
                onClick={() => {
                  router.push("/board");
                  setActive("board");
                }}
                active={active === "board"}>
                <CC.Img alt="bulletin_board" src="/img/ui-icon/bulletin_board_icon.png" />
                <span> 게시판 </span>
              </ImgContainer>
              <ImgContainer
                onClick={() => {
                  if (authStore.role !== "") {
                    router.push("/todo");
                    setActive("todo");
                  } else {
                    alert("로그인이 필요한 메뉴입니다.");
                  }
                }}
                active={active === "todo"}
                isUnableOpacityStyle={authStore.role === ""}>
                <CC.Img alt="userInfo" src="/img/ui-icon/todo_list_icon.png" />
                <span> TODO </span>
              </ImgContainer>
              {authStore.role === "ROLE_ADMIN" && (
                <ImgContainer
                  onClick={() => {
                    router.push("/user-dashboard");
                    setActive("user-dashboard");
                  }}
                  active={active === "user-dashboard"}>
                  <CC.Img alt="userInfo" src="/img/ui-icon/userInfo_icon.png" />
                  <span> 대시보드 </span>
                </ImgContainer>
              )}
              <ImgContainer
                onClick={() => {
                  if (authStore.role !== "") {
                    router.push("/schedule");
                    setActive("schedule");
                  } else {
                    alert("로그인이 필요한 메뉴입니다.");
                  }
                }}
                active={active === "schedule"}
                isUnableOpacityStyle={authStore.role === ""}>
                <CC.Img alt="schedule" src="/img/ui-icon/schedule_icon.png" />
                <span> 일정 </span>
              </ImgContainer>
              {authStore.role === "" && (
                <ImgContainer
                  onClick={() => {
                    setIsModalOpen1(true);
                  }}>
                  <CC.Img alt="login" src="/img/ui-icon/login_icon.png" />
                  <span> 로그인 </span>
                </ImgContainer>
              )}
              {authStore.role === "" && (
                <ImgContainer
                  onClick={() => {
                    setIsModalOpen(true);
                  }}>
                  <CC.Img alt="signup" src="/img/ui-icon/signup_icon.png" />
                  <span> 회원가입 </span>
                </ImgContainer>
              )}
              {authStore.role !== "" && (
                <ImgContainer
                  onClick={() => {
                    logoutHandler();
                  }}>
                  <CC.Img alt="logout" src="/img/ui-icon/logout_icon.png" />
                  <span> 로그아웃 </span>
                </ImgContainer>
              )}
              <ImgContainer
                onClick={() => {
                  themaTestHandler();
                }}>
                <CC.Img alt="logout" src="/img/ui-icon/logout_icon.png" />
                <span> 설정 </span>
              </ImgContainer>
            </MenuContainer>
          </Container>
          <IsNavBarButton onClick={() => setIsNavbar(!isNavbar)} isNavbar={isNavbar}>
            {isNavbar ? "⏫" : "⏬"}
          </IsNavBarButton>
        </>
      )}
    </>
  );
};

export default MainLeftSideBar;

const Container = styled(CC.RowBetweenDiv)<{ isNavbar: boolean }>`
  height: 100vh;
  font-family: ${theme.fontFamily.gmarketSansBold};
  position: fixed;
  left: 0px;
  /* top: 0px; */
  /* background: ${theme.backgroundColors.orangeLight}; */
  z-index: 200;
  /* outline: solid black 2px; */

  ${(props) =>
    !props.isNavbar &&
    css`
      display: none;
    `}
`;

const rotation = keyframes`

  0% {
    transform: rotate(270deg);
    mix-blend-mode: luminosity;
    padding: 16px;
  }
  20% {
    transform: rotate(270deg);
    mix-blend-mode: multiply;
  }
  40% {
    transform: rotate(540deg);
    mix-blend-mode: hard-light;
    background: #333;
  }
  60% {
    transform: rotate(810deg);
  }
  100% {
    transform: rotate(1440deg);
    /* mix-blend-mode: difference; */
    padding: 4px;
  }
  `;

const GoToTheTopButton = styled.img`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 130px;
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite alternate-reverse;
  }
`;

const GoToTheBottomButton = styled.img`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 80px;
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite alternate;
  }
`;

const IsNavBarButton = styled.button<{ isNavbar: boolean }>`
  position: fixed;
  right: 50%;
  top: 80px;
  z-index: 999;
  animation: ${animationKeyFrames.UpToDownRepeat} infinite 1s;

  ${(props) =>
    !props.isNavbar &&
    css`
      top: 5px;
    `}
`;

const Logo = styled.button`
  ${theme.flex.row.center};
  background-color: transparent;
  border: none;
`;
const ToggleMenuImgContainer = styled(CC.ImgContainer)`
  height: 100%;
  min-height: 80px;
  min-width: 60px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: none;

  @media (max-width: ${theme.customScreen.sm}) {
    display: flex;
    flex-flow: nowrap column;
    justify-content: center;
  }

  img {
    width: 30px;
    aspect-ratio: 1;
  }
`;
interface IMenuContainerProps {
  isNavbarOpen: boolean;
  thema: {
    mainBackgroundColor: string;
    mainFontColor: string;
    hoverFontStyle: string;
    hoverBackgroundStyle: string;
    hoverBorderRadius: string;
  };
}
const MenuContainer = styled.nav<IMenuContainerProps>`
  display: flex;
  width: 60px;
  height: 100vh;
  padding-top: 20px;
  flex-flow: nowrap column;
  gap: 24px;
  animation: ${animationKeyFrames.Fadein} 1s;

  background: ${(props) => (props.thema ? props.thema.mainBackgroundColor : "white")};
  color: ${(props) => (props.thema ? props.thema.mainFontColor : "black")};
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  & > div:hover {
    background: ${(props) => (props.thema ? props.thema.hoverBackgroundStyle : "white")};
    color: ${(props) => (props.thema ? props.thema.hoverFontStyle : "black")};
    border-radius: ${(props) => (props.thema ? props.thema.hoverBorderRadius : "4px")};
  }

  @media (min-width: ${theme.deviceSizes.maxWidth}) {
    width: 180px;
    align-items: center;
    /* display: ${(props) => (props.isNavbarOpen ? "none" : "grid")};
    position: absolute;
    right: 0;
    top: 80px;
    grid-template-columns: repeat(6, 1fr);
    background: ${theme.backgroundColors.orangeLight};
    z-index: 40;
    outline: solid black 2px; */
  }
`;
// const Img = styled(Image)`
//   max-width: 40px;
//   max-height: 40px;
//   padding: 10px;
//   animation: ${rotation} 4s linear infinite;
//   animation-direction: alternate-reverse;
//   border-radius: 50%;
// `;

interface IImgContainerProps {
  active?: boolean;
  isUnableOpacityStyle?: boolean;
}

const ImgContainer = styled(CC.ImgContainer)<IImgContainerProps>`
  opacity: 1;
  align-items: center;
  justify-content: center;
  height: 48px;

  @media (min-width: ${theme.deviceSizes.maxWidth}) {
    flex-flow: nowrap row;
    gap: 12px;
    padding: 0px 36px;

    span {
      width: 40px;
    }
  }

  ${(props) =>
    props.active &&
    css`
      animation: ${animationKeyFrames.UpToDownRepeat} infinite 1s;
    `}

  ${(props) =>
    props.isUnableOpacityStyle &&
    css`
      opacity: 0.2;
    `}

  img {
    width: 30px;
    aspect-ratio: 1;
  }
`;

// 인트로 글 좌측으로 밀리는거 왼쪽으로 조금 밀어주고
// 프로젝트 내용 박스 테두리 다른것으로 변경해주기
