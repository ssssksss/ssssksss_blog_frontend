"use client";

import ReactToastifyComponents from "@component/common/alert/ReactToastifyComponents";
import DarkmodeToggleButton from "@component/common/button/hybrid/DarkmodeToggleButton";
import FallingEffectButton from "@component/common/button/hybrid/FallingEffectButton";
import FallingEffectContainer from "@component/common/effect/FallingEffectContainer";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import AuthButtonView from "@component/header/view/AuthButtonView";
import ProgressBarView from "@component/header/view/ProgressBarView";
import YoutubePlayIconView from "@component/player/view/YoutubePlayIconView";
import { useInitGetUser } from "@hooks/useInitGetUser";
import { useInitTheme } from "@hooks/useInitTheme";
import useInitYoutubePlayer from "@hooks/useInitYoutubePlayer";
import { useScrollHeader } from "@hooks/useScrollHeader";
import useLoadingStore from "@store/loadingStore";
import useMemoStore from "@store/memoStore";
import usePlanStore from "@store/planStore";
import useSiteBookmarkStore from "@store/siteBookmarkStore";
import useToastifyStore from "@store/toastifyStore";
import { useThemeStore } from "@store/useThemeStore";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import SideBar from "./SideBar";
interface IHeader {}
const Header = (props: IHeader) => {
  const router = useRouter();
  const loadingStore = useLoadingStore();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const {isHidden, isVisible, headerRef} = useScrollHeader(); // 스크롤 위치와 마우스의 위치에 따라 헤더를 감추고 보여주는 hook
  const {playerStore} = useInitYoutubePlayer();
  useInitTheme(); // 초기에 theme 관련 설정을 해주는 hook
  const planStore = usePlanStore();
  const memoStore = useMemoStore();
  const toastifyStore = useToastifyStore();
  const siteBookmarkStore = useSiteBookmarkStore();
  const { userStore } = useInitGetUser(); // 유저정보 조회 API
  const themeStore = useThemeStore();
  
  // 페이지 이동시 공통적으로 처리할 로직
  useEffect(() => {
    // 모달창이 열려있는 상태로 새로고침이 되었을 때 스택 제거 용도
    if (history.state.isModal) {
      window.history.back();
    }
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
    }
  }, [pathname]);

  //* 로그아웃 함수
  const signOutHandler = useCallback(async () => {
    const response = await fetch("/api/user", {
      method: "DELETE",
    });

    if (response.ok) {
      userStore.initialize();
      planStore.initialize();
      memoStore.initialize();
      siteBookmarkStore.initialize();
      toastifyStore.setToastify({
        type: "success",
        message: "로그아웃 되었습니다.",
      });
      router.push("/");
    }
  },[]);

  return (
    // 헤더 3.5rem = progreebar .5rem + header 3rem
    <div className="relative min-h-[3.5rem] w-full">
      <ReactToastifyComponents />
      {themeStore.isFallingEffectMode && <FallingEffectContainer />}
      <LoadingSpinner loading={loadingStore.loading} />
      {/* header태그와 배경색은 동일 */}
      <ProgressBarView />
      {!!userStore.id ? (
        <header
          ref={headerRef}
          className={`fixed z-50 h-[3.5rem] w-full bg-default-1 pt-2 ${isHidden ? "-translate-y-full" : "translate-y-0"} ${isVisible ? "opacity-100" : "-z-30 opacity-0"}`}
        >
          <div className="absolute -bottom-[0.25rem] h-[0.25rem] w-full bg-primary-100"></div>
          <section
            className={
              "relative flex h-full w-full items-center justify-between rounded-[.25rem] pr-1"
            }
          >
            <SideBar />
            <div className="flex">
              {userStore.id > 0 && (
                <button
                  className={
                    "ml-[3.25rem] aspect-square w-[2.5rem] h-btn-sm default-flex "
                  }
                  onClick={() => {
                    playerStore.setPlayer({
                      youtubePlay: !playerStore.youtubePlay,
                      isMuted: false,
                    });
                    window.localStorage.setItem(
                      "isPlay",
                      !playerStore.youtubePlay ? "true" : "false",
                    );
                  }}
                >
                  <YoutubePlayIconView youtubePlay={playerStore.youtubePlay} />
                </button>
              )}
            </div>
            <div className={"flex "}>
              <FallingEffectButton />
              <DarkmodeToggleButton />
              <AuthButtonView
                signOutHandler={signOutHandler}
                userId={userStore.id}
              />
            </div>
          </section>
        </header>
      ) : (
        <div
          className={"fixed z-50 h-[3.5rem] w-full animate-pulseSkeleton pt-2"}
        ></div>
      )}
    </div>
  );
};
export default Header;
