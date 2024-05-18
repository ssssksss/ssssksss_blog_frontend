import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import AxiosInstance from '@utils/axios/AxiosInstance';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactElement } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */

// export async function getServerSideProps(context) {
//   const { data } = await AxiosInstance.get(`/api/blog?id=${context.params.id}`);
//   // ! next-redux-wrapper 공부해보기
//   return { props: data.json };
// }

export async function getStaticPaths() {
  const blogList = await AxiosInstance.get('/api/blog/list/all').then((res) => {
    return res.data.data.blogList;
  });

  const paths = blogList.map((i: unknown) => ({
    params: { id: i.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: unknown) {
  if (!isNaN(params.id)) {
    const res = await AxiosInstance.get(`/api/blog?id=${params.id}`);
    return { props: res.data.data, revalidate: 10 };
  }
  return { props: null, revalidate: 10 };
}

const ViewBlogCSR = dynamic(
  () => import('@components/blog/ViewBlog/ViewBlogContainer'),
  {
    ssr: false,
  },
);

const Index = (props: unknown) => {
  if (props == null) return <>  </>;
  return (
    <Container>
      <Head>
        <title>{props.title}</title>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
      </Head>
      <ViewBlogCSR {...props} /> 
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.gray20};
`;
