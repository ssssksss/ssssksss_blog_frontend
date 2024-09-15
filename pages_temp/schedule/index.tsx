import Layout1 from '@components/layout/Layout1';
import ScheduleContainer from '@components/schedule/ScheduleContainer';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import Head from 'next/head';
import { ReactElement } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2024-02-05 13:59:41"
 * @description 설명
 */
const Index = () => {
  const authStore = useSelector((state: RootState) => state.authStore);
  return (
    <Container>
      <Head>
        <title>일정 관리</title>
      </Head>
      {authStore.id ? (
        <ScheduleContainer />
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
