import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Animations from '../common/animations/Animations';
import { css } from '@emotion/react';
import { Shell } from '@/components/common/shell/Shell';
import { Button } from '@/components/common/button/Button';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { DeleteIcon } from '/public/img/ui-icon/ic-delete.svg';
import { Input } from '@/components/common/input/Input';
import TodoItem from './TodoItem';
import CalendarItem from './CalendarItem';
import React from 'react';
import ModalButton from '../common/button/ModalButton';
import TodoModal from './modal/todoModal';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TodayTodoContainer.tsx
 * @version 0.0.1 "2023-09-29 02:19:47"
 * @description 설명
 */

interface ITodayTodoContainerProps {
  active: number;
  onClick: () => void;
}

const TodayTodoContainer = (props: ITodayTodoContainerProps) => {
  return (
    <Container active={props.active} onClick={props.onClick}>
      {props.active === 0 ? (
        <CC.RowCenterDiv h={'100%'}>
          <CC.ColumnStartCenterDiv h={'100%'}>
            <Title>
              <h3> 오늘의 할일 </h3>
              <ModalButton
                color={'primary80'}
                outline={true}
                modal={<TodoModal />}
                overlayVisible={true}
                modalW={'300px'}
                bg={'contrast'}
              >
                +
              </ModalButton>
            </Title>
            <TodoTodayContainer h={'100%'} pd={'4px'} gap={10}>
              <TodoListContainer>
                <li>
                  <TodoItem />
                </li>
              </TodoListContainer>
            </TodoTodayContainer>
          </CC.ColumnStartCenterDiv>
          <CC.ColumnStartCenterDiv overflow={true} h={'100%'}>
            <h3> 오늘의 일정 </h3>
            <CC.ColumnDiv gap={2} pd={'2px'} w={'100%'}>
              <CalendarItem />
              <CalendarItem />
              <CalendarItem />
            </CC.ColumnDiv>
          </CC.ColumnStartCenterDiv>
        </CC.RowCenterDiv>
      ) : (
        <FoldStateDiv> TODAY </FoldStateDiv>
      )}
    </Container>
  );
};
export default React.memo(TodayTodoContainer);

const Container = styled.section<{
  active: number;
}>`
  --height: 44px;
  --width: 44px;
  font-size: 1rem;
  border-radius: 10px;
  outline: solid ${props => props.theme.colors.black60} 1px;
  gap: 4px;
  padding: 4px;

  & > div > div {
    outline: solid ${props => props.theme.main.primary20} 1px;
    border-radius: 10px;
    background: ${props => props.theme.main.contrast};
  }

  ${props =>
    props.active === 0
      ? css`
          background: ${props.theme.main.primary20};
          width: calc(100% - var(--width));
          height: calc(100% - var(--height));
          ${props.theme.flex.column};
        `
      : props.active === 1
      ? css`
          width: var(--width);
          height: calc(100% - var(--height));
          font-size: 2rem;
          text-transform: uppercase;
          writing-mode: vertical-rl;
          text-orientation: upright;
          letter-spacing: 0.1rem;
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `
      : css`
          font-size: 2rem;
          width: calc(50%);
          height: calc(var(--height));
          ${props.theme.flex.row.center.center};
          cursor: pointer;
        `};
`;

const Title = styled(CC.RowDiv)`
  /* position: relative; */
  height: 30px;
  width: 100%;
  padding: 2px;
  align-items: center;

  h3 {
    padding: 4px 0px;
    width: 100%;
    ${props => props.theme.flex.row.center};
  }

  & > button {
    background: ${props => props.theme.main.primary20};
    /* position: absolute;
    right: 4px;
    top: 50%;
    transform: translate(0, -50%); */
    width: 24px;
  }
`;

const TodoTodayContainer = styled(CC.ColumnDiv)`
  height: 100%;
`;

const TodoListContainer = styled(CC.ColumnDiv.withComponent('ul'))`
  height: calc(100% - 30px);
  overflow: scroll;
  width: 100%;
  gap: 4px;
  & {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const FoldStateDiv = styled.div`
  font-family: ${props => props.theme.fontFamily.typoHelloPOP};
`;
