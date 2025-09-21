"use client";

import DarkmodeToggleButton from "@component/common/button/hybrid/DarkmodeToggleButton";
import FallingEffectButton from "@component/common/button/hybrid/FallingEffectButton";
import FallingEffectContainer from "@component/common/effect/FallingEffectContainer";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import AuthButtonView from "@component/header/view/AuthButtonView";
import ProgressBarView from "@component/header/view/ProgressBarView";
import { useInitTheme } from "@hooks/useInitTheme";
import { useScrollHeader } from "@hooks/useScrollHeader";
import useLoadingStore from "@store/loadingStore";
import { useThemeStore } from "@store/useThemeStore";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import SideBar from "./SideBar";

const ReactToastifyComponents = dynamic(
  () => import("@component/common/alert/ReactToastifyComponents"),
  {
    ssr: false,
  },
);

interface IHeader {}
const Header = (props: IHeader) => {
  const loadingStore = useLoadingStore();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const {isHidden, isVisible, headerRef} = useScrollHeader(); // 스크롤 위치와 마우스의 위치에 따라 헤더를 감추고 보여주는 hook
  useInitTheme(); // 초기에 theme 관련 설정을 해주는 hook
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
    loadingStore.stopLoading();
  }, [pathname]);


  return (
    // 헤더 3.5rem = progreebar .5rem + header 3rem
    <div className="relative min-h-[3.5rem] w-full">
      <ReactToastifyComponents />
      {themeStore.isFallingEffectMode && <FallingEffectContainer />}
      <LoadingSpinner loading={loadingStore.loading} />
      {/* header태그와 배경색은 동일 */}
      <ProgressBarView />
      <header
        ref={headerRef}
        className={`fixed z-50 h-[3.5rem] w-full bg-default-1 pt-2 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        } ${isVisible ? "opacity-100" : "-z-30 opacity-0"}`}
      >
        <div className="absolute -bottom-[0.25rem] h-[0.25rem] w-full bg-primary-100"></div>

        <section className="relative flex h-full w-full items-center justify-between rounded-[.25rem] pr-1">
          <SideBar />
          <div className="flex w-full justify-end items-center">
            <FallingEffectButton />
            <DarkmodeToggleButton />
            <AuthButtonView />
          </div>
        </section>
      </header>
    </div>
  );
};
export default Header;
