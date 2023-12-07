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

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file todoModal.tsx
 * @version 0.0.1 "2023-12-07 15:13:32"
 * @description 설명
 */
const TodoModal = props => {
  const inputRef = useRef<null>();

  const addTodoHandler = () => {
    if (inputRef.current.value === '') return;
    TodoAPI.addTodo({
      content: inputRef.current.value,
    }).then((response: any) => {
      props.closeModal();
    });
  };

  return (
    <Container>
      <Shell outline={true} w={'100%'} gap={8} pd={'8px 4px'}>
        <CC.RowStartDiv w={'100%'}> 할일 내용 </CC.RowStartDiv>
        <Input placeholder={'test'} ref={inputRef} />
      </Shell>
      <Button w={'100%'} h={'30px'} onClick={() => addTodoHandler()}>
        추가
      </Button>
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
