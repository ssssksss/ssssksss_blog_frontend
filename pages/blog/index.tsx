import BlogCategoryContainer from '@components/blog/BlogCategory/BlogCategoryContainer';
import BlogHeadContainer from '@components/blog/BlogHeadContainer';
import BlogMainContainer from '@components/blog/BlogMainContainer';
import Layout1 from '@components/layout/Layout1';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { CC } from '@styles/commonComponentStyle';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useLayoutEffect } from 'react';
import { propsType } from 'src/@types/blog';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 블로그 홈 페이지
 */
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const firstCategoryId = context.query?.firstCategoryId;
  const secondCategoryId = context.query?.secondCategoryId;
  const res = await AxiosInstance.get(
    `/api/blog/category/list?firstCategoryId=${firstCategoryId}&secondCategoryId=${secondCategoryId}`,
  );
  let data = {};
  // ! next-redux-wrapper 공부해보기
  if (res?.data.data != null) {
    data = res?.data?.data;
  }

  // if (Object.keys(data).length === 0) {
  //   return {
  //     redirect: {
  //       source: '/blog',
  //       destination: '/500',
  //       permanent: false,
  //     },
  //   };
  // }
  return { props: data };
}

const Index = (props: propsType) => {
  const router = useRouter();
  useLayoutEffect(() => {
    store.dispatch(rootActions.blogStore.setBlogCategoryAndBlogList(props.blogFirstCategoryList));
    const firstCategoryId = router.query.firstCategoryId ?? props.blogFirstCategoryList[0]?.id;
    let secondCategoryId = Number(router.query.secondCategoryId); 
    store.dispatch(rootActions.blogStore.setActiveFirstCategory(firstCategoryId));

    if (router.query.firstCategoryId && router.query.secondCategoryId) {
      secondCategoryId = props.blogFirstCategoryList
        .filter((i) => i.id == firstCategoryId)[0]
        ?.blogSecondCategoryList.filter(
          (j) => (j.id == router.query.secondCategoryId)
        )[0].id;
    } else if (router.query.firstCategoryId) {
      secondCategoryId = props.blogFirstCategoryList.filter(
        (i) => i.id == firstCategoryId,
      )[0]?.blogSecondCategoryList[0].id;
    } else {
      secondCategoryId =
        props.blogFirstCategoryList[0]?.blogSecondCategoryList[0].id;
    }
      store.dispatch(
        rootActions.blogStore.setActiveSecondCategory(
          secondCategoryId,
        ),
    );
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
