"use client";

import ReactToastifyComponents from "@component/common/alert/ReactToastifyComponents";
import {faPause} from "@fortawesome/free-solid-svg-icons/faPause";
import {faPlay} from "@fortawesome/free-solid-svg-icons/faPlay";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useFetchCSRHandler} from "@hooks/useFetchCSRHandler";
import useThrottle from "@hooks/useThrottle";
import useMemoStore from "@store/memoStore";
import usePlanStore from "@store/planStore";
import {throttle} from "lodash";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import AuthModal from "src/component/auth/hybrid/AuthModal";
import Button from "src/component/common/button/hybrid/Button";
import ModalButton from "src/component/common/modal/hybrid/ModalButton";
import useNavStore from "src/store/navStore";
import usePlayerStore from "src/store/playerStore";
import SideBar from "./SideBar";

interface IHeader {}
const Header = (props: IHeader) => {
  const playerStore = usePlayerStore();
  const planStore = usePlanStore();
  const navStore = useNavStore();
  const memoStore = useMemoStore();
  const [scrollWidth, setScrollWidth] = useState(0);
  const router = useRouter();
  const {toastifyStore, userStore, fetchCSR} = useFetchCSRHandler();
  const [isHidden, setIsHidden] = useState(true); // 헤더 감추기 상태
  const [isVisible, setIsVisible] = useState(false); // 마우스 상단에 있을 때 헤더 보이기
  const [lastScrollY, setLastScrollY] = useState(200);
  const headerRef = useRef<HTMLDivElement | null>(null);

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
    <div className="relative min-h-[3.5rem] w-full">
      <ReactToastifyComponents />
      <div
        id="progressBar"
        className={
          "fixed left-0 top-0 z-[100] h-[0.5rem] bg-gradient-purple-40-blue-40-70deg"
        }
        style={{width: `${scrollWidth}%`}}></div>
      <header
        ref={headerRef}
        className={`fixed z-50 h-[3rem] w-full bg-white-80 ${isHidden ? "-translate-y-full" : "translate-y-2"} ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <section
          className={
            "relative flex h-full w-full items-center justify-between rounded-[.25rem] pr-1 outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-60"
          }>
          <SideBar />
          <div className="flex">
            <div className={"relative h-full w-[2.75rem]"}>
              <Link href={"/"} prefetch={false}>
                <Image
                  id={"logo"}
                  src={"/images/logo/logo.png"}
                  alt="logo"
                  fill
                  onClick={() => {
                    navStore.setState({
                      leftPath: "/",
                    });
                  }}
                />
              </Link>
            </div>
            {!!userStore.id && (
              <div
                className={"aspect-square w-[1.5rem] px-[.5rem]"}
                onClick={() => {
                  playerStore.setPlayer({
                    youtubePlay: !playerStore.youtubePlay,
                  });
                }}>
                {playerStore.youtubePlay ? (
                  <FontAwesomeIcon icon={faPause} />
                ) : (
                  <FontAwesomeIcon icon={faPlay} />
                )}
              </div>
            )}
          </div>
          <div className={"flex"}>
            {userStore.id == 0 ? (
              <div
                className={
                  "h-[2.5rem] w-[5rem] animate-pulseSkeleton p-2 default-outline"
                }></div>
            ) : userStore.id > 0 ? (
              <Button
                onClick={() => signOutHandler()}
                className={"p-2 default-outline"}>
                로그아웃
              </Button>
            ) : (
              <ModalButton
                modal={<AuthModal />}
                buttonClassName={"p-2 default-outline hover:bg-primary-20"}>
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
