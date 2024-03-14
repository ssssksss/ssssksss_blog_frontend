const TodoScheduleContainer = dynamic(
  () => import('@components/todo/TodoScheduleContainer'),
  {
    loading: () => <p>Loading...</p>,
  },
);

import Layout1 from '@components/layout/Layout1';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */

const Index = () => {
  const authStore = useSelector((state) => state.authStore);
  return (
    <Container>
      <Head>
        <title>TODO</title>
      </Head>
      {authStore.id ? <TodoScheduleContainer /> : '로그인이 필요합니다.'}
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  background: ${(props) => props.theme.colors.white80};
  border-radius: 10px;
  padding: 4px 2px;
`;
