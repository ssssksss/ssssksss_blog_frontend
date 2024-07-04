import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import { IBlogProps } from 'src/@types/blog/blog-props';

/**
 * @description 블로그 조회 패이지
 */

export const getStaticPaths = async () => {
  const blogList = await AxiosInstance.get('/api/blog/list/all').then(
    (res) => res.data.data.blogList,
  );

  const paths = blogList.map((i: { id: number }) => ({
    params: { id: i.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};


export const getStaticProps = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = params.id;

  if (!isNaN(Number(id))) {
    const res = await AxiosInstance.get(`/api/blog?id=${id}`);
    return { props: res.data.data, revalidate: 86400 };
  }
  return { props: null, revalidate: 0 };
};

// Custom type for pages that include the getLayout property
type NextPageWithLayout<P = IBlogProps, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const ViewBlogCSR = dynamic(
  () => import('@components/blog/ViewBlog/ViewBlogContainer'),
  {
    ssr: false,
  },
);

const Index: NextPageWithLayout<IBlogProps | null> = (props) => {
  if (!props) return <>잘못된 접근입니다.</>;
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

Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

export default Index;

const Container = styled.div`
  width: 100%;
  background: ${(props) => props.theme.colors.gray20};
`;
