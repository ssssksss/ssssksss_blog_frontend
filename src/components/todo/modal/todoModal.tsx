import { CC } from '@/styles/commonComponentStyle';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Button from '@/components/common/button/Button';
import { Shell } from '@/components/common/shell/Shell';
import { Input } from '@/components/common/input/Input';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import ModalButton from '@/components/common/button/ModalButton';
import { useEffect, useRef } from 'react';
import { UserSignupYup } from '@/components/yup/UserSignupYup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import AxiosInstance from '@/utils/axios/AxiosInstance';
import { TodoAPI } from '@/api/TodoAPI';
import { useSelector } from 'react-redux';
import { RootState } from '@react-three/fiber';
import { store } from '@/redux/store';
import { SET_TODO_LIST } from '@/redux/store/todo';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file todoModal.tsx
 * @version 0.0.1 "2023-12-07 15:13:32"
 * @description 설명
 */

interface ITodoModalProps {
  edit?: boolean;
  data?: {
    id: number;
    content: string;
    isChecked: boolean;
  };
}

const TodoModal = (props: ITodoModalProps) => {
  const inputRef = useRef<null>();
  const todoStore = useSelector((state: RootState) => state.todoStore);

  const addTodoHandler = () => {
    if (inputRef.current.value === '') return;
    TodoAPI.addTodo({
      content: inputRef.current.value,
    }).then((res: any) => {
      store.dispatch(
        SET_TODO_LIST([...todoStore.todoList, res.jsonObject.todo])
      );
      props.closeModal();
    });
  };

  const updateTodoHandler = () => {
    if (inputRef.current.value === '') return;
    if (inputRef.current.value === props.data.content) return;
    TodoAPI.updateTodo({
      id: props.data.id,
      content: inputRef.current.value,
    }).then((res: any) => {
      let temp = todoStore.todoList.map(i => {
        if (i.id == props.data.id) {
          i.content = inputRef.current.value;
        }
        return i;
      });
      store.dispatch(SET_TODO_LIST(temp));
      props.closeModal();
    });
  };

  const removeTodoHandler = () => {
    TodoAPI.removeTodo({
      id: props.data.id,
    }).then((res: any) => {
      let temp = todoStore.todoList.filter(i => i.id != props.data.id);
      store.dispatch(SET_TODO_LIST(temp));
      props.closeModal();
    });
  };

  return (
    <Container>
      <Shell outline={true} w={'100%'} gap={8} pd={'8px 4px'}>
        <CC.RowStartDiv w={'100%'}> 할일 내용 </CC.RowStartDiv>
        <Input
          placeholder={'내용을 작성해주세요'}
          ref={inputRef}
          defaultValue={props.data?.content}
          pd={'12px'}
        />
      </Shell>
      {props.edit ? (
        <CC.RowDiv gap={4}>
          <Button w={'100%'} h={'30px'} onClick={() => updateTodoHandler()}>
            수정
          </Button>
          <Button w={'100%'} h={'30px'} onClick={() => removeTodoHandler()}>
            삭제
          </Button>
        </CC.RowDiv>
      ) : (
        <Button w={'100%'} h={'30px'} onClick={() => addTodoHandler()}>
          추가
        </Button>
      )}
    </Container>
  );
};
export default TodoModal;

const Container = styled(CC.ColumnDiv)`
  padding: 40px 10px 10px 10px;
  gap: 28px;
  color: ${props => props.theme.colors.white80};
  overflow: scroll;
  background: ${props => props.theme.main.primary40};
`;
