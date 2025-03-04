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

interface IPlanSideBar {}

const LeftNavItems = [
  {
    icon: "/images/icons/ic-home.svg",
    label: "홈",
    href: "/plan",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-calendar.svg",
    label: "일정",
    href: "/plan/schedule",
    options: {isRequiredAuth: true},
  },
];

const PlanSideBar = (props: IPlanSideBar) => {
  const toggleState = useToggleState();
  const userStore = useUserStore();
  const loadingStore = useLoadingStore();
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 경로를 가져와서 상태에 저장
    setActiveMenu(window.location.pathname);
  }, [searchParams]);

  return (
    <div
      className={`z-20 flex w-auto outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-60 transition-all duration-[800ms] min-[1300px]:fixed min-[1300px]:left-0 min-[1300px]:top-[3.5rem] min-[1300px]:h-[calc(100%-3.5rem)] min-[1300px]:flex-col min-[1300px]:py-2 min-[1300px]:pt-10 ${toggleState.isHide ? "bg-default-1 min-[1300px]:w-[3rem]" : "animate-fill glassmorphism min-[1300px]:w-[22.5rem]"}`}>
      <button
        className={`z-10 hidden h-[2.25rem] w-[2.25rem] -translate-x-1/2 -translate-y-8 bg-white-80 transition-all duration-[800ms] min-[1300px]:absolute min-[1300px]:default-flex ${toggleState.isHide ? "left-[3.0625rem]" : "left-[22.5rem]"} default-primary-outline focus:default-primary-outline`}
        onClick={() => toggleState.toggleHide()}>
        <FontAwesomeIcon
          icon={faPlay}
          width={16}
          height={16}
          className={`transition-all duration-[1200ms] ${toggleState.isHide ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      {LeftNavItems.map((item, index) => (
        <Link
          href={item.href}
          key={`sideBarItem${index}`}
          className={`flex animate-fadeIn ${toggleState.isHide ? "hover:bg-primary-20" : "relative hover:bg-secondary-20"}`}>
          <Button
            className={`flex h-full w-[calc(100%-0.0625rem)] items-center justify-start rounded-none outline-none ${activeMenu === item.href ? "text-white bg-gradient" : "text-black bg-transparent"}`}
            onClick={(e) => {
              if (item.href == activeMenu) {
                e.preventDefault();
              }
              loadingStore.startLoading();
              setActiveMenu(item.href);
            }}
            disabled={item.options.isRequiredAuth && !userStore.id}>
            <div
              className={`flex h-full w-full items-center p-2 ${activeMenu === item.href ? "min-[1300px]:animate-updown" : ""}`}>
              <div className={"h-8 w-8 default-flex"}>
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={`${toggleState.isHide ? "hidden" : "left-12 ml-2 hidden animate-rotateFadeIn justify-start min-[1300px]:absolute min-[1300px]:flex"}`}>
                {item.label}
              </span>
            </div>
          </Button>
        </Link>
      ))}
    </div>
  );
};
export default PlanSideBar;
