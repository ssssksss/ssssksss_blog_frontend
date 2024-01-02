import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import TodoContainer from '@/components/todo/TodoContainer';
import WeekTodoContainer from './../../src/components/todo/WeekTodoContainer';
import MemoContainer from '@/components/todo/MemoContainer';
import AllTodoContainer from '@/components/schedule/CalendarContainer';
import Button from '@/components/common/button/Button';
import { useState } from 'react';
import { CC } from '@/styles/commonComponentStyle';
import CalendarContainer from '@/components/schedule/CalendarContainer';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  const [menu, setMenu] = useState(0);
  return (
    <Container>
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
        <Button onClick={() => setMenu(3)} active={menu === 3}>
          달력
        </Button>
      </NavContainer>
      <MainContainer>
        {menu === 0 && <TodoContainer />}
        {menu === 2 && <MemoContainer />}
        {menu === 3 && <CalendarContainer />}
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
  & > div {
    padding: 1px;
  }
`;
