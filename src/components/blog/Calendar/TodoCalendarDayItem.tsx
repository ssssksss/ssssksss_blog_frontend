import Button from "@/components/common/button/Button";
import { RootState } from "@/redux/store/reducers";
import { SET_NOW_TODO_DATE } from "@/redux/store/todo";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { dateFormat4y2m2d } from "@/utils/fucntion/dateFormat";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

type CalendarDayItemType = {
  color?: string;
  opacity?: number;
  day?: string;
  content?: any;
  id?: string;
  children?: ReactNode;
  date?: string;
  data?: any | any[];
  dayW?: number;
  sideOpenToggleHandler: () => void;
};

const TodoCalendarDayItem = (props: CalendarDayItemType) => {
  const dispatch = useDispatch();
  const setNowTodoDate = (nowTodoDate: any) => {
    dispatch(SET_NOW_TODO_DATE(nowTodoDate));
  };
  const onClickHandler = () => {
    setNowTodoDate(props.id);
    props.sideOpenToggleHandler();
  };

  return (
    <Container
      today={dateFormat4y2m2d(new Date()) === props.id}
      onClick={onClickHandler}
      opacity={props.opacity}
    >
      {/* 일 수 */}
      <DayTitle>
        <DaySpan dayW={props.dayW}>{props.day}일</DaySpan>
        <DayTodoCount> {props.data?.length} 개 </DayTodoCount>
      </DayTitle>
      <TodayTodoList>
        {props.data
          ?.filter((i: any, index: number) => !i.isChecked)
          .map(
            (el: any, index: number) =>
              index < 5 && (
                <Todo key={index}>
                  <CF.OverflowText> {el.content} </CF.OverflowText>
                </Todo>
              )
          )}
      </TodayTodoList>
    </Container>
  );
};

export default TodoCalendarDayItem;

const Container = styled.button<{ today?: boolean; opacity?: number }>`
  min-height: 120px;
  padding: 4px;
  box-shadow: 0px 0px 1px 1px #aeaeae inset;
  background-color: ${(props: any) => props.today && "#fffaaa"};
  display: flex;
  align-items: flex-start;
  width: calc(100%);
  flex-flow: nowrap column;
  opacity: ${(props: any) => props.opacity || 0.6};
`;
const DaySpan = styled.span<{ dayW?: number }>`
  font-size: 16px;
  color: ${(props: any) =>
    (props.dayW === 0 && "red") || (props.dayW === 6 && "blue") || "#333333"};

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;
const DayTitle = styled(CF.RowStartDiv)`
  position: relative;
  width: 100%;
  padding-bottom: 4px;
`;
const DayTodoCount = styled.div`
  position: absolute;
  right: 2px;
`;
const TodayTodoList = styled(CF.ColumnDiv)`
  gap: 4px;
  width: calc(100% - 2px);
`;

const Todo = styled.div`
  padding: 0px 4px;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;
  background-color: ${theme.backgroundColors.third};
  border-radius: 4px;
  display: flex;
`;

// const Button = styled.button`
//   height: 24px;
//   width: 100%;
//   border-radius: 4px;
//   font-size: 16px;
//   padding: 0px 0px 0px 4px;
//   display: flex;
//   flex-flow: nowrap row;
//   align-items: center;
//   background-color: ${theme.backgroundColors.primary};

//   @media (max-width: 1200px) {
//     padding: 2px 0px;
//     font-size: 16px;
//     height: 40px;
//     display: flex;
//     flex-flow: nowrap column;
//     justify-content: center;
//     align-items: center;
//   }
//   @media (max-width: 1024px) {
//     padding: 2px 0px;
//     font-size: 14px;
//     height: 40px;
//     display: flex;
//     flex-flow: nowrap column;
//     justify-content: center;
//     align-items: center;
//   }
//   @media (max-width: 768px) {
//     font-size: 12px;
//     padding: 0px;
//     height: 40px;
//     display: flex;
//     flex-flow: nowrap column;
//     justify-content: center;
//     align-items: center;
//   }
// `;
