// https://velog.io/@letthere/developic-%EB%93%9C%EB%A1%AD%EB%8B%A4%EC%9A%B4-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84

import { useEffect, useState } from 'react';

export const useOutsideClick = (el, initialState) => {
  const [isActive, setIsActive] = useState(initialState);

  // 1)
  useEffect(() => {
    const pageClickEvent = (e) => {
      if (el.current !== null && !el.current.contains(e.target)) {
        setIsActive(!isActive);
      }
    };
    // 2)
    if (isActive) {
      window.addEventListener('click', pageClickEvent);
    }

    return () => {
      window.removeEventListener('click', pageClickEvent);
    };
  }, [isActive, el]);
  // 3)
  return [isActive, setIsActive];
};
