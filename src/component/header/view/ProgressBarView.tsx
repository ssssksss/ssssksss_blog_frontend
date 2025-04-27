import { useEffect, useState } from "react";
import useThrottle from "../../../hooks/useThrottle";

interface IProgressBarView {}
const ProgressBarView = (props: IProgressBarView) => {
  const [scrollWidth, setScrollWidth] = useState(0);
  const throttledUpdateProgressBar = useThrottle(() => {
    const winScroll = document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollWidth(scrolled);
  }, 20);

  useEffect(() => {
    throttledUpdateProgressBar();
    window.addEventListener("scroll", throttledUpdateProgressBar);
    return () => {
      window.removeEventListener("scroll", throttledUpdateProgressBar);
    };
  }, [throttledUpdateProgressBar]);

  return (
    <div className={"fixed left-0 top-0 z-[100] h-[0.5rem] w-full"}>
      <div
        id="progressBar"
        className={"h-full w-full bg-gradient-purple-40-blue-40-70deg"}
        style={{width: `${scrollWidth}%`}}
      ></div>
    </div>
  );
};
export default ProgressBarView;

