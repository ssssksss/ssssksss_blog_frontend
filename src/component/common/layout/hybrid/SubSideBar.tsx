"use client";

import Button from "@component/common/button/hybrid/Button";
import useToggleState from "@hooks/useToggle";
import useLoadingStore from "@store/loadingStore";
import useUserStore from "@store/userStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { GoSidebarCollapse } from "react-icons/go";
interface ITravelSideBar {
  LeftNavItems: {
    icon: string | ReactNode;
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
      className={`border-r-2 border-r-primary-100 z-20 flex w-auto outline-primary-60 transition-all duration-[800ms] sm:fixed sm:left-0 sm:gap-y-2 sm:top-[3.5rem] sm:h-[calc(100%-3.5rem)] sm:flex-col sm:py-2 sm:pt-16 ${toggleState.isHide ? "bg-default-1 sm:w-[3rem]" : "animate-fill glassmorphism sm:w-[22.5rem]"}`}
    >
      <button
        className={`z-10 hidden h-btn-md aspect-square rounded-2xl -translate-x-1/2 -translate-y-12 bg-default-1 transition-all duration-[800ms] sm:absolute sm:default-flex ${toggleState.isHide ? "left-[1.5rem]" : "left-[22.5rem]"} `}
        onClick={() => toggleState.toggleHide()}
      >
        <GoSidebarCollapse
          size={32}
          className={`transition-all duration-[1200ms] ${toggleState.isHide ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      {props.LeftNavItems.map((item, index) => (
        <Link
          href={item.href}
          key={`sideBarItem${index}`}
          className={`flex animate-fadeIn ${toggleState.isHide ? "hover:bg-primary-20" : "relative hover:bg-secondary-20"}`}
        >
          <Button
            className={`flex h-full w-full items-center justify-start rounded-none outline-none ${activeMenu === item.href ? "text-white bg-gradient" : "text-black bg-transparent"}`}
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
                  <>
                    {item.icon}
                  </>
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
