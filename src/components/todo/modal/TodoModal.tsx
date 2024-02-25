import { TodoAPI } from '@api/TodoAPI';
import Button from '@components/common/button/Button';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { RootState } from '@redux/store/reducers';
import { SET_TODO_LIST } from '@redux/store/todo';
import { CC } from '@styles/commonComponentStyle';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const [inputValue, setInputValue] = useState('');

  const addTodoHandler = () => {
    if (inputRef.current.value === '') return;
    TodoAPI.addTodo({
      content: inputRef.current.value,
    }).then((res: any) => {
      store.dispatch(SET_TODO_LIST([...todoStore.todoList, res.json.todo]));
      props.closeModal();
    });
  };

  const updateTodoHandler = () => {
    if (inputRef.current.value === '') return;
    if (inputRef.current.value === props.data.content) return;
    TodoAPI.updateTodo({
      id: props.data.id,
      content: inputRef.current.value,
    }).then((_) => {
      let temp = todoStore.todoList.map((i) => {
        if (i.id == props.data.id) {
          i.content = inputRef.current.value;
        }
        return i;
      });
      store.dispatch(SET_TODO_LIST(temp));
      props.closeModal();
    });
  };

  const deleteTodoHandler = () => {
    TodoAPI.deleteTodo({
      id: props.data.id,
    }).then((_) => {
      let temp = todoStore.todoList.filter((i) => i.id != props.data.id);
      store.dispatch(SET_TODO_LIST(temp));
      props.closeModal();
    });
  };

  useEffect(() => {
    setInputValue(props.data?.content);
    let keyDownEventFunc = (e: Event) => {
      if (e.key == 'Enter') {
        props.edit ? updateTodoHandler() : addTodoHandler();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);
    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <Container>
      <CC.ColumnStartDiv h={'100%'} gap={10}>
        <CC.RowStartDiv w={'100%'} font>
          할일
        </CC.RowStartDiv>
        <Input
          placeholder={'일정을 작성해주세요'}
          ref={inputRef}
          defaultValue={props.data?.content}
          outline={true}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </CC.ColumnStartDiv>
      {props.edit ? (
        <CC.RowDiv gap={8}>
          <Button
            w={'100%'}
            onClick={() => updateTodoHandler()}
            disabled={props.data.content == inputValue}
            bg={'contrast'}
          >
            일정 수정
          </Button>
          <Button w={'100%'} onClick={() => deleteTodoHandler()} bg={'red60'}>
            일정 삭제
          </Button>
        </CC.RowDiv>
      ) : (
        <Button
          w={'100%'}
          onClick={() => addTodoHandler()}
          disabled={!inputValue}
          bg={'contrast'}
        >
          일정 추가
        </Button>
      )}
    </Container>
  );
};
export default TodoModal;

const Container = styled(CC.ColumnBetweenDiv)`
  gap: 28px;
  padding: 10px;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  background: ${(props) => props.theme.main.primary40};
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: ${(props) => props.theme.fontSize.xl};
  min-height: 260px;
`;
