"use client";

import { useCallback, useState } from "react";

const useToggleState = (defaultState?: boolean) => {
  const [isHide, setIsHide] = useState(defaultState ?? true);

  const toggleHide = useCallback(() => {
    setIsHide((prev) => !prev);
  }, []);

  return {
    isHide,
    toggleHide,
  };
};

export default useToggleState;
