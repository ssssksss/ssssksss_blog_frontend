import Layout1 from '@components/layout/Layout1';
import { Spinner37 } from '@components/loadingSpinner/Spinners';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file createUpdate.tsx
 * @version 0.0.1 "2023-10-14 00:37:24"
 * @description 설명
 */

const CreateBlogCSR = dynamic(
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

const Index = () => {
  return (
    <Container>
      <CreateBlogCSR edit={false} />
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
