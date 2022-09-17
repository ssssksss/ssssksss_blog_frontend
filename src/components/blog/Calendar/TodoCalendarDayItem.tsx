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
};

const TodoCalendarDayItem = (props: CalendarDayItemType) => {
  const dispatch = useDispatch();
  const setNowTodoDate = (nowTodoDate: any) => {
    dispatch(SET_NOW_TODO_DATE(nowTodoDate));
  };

  return (
    <Container today={dateFormat4y2m2d(new Date()) === props.id}>
      <ColumnDiv opacity={props.opacity}>
        {/* 일 수 */}
        <CF.RowStartDiv width="100%">
          <Button
            onClick={() => setNowTodoDate(props.id)}
            width="40px"
            height="30px"
            padding={"0px"}
            backgroundColor={"transparent"}
          >
            <DaySpan dayW={props.dayW}>{props.day}일</DaySpan>
          </Button>
        </CF.RowStartDiv>
        <TodayTodoList>
          {props.data?.map((el: any, index: number) => (
            <>
              {!el.isChecked && (
                <Todo key={index}>
                  <CF.OverflowText> {el.content} </CF.OverflowText>
                </Todo>
              )}
            </>
          ))}
        </TodayTodoList>
      </ColumnDiv>
    </Container>
  );
};

export default TodoCalendarDayItem;

const Container = styled.div<{ today?: boolean }>`
  min-height: 120px;
  padding: 4px;
  box-shadow: 0px 0px 1px 1px #aeaeae inset;
  background-color: ${(props: any) => props.today && "#fffaaa"};
`;
const ColumnDiv = styled.div<{ opacity?: number }>`
  display: flex;
  flex-flow: nowrap column;
  gap: 2px;
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
const TodayTodoList = styled(CF.ColumnDiv)`
  gap: 4px;
  /* display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
`;

const Todo = styled.div`
  padding: 0px 4px;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;
  background-color: ${theme.backgroundColors.third};
  border-radius: 4px;
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
