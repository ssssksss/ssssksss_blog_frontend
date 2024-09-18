import React, { useEffect, useState } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event?: MouseEvent) => void,
) => {
  const [isDragging, setIsDragging] = useState(true);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        if (isDragging) return;

        // Exclude back button clicks
        if (event.button === 3) return;
        if (event.button === 4) return;

        callback(event);
      }
    };

    const listener1 = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsDragging(false);
      } else {
        setIsDragging(true);
      }
    };

    document.addEventListener("mouseup", listener);
    document.addEventListener("mousedown", listener1);

    return () => {
      document.removeEventListener("mouseup", listener);
      document.removeEventListener("mousedown", listener1);
    };
  }, [callback, isDragging, ref]);
};

export default useOutsideClick;
