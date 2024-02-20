import { dateFormat4y2m2d } from '@/utils/function/dateFormat';

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
  let eachFloorBaseDate = [startDateOfMonth]; // 몇일까지 일정이 표시되었는지 알 수 있는 용도로 예를 들어 12월 1일에서 어떤 일정이 5일간이면 12월 6일을 잠시 기억해주는 변수
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
  data.map((i, index) => {
    let layer = 1; // 1일 칸에 grid로 위치를 잡기 위해서 사용, 일정 막대바가 4개이면 grid-template-rows의 값이 4이상이어야 문제 없이 UI가 표시된다.
    let whichFloor = 1; // 현재 일정이 몇번째 층에서 작업이 되고 있는지를 결정하는 변수
    for (let j = 0; ; j++) {
      // 1-1. 일정의 시작날짜가 각 층의 기준날짜보다 뒤에 있는지 판단
      if (eachFloorBaseDate[j] <= i.startDateTime) {
        whichFloor = j;
        eachFloorBaseDate[j] = i.startDateTime;
        break;
      }
      // 1-2. 일정의 시작날짜가 달력의 1번째 날짜보다 작고 층의 기준날짜가 달력의 1번째 날짜와 같다면 => 그 층의 일정은 현재 아무것도 없는 상태이다. 그러므로 일정을 추가한다.
      else if (
        startDateOfMonth > i.startDateTime &&
        eachFloorBaseDate[j] == startDateOfMonth
      ) {
        whichFloor = j;
        break;
      }
      // 1-3. 일정의 시작날짜가 층의 기준날짜보다 앞에 있고 또한 그 층의 첫번째 일정도 아니라면 한층을 추가하고 위에 1-2번으로 가게 만든다.
      eachFloorBaseDate.push(startDateOfMonth);
      layer++;
    }
    // 2-1. 첫번쨰 일정이 현재 보이는 달력날짜의 첫째날보다 작은지 판단, 일정의 시작이 달력의 첫번째 날짜보다 더 앞에 있을 수도 있으니까 잘라버려야한다.
    if (startDateOfMonth > i.startDateTime) {
      // 달력의 첫번째 날짜보다 앞에 있는 것들은 자르고 뒤에만 계산해서 남은 날짜를 구한다.
      let remainDays = dayIntervalCalc(
        new Date(startDateOfMonth),
        new Date(
          i.endDateTime > endDateOfMonth ? endDateOfMonth : i.endDateTime
        )
      );
      // 반복문을 돌면서 남은날짜들을 각 층의 기준날짜를 바꿔주면서 점차 줄여나간다. 예를 들어 남은 날짜가 10일이고 1번째 층의 처음부터라면
      // 1번째 주 1번째 층은 7일, 2번째 주 1번째 층은 3일이라는 공간을 차지하게 될것이다. 그러면 1번째 층의 기준날짜(eachFloorBaseDate[0])은 +10일이 되있을 것이다
      while (remainDays > 0) {
        if (remainDays <= 7) {
          let obj = {
            ...i,
            dayIndex: eachFloorBaseDate[whichFloor],
            layer: layer,
            period: remainDays,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(
                  i.endDateTime > endDateOfMonth
                    ? endDateOfMonth
                    : i.endDateTime
                )
              ) - 1,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = dateFormat4y2m2d(
            new Date(i.endDateTime).setDate(
              new Date(i.endDateTime).getDate() + 1
            )
          );
          remainDays = 0;
        } else {
          let obj = {
            ...i,
            dayIndex: eachFloorBaseDate[whichFloor],
            layer: layer,
            period: 7,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor])
              ) - 1,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = dateFormat4y2m2d(
            new Date(eachFloorBaseDate[whichFloor]).setDate(
              new Date(eachFloorBaseDate[whichFloor]).getDate() + 7
            )
          );
          remainDays -= 7;
        }
      }
    }
    // 2-2. 첫번쨰 일정이 현재 보이는 달력날짜의 첫째날보다 크다면 앞에 날짜를 자를필요없이 그냥 계산하면 된다.
    else {
      let remainDays = dayIntervalCalc(
        new Date(i.startDateTime),
        new Date(
          i.endDateTime > endDateOfMonth ? endDateOfMonth : i.endDateTime
        )
      );
      while (remainDays > 0) {
        if (
          new Date(eachFloorBaseDate[whichFloor]).getDay() + remainDays <=
          7
        ) {
          let obj = {
            ...i,
            dayIndex: eachFloorBaseDate[whichFloor],
            layer: layer,
            period: remainDays,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor])
              ) - 1,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = dateFormat4y2m2d(
            new Date(i.endDateTime).setDate(
              new Date(i.endDateTime).getDate() + 1
            )
          );
          remainDays = 0;
        } else {
          let obj = {
            ...i,
            dayIndex: eachFloorBaseDate[whichFloor],
            layer: layer,
            period: 7 - new Date(eachFloorBaseDate[whichFloor]).getDay(),
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor])
              ) - 1,
          };
          result.push(obj);
          remainDays =
            remainDays - (7 - new Date(eachFloorBaseDate[whichFloor]).getDay());
          eachFloorBaseDate[whichFloor] = dateFormat4y2m2d(
            new Date(eachFloorBaseDate[whichFloor]).setDate(
              new Date(eachFloorBaseDate[whichFloor]).getDate() +
                (7 - new Date(eachFloorBaseDate[whichFloor]).getDay())
            )
          );
        }
      }
    }
    //
  });
  return result;
};
