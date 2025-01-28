"use client";

import {
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useLoadingStore from "@store/loadingStore";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useUserStore from "src/store/userStore";

interface IBlog2FloatMenu {}
const Blog2FloatMenu = (props: IBlog2FloatMenu) => {
  const router = useRouter();
  const userStore = useUserStore();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname(); // 현재 경로 가져오기
  const loadingStore = useLoadingStore();

  useEffect(() => {
    const keyDownEventFunc = (e: KeyboardEvent) => {
      // shift + Space를 누르게 되면 글 작성하는 화면으로 이동
      if (
        e.code === "Space" &&
        e.shiftKey &&
        new URL(window.location.href).pathname == "/blog2" &&
        userStore.role == "ROLE_ADMIN"
      ) {
        router.push("/blog2/create");
      }
    };

    window.addEventListener("keydown", keyDownEventFunc);

    return () => {
      window.removeEventListener("keydown", keyDownEventFunc);
    };
  }, [userStore.role]);

  return (
    <div
      className={
        "fixed bottom-[10rem] left-[calc(100%-2.75rem)] z-50 h-0 cursor-pointer opacity-60 hover:opacity-100 max-[440px]:left-[calc(100%-2rem)]"
      }
      ref={menuRef}
    >
      <div className="flex flex-col rounded-[.25rem] bg-third-20 outline outline-[0.3125rem] outline-offset-[-0.0625rem] outline-secondary-80">
        {userStore.role == "ROLE_ADMIN" && !pathname?.includes("blog2/") && (
          <Link
            href={"/blog2/create"}
            className="flex h-11 w-11 items-center justify-center hover:bg-primary-20 max-[440px]:h-8 max-[440px]:w-8"
            onClick={() => loadingStore.startLoading()}
          >
            <FontAwesomeIcon icon={faEdit} width={44} height={44} />
          </Link>
        )}
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="relative flex h-11 w-11 items-center justify-center hover:bg-primary-20 max-[440px]:h-8 max-[440px]:w-8"
        >
          <FontAwesomeIcon icon={faArrowUp} width={14} height={14} />
        </button>
        <button
          className="relative flex h-11 w-11 items-center justify-center hover:bg-primary-20 max-[440px]:h-8 max-[440px]:w-8"
          onClick={() => window.scrollTo(0, window.document.body.scrollHeight)}
        >
          <FontAwesomeIcon icon={faArrowDown} width={14} height={14} />
        </button>
      </div>
    </div>
  );
};
export default Blog2FloatMenu;
