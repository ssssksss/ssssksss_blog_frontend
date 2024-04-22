const MemoContainer = dynamic(() => import('@components/todo/MemoContainer'), {
  loading: () => <p>Loading...</p>,
});

import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2024-03-05 12:53:03"
 * @description 설명
 */
const Index = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return (
    <Container>
      <Head>
        <title>MEMO</title>
      </Head>
      {authStore.id ? (
        <MemoContainer />
      ) : (
        <CC.RowCenterCenterBox w={'100%'} h={'100%'}>
          로그인이 필요합니다.
        </CC.RowCenterCenterBox>
      )}
    </Container>
  );
};
export default Index;
Index.getLayout = function getLayout(page: ReactElement) {
  return <Layout1>{page}</Layout1>;
};
const Container = styled.div`
  width: 100%;
  height: calc(100vh - 4.5rem);
`;
