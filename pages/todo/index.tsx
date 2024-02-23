import Button from '@components/common/button/Button';
import Layout1 from '@components/layout/Layout1';
import TodoScheduleContainer from '@components/todo/TodoScheduleContainer';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */

const MemoContainer = dynamic(() => import('@components/todo/MemoContainer'), {
  loading: () => <p>Loading...</p>,
});

const ScheduleContainer = dynamic(
  () => import('@components/schedule/ScheduleContainer'),
  {
    loading: () => <p>Loading...</p>,
  }
);

const Index = () => {
  const [menu, setMenu] = useState(0);
  return (
    <Container>
      <Head>
        <title> TODO & MEMO </title>
      </Head>
      <NavContainer>
        <Button onClick={() => setMenu(0)} active={menu === 0}>
          TODAY
        </Button>
        {/* <Button onClick={() => setMenu(1)} active={menu === 1}>
          WEEK
        </Button> */}
        <Button onClick={() => setMenu(2)} active={menu === 2}>
          MEMO
        </Button>
      </NavContainer>
      <MainContainer>
        {menu === 0 && <TodoScheduleContainer />}
        {menu === 2 && <MemoContainer />}
      </MainContainer>
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled(CC.ColumnDiv)`
  width: 100%;
  height: calc(100vh - 48px);
  display: flex;
  flex-flow: wrap row;
  background: ${props => props.theme.colors.white80};
  border-radius: 10px;
  padding: 4px 2px;
`;

const NavContainer = styled(CC.RowDiv)`
  width: 100%;
  height: 48px;
  padding-bottom: 2px;

  & > button {
    width: 100%;
    height: 100%;
    font-family: ${props => props.theme.fontFamily.typoHelloPOP};
    outline: solid black 1px;
    border-radius: 4px;
    font-size: 1.2rem;
  }
`;

const MainContainer = styled.div`
  width: 100%;
  height: calc(100vh - 104px);
  ${props => props.theme.scroll.hidden};
  & > * {
    padding: 1px;
  }
`;
