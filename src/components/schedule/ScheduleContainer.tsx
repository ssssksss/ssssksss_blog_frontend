import { ScheduleAPI } from '@api/ScheduleAPI';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { createCalendar } from '@utils/function/schedule/createCalendar';
import { scheduleSort } from '@utils/function/schedule/scheduleSort';
import { Time } from '@utils/function/timeFunction';
import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import CalendarDayItem from './CalendarDayItem';
import ScheduleSideContainer from './ScheduleSideContainer';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleContainer.tsx
 * @version 0.0.1 "2023-09-29 02:20:44"
 * @description 설명
 */

const ScheduleContainer = () => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const queryClient = useQueryClient();
  // 달력에 35일이 존재하면 1일마다 내부에 데이터가 담겨있는 배열, 내부에 데이터가 없는 경우도 있을 수 있음
  const [scheduleListDataArray, setScheduleListDataArray] = useState(
    Array.from({ length: scheduleStore.calendar.calendar.length }, () => 1),
  );

  const movePreviousMonth = () => {
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR(
        createCalendar(
          scheduleStore.calendarMonth == 0
            ? {
                year: scheduleStore.calendarYear - 1,
                month: 11,
              }
            : {
                year: scheduleStore.calendarYear,
                month: scheduleStore.calendarMonth - 1,
              },
        ),
      ),
    );
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR_YEAR(
        scheduleStore.calendarMonth == 0
          ? scheduleStore.calendarYear - 1
          : scheduleStore.calendarYear,
      ),
    );
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR_MONTH(
        scheduleStore.calendarMonth == 0 ? 11 : scheduleStore.calendarMonth - 1,
      ),
    );
  };

  const moveNextMonth = () => {
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR(
        createCalendar(
          scheduleStore.calendarMonth == 11
            ? {
                year: scheduleStore.calendarYear + 1,
                month: 0,
              }
            : {
                year: scheduleStore.calendarYear,
                month: scheduleStore.calendarMonth + 1,
              },
        ),
      ),
    );
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR_YEAR(
        scheduleStore.calendarMonth == 11
          ? scheduleStore.calendarYear + 1
          : scheduleStore.calendarYear,
      ),
    );
    store.dispatch(
      rootActions.scheduleStore.SET_CALENDAR_MONTH(
        scheduleStore.calendarMonth == 11 ? 0 : scheduleStore.calendarMonth + 1,
      ),
    );
  };

  const scheduleListResponseData = ScheduleAPI.getScheduleListTEST({
    type: 'month',
    startDateTime: scheduleStore.calendar.startDateOfMonth,
    endDateTime: scheduleStore.calendar.endDateOfMonth,
    calendarData: scheduleStore.calendar,
  });

  useEffect(() => {
    const month = store.getState().scheduleStore.calendarMonth;
    const year = store.getState().scheduleStore.calendarYear;
    const calendar = createCalendar({ year, month });
    if (!authStore.id) {
      queryClient.setQueryData(
        [
          'scheduleList',
          store.getState().scheduleStore.calendarMonth,
          authStore.id,
        ],
        (oldData) => {
          return oldData;
        },
      );
      setScheduleListDataArray(
        Array.from({ length: calendar.calendar.length }, () => ({
          data: [],
          maxLayer: 1,
        })),
      );
      return;
    }
    if (scheduleListResponseData.isFetching) return;
    const _scheduleList =
      scheduleListResponseData.data.json?.scheduleList.filter(
        (i) => i.scheduleCategory.isVisible == true,
      );
    // grid 최대 높이를 알기 위해서 필요한 배열
    const _gridMaxLayerList = Array.from(
      { length: calendar.calendar.length },
      () => 1,
    );
    // period랑 layer, index가 추가된 스케줄 리스트가 나온다.
    const _processedSchedule = scheduleSort(
      _scheduleList,
      calendar.startDateOfMonth,
      calendar.endDateOfMonth,
    ).map((i) => {
      const index2 =
        Time.dayIntervalCalc(
          // (1-2) 첫날짜와 기준날짜를 빼서 몇번째 날짜인지 인덱스를 구하기 위해 사용
          new Date(calendar.startDateOfMonth),
          new Date(i.dayIndex),
        ) - 1;
      _gridMaxLayerList[index2] = Math.max(_gridMaxLayerList[index2], i.layer); // (1-3) 일정 바가 최대로 위치한 높이를 찾기 위한 코드
      return i;
    });

    const _array = Array.from(_gridMaxLayerList, (i) => {
      return {
        data: [],
        maxLayer: i,
      };
    });

    _processedSchedule.map((i) => {
      _array[i.index].data = [..._array[i.index].data, i];
    });
    setScheduleListDataArray(_array);
  }, [
    store.getState().scheduleStore.calendarMonth,
    scheduleListResponseData?.dataUpdatedAt,
    authStore.id,
  ]);

  const MemoizedLeftButton = memo(LeftButton);
  const MemoizedRightButton = memo(RightButton);

  return (
    <Container>
      <ScheduleSideContainer />
      <CC.ColumnDiv>
        <HeaderContainer>
          <MemoizedLeftButton onClick={movePreviousMonth} type="button">
            <Image src={Icons.LeftArrowIcon} />
          </MemoizedLeftButton>
          {scheduleStore.calendarYear}년 {scheduleStore.calendarMonth + 1}월
          <MemoizedRightButton onClick={moveNextMonth} type="button">
            <Image src={Icons.RightArrowIcon} />
          </MemoizedRightButton>
        </HeaderContainer>
        <MainContainer>
          <CalendarContainer>
            <DayOfTheWeekHeader>
              {['일', '월', '화', '수', '목', '금', '토'].map((i) => (
                <DayOfTheWeekItem
                  key={i}
                  color={i == '일' ? 'red' : i == '토' && 'blue'}
                >
                  {i}
                </DayOfTheWeekItem>
              ))}
            </DayOfTheWeekHeader>
            <DayItemContainer>
              {scheduleStore.calendar.calendar?.map(
                (el: unknown, index: number) => (
                  // 키(el[0])는 날짜
                  // 값(el[1])은 일, 요일, opacity(저번달,다음달)
                  <CalendarDayItem
                    id={el.date}
                    key={el.date}
                    day={el.day}
                    dayW={el.dayW}
                    opacity={el.opacity}
                    data={scheduleListDataArray[index]?.data}
                    layer={scheduleListDataArray[index]?.maxLayer}
                    year={scheduleStore.calendarYear}
                    month={scheduleStore.calendarMonth}
                  />
                ),
              )}
            </DayItemContainer>
          </CalendarContainer>
        </MainContainer>
      </CC.ColumnDiv>
    </Container>
  );
};
export default ScheduleContainer;

const Container = styled.div<{ active: boolean }>`
  position: relative;
  height: 100%;
  @media (pointer: coarse) {
    font-size: 1.2rem;
  }
  @media (min-width: ${(props) => props.theme.deviceSizes.tablet}) {
    display: grid;
    grid-template-columns: 16rem auto;
  }
`;
const MainContainer = styled.div`
  width: 100%;
`;

const CalendarContainer = styled.div``;

const DayOfTheWeekHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;
const HeaderContainer = styled(CC.RowCenterDiv.withComponent('header'))`
  height: 3.2rem;
`;
const DayOfTheWeekItem = styled.div`
  /* 일월화수목금토일 */
  text-align: center;
  height: 2.4rem;
  display: flex;
  flex-flow: nowrap column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || '#333333'};
  background-color: #f0f0f0;
`;

const DayItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 100vh;
  ${(props) => props.theme.scroll.hidden};
`;
const LeftButton = styled.button`
  margin-right: 2rem;
`;
const RightButton = styled.button`
  margin-left: 2rem;
`;
// 월화수목금토일 스타일
