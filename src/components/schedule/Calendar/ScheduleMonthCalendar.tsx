import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import ScheduleMonthCalendarDayItem from './ScheduleMonthCalendarDayItem';
import { useEffect } from 'react';
import { dateFormat4y2m2d } from '@/utils/fucntion/dateFormat';
import theme from '@/styles/theme';
import { useRef } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleMonthCalendar.tsx
 * @version 0.0.1 "2023-09-05 17:39:23"
 * @description 설명
 */
interface IScheduleMonthCalendarProps {
  calendarDays?: any;
}

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleMonthCalendar.tsx
 * @version 0.0.1 "2023-09-09 04:07:32"
 * @description 설명
 */
const ScheduleBar = (props: any) => {
  return (
    <ScheduleBarContainer className="scheduleBar" {...props}>
      test
    </ScheduleBarContainer>
  );
};

const ScheduleMonthCalendar = (props: IScheduleMonthCalendarProps) => {
  const scheduleRef = useRef([]);
  const scheduleData: Array = useSelector(
    (state: RootState) => state.scheduleStore.monthScheduleData
  );
  /**
   * 1주의 시작인 일요일의 날짜들을 가지고 있는 리스트
   */
  const calendarWeekStartDateList: Array = useSelector(
    (state: RootState) => state.scheduleStore.calendarStartDateOfWeekList
  );

  const dayIntervalCalc = function (start: Date, end: Date) {
    return Math.ceil(
      Math.abs(end.getTime() - start.getTime()) / (1000 * 3600 * 24)
    );
  };
  useEffect(() => {
    if (scheduleRef.current.length === 0) return;
    if (scheduleData.length === 0) return;
    // 막대바의 행 위치
    let barLayer = 1;
    // 일정들을 받아와서 복사본을 만들어둔다. 복사본들의 요소들은 배치되고 제거된다.
    let scheduleDataListCopy = [...scheduleData];
    let removeScheduleDataIndex = [];

    // 혹시나 달력에 필요없는 일정들은 제거
    scheduleDataListCopy.map((i, index) => {
      if (
        i.endDateTime.substring(0, 10) < calendarWeekStartDateList[0] ||
        i.startDateTime.substring(0, 10) >
          Object.keys(props.calendarDays)[
            Object.keys(props.calendarDays).length - 1
          ]
      ) {
        removeScheduleDataIndex.unshift(index);
      }
    });
    removeScheduleDataIndex.map(i => {
      scheduleDataListCopy.splice(i, 1);
    });

    while (scheduleDataListCopy.length !== 0) {
      // 주(week)를 가리키는 층으로 막대바가 1주를 다 채웠으면 다음주로 이동시키는 역할을 한다. 마지막 주까지 도착을 하게되면 막대바는 다음층으로 이동하고 주(week)층은 제일 첫째주로 다사 이동한다.
      let weekLayer = 0;
      // 막대바를 한 층에 겹치지 않고 놓으려면 막대의 끝부분 기준점이 필요하다. (1950년에 일정은 없을테니...)
      let barStandardEndDate = '1950-01-01';
      // 배치된 요소들의 인덱스를 모아놓는 배열, map을 돌리는 중간에 지워버리면 인덱스가 밀리기도 하여서 map이 끝나고 제거하려는 목적
      removeScheduleDataIndex = [];

      // backgroundColor: "#9b51e0"
      // categoryName: "schedule"
      // content: "내용"
      // endDateTime : "2023-08-27T09:00:00"
      // id: 1
      // startDateTime: "2023-08-27T09:00:00"
      // title: "할일들"
      let firstDayOfMonth = Object.keys(props.calendarDays)[0];
      let lastDayOfMonth = Object.keys(props.calendarDays)[
        Object.keys(props.calendarDays).length - 1
      ];
      scheduleDataListCopy.map((i, index) => {
        // 일정이 달력에서 짤리게 되면 달력에 보이는 날짜부터 시작하게 한다.
        let scheduleStartDate = new Date(
          i.startDateTime.substring(0, 10) < firstDayOfMonth
            ? firstDayOfMonth
            : i.startDateTime.substring(0, 10)
        );
        // 만약에 막대바의 끝의 기준점보다 시작날짜가 더 빠르다면 이번 줄에 들어가는 것이 아닌 다음줄에 들어가는 것으로 판단한다.
        if (barStandardEndDate > dateFormat4y2m2d(scheduleStartDate)) return;
        // 일정이 달력에서 짤리게 되면 달력에 보이는 날짜까지만 보이게 한다.
        let scheduleEndDate = new Date(
          i.endDateTime.substring(0, 10) > lastDayOfMonth
            ? lastDayOfMonth
            : i.endDateTime.substring(0, 10)
        );
        // 일정 기간
        let scheduleInterval =
          dayIntervalCalc(scheduleStartDate, scheduleEndDate) + 1;
        // 1주씩 아래로 이동
        for (; weekLayer < calendarWeekStartDateList.length; weekLayer++) {
          // 일정의 시작날짜가 어느 요일에 위치해 있는지 알수 있다.
          let scheduleStartDateIndex = dayIntervalCalc(
            new Date(calendarWeekStartDateList[weekLayer]),
            scheduleStartDate
          );

          if (scheduleStartDateIndex >= 0 && scheduleStartDateIndex < 7) {
            //일정기간이 차지할 블록의 갯수
            let numberOfExtraBlocks = scheduleInterval;
            // 현재 줄에서 어떤 부분에서 시작해서 현재 들어갈수 있는 블록의 갯수, 일요일부터 공간을 차지할수도 있지만 수요일부터 차지할수도 있음
            let blocksNumberOfCurrentLine =
              scheduleStartDateIndex + scheduleInterval > 7
                ? 7 - scheduleStartDateIndex
                : scheduleInterval;
            // 현재 줄에 들어갈 블록이 계속 남아있으면 넣어주고 넣은 블록들의 갯수를 계속 제거해나간다.
            while (blocksNumberOfCurrentLine > 0) {
              let scheduleBarElement = document.createElement('button');
              scheduleBarElement.setAttribute('class', 'scheduleBar');
              let padding = 4;
              if (
                (numberOfExtraBlocks -= blocksNumberOfCurrentLine <= 0) &&
                numberOfExtraBlocks < 7
              ) {
                scheduleBarElement.style.width =
                  'calc(' +
                  100 * blocksNumberOfCurrentLine +
                  '% - ' +
                  padding * 2 +
                  'px)';
              } else {
                scheduleBarElement.style.width =
                  'calc(' +
                  100 * blocksNumberOfCurrentLine +
                  '% - ' +
                  6 +
                  'px)';
              }
              scheduleBarElement.style.gridRowStart = barLayer + 1;
              scheduleBarElement.style.paddingLeft = '4px';
              scheduleBarElement.style.marginLeft = '2px';
              scheduleBarElement.style.zIndex = '100';
              if (i.isExist === false) {
                scheduleBarElement.style.backgroundColor =
                  i.backgroundColor.substring(0, 7) + '44';
              } else {
                scheduleBarElement.style.backgroundColor =
                  i.backgroundColor.substring(0, 7);
              }
              scheduleBarElement.innerText = i.title;
              scheduleBarElement.addEventListener('click', e => {
                // 클릭했을때 발생하는 이벤트
                alert('test');
              });
              scheduleRef.current[
                weekLayer * 7 + scheduleStartDateIndex
              ].append(scheduleBarElement);

              let gridTemplateRowsStyle = document.getElementsByClassName(
                'week_' + weekLayer
              );
              // 1주 가로줄의 grid rows를 맞추기 위해 전부 grid 라인을 만들어준다.
              for (let k = 0; k < gridTemplateRowsStyle.length; k++) {
                // gridTemplateRowsStyle[k].style.gridTemplateRows =
                //   'repeat(' + (barLayer + 1) + ', 1fr)';
                scheduleRef.current[weekLayer * 7 + k].style.gridTemplateRows =
                  'repeat(' + barLayer + ', 1fr)';
                scheduleRef.current[weekLayer * 7 + k].style.gap = '2px';
              }

              numberOfExtraBlocks -= blocksNumberOfCurrentLine;
              blocksNumberOfCurrentLine =
                numberOfExtraBlocks >= 7 ? 7 : numberOfExtraBlocks;
              if (blocksNumberOfCurrentLine > 0) {
                weekLayer += 1;
                scheduleStartDateIndex = 0;
              }
            }
            // 마지막 기준점 변경해주고 삭제할 막대바 일정을 추가해준다.
            barStandardEndDate =
              dateFormat4y2m2d(scheduleEndDate) < lastDayOfMonth
                ? dateFormat4y2m2d(scheduleEndDate)
                : lastDayOfMonth;
            removeScheduleDataIndex.unshift(index);
            break;
          }
        }
        // 일정이 화면에 막대바 형태로 그려졌으니 그려진 인덱스를 저장하여 나중에 삭제를 한다.
      });
      // 모든 일정 요소를 한번 돌고나서는 삭제해야할 인덱스들을 삭제를 한다.
      barLayer += 1;
      removeScheduleDataIndex.map(k => {
        scheduleDataListCopy.splice(k, 1);
      });
    }
  }, [scheduleData]);

  return (
    <Container>
      <DayHeaderContainer>
        <DayHeader color={'red'}> 일 </DayHeader>
        <DayHeader> 월 </DayHeader>
        <DayHeader> 화 </DayHeader>
        <DayHeader> 수 </DayHeader>
        <DayHeader> 목 </DayHeader>
        <DayHeader> 금 </DayHeader>
        <DayHeader color={'blue'}> 토 </DayHeader>
      </DayHeaderContainer>

      {Array(Object.keys(props.calendarDays).length / 7)
        .fill()
        .map((v, weekLayer) => (
          <WeekContainer className={'week_' + weekLayer}>
            {Object.entries(props.calendarDays)
              .filter((i, index) => Math.floor(index / 7) === weekLayer)
              .map((el: [string, any], index) => (
                // 키(el[0])는 날짜
                // 값(el[1])은 일, 요일, isThisMonth(저번달,다음달)
                <ScheduleMonthCalendarDayItem
                  ref={scheduleRef}
                  refIndex={weekLayer * 7 + index}
                  id={el[0]}
                  key={el[0]}
                  day={el[1].day} // 일
                  dayW={el[1].dayW} // 요일
                  isThisMonth={el[1].isThisMonth} // 이번달인지
                  data={scheduleData.filter(
                    (el1: any) => el1?.startDateTimeTime?.slice(0, 10) === el[0]
                  )}
                />
              ))}
          </WeekContainer>
        ))}
    </Container>
  );
};
export default ScheduleMonthCalendar;

const Container = styled.section`
  display: flex;
  width: 100%;
  flex-flow: nowrap column;
`;
// 월화수목금토일 스타일
const DayHeaderContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
`;
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
const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, calc(100% / 7));
  width: 100%;

  & > button:not(:has(.scheduleBar:hover)):hover {
    z-index: 10;
    outline: 2px solid black;
  }
`;
const ScheduleBarContainer = styled.div`
  padding: 4px;

  width: ${props => props.width};
  grid-row-start: ${props => props.gridRowStart};
  padding-left: 4px;
  margin-left: 1px;
  z-index: 20;
`;
