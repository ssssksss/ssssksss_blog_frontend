//   {
import { addDays } from 'date-fns';
import { dateFormat4y2m2d } from '../dateFormat';
//     "id": 14,
//     "title": "test3",
//     "content": "test3",
//     "startDateTime": "2023-12-05",
//     "endDateTime": "2023-12-11",
//     "isChecked": false,
//     "scheduleCategory": {
//         "id": 9,
//         "name": "test",
//         "backgroundColor": "red40",
//         "userId": 13
//     }
// }

export const scheduleSort = (
  data: [
    {
      id: number;
      title: string;
      content: string;
      startDateTime: string;
      endDateTime: string;
      isChecked: false;
      scheduleCategory: {
        id: number;
        name: string;
        backgroundColor: string;
        userId: number;
      };
    }
  ],
  startDateOfMonth: string,
  endDateOfMonth: string
) => {
  let mark = [startDateOfMonth]; // 몇일까지 일정이 표시되었는지 알 수 있는 용도로 예를 들어 12월 1일에서 어떤 일정이 5일간이면 12월 6일을 잠시 기억해주는 변수
  let result = [];
  //   시작날짜 부터 마지막날짜까지의 일수 예를 들어 12.01 ~ 12.03 인 경우 3을 반환한다.
  let dayIntervalCalc = function (start: Date, end: Date) {
    if (start.getTime() - end.getTime() < 0) {
      return (
        Math.ceil(
          Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24)
        ) + 1
      );
    } else {
      return (
        -1 *
          Math.ceil(
            Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24)
          ) +
        1
      );
    }
  };
  data.map(i => {
    let layer = 1; // 1일 칸에 몇번째 위치에 놓일지 결정하는 값, 나중에 grid로 위치를 잡기 위해서 사용
    let markIndex = 1;
    for (let j = 0; ; j++) {
      if (mark[j] <= i.startDateTime) {
        markIndex = j;
        mark[j] = i.startDateTime;
        break;
      } else if (
        startDateOfMonth > i.startDateTime &&
        mark[j] == startDateOfMonth
      ) {
        markIndex = j;
        break;
      }
      mark.push(startDateOfMonth);
      layer++;
    }
    // 1. 첫번쨰 일정이 현재 보이는 달력날짜의 첫째날보다 작은지 판단
    if (startDateOfMonth > i.startDateTime) {
      let remainDays = dayIntervalCalc(
        new Date(startDateOfMonth),
        new Date(
          i.endDateTime > endDateOfMonth ? endDateOfMonth : i.endDateTime
        )
      );
      while (remainDays > 0) {
        if (remainDays <= 7) {
          let obj = {
            ...i,
            dayIndex: mark[markIndex],
            layer: layer,
            period: remainDays,
          };
          result.push(obj);
          mark[markIndex] = dateFormat4y2m2d(
            new Date(i.endDateTime).setDate(
              new Date(i.endDateTime).getDate() + 1
            )
          );
          remainDays = 0;
        } else {
          let obj = {
            ...i,
            dayIndex: mark[markIndex],
            layer: layer,
            period: 7,
          };
          result.push(obj);
          mark[markIndex] = dateFormat4y2m2d(
            new Date(mark[markIndex]).setDate(
              new Date(mark[markIndex]).getDate() + 7
            )
          );
          remainDays -= 7;
        }
      }
    } else {
      let remainDays = dayIntervalCalc(
        new Date(i.startDateTime),
        new Date(
          i.endDateTime > endDateOfMonth ? endDateOfMonth : i.endDateTime
        )
      );
      while (remainDays > 0) {
        if (new Date(mark[markIndex]).getDay() + remainDays <= 7) {
          let obj = {
            ...i,
            dayIndex: mark[markIndex],
            layer: layer,
            period: remainDays,
          };
          result.push(obj);
          mark[markIndex] = dateFormat4y2m2d(
            new Date(i.endDateTime).setDate(
              new Date(i.endDateTime).getDate() + 1
            )
          );
          remainDays = 0;
        } else {
          let obj = {
            ...i,
            dayIndex: mark[markIndex],
            layer: layer,
            period: 7 - new Date(mark[markIndex]).getDay(),
          };
          result.push(obj);
          remainDays = remainDays - (7 - new Date(mark[markIndex]).getDay());
          mark[markIndex] = dateFormat4y2m2d(
            new Date(mark[markIndex]).setDate(
              new Date(mark[markIndex]).getDate() +
                (7 - new Date(mark[markIndex]).getDay())
            )
          );
        }
      }
    }
    //
  });
  return result;
};
