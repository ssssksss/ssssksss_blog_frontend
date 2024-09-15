import BlogCategoryContainer from '@components/blog/BlogCategory/BlogCategoryContainer';
import BlogHeadContainer from '@components/blog/BlogHeadContainer';
import BlogMainContainer from '@components/blog/BlogMainContainer';
import Layout1 from '@components/layout/Layout1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import Head from 'next/head';
import { ReactElement, useEffect } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 블로그 홈 페이지
 */

const Index = () => {


  useEffect(() => {
    return () => {
      store.dispatch(rootActions.blogStore.setInit());
    }
  },[])

  return (
    <div className={"w-full flex flex-col gap-[.5rem]"}>
    <Head>
        <title>블로그</title>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
      </Head>
      <BlogHeadContainer />
      <BlogCategoryContainer />
      <BlogMainContainer />
    </div>  
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};
