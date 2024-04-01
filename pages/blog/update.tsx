import Layout1 from '@components/layout/Layout1';
import { Spinner37 } from '@components/loadingSpinner/Spinners';
import styled from '@emotion/styled';
import AxiosInstance from '@utils/axios/AxiosInstance';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file createUpdate.tsx
 * @version 0.0.1 "2023-10-14 00:37:24"
 * @description 설명
 */

const UpdateBlogCSR = dynamic(
  () => import('@components/blog/CreateUpdateBlog/CreateUpdateBlogContainer'),
  {
    ssr: false,
    loading: () => (
      <Container1>
        <Spinner37 />
      </Container1>
    ),
  },
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof context?.query.id == 'string' || typeof context?.query.id == 'number') {
    const { data } = await AxiosInstance.get(
      `/api/blog?id=${context.query.id}`,
    );
    // ! next-redux-wrapper 공부해보기
    return { props: data?.json };
  }
  return {
    props: undefined,
  };
};

const Index = (props: unknown) => {
  return (
    <Container>
      <UpdateBlogCSR edit={true} {...props} />
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  margin: auto;
  height: calc(100vh - 4.4rem);
`;

const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
