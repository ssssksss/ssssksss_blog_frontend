import { TodoAPI } from '@api/TodoAPI';
import Button from '@components/common/button/Button';
import { ConfirmButton } from '@components/common/button/ConfirmButton';
import Input from '@components/common/input/Input';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { useEffect, useRef, useState } from 'react';
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
  closeModal?: () => void;
}

const TodoModal = (props: ITodoModalProps) => {
  const inputRef = useRef<null>();
  const [inputTodoContent, setInputTodoContent] = useState('');
  const addTodoMutation = TodoAPI.addTodo({
    onSuccessHandler: () => {
      props.closeModal();
    },
  });
  const updateTodoMutation = TodoAPI.updateTodo({
    onSuccessHandler: () => {
      props.closeModal();
    },
  });
  const deleteTodoMutation = TodoAPI.deleteTodo({
    onSuccessHandler: () => {
      props.closeModal();
    },
  });

  const todoHandler = () => {
    if (props.edit) {
      updateTodoMutation({ id: props.data.id, content: inputTodoContent });
    }
    if (!props.edit) {
      addTodoMutation({ content: inputTodoContent });
    }
  };

  const deleteTodoHandler = () => {
    deleteTodoMutation({ id: props.data.id });
  };

  useEffect(() => {
    setInputTodoContent(props.data?.content);
    const keyDownEventFunc = (e: KeyboardEvent) => {
      if (e.key == 'Enter') {
        todoHandler();
      }
    };
    window.addEventListener('keydown', keyDownEventFunc);
    return () => {
      window.removeEventListener('keydown', keyDownEventFunc);
    };
  }, []);

  return (
    <Container onClick={(e: React.MouseEvent) => e.stopPropagation()}>
      <CC.ColumnStartDiv w={'100%'} h={'100%'} gap={8}>
        <CC.RowStartDiv w={'100%'}>
          할일
        </CC.RowStartDiv>
        <Input
          placeholder={'일정을 작성해주세요'}
          ref={inputRef}
          defaultValue={props.data?.content}
          outline={1}
          pd={"0.5rem"}
          onChange={(e) => setInputTodoContent(e.target.value)}
        />
      </CC.ColumnStartDiv>
      {props.edit ? (
        <CC.RowDiv gap={8}>
          <Button
            w={'100%'}
            onClick={() => todoHandler()}
            disabled={props.data.content == inputTodoContent}
          >
            일정 수정
          </Button>
          <ConfirmButton
            w={'100%'}
            onClick={() => deleteTodoHandler()}
            bg={'red60'}
          >
            일정 삭제
          </ConfirmButton>
        </CC.RowDiv>
      ) : (
        <Button
          w={'100%'}
          onClick={() => todoHandler()}
            disabled={!inputTodoContent}
            h={"2.75rem"}
        >
          일정 추가
        </Button>
      )}
    </Container>
  );
};
export default TodoModal;

const Container = styled(CC.ColumnBetweenDiv)`
  width: 100%;
  gap: 2.8rem;
  padding: 1rem;
  color: ${(props) => props.theme.colors.black80};
  overflow: scroll;
  font-family: ${(props) => props.theme.fontFamily.cookieRunRegular};
  font-size: ${(props) => props.theme.fontSize.xl};
  min-height: 26rem;
  cursor: default;
`;
