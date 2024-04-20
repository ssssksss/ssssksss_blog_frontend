import BlogCategoryContainer from '@components/blog/BlogCategory/BlogCategoryContainer';
import BlogHeadContainer from '@components/blog/BlogHeadContainer';
import BlogMainContainer from '@components/blog/BlogMainContainer';
import Layout1 from '@components/layout/Layout1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import UrlQueryStringToObject from '@utils/function/UrlQueryStringToObject';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { propsType } from 'src/@types/blog';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 블로그 홈 페이지
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

const Index = (props: propsType) => {
  const router = useRouter();
  useEffect(() => {
    // 서버에서 블로그 카테고리 목록을 받아와서 활성화된 카테고리와 카테고리 목록을 redux에 저장하는 과정
    try {
      const urlQueryObject = UrlQueryStringToObject(window.location.href);
      let firstCategoryIdTemp;
      if (
        urlQueryObject?.[`first-category`] ||
        props.firstCategoryList != undefined
      ) {
        firstCategoryIdTemp =
          urlQueryObject?.[`first-category`] ||
          Object.keys(props.firstCategoryList)[0];
      }
      let secondCategoryIdTemp = urlQueryObject?.[`second-category`];
      if (firstCategoryIdTemp != undefined) {
        // 1. url에 카테고리2 id 값이 있는지 여부
        // 2. 없다면 카테고리2 리스트가 존재하는지 여부
        if(
          secondCategoryIdTemp == undefined &&
          JSON.stringify(props.secondCategoryList) != '{}' &&
          props.secondCategoryList != undefined
        ) {
          secondCategoryIdTemp = Object.keys(
            props.secondCategoryList[firstCategoryIdTemp],
          )[0];
        }
      }
      store.dispatch(
        rootActions.blogStore.setActiveFirstCategory(
          Number(firstCategoryIdTemp),
        ),
      );
      store.dispatch(
        rootActions.blogStore.setFirstCategoryList(
          props.firstCategoryList,
        ),
      );
      store.dispatch(
        rootActions.blogStore.setSecondCategoryList(
          props.secondCategoryList,
        ),
      );
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategory(
          Number(secondCategoryIdTemp),
        ),
      );
      const temp =
        window.document.location.origin +
        window.document.location.pathname +
        '?first-category=' +
        firstCategoryIdTemp +
        '&second-category=' +
        secondCategoryIdTemp;
      router.replace(temp, '', { shallow: true });
    } catch {
      // router.push('/404');
    }
  }, []);

  return (
    <CC.ColLeftStartBox w={'100%'} gap={8}>
      <Head>
        <title>블로그</title>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
      </Head>
      <BlogHeadContainer />
      <BlogCategoryContainer />
      <BlogMainContainer />
    </CC.ColLeftStartBox>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};
