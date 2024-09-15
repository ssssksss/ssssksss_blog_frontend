
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file usePreventBodyScroll.ts
 * @version 0.0.1 "2024-04-20 05:38:15"
 * @description 모달창을 열었을 때 바디 스크롤을 막으려고 만든 hook
 * @example usePreventBodyScroll(isOpenModal);
 */
const usePreventBodyScroll = (dependency: boolean) => {
    useEffect(() => {
      if (!dependency) return; 
      const body = document.getElementsByTagName('body')[0];
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = 'auto';
      };
    }, [dependency]);
};
export default usePreventBodyScroll



import { useEffect } from 'react';

