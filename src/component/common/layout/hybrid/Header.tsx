"use client";

import ReactToastifyComponents from "@component/common/alert/ReactToastifyComponents";
import DarkmodeToggleButton from "@component/common/button/hybrid/DarkmodeToggleButton";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchCSRHandler } from "@hooks/useFetchCSRHandler";
import useThrottle from "@hooks/useThrottle";
import useLoadingStore from "@store/loadingStore";
import useMemoStore from "@store/memoStore";
import usePlanStore from "@store/planStore";
import { useThemeStore } from "@store/useThemeStore";
import throttle from "lodash/throttle";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import AuthModal from "src/component/auth/hybrid/AuthModal";
import Button from "src/component/common/button/hybrid/Button";
import ModalButton from "src/component/common/modal/hybrid/ModalButton";
import usePlayerStore from "src/store/playerStore";
import SideBar from "./SideBar";
interface IHeader {}
const Header = (props: IHeader) => {
  const playerStore = usePlayerStore();
  const planStore = usePlanStore();
  const memoStore = useMemoStore();
  const themeStore = useThemeStore();
  const [scrollWidth, setScrollWidth] = useState(0);
  const router = useRouter();
  const {toastifyStore, userStore, fetchCSR} = useFetchCSRHandler();
  const [isHidden, setIsHidden] = useState(true); // 헤더 감추기 상태
  const [isVisible, setIsVisible] = useState(false); // 마우스 상단에 있을 때 헤더 보이기
  const [lastScrollY, setLastScrollY] = useState(200);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const loadingStore = useLoadingStore();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  // 페이지 이동시 공통적으로 처리할 로직
  useEffect(() => {
    if (previousPathname.current !== pathname) {
      // console.log(
      //   `Page changed from ${previousPathname.current} to ${pathname}`,
      // );
      previousPathname.current = pathname;
      loadingStore.stopLoading();
    }
  }, [pathname]);

  useEffect(() => {
    toastifyStore.setToastify({
      type: "success",
      message: "환영합니다."
    }); 
    themeStore.setTheme1(localStorage.getItem("theme1") || "purple");
    themeStore.setTheme2(localStorage.getItem("theme2") || "blue");
    themeStore.setTheme3(localStorage.getItem("theme3") || "green");

    if (localStorage.getItem("isDarkMode") == "false") {
      themeStore.toggleDarkMode();
    }
  }, []);
  
  useEffect(() => {
    const getInitUser = async () => {
      // fetchCSR(
      //   await UserAPI.initGetUser(),
      //   (response) => {
      //     userStore.setUser({
      //       ...response.data.user,
      //     });
      //   },
      //   (error) => {
      //     userStore.setUser({
      //       id: -1,
      //     });
      //   },
      // );
      const response = await fetch("/api/user");
      if (!response.ok) {
        userStore.setUser({
          id: -1,
        });
        return;
      }
      const result: IResponseUser = await response.json();
      userStore.setUser({
        ...result.data,
      });
    };
    getInitUser();

    const currentYoutube = window.localStorage.getItem("currentYoutube")
      ? JSON.parse(window.localStorage.getItem("currentYoutube")!)
      : "";
    const currentYoutubePlaylist = window.localStorage.getItem(
      "currentYoutubePlaylist",
    )
      ? JSON.parse(window.localStorage.getItem("currentYoutubePlaylist")!)
      : "";
    const playRepeatType = window.localStorage.getItem("playRepeatType");
    const isPlay = window.localStorage.getItem("isPlay");
    const isPlayRandom = window.localStorage.getItem("isPlayRandom")
      ? true
      : false;

    // 유튜브 제목 로컬스토리지에서 꺼내오기
    playerStore.setPlayer({
      currentYoutube,
      currentYoutubePlaylist,
      playRepeatType,
      isPlayRandom,
    });
  }, []);

  const throttledUpdateProgressBar = useThrottle(() => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
  }, 20);

  useEffect(() => {
    window.addEventListener("scroll", throttledUpdateProgressBar);
    return () => {
      window.removeEventListener("scroll", throttledUpdateProgressBar);
    };
  }, [throttledUpdateProgressBar]);


  // 스크롤이 상단으로 가면 헤더가 보임
  const handleScroll = throttle((e: Event) => {
    if (window.scrollY > 300) {
      if (headerRef.current!.contains(e.target as Node)) {
        return;
      }
      setIsVisible(false);
      setIsHidden(true);
    } else {
      setIsHidden(false);
      setIsVisible(true);
    }
    setLastScrollY(window.scrollY);
  }, 50);

  // 마우스가 상단에 가면 헤더창이 보임
  const handleMouseMove = throttle((e: MouseEvent) => {
    if (window.scrollY < 80) {
      setIsHidden(false);
      setIsVisible(true);
    } else {
      if (e.clientY < 70) {
        setIsVisible(true);
        setIsHidden(false);
      } else {
        if (headerRef.current!.contains(e.target as Node)) {
          return;
        }
        setIsVisible(false);
      }
    }
  }, 50);

  useEffect(() => {
    const scrollContainer = headerRef.current;
    if (scrollContainer) {
      window.addEventListener("scroll", handleScroll);
    }
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      if (scrollContainer) {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [lastScrollY, handleScroll, handleMouseMove]);

  //* 로그아웃 함수
  const signOutHandler = async () => {
    const response = await fetch("/api/user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      userStore.initialize();
      planStore.initialize();
      memoStore.initialize();
      toastifyStore.setToastify({
        type: "success",
        message: "로그아웃 되었습니다.",
      });
      router.push("/");
    }
  };

  return (
    // 헤더 3.5rem = progreebar .5rem + header 3rem
    <div className="relative min-h-[3.5rem] w-full bg-primary-60">
      <ReactToastifyComponents />
      <LoadingSpinner loading={loadingStore.loading} />
      <div
        id="progressBar"
        className={
          "fixed left-0 top-0 z-[100] h-[0.5rem] bg-gradient-purple-40-blue-40-70deg"
        }
        style={{width: `${scrollWidth}%`}}
      ></div>
      <header
        ref={headerRef}
        className={`bg-default-1 fixed z-50 h-[3rem] w-full ${isHidden ? "-translate-y-full" : "translate-y-2"} ${isVisible ? "opacity-100" : "opacity-0"}`}
      >
        <section
          className={
            "relative flex h-full w-full items-center justify-between rounded-[.25rem] pr-1 "
          }
        >
          <SideBar />
          <div className="flex">
            {!!userStore.id && (
              <div
                className={
                  "ml-[2.75rem] aspect-square w-[1.5rem] px-[.5rem] default-flex"
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
                {playerStore.youtubePlay ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </div>
            )}
          </div>
          <div className={"flex"}>
            <DarkmodeToggleButton />
            {userStore.id == 0 ? (
              <div
                className={
                  "default-primary-outline h-[2.5rem] w-[5rem] animate-pulseSkeleton p-2"
                }
              ></div>
            ) : userStore.id > 0 ? (
              <Button
                onClick={() => signOutHandler()}
                className={"default-primary-outline p-2"}
              >
                로그아웃
              </Button>
            ) : (
              <ModalButton
                modal={<AuthModal />}
                buttonClassName={
                  "p-2 default-primary-outline hover:bg-primary-20"
                }
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
export default Header;
