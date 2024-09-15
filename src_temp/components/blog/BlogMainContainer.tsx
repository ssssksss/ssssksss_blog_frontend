import { store } from '@redux/store';
import { CC } from '@styles/commonComponentStyle';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BlogFixedMenuContainer from './BlogFixedMenuContainer';
import BlogListContainer from './BlogListContainer';
import BlogOrderFilterContainer from './BlogOrderFilterContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file BlogMainContainer.tsx
 * @version 0.0.1 "2023-09-25 03:17:13"
 * @description menuList=[{name. func}]
 */
const BlogMainContainer = () => {

  const router = useRouter();

  useEffect(() => {
    const keyDownEventFunc = (e: KeyboardEvent) => {
      // shift + Space를 누르게 되면 글 작성하는 화면으로 이동
      if (
        e.code  === "Space" &&
        e.shiftKey &&
        store.getState().blogStore.activeBlogUserId ==
          store.getState().authStore.id
      ) {
        router.push('/blog/create');
      }
    };

    window.addEventListener('keydown', keyDownEventFunc);

    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <CC.ColLeftStartBox w={'100%'} gap={8}>
      <BlogOrderFilterContainer />
      <BlogListContainer />
      <BlogFixedMenuContainer />
    </CC.ColLeftStartBox>
  );
};
export default React.memo(BlogMainContainer);



