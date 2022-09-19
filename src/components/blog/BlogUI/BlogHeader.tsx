import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import { setAccessToken, setUserInfo } from "@/redux/store/auth";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import BasicCustomModal from "@/components/Modal/BasicCustomModal";
import UserSignUp from "../User/UserSignUp";
import { CF } from "@/styles/commonComponentStyle";
import UserLogin from "../User/UserLogin";
import { store } from "@/redux/store";

const BlogHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

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

  useEffect(() => {
    (async () => {
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
    })();

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

  const topMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container>
      <div>
        <TopButton onClick={topMoveHandler}>위로</TopButton>
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
        <GridContainer>
          <ViewContainer>
            <ViewItem>
              <span> {blogView.yesterdayView} </span>
              <span> 어제 </span>
            </ViewItem>
            <ViewItem>
              <span> {blogView.todayView} </span>
              <span> 오늘 </span>
            </ViewItem>
            <ViewItem>
              <span> {blogView.alldayView} </span>
              <span> 전체 </span>
            </ViewItem>
          </ViewContainer>
          <Logo onClick={() => router.push("/")}>
            <Img alt="logo" src="/img/logo.svg" />
          </Logo>
          <>
            {authStore.role === "" && (
              <CF.RowRightDiv gap={10}>
                <CF.ImgContainer>
                  <CF.Img
                    alt="login"
                    src="/img/login_icon.png"
                    size="60px"
                    onClick={() => {
                      setIsModalOpen1(true);
                    }}
                  />
                  <span> 로그인 </span>
                </CF.ImgContainer>
                <CF.ImgContainer>
                  <CF.Img
                    alt="signup"
                    src="/img/signup_icon.png"
                    size="60px"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  />
                  <span> 회원가입 </span>
                </CF.ImgContainer>
              </CF.RowRightDiv>
            )}
            {authStore.role !== "" && (
              <CF.RowRightDiv gap={10}>
                <CF.ImgContainer>
                  <CF.Img
                    alt="plan"
                    src="/img/calendar_icon.png"
                    size="60px"
                    onClick={() => {
                      router.push("/plan");
                    }}
                  />
                  <span> 일정 </span>
                </CF.ImgContainer>
                <CF.ImgContainer>
                  <CF.Img
                    alt="userInfo"
                    src="/img/userInfo_icon.png"
                    size="60px"
                    onClick={() => {
                      router.push("/user-dashboard");
                    }}
                  />
                  <span> {authStore.nickname} </span>
                </CF.ImgContainer>
                <CF.ImgContainer>
                  <CF.Img
                    alt="logout"
                    src="/img/logout_icon.png"
                    size="60px"
                    onClick={() => {
                      logoutHandler();
                    }}
                  />
                  <span> 로그아웃 </span>
                </CF.ImgContainer>
              </CF.RowRightDiv>
            )}
          </>
        </GridContainer>
      </div>
    </Container>
  );
};

export default BlogHeader;

const Container = styled.header`
  width: 100%;
  margin: auto;
  /* padding: 10px 0px 0px 0px; */
  /* max-width: ${({ theme }) => theme.customScreen.maxWidth}; */
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
`;
const GridContainer = styled.div`
  border-radius: 4px;
  padding: 0px 10px;
  display: grid;
  height: 80px;
  grid-template-columns: 5fr 2fr 5fr;
  align-items: center;
  background: ${({ theme }) => theme.customColors.second};
`;
const TopButton = styled.button`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 12px;
  bottom: 40px;
  z-index: 110;
  mix-blend-mode: difference;

  &:hover {
    background-color: black;
    color: white;
  }
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
const Img = styled.img`
  width: 60px;
  height: 60px;
  padding: 10px;
  animation: ${rotation} 4s linear infinite;
  animation-direction: alternate-reverse;
  border-radius: 50%;
`;
const ViewContainer = styled(CF.RowStartDiv)`
  padding-left: 10px;
  color: white;
  gap: 40px;
`;
const ViewItem = styled.div`
  display: flex;
  flex-flow: nowrap column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px 0px;

  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.6rem;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
  justify-content: space-evenly;
  padding-right: 5px;
`;
const CommonButton = css`
  ${({ theme }) => theme.customButton};
  width: 100%;
  padding: 4px 0px;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
  color: white;
  background: none;
  border: solid white 1px;
  @media only screen and (max-width: ${({ theme }) => theme.customScreen.sm}) {
    font-size: 0.6rem;
  }
  &:hover {
    background: white;
    color: ${({ theme }) => theme.customColors.second};
  }
`;
const LogoutButton = styled.button`
  ${CommonButton}
`;
const UserStatus = styled.a`
  ${CommonButton}
  text-align: center;
`;
