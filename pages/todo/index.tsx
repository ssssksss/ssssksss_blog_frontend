import styled from '@emotion/styled';
import Layout1 from '@/components/layout/Layout1';
import TodoContainer from '@/components/todo/TodoContainer';
import WeekTodoContainer from './../../src/components/todo/WeekTodoContainer';
import MemoTodoContainer from '@/components/todo/MemoTodoContainer';
import AllTodoContainer from '@/components/todo/AllTodoContainer';
import Button from '@/components/common/button/Button';
import { useState } from 'react';
import { CC } from '@/styles/commonComponentStyle';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file index.tsx
 * @version 0.0.1 "2023-09-25 00:05:43"
 * @description 설명
 */
const Index = () => {
  const [activeTodoMenu, setActiveTodoMenu] = useState(0); // 0~3으로 표현

  return (
    <Container activeTodoMenu>
      <TodoContainer
        active={activeTodoMenu}
        onClick={() => setActiveTodoMenu(0)}
      />
      <WeekTodoContainer
        active={activeTodoMenu}
        onClick={() => setActiveTodoMenu(1)}
      />
      <MemoTodoContainer
        active={activeTodoMenu}
        onClick={() => setActiveTodoMenu(2)}
      />
      <AllTodoContainer
        active={activeTodoMenu}
        onClick={() => setActiveTodoMenu(3)}
      />
    </Container>
  );
};
export default Index;
Index.layout = Layout1;

const Container = styled.div<{ activeTodoMenu: string }>`
  width: calc(100%);
  height: calc(100vh - 68px);
  overflow: scroll;
  display: flex;
  flex-flow: wrap row;
  padding: 2px;
  & > section {
    transition: all ease 0.6s 0s;
  }
`;
