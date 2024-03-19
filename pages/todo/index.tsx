import Layout1 from '@components/layout/Layout1';
import TodoScheduleContainer from '@components/todo/TodoScheduleContainer';
import styled from '@emotion/styled';
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
  height: 100%;
  outline: solid ${(props) => props.theme.main.primary20} 0.1rem;
  outline-offset: -0.1rem;
  border-radius: 1rem;
`;
