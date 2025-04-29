import Button from "@component/common/button/hybrid/Button";
import HamburgerMenu from "@component/common/button/hybrid/HamburgerMenu";
import MusicPlayer from "@component/player/hybrid/MusicPlayer";
import useLoadingStore from "@store/loadingStore";
import { default as useAuthStore } from "@store/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { MouseEvent, ReactNode, useEffect, useRef, useState } from "react";
import { PiBookBookmarkFill } from "react-icons/pi";
interface LeftNavItem {
  icon: string | ReactNode;
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
    options: {isRequiredAuth: true},
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
  {
    icon: "/images/icons/ic-setting.svg",
    label: "디자인",
    href: "/design",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-setting.svg",
    label: "폴더구조",
    href: "/tree",
    options: {isRequiredAuth: false},
  },
  {
    icon: "/images/icons/ic-setting.svg",
    label: "폴더변환",
    href: "/switch",
    options: {isRequiredAuth: false},
  },
  {
    icon: <PiBookBookmarkFill size={"24"} />,
    label: "즐겨찾기",
    href: "/site-bookmark",
    options: {isRequiredAuth: true},
  },
  {
    icon: "/images/icons/ic-setting.svg",
    label: "설정",
    href: "/setting",
    options: {isRequiredAuth: false},
  },
];

const SideBar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const userStore = useAuthStore();
  // const navStore = useNavStore();
  const [activeMenu, setActiveMenu] = useState("");
  const searchParams = useSearchParams();
  const loadingStore = useLoadingStore();
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
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
        className={`absolute top-12 h-[calc(100vh-3.5rem)] overflow-y-scroll bg-default-1 ${isNavbarOpen ? "flex border-t-[0.25rem] border-r-[0.25rem] border-primary-80" : "hidden"} flex-col justify-start`}
      >
        <nav className="flex h-16 w-[20rem] flex-wrap gap-y-4">
          {LeftNavItems.filter(
            (i) =>
              i.options.isRequiredAuth == false ||
              (i.options.isRequiredAuth == true && userStore.id > 0),
          ).map((item, index) => (
            <Link
              href={item.href}
              key={`sideBarItem${index}`}
              className={"flex animate-fadeIn"}
            >
              <Button
                className={`flex h-16 w-16 flex-col items-center gap-3 rounded-none py-2 hover:bg-primary-20 ${"/" + activeMenu.split("/")[1] === item.href.split("?")[0] ? "text-white" : "text-black bg-transparent"}`}
                onClick={(e: MouseEvent) => {
                  if (
                    item.href ===
                    window.document.location.pathname.split("?")[0]
                  ) {
                    e.preventDefault();
                  }
                  if (previousPathname.current !== pathname) {
                    loadingStore.startLoading();
                  }
                  setIsNavbarOpen(false);
                  setActiveMenu(item.href.split("?")[0]);
                }}
                disabled={item.options.isRequiredAuth && !userStore.id}
              >
                <div
                  className={`h-16 w-16 default-flex ${"/" + activeMenu.split("/")[1] === item.href.split("?")[0] && "animate-updown"}`}
                >
                  {
                    typeof item.icon === "string" ?
                      <Image
                        src={item.icon}
                        alt={item.label}
                        width={24}
                        height={24}
                      /> : 
                      item.icon
                  }
                </div>
                <div
                  className={`py-1 font-cookieRunRegular text-xs default-flex ${"/" + activeMenu.split("/")[1] === item.href.split("?")[0] ? "primary-border-radius bg-primary-80 px-2 text-white-40" : "text-black-100"}`}
                >
                  {item.label}
                </div>
              </Button>
            </Link>
          ))}
          {userStore.id > 0 && (
            <div className="absolute bottom-0 h-[5rem] w-[20rem] bg-gray-20">
              <MusicPlayer />
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(SideBar);
