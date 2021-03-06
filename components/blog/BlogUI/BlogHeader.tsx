import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/router";
import ModalSignup from "@/components/Modal/ModalSignup";
import ModalLogin from "@/components/Modal/ModalLogin";
import { useDispatch } from "react-redux";
import { AUTH_ACTION } from "@/store/auth";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { useSelector } from "react-redux";
import { RootState } from "@/store/reducers";

const BlogHeader = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const dispatch = useDispatch();
  const authStore = useSelector((state: RootState) => state.authStore);
  const [blogView, setBlogView] = useState({
    todayView: 0,
    yesterdayView: 0,
    alldayView: 0,
  });

  const modalHandler = (e: any) => {
    setModalOpen(modalOpen ? false : true);
    setModalOpen1(modalOpen1 ? false : true);
  };

  const modalHandler1 = (e: any) => {
    setModalOpen1(modalOpen1 ? false : true);
  };

  const authHandler = (authParameter: any) => {
    dispatch(AUTH_ACTION({ authParameter: authParameter }));
  };

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
  }, []);

  useEffect(() => {
    (async () => {
      await AxiosInstance({
        url: "/ssssksss/user/validToken",
        method: "POST",
      })
        .then((response) => {
          const resAuth = response.data.data.auth;
          authHandler({
            email: resAuth.email,
            role: resAuth.role,
          });
        })
        .catch((error) => {
          authHandler({
            email: "",
            role: "",
          });
          console.log(error.data);
        });
    })();
  }, []);

  const topMoveHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Header>
      <TopButton
        onClick={() => {
          topMoveHandler;
        }}
      >
        ?????????
      </TopButton>
      {modalOpen && <ModalSignup modalHandler={modalHandler} />}
      {modalOpen1 && <ModalLogin modalHandler={modalHandler1} />}
      <ViewContainer>
        <ViewItem>
          <span> {blogView.yesterdayView} </span>
          <span> ?????? </span>
        </ViewItem>
        <ViewItem>
          <span> {blogView.todayView} </span>
          <span> ?????? </span>
        </ViewItem>
        <ViewItem>
          <span> {blogView.alldayView} </span>
          <span> ?????? </span>
        </ViewItem>
      </ViewContainer>
      <Logo>
        <Link href="/">
          <a>
            <Img alt="logo" src="/img/logo.svg"></Img>
          </a>
        </Link>
      </Logo>
      <>
        {authStore.role === "" && (
          <ButtonContainer>
            <LoginButton
              onClick={() => {
                setModalOpen1(true);
              }}
            >
              ?????????
            </LoginButton>
            <SignupButton
              onClick={() => {
                setModalOpen(true);
              }}
            >
              ????????????
            </SignupButton>
          </ButtonContainer>
        )}
        {authStore.role !== "" && (
          <ButtonContainer>
            <UserStatus href="">{authStore.email}</UserStatus>
            <LogoutButton onClick={() => logoutHandler()}>
              ????????????
            </LogoutButton>
          </ButtonContainer>
        )}
      </>
    </Header>
  );
};

export default BlogHeader;

const Header = styled.header`
  height: 60px;
  margin: 10px auto;
  border-radius: 10px;
  max-width: ${({ theme }) => theme.customScreen.maxWidth};
  background: ${({ theme }) => theme.customColors.second};
  display: grid;
  grid-template-columns: 5fr 2fr 5fr;
  align-items: center;
  font-family: ${({ theme }) => theme.customFonts.GmarketSansBold};
`;
const TopButton = styled.button`
  position: absolute;
  right: 10px;
  top: 80px;
`;
const rotation = keyframes`
0%,100%{
  transform: rotate(0deg);
}
50%{
  transform: rotate(360deg);
}
`;
const Logo = styled.div`
  ${({ theme }) => theme.flex.flexCenter};
`;
const Img = styled.img`
  width: 50px;
  height: 50px;
  padding: 5px;
  background: #ffffff;
  border-radius: 30px;
  animation: ${rotation} 8s ease-in-out infinite;
`;
const ViewContainer = styled.div`
  padding-left: 10px;
  ${({ theme }) => theme.flex.flexBetween};
  color: white;
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
const LoginButton = styled.button`
  ${CommonButton}
`;
const SignupButton = styled.button`
  ${CommonButton}
`;
const LogoutButton = styled.button`
  ${CommonButton}
`;
const UserStatus = styled.a`
  ${CommonButton}
  text-align: center;
`;
