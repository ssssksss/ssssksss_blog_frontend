import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Animations from '../common/animations/Animations';
import { Shell } from '@/components/common/shell/Shell';
import { Button } from '@/components/common/button/Button';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { DeleteIcon } from '/public/img/ui-icon/ic-delete.svg';
import { Input } from '@/components/common/input/Input';
import TodoItem from './TodoItem';
import React, { useEffect, useState } from 'react';
import ModalButton from '../common/button/ModalButton';
import TodoModal from './modal/TodoModal';
import { TodoAPI } from '@/api/TodoAPI';
import { SET_TODO_LIST } from '@/redux/store/todo';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import ScheduleItem from '@/components/schedule/ScheduleItem';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import {
  dateFormat4y2m2d,
  todayDayOfTheWeek,
} from '@/utils/function/dateFormat';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import { SET_TODAY_SCHEDULE_LIST } from '@/redux/store/schedule';
import { store } from '@/redux/store';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoScheduleContainer.tsx
 * @version 0.0.1 "2023-09-29 02:19:47"
 * @description 설명
 */

interface ITodoScheduleContainerProps {
  active: number;
  onClick: () => void;
}

const TodoScheduleContainer = (props: ITodoScheduleContainerProps) => {
  const todoStore = useSelector((state: RootState) => state.todoStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const dayOfTheWeek = useState(todayDayOfTheWeek);

  useEffect(() => {
    TodoAPI.getTodoList().then(res => {
      store.dispatch(SET_TODO_LIST(res.json.todoList));
    });

    ScheduleAPI.getScheduleList({
      type: 'today',
    })
      .then(res => {
        store.dispatch(SET_TODAY_SCHEDULE_LIST(res.json.scheduleList));
      })
      .catch(err => {
        console.log('TodoScheduleContainer.tsx 파일 : ', err);
      });
  }, [authStore.id]);

  return (
    <Container>
      <CC.ColumnDiv>
        <TitleContainer>
          <Title>
            <h3> 할일 </h3>
          </Title>
          <ModalButton
            modal={<TodoModal />}
            color={'primary80'}
            bg={'primary20'}
            modalOverlayVisible={true}
            modalW={'50%'}
            w={'32px'}
            h={'32px'}
          >
            +
          </ModalButton>
        </TitleContainer>
        <ListContainer>
          {todoStore.todoList.map(i => (
            <li>
              <TodoItem data={i} />
            </li>
          ))}
        </ListContainer>
      </CC.ColumnDiv>
      <CC.ColumnDiv>
        <TitleContainer>
          <Title>
            <h3> 오늘의 일정 ({dayOfTheWeek}) </h3>
            <span> {dateFormat4y2m2d(new Date())} </span>
          </Title>
          <ModalButton
            modal={<ScheduleModal />}
            color={'primary80'}
            bg={'primary20'}
            modalOverlayVisible={true}
            modalW={'80%'}
            w={'32px'}
            h={'32px'}
          >
            +
          </ModalButton>
        </TitleContainer>
        <ListContainer>
          {scheduleStore.todayScheduleList?.map((i, index) => (
            <li key={index}>
              <ScheduleItem data={i} />
            </li>
          ))}
        </ListContainer>
      </CC.ColumnDiv>
    </Container>
  );
};
// export default React.memo(TodoScheduleContainer);
export default TodoScheduleContainer;

const Container = styled(CC.GridColumn2)`
  height: 100%;

  & > div {
    width: 100%;
    height: 100%;
    ${props => props.theme.scroll.hidden};
    background: ${props => props.theme.colors.white80};
    outline: solid black 1px;
    border-radius: 10px;
  }
`;

const TitleContainer = styled(CC.GridColumn2)`
  /* position: relative; */
  width: 100%;
  height: 48px;
  font-family: ${props => props.theme.fontFamily.gmarketSansBold};
  grid-template-columns: 1fr 32px;
  align-items: center;
  outline: solid black 1px;
  border-radius: 10px;
  padding: 0px 4px;
`;
const Title = styled(CC.ColumnCenterCenterDiv)`
  & > span {
    font-size: 0.8rem;
    color: ${props => props.theme.colors.black40};
  }
`;

const ListContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  height: 100%;
  overflow: scroll;
  gap: 4px;
  border-radius: 10px;
  outline: solid black 1px;
  ${props => props.theme.scroll.hidden};
  padding: 4px 4px 12px 4px;
`;

const FoldStateDiv = styled.div`
  font-family: ${props => props.theme.fontFamily.typoHelloPOP};
`;
