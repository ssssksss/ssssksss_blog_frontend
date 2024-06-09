import React, { useEffect } from "react";
const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event?: CustomEvent<MouseEvent>) => void,
) => {
  useEffect(() => {
    const listener = (event: CustomEvent<MouseEvent>) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(event);
      }
    };
    document.addEventListener("click", listener as EventListener);
    return () => {
      document.removeEventListener("click", listener as EventListener);
    };
  }, [ref, callback]);
};
export default useOutsideClick;
