import Button from '@/components/common/button/Button';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import theme from '@/styles/theme';
import { dateFormat4y2m2d } from '@/utils/fucntion/dateFormat';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { SET_CURRENT_SCHEDULE_DATE } from '@/redux/store/schedule/actions';

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

const ScheduleMonthCalendarDayItem = (props: CalendarDayItemType) => {
  const dispatch = useDispatch();
  const setCurrentScheduleDate = (currentScheduleDate: any) => {
    dispatch(SET_CURRENT_SCHEDULE_DATE(currentScheduleDate));
  };
  const onClickHandler = () => {
    if (props.isThisMonth) {
      setCurrentScheduleDate(props.id);
      props.sideOpenToggleHandler();
    }
  };

  useEffect(() => {
    console.log('ScheduleMonthCalendarDayItem.tsx : ');
  }, []);

  return (
    <Container
      today={dateFormat4y2m2d(new Date()) === props.id}
      onClick={onClickHandler}
      isThisMonth={props.isThisMonth}
    >
      {/* 일 수 */}
      <DayTitle>
        <DaySpan dayW={props.dayW}>{props.day}일</DaySpan>
        {/* <DayScheduleCount> {props.data?.length} 개 </DayScheduleCount> */}
      </DayTitle>
      <TodayScheduleList>
        {props.data?.map((el: any, index: number) => (
          <ScheduleItem key={index}>
            <ScheduleMarkColor style={{ background: el.backgroundColor }} />
            <CC.OverflowText> {el.title} </CC.OverflowText>
          </ScheduleItem>
        ))}
      </TodayScheduleList>
    </Container>
  );
};

export default ScheduleMonthCalendarDayItem;

const Container = styled.button<{ today?: boolean; isThisMonth?: boolean }>`
  min-height: 120px;
  padding: 4px;
  box-shadow: 0px 0px 1px 1px #aeaeae inset;
  background-color: ${(props: any) => props.today && '#fffaaa'};
  display: flex;
  align-items: flex-start;
  width: calc(100%);
  flex-flow: nowrap column;
  opacity: 0.6;
  cursor: not-allowed;
  ${props =>
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
const DayTitle = styled(CC.RowBetweenDiv)`
  width: 100%;
  padding: 0px 4px 6px;
`;
const DaySpan = styled.span<{ dayW?: number }>`
  font-size: 16px;
  color: ${(props: any) =>
    (props.dayW === 0 && 'red') || (props.dayW === 6 && 'blue') || '#333333'};

  @media (max-width: 1024px) {
    font-size: 12px;
  }
`;
const TodayScheduleList = styled(CC.ColumnDiv)`
  gap: 4px;
  width: calc(100% - 2px);
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
