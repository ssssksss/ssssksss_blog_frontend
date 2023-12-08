import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import { Input } from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { useState } from 'react';
import ModalButton from '@/components/common/button/ModalButton';
import { inflate } from 'zlib';
import TodoModal from './modal/todoModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { TodoAPI } from '@/api/TodoAPI';
import { store } from '@/redux/store';
import { SET_TODO_LIST } from '@/redux/store/todo';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoItem.tsx
 * @version 0.0.1 "2023-09-29 23:47:39"
 * @description 설명
 */

interface ITodoItemProps {
  data: {
    id: number;
    content: string;
    isChecked: boolean;
  };
}

const TodoItem = (props: ITodoItemProps) => {
  const todoStore = useSelector((state: RootState) => state.todoStore);

  const _IsCheckedToggleHandler = () => {
    TodoAPI.toggleCheckTodo({
      id: props.data.id,
    }).then((res: any) => {
      let temp = todoStore.todoList.map(i => {
        if (i.id == props.data.id) {
          i.isChecked = !props.data.isChecked;
        }
        return i;
      });
      store.dispatch(SET_TODO_LIST(temp));
    });
  };

  return (
    <Container isChecked={props?.data.isChecked}>
      <Title
        isChecked={props?.data?.isChecked}
        modal={<TodoModal edit={true} data={props?.data} />}
        overlayVisible={true}
        modalW={'50%'}
      >
        {props?.data.content}
      </Title>
      <Input
        type="checkbox"
        outline={true}
        color={'red100'}
        w={'28px'}
        h={'28px'}
        checked={props?.data.isChecked}
        onClick={() => _IsCheckedToggleHandler()}
      />
    </Container>
  );
};
export default TodoItem;

const Container = styled(CC.RowDiv)<{ isChecked: boolean }>`
  background: ${props =>
    props.isChecked
      ? props.theme.colors.black20
      : props.theme.main.secondary20};
  padding: 8px 4px;
  border-radius: 4px;
  font-size: 0.8rem;
  gap: 8px;
`;

const Title = styled(ModalButton)<{ isChecked: boolean }>`
  width: calc(100% - 28px);
  justify-content: flex-start;
  text-align: left;
  background: none;
  height: max-content;
  /* white-space: nowrap; */
  word-break: break-all;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  text-decoration: ${props => props.isChecked && 'line-through'};
  cursor: pointer;

  &:focus,
  &:hover {
    outline: solid ${props => `${props.theme.main.primary80}2f`} 5px;
  }
`;
