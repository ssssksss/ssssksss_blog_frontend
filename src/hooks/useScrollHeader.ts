import throttle from "lodash/throttle";
import { useEffect, useRef, useState } from "react";

export const useScrollHeader = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(200);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = throttle((e: Event) => {
    if (window.scrollY > 300) {
      if (headerRef.current && headerRef.current.contains(e.target as Node)) {
        return;
      }
      setIsHidden(true);
      setIsVisible(false);
    } else {
      setIsHidden(false);
      setIsVisible(true);
    }
    lastScrollY.current = window.scrollY;
  }, 50);

  const handleMouseMove = throttle((e: MouseEvent) => {
    if (window.scrollY < 80 || e.clientY < 70) {
      setIsHidden(false);
      setIsVisible(true);
    } else {
      if (headerRef.current && headerRef.current.contains(e.target as Node)) {
        return;
      }
      setIsVisible(false);
    }
  }, 50);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return {isHidden, isVisible, headerRef};
};
