import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/store/auth";
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
  const dispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [blogView, setBlogView] = useState({
    todayView: 0,
    yesterdayView: 0,
    alldayView: 0,
  });

  const authHandler = (authParameter: any) => {
    dispatch(setUserInfo(authParameter));
  };

  useEffect(() => {
    (async () => {
      await AxiosInstance({
        url: "/ssssksss/visit",
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
          console.log(error);
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
        console.log(error.response);
      });
  }, []);

  const logoutHandler = () => {
    authHandler({ email: "", role: "" });
    (async () => {
      await AxiosInstance({
        url: "/ssssksss/user/logout",
        method: "GET",
      })
        .then((response) => {})
        .catch((error) => {
          console.log(error);
        });
    })();
  };

  const topMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Container>
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
                width="50px"
                height="50px"
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
                width="50px"
                height="50px"
                onClick={() => {
                  setIsModalOpen(true);
                }}
              />
              <span> 회원가입 </span>
            </CF.ImgContainer>
          </CF.RowRightDiv>
        )}
        {authStore.role !== "" && (
          <CF.RowRightDiv>
            <CF.ImgContainer>
              <CF.Img
                alt="userInfo"
                src="/img/userInfo_icon.png"
                width="50px"
                height="50px"
                onClick={() => {}}
              />
              <span> {authStore.nickname} </span>
            </CF.ImgContainer>
            <CF.ImgContainer>
              <CF.Img
                alt="logout"
                src="/img/logout_icon.png"
                width="50px"
                height="50px"
                onClick={() => {
                  logoutHandler();
                }}
              />
              <span> 로그아웃 </span>
            </CF.ImgContainer>
          </CF.RowRightDiv>
        )}
      </>
    </Container>
  );
};

export default BlogHeader;

const Container = styled.header`
  height: 60px;
  padding: 10px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  background: ${({ theme }) => theme.customColors.second};
  display: grid;
  grid-template-columns: 5fr 2fr 5fr;
  align-items: center;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
`;
const TopButton = styled.button`
  position: fixed;
  width: 40px;
  aspect-ratio: 1;
  right: 10px;
  bottom: 40px;
  z-index: 80;
`;
const rotation = keyframes`
  0%,100%{
    transform: rotate(0deg);
    mix-blend-mode: hard-light;
  }
  50% {
    transform: rotate(1080deg);
    mix-blend-mode: difference;
  }
`;
const Logo = styled.button`
  ${({ theme }) => theme.flex.flexCenter};
  background-color: transparent;
  border: none;
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  border-radius: 30px;
  animation: ${rotation} 8s ease-in-out infinite;
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
