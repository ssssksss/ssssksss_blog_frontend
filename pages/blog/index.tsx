import BlogCategoryContainer from '@components/blog/BlogCategory/BlogCategoryContainer';
import BlogHeadContainer from '@components/blog/BlogHeadContainer';
import BlogMainContainer from '@components/blog/BlogMainContainer';
import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
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

  if (Object.keys(data).length === 0) {
    return {
      redirect: {
        source: '/blog',
        destination: '/500',
        permanent: false,
      },
    };
  }
  return { props: data };
}

type propsType = {
  firstCategoryList: {
    String: string;
  };
  secondCategoryList?: {
    [firstCategoryId: string | number]: {
      secondCategoryId?: {
        name?: string;
        thumbnailImageUrl: string;
      };
    };
  };
};
const Index = (props: propsType) => {
  const router = useRouter();
  useEffect(() => {
    const urlQueryObject = UrlQueryStringToObject(window.location.href);
    // ! COMM :  url에 첫번째 카테고리 값이 있으면 그걸로 없으면 첫번째 카테고리
    const firstCategoryIdTemp =
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
    let secondCategoryIdTemp = urlQueryObject?.[`second-category`] || null;
    if (props.secondCategoryList) {
      secondCategoryIdTemp = Object.keys(
        props.secondCategoryList[firstCategoryIdTemp],
      )[0];
    }
    store.dispatch(
      rootActions.blogStore1.setActiveSecondCategory(secondCategoryIdTemp),
    );
    const temp =
      window.document.location.origin +
      window.document.location.pathname +
      '?first-category=' +
      firstCategoryIdTemp +
      '&second-category=' +
      secondCategoryIdTemp;
    router.replace(temp, '', { shallow: true });
  }, []);
  return (
    <Container>
      <Head>
        <title>블로그</title>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
      </Head>
      <BlogHeadContainer />
      <BlogCategoryContainer />
      <BlogMainContainer />
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div``;
