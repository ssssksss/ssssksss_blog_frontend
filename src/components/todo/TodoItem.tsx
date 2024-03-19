import { TodoAPI } from '@api/TodoAPI';
import ModalButton from '@components/common/button/ModalButton';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import React, { useCallback, useReducer } from 'react';
import TodoModal from './modal/TodoModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoItem.tsx
 * @version 0.0.1 "2023-09-29 23:47:39"
 * @description 설명
 */

interface ITodoItemProps {
  content: string;
  id: number;
  isChecked: boolean;
  userId: number;
}

const TodoItem = (props: ITodoItemProps) => {
  const [isChecked, isCheckedToggle] = useReducer(
    (prev) => !prev,
    props.isChecked,
  );
  const toggleCheckTodoMutation = TodoAPI.toggleCheckTodo({
    onErrorHandler: () => {
      isCheckedToggle();
    },
  });
  const _IsCheckedToggleHandler = useCallback(() => {
    isCheckedToggle();
    toggleCheckTodoMutation({
      id: props.id,
    });
  }, []);

  return (
    <Container isChecked={isChecked}>
      <Input
        type="checkbox"
        outline={true}
        w={'2.4rem'}
        h={'2.4rem'}
        checked={isChecked}
        onClick={() => _IsCheckedToggleHandler()}
      />
      <Title
        isChecked={isChecked}
        modal={<TodoModal edit={true} data={props} />}
        modalOverlayVisible={true}
        modalW={'50%'}
        hover={false}
      >
        {props.content}
      </Title>
    </Container>
  );
};
export default React.memo(TodoItem);

const Container = styled(CC.RowDiv)<{ isChecked: boolean }>`
  background: ${(props) =>
    props.isChecked
      ? props.theme.colors.black20
      : props.theme.main.secondary20};
  padding: 0.4rem;
  border-radius: 0.4rem;
  gap: 1rem;

  &:focus,
  &:hover {
    background: ${(props) => props.theme.main.secondary40};
  }
`;

const Title = styled(ModalButton)<{ isChecked: boolean }>`
  width: calc(100% - 2.8rem);
  justify-content: flex-start;
  text-align: left;
  background: none;
  height: max-content;
  outline: none;
  /* white-space: nowrap; */
  word-break: break-all;
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  text-decoration: ${(props) => props.isChecked && 'line-through'};
  cursor: pointer;
`;
