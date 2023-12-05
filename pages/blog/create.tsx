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

const CreateBlogCSR = dynamic(
  () => import('@/components/blog/CreateUpdateBlogContainer'),
  {
    ssr: false,
    loading: () => <Spinner37 />,
  }
);

const CreateUpdate = () => {
  return (
    <Container>
      {typeof window !== 'undefined' && <CreateBlogCSR edit={false} />}
    </Container>
  );
};
export default CreateUpdate;
CreateUpdate.layout = Layout1;

const Container = styled.div`
  margin: auto;
`;
