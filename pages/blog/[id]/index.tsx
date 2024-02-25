import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import AxiosInstance from '@utils/axios/AxiosInstance';
import dynamic from 'next/dynamic';
import Head from 'next/head';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */

export async function getServerSideProps(context) {
  const { data } = await AxiosInstance.get(`/api/blog?id=${context.params.id}`);
  // ! next-redux-wrapper 공부해보기
  return { props: data };
}

const ViewBlogCSR = dynamic(
  () => import('@components/blog/ViewBlogContainer'),
  {
    ssr: false,
  },
);

const Index = (props: any) => {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://blog.ssssksss.xyz/blog"></link>
        <title> {props.json.title} </title>
      </Head>
      {/* <ViewBlogContainer data={props.json} /> */}
      <Container>
        {typeof window !== 'undefined' && <ViewBlogCSR data={props.json} />}
      </Container>
    </>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  margin: auto;
  height: calc(100vh);
`;
