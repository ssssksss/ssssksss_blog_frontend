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
    <Container containerSpace={containerSpace}>
      <div>
        <TitleContainer
          onClick={(e) => {
            setContainerSpace((prev) => (prev > -1 ? prev - 1 : prev));
            e.preventDefault();
          }}
        >
          <Title>
            <h3> 할일 {containerSpace} </h3>
          </Title>
          <ModalButton
            onClick={(e) => e.stopPropagation()}
            modal={<TodoModal />}
            color={'primary80'}
            bg={'primary20'}
            modalOverlayVisible={true}
            modalW={'50%'}
            w={'3.2rem'}
            h={'3.2rem'}
          >
            +
          </ModalButton>
        </TitleContainer>
        <ListContainer>
          {todoResData?.map((i) => (
            <li key={i.data?.id}>
              <TodoItem {...i} />
            </li>
          ))}
        </ListContainer>
      </div>
      <div>
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
            w={'3.2rem'}
            h={'3.2rem'}
          >
            +
          </ModalButton>
        </TitleContainer>
        <ListContainer>
          {scheduleResData?.scheduleList.map((i, index) => (
            <li key={index}>
              <ScheduleItem data={i} />
            </li>
          ))}
        </ListContainer>
      </div>
    </Container>
  );
};
// export default React.memo(TodoScheduleContainer);
export default TodoScheduleContainer;

const Container = styled(CC.GridRow2.withComponent('article'))<{
  containerSpace: number;
}>`
  height: calc(100vh - 3.2rem);
  max-height: calc(100vh - 3.2rem);
  position: relative;
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  grid-template-rows: ${(props) =>
    props.containerSpace === -1 && 'calc(100vh - 8rem) 4.8rem'};
  grid-template-rows: ${(props) => props.containerSpace === 0 && '50% 50%'};
  grid-template-rows: ${(props) =>
    props.containerSpace === 1 && '4.8rem calc(100vh - 8rem)'};

  & > div {
    width: 100%;
    background: ${(props) => props.theme.colors.white80};
  }
`;

const TitleContainer = styled(CC.GridColumn2)`
  width: 100%;
  min-height: 4.8rem;
  max-height: 4.8rem;
  font-family: ${(props) => props.theme.fontFamily.gmarketSansBold};
  grid-template-columns: 1fr 3.2rem;
  align-items: center;
  padding: 0rem 0.4rem;
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  outline-offset: -0.1rem;
`;
const Title = styled(CC.ColumnCenterCenterDiv)`
  height: 100%;
  & > span {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.black40};
  }
  cursor: pointer;
`;

const ListContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  ${(props) => props.theme.scroll.hiddenY};
  width: 100%;
  height: calc(100% - 4.8rem);
  gap: 0.4rem;
`;
