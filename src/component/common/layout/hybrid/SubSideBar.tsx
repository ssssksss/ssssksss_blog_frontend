"use client";

import Button from "@component/common/button/hybrid/Button";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useToggleState from "@hooks/useToggle";
import useLoadingStore from "@store/loadingStore";
import useUserStore from "@store/userStore";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ITravelSideBar {
  LeftNavItems: {
    iconPath: string;
    labelTitle: string;
    href: string;
    options: {
      isRequiredAuth: boolean
    }
  }[]
}

const SubSideBar = (props: ITravelSideBar) => {
  const toggleState = useToggleState();
  const userStore = useUserStore();
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams();
  const loadingStore = useLoadingStore();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 경로를 가져와서 상태에 저장
    setActiveMenu(window.location.pathname);
    loadingStore.stopLoading();
  }, [searchParams]);

  return (
    <div
      className={`z-20 flex w-auto outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-60 transition-all duration-[800ms] sm:fixed sm:left-0 sm:top-[3.5rem] sm:h-[calc(100%-3.5rem)] sm:flex-col sm:py-2 sm:pt-10 ${toggleState.isHide ? "bg-default-1 sm:w-[3rem]" : "animate-fill glassmorphism sm:w-[22.5rem]"}`}
    >
      <button
        className={`z-10 hidden h-[2.25rem] w-[2.25rem] -translate-x-1/2 -translate-y-8 bg-white-80 transition-all duration-[800ms] sm:absolute sm:default-flex ${toggleState.isHide ? "left-[3.0625rem]" : "left-[22.5rem]"} default-primary-outline focus:default-primary-outline`}
        onClick={() => toggleState.toggleHide()}
      >
        <FontAwesomeIcon
          icon={faPlay}
          width={16}
          height={16}
          className={`transition-all duration-[1200ms] ${toggleState.isHide ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      {props.LeftNavItems.map((item, index) => (
        <Link
          href={item.href}
          key={`sideBarItem${index}`}
          onClick={(e) => {
            if (loadingStore.loading) {
              e.preventDefault();
              return;
            }
            loadingStore.startLoading();
            setTimeout(() => {
              loadingStore.stopLoading();
            }, 2000);
          }}
          className={`flex animate-fadeIn ${toggleState.isHide ? "hover:bg-primary-20" : "relative hover:bg-secondary-20"}`}
        >
          <Button
            className={`flex h-full w-[calc(100%-0.0625rem)] items-center justify-start rounded-none outline-none ${activeMenu === item.href ? "text-white bg-gradient" : "text-black bg-transparent"}`}
            onClick={(e) => {
              if (item.href == activeMenu) {
                e.preventDefault();
              }
              setActiveMenu(item.href);
            }}
            disabled={item.options.isRequiredAuth && !userStore.id}
          >
            <div
              className={`flex h-full w-full items-center p-2 ${activeMenu === item.href ? "sm:animate-updown" : ""}`}
            >
              <div className={"h-8 w-8 default-flex"}>
                {loadingStore.loading ? (
                  <div> .. </div>
                ) : (
                  <Image
                    src={item.iconPath}
                    alt={item.labelTitle}
                    width={24}
                    height={24}
                  />
                )}
              </div>
              <span
                className={`${toggleState.isHide ? "hidden" : "left-12 ml-2 hidden animate-rotateFadeIn justify-start sm:absolute sm:flex"}`}
              >
                {item.labelTitle}
              </span>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default SubSideBar;
