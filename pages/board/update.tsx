import Layout1 from '@components/layout/Layout1';
import { Spinner37 } from '@components/spinner/Spinners';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file createUpdate.tsx
 * @version 0.0.1 "2023-10-14 00:37:24"
 * @description 설명
 */

const UpdateBoardCSR = dynamic(
  () => import('@components/board/CreateUpdateBoardContainer'),
  {
    ssr: false,
    loading: () => <Spinner37 />,
  }
);

const CreateUpdate = () => {
  return (
    <Container>
      {typeof window !== 'undefined' && <UpdateBoardCSR edit={true} />}
    </Container>
  );
};
export default CreateUpdate;
CreateUpdate.layout = Layout1;

const Container = styled.div`
  margin: auto;
`;
