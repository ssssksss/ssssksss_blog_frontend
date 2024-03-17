import Layout1 from '@components/layout/Layout1';
import ScheduleContainer from '@components/schedule/ScheduleContainer';
import styled from '@emotion/styled';
import Head from 'next/head';
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
  const authStore = useSelector((state) => state.authStore);
  return (
    <Container>
      <Head>
        <title>일정 관리</title>
      </Head>
      {authStore.id ? <ScheduleContainer /> : '로그인이 필요합니다.'}
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
