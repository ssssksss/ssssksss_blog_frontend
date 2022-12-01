import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import { setAccessToken, setUserInfo } from "@/redux/store/auth";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import BasicCustomModal from "@/components/Modal/BasicCustomModal";
import UserSignUp from "../User/UserSignUp";
import { CF } from "@/styles/commonComponentStyle";
import UserLogin from "../User/UserLogin";
import { store } from "@/redux/store";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import {
  FIRST_CATEGORY_ACTION,
  SECOND_CATEGORY_ACTION,
} from "@/redux/store/category";
import theme from "@/styles/theme";
import Image from "next/image";
import { Spinner4 } from "@/components/common/spinner/Spinners";

const BlogHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState("");
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsModalOpen1(false);
  };
  const authStore = useSelector((state: RootState) => state.authStore);
  const [blogView, setBlogView] = useState({
    todayView: 0,
    yesterdayView: 0,
    alldayView: 0,
  });

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

  const homeLogoHandler = () => {
    router.push("/");
  };

  const topMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  const bottomMoveHandler = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
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
        // console.log(error.response);
      });
  }, []);

  useEffect(() => {
    setActive(router.asPath.split("/")[1]);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner4 />
      ) : (
        <Container>
          <TopButton
            onClick={topMoveHandler}
            src="/img/ui-icon/top_button_icon.png"
          />
          <BottomButton
            onClick={bottomMoveHandler}
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
          <Logo
            onClick={() => {
              homeLogoHandler();
            }}
          >
            <Img alt="logo" src="/img/logo/logo.png" width={30} height={30} />
          </Logo>
          <ToggleMenuImgContainer
            onClick={() => {
              setIsNavbarOpen((prev) => !prev);
            }}
          >
            <CF.Img alt="toggle_menu" src="/img/ui-icon/list_icon.png" />
            <span> 메뉴 </span>
          </ToggleMenuImgContainer>
          <MenuContainer isNavbarOpen={isNavbarOpen}>
            <ImgContainer
              onClick={() => {
                router.push("/");
                setActive("");
              }}
              active={active === ""}
            >
              <CF.Img alt="bulletin_board" src="/img/ui-icon/home_icon.png" />
              <span> 홈 </span>
            </ImgContainer>
            <ImgContainer
              onClick={() => {
                router.push("/blog");
                setActive("blog");
              }}
              active={active === "blog"}
            >
              <CF.Img
                alt="bulletin_board"
                src="/img/ui-icon/blog_box_icon.png"
              />
              <span> 블로그 </span>
            </ImgContainer>
            <ImgContainer
              onClick={() => {
                router.push("/board");
                setActive("board");
              }}
              active={active === "board"}
            >
              <CF.Img
                alt="bulletin_board"
                src="/img/ui-icon/bulletin_board_icon.png"
              />
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
              isUnableOpacityStyle={authStore.role === ""}
            >
              <CF.Img alt="userInfo" src="/img/ui-icon/todo_list_icon.png" />
              <span> TODO </span>
            </ImgContainer>
            {authStore.role === "ROLE_ADMIN" && (
              <ImgContainer
                onClick={() => {
                  router.push("/user-dashboard");
                  setActive("user-dashboard");
                }}
                active={active === "user-dashboard"}
              >
                <CF.Img alt="userInfo" src="/img/ui-icon/userInfo_icon.png" />
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
              isUnableOpacityStyle={authStore.role === ""}
            >
              <CF.Img alt="schedule" src="/img/ui-icon/schedule_icon.png" />
              <span> 일정 </span>
            </ImgContainer>
            {authStore.role === "" && (
              <ImgContainer
                onClick={() => {
                  setIsModalOpen1(true);
                }}
              >
                <CF.Img alt="login" src="/img/ui-icon/login_icon.png" />
                <span> 로그인 </span>
              </ImgContainer>
            )}
            {authStore.role === "" && (
              <ImgContainer
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <CF.Img alt="signup" src="/img/ui-icon/signup_icon.png" />
                <span> 회원가입 </span>
              </ImgContainer>
            )}
            {authStore.role !== "" && (
              <ImgContainer
                onClick={() => {
                  logoutHandler();
                }}
              >
                <CF.Img alt="logout" src="/img/ui-icon/logout_icon.png" />
                <span> 로그아웃 </span>
              </ImgContainer>
            )}
          </MenuContainer>
        </Container>
      )}
    </>
  );
};

export default BlogHeader;

const Container = styled(CF.RowBetweenDiv)`
  height: 80px;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  position: sticky;
  left: 0px;
  top: 0px;
  background: ${theme.backgroundColors.primaryLight};
  z-index: 200;
  outline: solid black 2px;
  padding: 0px 10px;
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
const Logo = styled.button`
  ${({ theme }) => theme.flex.flexCenter};
  background-color: transparent;
  border: none;
`;
const ToggleMenuImgContainer = styled(CF.ImgContainer)`
  height: 100%;
  min-height: 80px;
  min-width: 60px;
  position: absolute;
  right: 0px;
  top: 0px;
  display: none;
  @media (max-width: 500px) {
    display: flex;
    flex-flow: nowrap column;
    justify-content: center;
  }

  img {
    width: 30px;
    aspect-ratio: 1;
  }
`;
const MenuContainer = styled.nav<{ isNavbarOpen: boolean }>`
  width: 100vw;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
  animation: ${animationKeyFrames.Fadein} 1s;

  @media (max-width: 500px) {
    display: ${(props) => (props.isNavbarOpen ? "none" : "grid")};
    width: 300px;
    position: absolute;
    right: 0;
    top: 80px;
    grid-template-columns: repeat(4, 1fr);
    background: ${theme.backgroundColors.primaryLight};
    z-index: 40;
    border-bottom: solid black 2px;
    border-left: solid black 2px;
    border-top: dotted black 1px;
  }
`;
const Img = styled(Image)`
  max-width: 40px;
  max-height: 40px;
  padding: 10px;
  animation: ${rotation} 4s linear infinite;
  animation-direction: alternate-reverse;
  border-radius: 50%;
`;

const ImgContainer = styled(CF.ImgContainer)<{
  active?: boolean;
  isUnableOpacityStyle?: boolean;
}>`
  height: 100%;
  min-height: 80px;
  min-width: 60px;
  opacity: 1;
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

const TopButton = styled.img`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 130px;
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite
      alternate-reverse;
  }
`;
const BottomButton = styled.img`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 80px;
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite
      alternate;
  }
`;
