import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { ReactElement } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-10-10 02:35:13"
 * @description 설명
 */

const ViewBoardCSR = dynamic(
  () => import('@components/board/ViewBoardContainer'),
  {
    ssr: false,
  }
);

const Index = () => {
  return (
    <>
      <Container>{typeof window != 'undefined' && <ViewBoardCSR />}</Container>
    </>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};

const Container = styled.div`
  margin: auto;
`;
