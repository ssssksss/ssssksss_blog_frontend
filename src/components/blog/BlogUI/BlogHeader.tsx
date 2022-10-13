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

const BlogHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
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
        .catch((error) => {
          // console.log(error.response);
        });
    })();
  };

  const homeLogoHandler = () => {
    // dispatch(
    //   FIRST_CATEGORY_ACTION({
    //     firstCategoryPath: window.location.pathname.split("/", 3)[2],
    //   })
    // );
    // dispatch(SECOND_CATEGORY_ACTION({ secondCategoryPath: "" }));
    router.push("/");
  };

  const topMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  const bottomMoveHandler = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  useEffect(() => {
    async () => {
      await AxiosInstance({
        url: "/api/visit",
        method: "GET",
      })
        .then((response) => {
          const resView = response.data.data.view;
          setBlogView({
            todayView: resView.todayView,
            yesterdayView: resView.yesterdayView,
            alldayView: resView.alldayView,
          });
        })
        .catch((error) => {
          // console.log(error.response);
        });
    };

    AxiosInstance({
      url: "/api/user",
      method: "GET",
    })
      .then((response) => {
        store.dispatch(setUserInfo(response.data.data.user));
      })
      .catch((error) => {
        // console.log(error.response);
      });
  }, []);

  return (
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
        <Img alt="logo" src="/img/logo/logo.svg" />
      </Logo>
      <MenuContainer>
        <ImgContainer
          onClick={() => {
            router.push("/blog");
          }}
        >
          <CF.Img alt="bulletin_board" src="/img/ui-icon/blog_box_icon.png" />
          <span> 블로그 </span>
        </ImgContainer>
        <ImgContainer
          onClick={() => {
            router.push("/board");
          }}
        >
          <CF.Img
            alt="bulletin_board"
            src="/img/ui-icon/bulletin_board_icon.png"
          />
          <span> 게시판 </span>
        </ImgContainer>
        {authStore.role === "ROLE_ADMIN" && (
          <ImgContainer
            onClick={() => {
              router.push("/user-dashboard");
            }}
          >
            <CF.Img alt="userInfo" src="/img/ui-icon/userInfo_icon.png" />
            <span> 대시보드 </span>
          </ImgContainer>
        )}
        {authStore.role !== "" && (
          <ImgContainer
            onClick={() => {
              router.push("/todo");
            }}
          >
            <CF.Img alt="plan" src="/img/ui-icon/calendar_icon.png" />
            <span> 일정 </span>
          </ImgContainer>
        )}
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
const MenuContainer = styled.nav`
  width: 100vw;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-end;
  @media (max-width: 480px) {
    img {
      width: 30px;
      aspect-ratio: 1;
    }
  }
`;
const Img = styled.img`
  max-width: 40px;
  max-height: 40px;
  padding: 10px;
  animation: ${rotation} 4s linear infinite;
  animation-direction: alternate-reverse;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const ImgContainer = styled(CF.ImgContainer)`
  height: 100%;
  min-height: 80px;
  min-width: 60px;

  img {
    width: 30px;
    height: 30px;
  }
`;
const TopButton = styled.img`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 70px;
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
  bottom: 20px;
  z-index: 110;

  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeatFadein} 0.5s infinite
      alternate;
  }
`;
