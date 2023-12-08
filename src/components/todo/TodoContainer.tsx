import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Animations from '../common/animations/Animations';
import { css } from '@emotion/react';
import { Shell } from '@/components/common/shell/Shell';
import { Button } from '@/components/common/button/Button';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { DeleteIcon } from '/public/img/ui-icon/ic-delete.svg';
import { Input } from '@/components/common/input/Input';
import TodoItem from './TodoItem';
import CalendarItem from './CalendarItem';
import React, { useEffect } from 'react';
import ModalButton from '../common/button/ModalButton';
import TodoModal from './modal/todoModal';
import { TodoAPI } from '@/api/TodoAPI';
import { store } from '@/redux/store';
import { SET_TODO_LIST } from '@/redux/store/todo';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:19:47"
 * @description 설명
 */

interface ITodoContainerProps {
  active: number;
  onClick: () => void;
}

const TodoContainer = (props: ITodoContainerProps) => {
  const todoStore = useSelector((state: RootState) => state.todoStore);
  const authStore = useSelector((state: RootState) => state.authStore);

  useEffect(() => {
    TodoAPI.getTodoList().then(res => {
      store.dispatch(SET_TODO_LIST(res.jsonObject.todoList));
    });
  }, []);

  return (
    <Container active={props.active} onClick={props.onClick}>
      {props.active === 0 ? (
        <CC.RowCenterDiv h={'100%'}>
          <CC.ColumnStartCenterDiv h={'100%'}>
            <Title>
              <h3> TODO </h3>
              <ModalButton
                color={'primary80'}
                outline={true}
                modal={<TodoModal />}
                overlayVisible={true}
                modalW={'50%'}
                bg={'contrast'}
              >
                +
              </ModalButton>
            </Title>
            <TodoListContainer>
              {todoStore.todoList.map(i => (
                <li>
                  <TodoItem data={i} />
                </li>
              ))}
            </TodoListContainer>
          </CC.ColumnStartCenterDiv>
          <CC.ColumnStartCenterDiv overflow={true} h={'100%'}>
            <h3> 오늘의 일정 </h3>
            <CC.ColumnDiv gap={2} pd={'2px'} w={'100%'}>
              <CalendarItem />
              <CalendarItem />
              <CalendarItem />
            </CC.ColumnDiv>
          </CC.ColumnStartCenterDiv>
        </CC.RowCenterDiv>
      ) : (
        <FoldStateDiv> TODAY </FoldStateDiv>
      )}
    </Container>
  );
};
export default React.memo(TodoContainer);

const Container = styled.section<{
  active: number;
}>`
  --height: 44px;
  --width: 44px;
  font-size: 1rem;
  border-radius: 10px;
  outline: solid ${props => props.theme.colors.black60} 1px;
  gap: 4px;
  padding: 4px;

  & > div > div {
    outline: solid ${props => props.theme.main.primary20} 1px;
    border-radius: 10px;
    background: ${props => props.theme.main.contrast};
  }

  ${props =>
    props.active === 0
      ? css`
          background: ${props.theme.main.primary20};
          width: calc(100% - var(--width));
          height: calc(100% - var(--height));
          ${props.theme.flex.column};
        `
      : props.active === 1
      ? css`
          width: var(--width);
          height: calc(100% - var(--height));
          font-size: 2rem;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 0.1rem;
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `
      : css`
          font-size: 2rem;
          width: calc(50%);
          height: calc(var(--height));
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `};
`;

const Title = styled(CC.RowDiv)`
  /* position: relative; */
  height: 30px;
  width: 100%;
  padding: 2px 4px;
  align-items: center;

  h3 {
    padding: 4px 0px;
    width: 100%;
    ${props => props.theme.flex.row.center};
  }

  & > button {
    background: ${props => props.theme.main.primary20};
    /* position: absolute;
    right: 4px;
    top: 50%;
    transform: translate(0, -50%); */
    width: 24px;
  }
`;
const TodoListContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  height: 100%;
  overflow: scroll;
  gap: 4px;
  padding: 4px;
  border-radius: 10px;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const FoldStateDiv = styled.div`
  font-family: ${props => props.theme.fontFamily.typoHelloPOP};
`;
