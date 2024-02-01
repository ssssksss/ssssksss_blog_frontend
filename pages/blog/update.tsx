import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import dynamic from 'next/dynamic';
import CreateUpdateBlogContainer from '@/components/blog/CreateUpdateBlogContainer';
import { Spinner37 } from '@/components/spinner/Spinners';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file createUpdate.tsx
 * @version 0.0.1 "2023-10-14 00:37:24"
 * @description 설명
 */

const UpdateBlogCSR = dynamic(
  () => import('@/components/blog/CreateUpdateBlogContainer'),
  {
    ssr: false,
    loading: () => (
      <Container1>
        <Spinner37 />
      </Container1>
    ),
  }
);

const CreateUpdate = () => {
  return (
    <Container>
      {typeof window !== 'undefined' && <UpdateBlogCSR edit={true} />}
    </Container>
  );
};
export default CreateUpdate;
CreateUpdate.layout = Layout1;

const Container = styled.div`
  margin: auto;
`;
const Container1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;
