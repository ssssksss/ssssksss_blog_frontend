"use client";

import { faArrowDown, } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp, } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useUserStore from "src/store/userStore";

interface IBlog2ListFixedMenu {

}
const Blog2ListFixedMenu = (props: IBlog2ListFixedMenu) => {

  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    const keyDownEventFunc = (e: KeyboardEvent) => {
      // shift + Space를 누르게 되면 글 작성하는 화면으로 이동
      if (
        e.code === "Space" &&
            e.shiftKey &&
            // store.getState().blog2Store.activeBlogUserId ==
            //   store.getState().authStore.id
            userStore.id > 0
      ) {
        router.push("/blog2/create");
      }
    };

    window.addEventListener("keydown", keyDownEventFunc);

    return () => {
      window.removeEventListener("keydown", keyDownEventFunc);
    };
  }, []);

  return (
    <div
      className={
        "fixed h-0 left-[calc(100%-2.75rem)] top-[25%] opacity-60 hover:opacity-100 cursor-pointer"
      }
    >
      <div className="flex flex-col outline outline-[0.0625rem] outline-offset-[-0.0625rem] outline-primary-20">
        {userStore.role == "ROLE_ADMIN" && (
          <Link
            href={"/blog2/create"}
            className="w-11 h-11 flex justify-center items-center hover:bg-primary-20"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Link>
        )}
        <button
          onClick={() => window.scrollTo(0, 0)}
          className="w-11 h-11 flex justify-center items-center hover:bg-primary-20"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <button
          className="w-11 h-11 flex justify-center items-center hover:bg-primary-20"
          onClick={() => window.scrollTo(0, window.document.body.scrollHeight)}
        >
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
      </div>
    </div>
  );
};
export default Blog2ListFixedMenu;