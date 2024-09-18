import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import Button from 'src/component/common/button/hybrid/Button';
import HamburgerMenu from 'src/component/common/button/hybrid/HamburgerMenu';
import MusicPlayer from 'src/component/player/hybrid/MusicPlayer';
import useNavStore from 'src/store/navStore';
import useAuthStore from 'src/store/userStore';

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
      icon: '/images/icons/ic-home.svg',
      label: '홈',
      href: '/',
      options: { isRequiredAuth: false },
    },
    {
      icon: '/images/icons/ic-blog.svg',
      label: '블로그2',
      href: '/blog2',
      options: { isRequiredAuth: false },
    },
  ];

const SideBar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(true);
  const authStore = useAuthStore();
  const navStore = useNavStore();
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sideBarActiveCheck = () => {
      if (window.document.location.pathname === '/') {
        navStore.setState({
          leftPath: '/',
        });
      }
    };
    window.addEventListener('popstate', sideBarActiveCheck);

    return () => {
      window.removeEventListener('popstate', sideBarActiveCheck);
    };
  }, []);

  return (
    <aside
      className={`absolute font-semibold flex flex-col ${isNavbarOpen ? 'w-12 h-12' : 'w-12 h-12'}`}
    >
      <HamburgerMenu
        isHideMenu={isNavbarOpen}
        onClickHideMenu={() => setIsNavbarOpen((prev) => !prev)}
      />
      <div
        className={`bg-white-100 absolute top-12 h-[calc(100vh-1rem)] overflow-y-scroll ${isNavbarOpen ? 'flex outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20' : 'hidden'} flex-col justify-start z-[200]`}
      >
        <nav className="w-48 h-full flex flex-col">
          {LeftNavItems.map((item, index) => (
            <Link href={item.href} key={`sideBarItem${index}`} prefetch={false} className={"flex"}>
              <Button
                className={`w-full h-full rounded-none p-2 flex items-center ${navStore.leftPath.split('?')[0] === item.href.split('?')[0] ? 'bg-primary-20 text-white' : 'bg-transparent text-black'}`}
                onClick={(e: MouseEvent) => {
                  if (
                    item.href ===
                    window.document.location.pathname.split('?')[0]
                  ) {
                    e.preventDefault();
                  }
                  navStore.setState({
                    leftPath: item.href,
                  });
                  setIsNavbarOpen(false);
                }}
                disabled={item.options.isRequiredAuth && !authStore.id}
              >
                <div className="w-8 h-8 flex items-center justify-start ">
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
          {!!authStore.id && (
            <div className="flex-grow flex flex-col justify-between gap-4">
              <MusicPlayer isNavbarOpen={isNavbarOpen} />
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default React.memo(SideBar);
