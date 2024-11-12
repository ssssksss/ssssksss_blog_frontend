"use client";

import {
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import useUserStore from "src/store/userStore";

interface IBlog2FloatMenu {}
const Blog2FloatMenu = (props: IBlog2FloatMenu) => {
  const router = useRouter();
  const userStore = useUserStore();
  const menuRef = useRef<HTMLDivElement>(null);

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
        "fixed z-50 h-0 max-[440px]:left-[calc(100%-2rem)] left-[calc(100%-2.75rem)] bottom-[10rem] opacity-60 hover:opacity-100 cursor-pointer"
      }
      ref={menuRef}
    >
      <div className="flex flex-col outline outline-[0.3125rem] outline-offset-[-0.0625rem] outline-secondary-80 rounded-[.25rem] bg-third-20">
        {userStore.role == "ROLE_ADMIN" && (
          <Link
            href={"/blog2/create"}
            className="w-11 h-11 max-[440px]:w-8 max-[440px]:h-8 flex justify-center items-center hover:bg-primary-20"
          >
            <FontAwesomeIcon icon={faEdit} width={44} height={44} />
          </Link>
        )}
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="relative w-11 h-11 max-[440px]:w-8 max-[440px]:h-8 flex justify-center items-center hover:bg-primary-20"
        >
          <FontAwesomeIcon icon={faArrowUp} width={14} height={14}/>
        </button>
        <button
          className="relative w-11 h-11 max-[440px]:w-8 max-[440px]:h-8 flex justify-center items-center hover:bg-primary-20"
          onClick={() => window.scrollTo(0, window.document.body.scrollHeight)}
        >
          <FontAwesomeIcon icon={faArrowDown} width={14} height={14} />
        </button>
      </div>
    </div>
  );
};
export default Blog2FloatMenu;
