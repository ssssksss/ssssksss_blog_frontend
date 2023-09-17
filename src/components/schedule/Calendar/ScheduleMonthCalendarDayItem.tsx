import Button from '@/components/common/button/Button';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import theme from '@/styles/theme';
import { dateFormat4y2m2d } from '@/utils/fucntion/dateFormat';
import React, { forwardRef, ReactNode, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SET_CURRENT_SCHEDULE_DATE } from '@/redux/store/schedule/actions';
import { store } from '@/redux/store/index';

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
  refIndex?: number;
  // sideOpenToggleHandler: () => void;
};

const ScheduleMonthCalendarDayItem = (props: CalendarDayItemType, ref: any) => {
  const setCurrentScheduleDate = (currentScheduleDate: any) => {
    store.dispatch(SET_CURRENT_SCHEDULE_DATE(currentScheduleDate));
  };

  // const onClickHandler = () => {
  //   if (props.isThisMonth) {
  //     setCurrentScheduleDate(props.id);
  //     props.sideOpenToggleHandler();
  //   }
  // };
  return (
    <Container
      today={dateFormat4y2m2d(new Date()) === props.id}
      // onClick={onClickHandler}
      isThisMonth={props.isThisMonth}
      // ref={elem => (ref.current[props.refIndex] = elem)}
    >
      {/* 일 수 */}
      <DayTitle>
        <DaySpan dayW={props.dayW}>{props.day}일</DaySpan>
        {/* <DayScheduleCount> {props.data?.length} 개 </DayScheduleCount> */}
      </DayTitle>
      <TodayScheduleList
        ref={elem => (ref.current[props.refIndex] = elem)}
      ></TodayScheduleList>
    </Container>
  );
};

export default forwardRef(ScheduleMonthCalendarDayItem);

const Container = styled.button<{ today?: boolean; isThisMonth?: boolean }>`
  min-height: 120px;
  box-shadow: 0px 0px 1px 1px #aeaeae inset;
  /* background-color: ${(props: any) => props.today && '#fffaaa'}; */
  width: 100%;
  display: flex;
  flex-flow: wrap column;
  gap: 2px;
`;
const DayTitle = styled(CC.RowBetweenDiv)`
  width: 100%;
  grid-row-start: 1;
  padding: 2px;
`;
const DaySpan = styled.span<{ dayW?: number }>`
  font-size: 16px;
  color: ${(props: any) =>
    (props.dayW === 0 && 'red') || (props.dayW === 6 && 'blue') || '#333333'};

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;
const TodayScheduleList = styled.div`
  width: 100%;
  display: grid;

  /* scheduleBar 요소 */
  & > button {
    height: 22px;
    z-index: 20;
    border-radius: 0px 8px 8px 0px;
    font-size: 1em;
    color: white;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      outline: 2px solid black;
    }
  }
`;
const ScheduleItem = styled(CC.RowDiv)`
  padding: 2px 4px;
  white-space: nowrap;
  overflow-x: auto;
  text-overflow: ellipsis;
  font-size: 16px;
  display: flex;
  gap: 4px;
  align-items: center;
  background: #f0f0f0;
`;
const ScheduleMarkColor = styled.div`
  border-radius: 25%;
  width: 8px;
  height: 8px;
`;
