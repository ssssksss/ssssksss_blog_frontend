import { CC } from '@/styles/commonComponentStyle';
import styled from '@emotion/styled';
import Calendar from './../calendar/Calendar';
import Image from 'next/image';
import { Icons } from '@/components/common/icons/Icons';
import { ScheduleAPI } from '@/api/ScheduleAPI';
import CalendarDayItem from '../calendar/CalendarDayItem';
import React, { useEffect, useState } from 'react';
import { store } from '@/redux/store';
import { SET_MONTH_SCHEDULE_LIST } from '@/redux/store/schedule';
import { scheduleSort } from '@/utils/function/schedule/scheduleSort';
import { RootState } from '@/redux/store/reducers';
import { useSelector } from 'react-redux';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file CalendarContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:44"
 * @description 설명
 */

const CalendarContainer = () => {
  const todayDate = new Date();
  const [calendarDayList, setCalendarDayList] = useState<any>({});
  const [calendarYear, setCalendarYear] = useState(
    Number(todayDate.getFullYear())
  );
  const [calendarMonth, setCalendarMonth] = useState(
    Number(todayDate.getMonth())
  );
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);

  const moveLeftDate = () => {
    if (calendarMonth === 0) {
      setCalendarYear(calendarYear - 1);
      setCalendarMonth(11);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const moveRightDate = () => {
    if (calendarMonth === 11) {
      setCalendarYear(calendarYear + 1);
      setCalendarMonth(0);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

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

  useEffect(async () => {
    const baseDate = new Date(calendarYear, calendarMonth, 1);
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

    setCalendarDayList({}); // 월이나 연도가 변경될때 마다 초기화
    // [1]시작일이 일요일일 경우(저번달은 보여줄 필요가 없다.)
    const temp = {} as any;
    if (baseDateStartDayW === 0) {
      // 이번달
      for (let i = 1; i <= baseDateEndDay; i++) {
        temp[dateString(calendarYear, calendarMonth + 1, i)] = {
          day: i,
          dayW: (i - 1) % 7,
          opacity: false,
          data: [],
          layer: 1,
        };
      }

      // 다음달(일요일로 시작하면 제외)
      if (nextDateStartDayW !== 0) {
        for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
          temp[dateString(calendarYear, calendarMonth + 2, i)] = {
            day: i,
            dayW: nextDateStartDayW + i - 1,
            opacity: true,
            data: [],
            layer: 1,
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
        temp[dateString(calendarYear, calendarMonth, i)] = {
          day: i,
          dayW: j,
          opacity: true,
          data: [],
          layer: 1,
        };
      }
      // 이번달
      for (let i = 1; i <= baseDateEndDay; i++) {
        temp[dateString(calendarYear, calendarMonth + 1, i)] = {
          day: i,
          dayW: (i - 1 + baseDateStartDayW) % 7,
          opacity: false,
          data: [],
          layer: 1,
        };
      }
      // 다음달
      if (nextDateStartDayW !== 0) {
        for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
          temp[dateString(calendarYear, calendarMonth + 2, i)] = {
            day: i,
            dayW: nextDateStartDayW + i - 1,
            opacity: true,
            data: [],
            layer: 1,
          };
        }
      }
    }

    let startDateOfMonth;
    let endDateOfMonth;
    let objLength = Object.keys(temp).length - 1;
    Object.entries(temp).map((i, index) => {
      if (index === 0) {
        startDateOfMonth = i[0];
      }
      if (index === objLength) {
        endDateOfMonth = i[0];
      }
    });
    // setCalendarDayList(Object.assign({}, temp));
    // setCalendarDayList(Object.assign({}, temp));
    await ScheduleAPI.getScheduleList({
      type: 'month',
      startDateTime: new Date(startDateOfMonth),
      endDateTime: new Date(endDateOfMonth),
    })
      .then(async res => {
        SET_MONTH_SCHEDULE_LIST(res.json.scheduleList);
        const promises = scheduleSort(
          res.json.scheduleList,
          startDateOfMonth,
          endDateOfMonth
        ).map(i => {
          temp[i.dayIndex].data.push(i);
          temp[i.dayIndex].layer = Math.max(temp[i.dayIndex].layer, i.layer);
        });
        await Promise.all(promises);
        setCalendarDayList(Object.assign({}, temp));
      })
      .catch(err => {
        console.log('CalendarContainer.tsx 파일 : ', err);
      });
  }, [calendarMonth, scheduleStore.toggleUptoDateMonthSchedule]);

  return (
    <Container>
      {/* 달력 상단 */}
      <Header>
        <LeftButton
          onClick={() => {
            moveLeftDate();
          }}
          type="button"
        >
          <Image src={Icons.LeftArrowIcon} />
        </LeftButton>
        {calendarYear}년 {calendarMonth + 1}월
        <RightButton
          onClick={() => {
            moveRightDate();
          }}
          type="button"
        >
          <Image src={Icons.RightArrowIcon} />
        </RightButton>
      </Header>
      {/* ===== 달력 메인 */}
      <Main>
        <DayHeader color={'red'}> 일 </DayHeader>
        <DayHeader> 월 </DayHeader>
        <DayHeader> 화 </DayHeader>
        <DayHeader> 수 </DayHeader>
        <DayHeader> 목 </DayHeader>
        <DayHeader> 금 </DayHeader>
        <DayHeader color={'blue'}> 토 </DayHeader>

        {Object.entries(calendarDayList).map((el: any) => (
          // 키(el[0])는 날짜
          // 값(el[1])은 일, 요일, opacity(저번달,다음달)
          <CalendarDayItem
            id={el[0]}
            key={el[0]}
            day={el[1].day}
            dayW={el[1].dayW}
            opacity={el[1].opacity}
            data={el[1].data}
            layer={el[1].layer}
            year={calendarYear}
            month={calendarMonth}
          />
        ))}
      </Main>
    </Container>
  );
};
export default CalendarContainer;

const Container = styled.div<{ active: boolean }>`
  font-size: 1rem;
  min-height: 240px;
  background-color: white;
  outline: solid ${props => props.theme.main.primary40} 2px;
`;
const Main = styled.main`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 16px 0px;
`;
const Header = styled.header`
  width: 100%;
  height: 60px;
  line-height: 40px;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  flex-flow: nowrap row;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    img {
      height: 20px;
    }
  }
`;
const LeftButton = styled.button`
  margin-right: 20px;
`;
const RightButton = styled.button`
  margin-left: 20px;
`;
// 월화수목금토일 스타일
const DayHeader = styled.div`
  text-align: center;
  height: 32px;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
  color: ${props => props.color || '#333333'};
  background-color: #f0f0f0;
`;
