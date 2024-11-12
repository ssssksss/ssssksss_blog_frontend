import Button from "@component/common/button/hybrid/Button";
import HamburgerMenu from "@component/common/button/hybrid/HamburgerMenu";
import MusicPlayer from "@component/player/hybrid/MusicPlayer";
import {default as useAuthStore} from "@store/userStore";
import Image from "next/image";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import React, {MouseEvent, useEffect, useState} from "react";

interface LeftNavItem {
  icon: string;
  label: string;
  href: string;
  options: {
    isRequiredAuth: boolean;
  };
}

const LeftNavItems: LeftNavItem[] = [
  {
    icon: "/images/icons/ic-home.svg",
    label: "홈",
    href: "/",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-blog.svg",
    label: "블로그",
    href: "/blog",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-blog.svg",
    label: "블로그2",
    href: "/blog2",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-list-check.svg",
    label: "일정",
    href: "/plan",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-plane.svg",
    label: "여행",
    href: "/travel",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-board.svg",
    label: "게시판",
    href: "/board",
    options: {isRequiredAuth: false},
  },
];

const SideBar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const userStore = useAuthStore();
  // const navStore = useNavStore();
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   setActiveMenu(window.location.pathname);

  //   const sideBarActiveCheck = () => {
  //     if (window.document.location.pathname === "/") {
  //       navStore.setState({
  //         leftPath: "/",
  //       });
  //     }
  //   };
  //   window.addEventListener("popstate", sideBarActiveCheck);

  //   return () => {
  //     window.removeEventListener("popstate", sideBarActiveCheck);
  //   };
  // }, []);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 현재 경로를 가져와서 상태에 저장
    setActiveMenu(window.location.pathname);
  }, [searchParams]);

  return (
    <aside className={"z-200 absolute flex flex-col font-semibold"}>
      <HamburgerMenu
        isHideMenu={isNavbarOpen}
        onClickHideMenu={() => setIsNavbarOpen((prev) => !prev)}
      />
      <div
        className={`absolute top-12 h-[calc(100vh-3.5rem)] overflow-y-scroll bg-white-100 ${isNavbarOpen ? "flex outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20" : "hidden"} flex-col justify-start`}>
        <nav className="flex h-full w-[22.5rem] flex-col">
          {LeftNavItems.filter(
            (i) =>
              i.options.isRequiredAuth == false ||
              (i.options.isRequiredAuth == true && userStore.id > 0),
          ).map((item, index) => (
            <Link
              href={item.href}
              key={`sideBarItem${index}`}
              prefetch={false}
              className={"flex animate-fadeIn"}>
              <Button
                className={`flex h-full w-full items-center rounded-none p-2 ${"/" + activeMenu.split("/")[1] === item.href.split("?")[0] ? "text-white bg-primary-20" : "text-black bg-transparent"}`}
                onClick={(e: MouseEvent) => {
                  if (
                    item.href ===
                    window.document.location.pathname.split("?")[0]
                  ) {
                    e.preventDefault();
                  }
                  // navStore.setState({
                  //   leftPath: item.href,
                  // });
                  setIsNavbarOpen(false);
                  setActiveMenu(item.href.split("?")[0]);
                }}
                disabled={item.options.isRequiredAuth && !userStore.id}>
                <div className="flex h-8 w-8 items-center justify-start">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={24}
                    height={24}
                  />
                </div>
                <span className="ml-2">{item.label}</span>
              </Button>
            </Link>
          ))}
          {userStore.id > 0 && (
            <div className="absolute bottom-0 h-[5rem] w-full bg-gray-20">
              <MusicPlayer isNavbarOpen={isNavbarOpen} />
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(SideBar);
