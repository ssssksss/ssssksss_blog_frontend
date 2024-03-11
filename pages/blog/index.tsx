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
    data = res.data.json;
  }
  return { props: data };
}

type propsType = {
  firstCategoryList: {
    String: String;
  };
  secondCategoryList?: {
    firstCategoryId?: {
      secondCategoryId?: {
        name?: String;
        thumbnailImageUrl: String;
      };
    };
  };
};
const Index = (props: propsType) => {
  useEffect(() => {
    let urlQueryObject = UrlQueryStringToObject(window.location.href);
    // ! COMM :  url에 첫번째 카테고리 값이 있으면 그걸로 없으면 첫번째 카테고리
    let firstCategoryIdTemp =
      urlQueryObject?.[`first-category`] ||
      Object.keys(props.firstCategoryList)[0];
    store.dispatch(
      rootActions.blogStore1.setActiveFirstCategory(firstCategoryIdTemp),
    );
    store.dispatch(
      rootActions.blogStore1.setFirstCategoryList(props.firstCategoryList),
    );
    store.dispatch(
      rootActions.blogStore1.setSecondCategoryList(props.secondCategoryList),
    );
    // ! COMM : 두번째 카테고리도 마찬가지로 작업
    let secondCategoryIdTemp = urlQueryObject?.[`second-category`];
    store.dispatch(
      rootActions.blogStore1.setActiveSecondCategory(
        secondCategoryIdTemp
          ? secondCategoryIdTemp
          : Object.keys(props.secondCategoryList[firstCategoryIdTemp])[0],
      ),
    );
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
  border-radius: 8px;
  ${(props) => props.theme.scroll.hidden};
  height: 100%;
  padding: 2px;

  & > * {
    outline: solid ${(props) => props.theme.main.primary80} 2px;
    border-radius: inherit;
  }
`;
