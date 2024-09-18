"use client"

import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchHandler } from "@hooks/useFetchHandler";
import useModalState from "@hooks/useModalState";
import { UserAPI } from "@service/userAPI";
import { throttle } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AuthModal from "src/component/auth/hybrid/AuthModal";
import ReactToastifyComponents from "src/component/common/alert/ReactToastifyComponents";
import Button from "src/component/common/button/hybrid/Button";
import ModalButton from "src/component/common/modal/hybrid/ModalButton";
import useNavStore from "src/store/navStore";
import usePlayerStore from "src/store/playerStore";
import AxiosInstance from "src_temp/utils/axios/AxiosInstance";
import SideBar from "./SideBar";

interface IHeader {

}
const Header = (props: IHeader) => {
  const playerStore = usePlayerStore();
  const navStore = useNavStore();
  const [scrollWidth, setScrollWidth] = useState(0);
  const modalState = useModalState();
  const { toastifyStore, userStore, fetchHandler } = useFetchHandler();

  useEffect(() => {
    // 처음 및 새로고침시 로그인 작업,  accessToken 저장 및 사용자 정보 저장하기
      // const temp = async () => {
      //   await AxiosInstance.get('/api/user', {
      //     headers: {
      //       Authorization: `Bearer ${userStore.accessToken}`,
      //     },
      //     withCredentials: true,
      //   })
      //     .then((res) => {
      //       const _user: IUser = res.data.data.user;
      //       userStore.setUser({
      //         accessToken: _user.accessToken,
      //       });
      //       // store.dispatch(rootActions.blogStore.setActiveBlogUserId(_user.id));
      //       userStore.setUser({
      //         email: _user.email,
      //         role: _user.role,
      //         nickname: _user.nickname,
      //         id: _user.id,
      //       });
      //     })
      //     .catch(() => {});
      // };
      // temp();
    const getInitUser = async () => {
      fetchHandler(await UserAPI.initGetUser(), (response) => {
        userStore.setUser({
          ...response.data.user
        })
      })
    }
    getInitUser();

    // 유튜브 제목 로컬스토리지에서 꺼내오기
    playerStore.setPlayer({
      youtubeTitle: window.localStorage.getItem('youtubeTitle') || '',
    });
  }, []);

  const updateProgressBar = () => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
  };

  const throttledUpdateProgressBar = throttle(updateProgressBar, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledUpdateProgressBar);
    return () => {
      window.removeEventListener('scroll', throttledUpdateProgressBar);
      throttledUpdateProgressBar.cancel(); // Clean up the throttle function
    };
  }, [throttledUpdateProgressBar]);

  //* 로그아웃 함수
  const signOutHandler = () => {
    // if(store.getState().userStore.suid.split("_")[0] == "kakao") { }
    // else if(store.getState().userStore.suid.split("_")[0] == "naver") {

    // }
    // else if(store.getState().userStore.suid.split("_")[0] == "google") {

    // }
    (async () => {
      await AxiosInstance({
        url: '/api/user',
        method: 'DELETE',
        withCredentials: true,
      })
        .then(() => {
          toastifyStore.setToastify({
            type: 'success',
            message: '로그아웃 되었습니다.',
          });
          // store.dispatch(rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST([]));
          // store.dispatch(rootActions.scheduleStore.SET_TODAY_SCHEDULE_LIST([]));
          userStore.initialize();

        })
        .catch(() => {});
    })();
  };

  return (
    <div className="w-full relative h-[3rem]">
      <ReactToastifyComponents />
      <div
        id="progressBar"
        className={`z-100 fixed top-0 left-0 h-[0.375rem] bg-gradient-purple-40-deg-70-blue-40`}
        style={{ width: `${scrollWidth}%` }}
      ></div>
      <header className="fixed top-0 left-0 w-full h-[3rem]">
        <section
          className={
            'flex h-full w-full relative justify-between pr-1 items-center outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20'
          }
        >
          <SideBar />
          <div className="flex">
            <div className={'h-full w-[2.75rem] relative'}>
              <Link href={`/`} prefetch={false}>
                <Image
                  id={'logo'}
                  src={'/images/logo/logo.png'}
                  alt="logo"
                  fill
                  onClick={() => {
                    navStore.setState({
                      leftPath: '/',
                    });
                  }}
                />
              </Link>
            </div>
            {!!userStore.id && (
              <div
                className={'w-[1.5rem] aspect-square px-[.5rem]'}
                onClick={() => {
                  playerStore.setPlayer({
                    youtubePlay: !playerStore.youtubePlay,
                  });
                }}
              >
                {playerStore.youtubePlay ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </div>
            )}
          </div>
          <div className={'flex'}>
            {userStore.id ? (
              <Button
                onClick={() => signOutHandler()}
                className={
                  'p-2 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[.5rem]'
                }
              >
                Sign Out
              </Button>
            ) : (
              <ModalButton
                modal={<AuthModal closeModal={modalState.closeModal} />}
                buttonClassName={
                  'p-2 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20 rounded-[.5rem]'
                }
                modalClassName={'max-w-[30rem]'}
                modalOverlayVisible={true}
                isHeaderBar={true}
                headerBarStyle="bg-white-100 rounded-t-2xl h-[3rem]"
              >
                Sign In / Sign up
              </ModalButton>
            )}
          </div>
        </section>
      </header>
    </div>
  );
};
export default Header