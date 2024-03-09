import { TodoAPI } from '@api/TodoAPI';
import ModalButton from '@components/common/button/ModalButton';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useReducer } from 'react';
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

  const _IsCheckedToggleHandler = () => {
    isCheckedToggle();
    TodoAPI.toggleCheckTodo({
      id: props.id,
    }).error((_) => {
      isCheckedToggle();
    });
  };

  return (
    <Container isChecked={isChecked}>
      <Input
        type="checkbox"
        outline={true}
        w={'24px'}
        h={'24px'}
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
export default TodoItem;

const Container = styled(CC.RowDiv)<{ isChecked: boolean }>`
  background: ${(props) =>
    props.isChecked
      ? props.theme.colors.black20
      : props.theme.main.secondary20};
  padding: 4px;
  border-radius: 4px;
  gap: 10px;

  &:focus,
  &:hover {
    background: ${(props) => props.theme.main.secondary40};
  }
`;

const Title = styled(ModalButton)<{ isChecked: boolean }>`
  width: calc(100% - 28px);
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
