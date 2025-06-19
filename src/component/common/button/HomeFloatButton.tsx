"use client";

import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IHomeFloatButton {}

const HomeFloatButton = (props: IHomeFloatButton) => {
  const scrollByViewportHeight = (direction: "up" | "down") => {
    const vh = window.innerHeight;
    const offset = direction === "up" ? -vh : vh;
    window.scrollBy({top: offset, behavior: "smooth"});
  };

  return (
    <div
      className={
        "fixed bottom-[10rem] left-[min(calc(100%-3.375rem),1800px)] z-50 h-0 cursor-pointer opacity-60 hover:opacity-100 max-[440px]:left-[calc(100%-2rem)]"
      }
    >
      <div className="flex flex-col !border-[0.3125rem] bg-default-1 secondary-border-radius">
        <button
          onClick={() => scrollByViewportHeight("up")}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl hover:bg-primary-20 max-[440px]:h-8 max-[440px]:w-8"
        >
          <FontAwesomeIcon icon={faArrowUp} width={14} height={14} />
        </button>
        <button
          onClick={() => scrollByViewportHeight("down")}
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl hover:bg-primary-20 max-[440px]:h-8 max-[440px]:w-8"
        >
          <FontAwesomeIcon icon={faArrowDown} width={14} height={14} />
        </button>
      </div>
    </div>
  );
};

export default HomeFloatButton;
