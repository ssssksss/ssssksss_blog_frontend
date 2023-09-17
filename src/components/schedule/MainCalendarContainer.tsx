import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';
import ScheduleMonthCalendar from './Calendar/ScheduleMonthCalendar';
import theme from '@/styles/theme';
import { store } from '@/redux/store/index';
import {
  SET_CALENDAR_START_DATE_OF_WEEK_LIST,
  SET_MONTH_SCHEDULE_DATA,
} from '@/redux/store/schedule';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file MainCalendarContainer.tsx
 * @version 0.0.1 "2023-09-06 01:39:37"
 * @description 설명
 */
const MainCalendarContainer = () => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const [calendarDays, setCalendarDays] = useState<any>({});

  useEffect(() => {
    const baseDate = new Date(
      scheduleStore.calendarYear,
      scheduleStore.calendarMonth,
      1
    );
    const baseDateStartDayW = baseDate.getDay(); // 0-6
    const baseDateEndDay = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + 1,
      0
    ).getDate(); // 28-31
    const prevDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 0);
    const prevDateEndDay = prevDate.getDate(); // 28-31
    const prevEndDayW = prevDate.getDay(); // 0-6
    const nextDateStartDate = new Date(
      baseDate.getFullYear(),
      baseDate.getMonth() + 1,
      1
    );
    const nextDateStartDayW = nextDateStartDate.getDay(); // 0-6

    const dateString = (year: number, month: number, day: number) => {
      // 13개월이 되면 1월로 만들고 1년을 더해준다.
      // 출력 형식은 2000-12-31 과 같이 반환
      if (month === 13) {
        year = year + 1;
        month = 1;
      } else if (month === 0) {
        year = year - 1;
        month = 12;
      }
      return (
        year.toString() +
        '-' +
        ('0' + month).slice(-2) +
        '-' +
        ('0' + day).slice(-2)
      );
    };

    setCalendarDays({}); // 월이나 연도가 변경될때 마다 초기화
    // [1]시작일이 일요일일 경우(저번달은 보여줄 필요가 없다.)
    const temp = {} as any;
    if (baseDateStartDayW === 0) {
      // 이번달
      for (let i = 1; i <= baseDateEndDay; i++) {
        temp[
          dateString(
            scheduleStore.calendarYear,
            scheduleStore.calendarMonth + 1,
            i
          )
        ] = {
          day: i,
          dayW: (i - 1) % 7,
          isThisMonth: false,
        };
      }

      // 다음달(일요일로 시작하면 제외)
      if (nextDateStartDayW !== 0) {
        for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
          temp[
            dateString(
              scheduleStore.calendarYear,
              scheduleStore.calendarMonth + 2,
              i
            )
          ] = {
            day: i,
            dayW: nextDateStartDayW + i - 1,
            isThisMonth: false,
          };
        }
      }
    }
    // [2]시작일이 일요일이 아닌 경우
    else {
      // 저번달
      for (
        let i = prevDateEndDay - prevEndDayW, j = 0;
        i <= prevDateEndDay;
        i++, j++
      ) {
        temp[
          dateString(scheduleStore.calendarYear, scheduleStore.calendarMonth, i)
        ] = {
          day: i,
          dayW: j,
          isThisMonth: false,
        };
      }
      // 이번달
      for (let i = 1; i <= baseDateEndDay; i++) {
        temp[
          dateString(
            scheduleStore.calendarYear,
            scheduleStore.calendarMonth + 1,
            i
          )
        ] = {
          day: i,
          dayW: (i - 1 + baseDateStartDayW) % 7,
          isThisMonth: true,
        };
      }
      // 다음달
      if (nextDateStartDayW !== 0) {
        for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
          temp[
            dateString(
              scheduleStore.calendarYear,
              scheduleStore.calendarMonth + 2,
              i
            )
          ] = {
            day: i,
            dayW: nextDateStartDayW + i - 1,
            isThisMonth: false,
          };
        }
      }
    }
    setCalendarDays(Object.assign({}, temp));
    store.dispatch(
      SET_CALENDAR_START_DATE_OF_WEEK_LIST(
        Object.entries(temp)
          .filter((i, index) => index % 7 === 0)
          .map(i => i[0])
      )
    );
  }, [scheduleStore.calendarMonth]);

  return (
    <Container>
      {(Object.keys(calendarDays).length === 0) !== 0 && (
        <ScheduleMonthCalendar
          calendarDays={calendarDays}
        ></ScheduleMonthCalendar>
      )}
    </Container>
  );
};
export default MainCalendarContainer;

const Container = styled.div`
  flex: 1;
  background: ${theme.backgroundColors.grayLight};
`;
