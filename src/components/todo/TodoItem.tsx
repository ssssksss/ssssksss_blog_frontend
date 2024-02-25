import { TodoAPI } from '@api/TodoAPI';
import ModalButton from '@components/common/button/ModalButton';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import { SET_TODO_LIST } from '@redux/store/todo';
import { CC } from '@styles/commonComponentStyle';
import { useSelector } from 'react-redux';
import TodoModal from './modal/TodoModal';
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
    }).then((_) => {
      let temp = todoStore.todoList.map((i) => {
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
      <Input
        type="checkbox"
        outline={true}
        w={'24px'}
        h={'24px'}
        checked={props?.data.isChecked}
        onClick={() => _IsCheckedToggleHandler()}
      />
      <Title
        isChecked={props?.data?.isChecked}
        modal={<TodoModal edit={true} data={props?.data} />}
        modalOverlayVisible={true}
        modalW={'50%'}
        hover={false}
      >
        {props?.data.content}
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
