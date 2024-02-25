const BlogMainContainer = dynamic(
  () => import('@components/blog/BlogMainContainer'),
);

import BlogCategoryContainer from '@components/blog/BlogCategory/BlogCategoryContainer';
import BlogHeadContainer from '@components/blog/BlogHeadContainer';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { batch } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
export async function getServerSideProps() {
  const res = await AxiosInstance.get('/api/blog-category-list');
  let data = {};
  // ! next-redux-wrapper 공부해보기
  if (res) {
    data = res.data;
  }
  return { props: data };
}

const Index = (props: any) => {
  useEffect(() => {
    store.dispatch(
      rootActions.blogStore.SET_BLOG_CATEGORY_LIST(
        props.json?.blogFirstCategoryList,
      ),
    );
    let urlQueryObject = UrlQueryStringToObject(window.location.href);
    let _activeFirstCategoryName = props.json?.blogFirstCategoryList.filter(
      (i) => i.id == urlQueryObject?.[`first-category`],
    )[0]?.name;
    batch(() => {
      store.dispatch(
        rootActions.blogStore.SET_ACTIVE_BLOG_FIRST_CATEGORY({
          activeBlogFirstCategoryId:
            urlQueryObject?.[`first-category`] ||
            props.json?.blogFirstCategoryList[0].id,
          activeBlogFirstCategoryName:
            _activeFirstCategoryName ||
            props.json?.blogFirstCategoryList[0].name,
        }),
      );
      store.dispatch(
        rootActions.blogStore.SET_ACTIVE_BLOG_SECOND_CATEGORY({
          activeBlogSecondCategoryId:
            urlQueryObject?.[`second-category`] ||
            props.json?.blogFirstCategoryList[0].secondCategoryList[0].id,
          activeBlogSecondCategoryName:
            props.json?.blogFirstCategoryList[0].secondCategoryList[0].name,
        }),
      );
      store.dispatch(
        rootActions.blogStore.SET_ACTIVE_BLOG_USER_ID(props.json?.userId),
      );
    });
  }, []);

  return (
    <Container>
      <Head>
        <title> 블로그 </title>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
      </Head>
      <BlogHeadContainer />
      <BlogCategoryContainer />
      <BlogMainContainer />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled(CC.ColumnDiv)`
  gap: 8px;
  width: 100%;
  background: ${(props) => props.theme.main.contrast};
  border-radius: 8px;
  ${(props) => props.theme.scroll.hidden};
  min-height: calc(100vh - 48px);

  & > * {
    outline: solid ${(props) => props.theme.main.primary80} 2px;
  }
`;
