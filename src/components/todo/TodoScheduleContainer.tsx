import { ScheduleAPI } from '@api/ScheduleAPI';
import { TodoAPI } from '@api/TodoAPI';
import ModalButton from '@components/common/button/ModalButton';
import ScheduleItem from '@components/schedule/ScheduleItem';
import ScheduleModal from '@components/schedule/modal/ScheduleModal';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import {
  dateFormat4y2m2d,
  todayDayOfTheWeek,
} from '@utils/function/dateFormat';
import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoModal from './modal/TodoModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodoScheduleContainer.tsx
 * @version 0.0.1 "2023-09-29 02:19:47"
 * @description 설명
 */

interface IScheduleResDataProps {
  content: string;
  id: number;
  isChecked: boolean;
  userId: number;
}

const TodoScheduleContainer = (_) => {
  const [containerSpace, setContainerSpace] = useState(0);
  const dayOfTheWeek = useState(todayDayOfTheWeek);
  const scheduleResData = ScheduleAPI.getScheduleList({
    type: 'today',
  }).data?.json;
  const todoResData: IScheduleResDataProps =
    TodoAPI.getTodoList()?.data?.json?.todoList;
  return (
    <Container>
      <CC.AbsoluteColumnBox>
        <TitleContainer
          onClick={(e) => {
            setContainerSpace((prev) => (prev > -1 ? prev - 1 : prev));
            e.preventDefault();
          }}
        >
          <Title>
            <h3> 할일 </h3>
          </Title>
          <ModalButton
            onClick={(e) => e.stopPropagation()}
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
        <ListContainer
          h={containerSpace < 0 ? 'calc(100% - 96px)' : 'calc(50% - 48px)'}
        >
          {todoResData?.map((i) => (
            <li key={i.data?.id}>
              <TodoItem {...i} />
            </li>
          ))}
        </ListContainer>
      </CC.AbsoluteColumnBox>
      <CC.AbsoluteColumnBox
        top={
          containerSpace
            ? containerSpace < 0
              ? 'calc(100% - 48px)'
              : '48px'
            : '50%'
        }
      >
        <TitleContainer
          onClick={(e) => {
            setContainerSpace((prev) => (prev < 1 ? prev + 1 : prev));
            e.preventDefault();
          }}
        >
          <Title>
            <h3> 오늘의 일정 ({dayOfTheWeek}) </h3>
            <span> {dateFormat4y2m2d(new Date())} </span>
          </Title>
          <ModalButton
            onClick={(e) => e.stopPropagation()}
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
        <ListContainer
          h={containerSpace > 0 ? 'calc(100% - 96px)' : 'calc(50% - 48px)'}
        >
          {scheduleResData?.scheduleList.map((i, index) => (
            <li key={index}>
              <ScheduleItem data={i} />
            </li>
          ))}
        </ListContainer>
      </CC.AbsoluteColumnBox>
    </Container>
  );
};
// export default React.memo(TodoScheduleContainer);
export default TodoScheduleContainer;

const Container = styled(CC.GridRow2.withComponent('article'))`
  height: 100%;
  position: relative;

  & > div {
    width: 100%;
    height: 100%;
    ${(props) => props.theme.scroll.hidden};
    background: ${(props) => props.theme.colors.white80};
    outline: solid black 1px;
    border-radius: 10px;
  }
`;

const TitleContainer = styled(CC.GridColumn2)`
  /* position: relative; */
  width: 100%;
  height: 48px;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  grid-template-columns: 1fr 32px;
  align-items: center;
  outline: solid black 1px;
  border-radius: 10px;
  padding: 0px 4px;
`;
const Title = styled(CC.ColumnCenterCenterDiv)`
  height: 48px;
  & > span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.black40};
  }
`;

const ListContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  width: 100%;
  min-height: calc(50% - 48px);
  overflow: scroll;
  gap: 4px;
  border-radius: 10px;
  outline: solid black 1px;
  ${(props) => props.theme.scroll.hidden};
  padding: 4px 4px 12px 4px;
`;
