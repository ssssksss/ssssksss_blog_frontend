import { useEffect } from "react";

// 블로그에서 해시값에 따라서 이동되게 하는 훅

export function useScrollToHash() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const targetId = decodeURIComponent(window.location.hash.substring(1));
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({behavior: "smooth"});
      }
    }
  }, []);
}
