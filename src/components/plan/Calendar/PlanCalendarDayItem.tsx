import Button from "@/components/common/button/Button";
import { RootState } from "@/redux/store/reducers";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { dateFormat4y2m2d } from "@/utils/fucntion/dateFormat";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { SET_NOW_PLAN_DATE } from "@/redux/store/plan/actions";

type CalendarDayItemType = {
  color?: string;
  isThisMonth?: boolean;
  day?: string;
  content?: any;
  id?: string;
  children?: ReactNode;
  date?: string;
  data?: any | any[];
  dayW?: number;
  sideOpenToggleHandler: () => void;
};

const PlanCalendarDayItem = (props: CalendarDayItemType) => {
  const dispatch = useDispatch();
  const setNowPlanDate = (nowPlanDate: any) => {
    dispatch(SET_NOW_PLAN_DATE(nowPlanDate));
  };
  const onClickHandler = () => {
    if (props.isThisMonth) {
      setNowPlanDate(props.id);
      props.sideOpenToggleHandler();
    }
  };

  return (
    <Container
      today={dateFormat4y2m2d(new Date()) === props.id}
      onClick={onClickHandler}
      isThisMonth={props.isThisMonth}
    >
      {/* 일 수 */}
      <DayTitle>
        <DaySpan dayW={props.dayW}>{props.day}일</DaySpan>
        <DayPlanCount> {props.data?.length} 개 </DayPlanCount>
      </DayTitle>
      <TodayPlanList>
        {props.data
          ?.filter((i: any, index: number) => !i.isChecked)
          .map(
            (el: any, index: number) =>
              index < 5 && (
                <Plan key={index}>
                  <CF.OverflowText> {el.content} </CF.OverflowText>
                </Plan>
              )
          )}
      </TodayPlanList>
    </Container>
  );
};

export default PlanCalendarDayItem;

const Container = styled.button<{ today?: boolean; isThisMonth?: boolean }>`
  min-height: 120px;
  padding: 4px;
  box-shadow: 0px 0px 1px 1px #aeaeae inset;
  background-color: ${(props: any) => props.today && "#fffaaa"};
  display: flex;
  align-items: flex-start;
  width: calc(100%);
  flex-flow: nowrap column;
  opacity: 0.6;
  cursor: not-allowed;
  ${(props) =>
    props.isThisMonth &&
    css`
      opacity: 1;
      cursor: pointer;
      &:hover {
        outline: solid black 3px;
        z-index: 5;
      }
    `}
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
const DayPlanCount = styled.div`
  position: absolute;
  right: 2px;
`;
const TodayPlanList = styled(CF.ColumnDiv)`
  gap: 4px;
  width: calc(100% - 2px);
`;

const Plan = styled.div`
  padding: 0px 4px;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;
  background-color: ${theme.backgroundColors.third};
  border-radius: 4px;
  display: flex;
`;
