import { addDays, differenceInDays, format } from "date-fns";

export const scheduleSort = (
  data: IPlanSchedule[],
  startDateOfMonth: string,
  endDateOfMonth: string,
) => {
  // 각층마다 몇일까지 일정이 표시되었는지 알 수 있는 용도로 예를 들어 12월 1일에서 어떤 일정이 5일간이면 12월 6일을 잠시 기억해주는 변수이고 최종으로 12월 31일에 끝났으면
  // eachFloorBaseDate[0] = "12.31" , eachFloorBaseDate[1] = "12.30" , eachFloorBaseDate[2] = "12.15" 등등 각 층에 최종적으로 끝날 날짜를 기억
  const eachFloorBaseDate = [format(new Date(startDateOfMonth), "yyyy-MM-dd")];
  const result: any[] = [];
  let maxLayer = 1;
  //   시작날짜 부터 마지막날짜까지의 일수 예를 들어 12.01 ~ 12.03 인 경우 3을 반환한다.
  const dayIntervalCalc = (start: Date, end: Date) => {
    const diff = Math.abs(differenceInDays(end, start));
    return diff + 1;
  };
  data.map((i) => {
    let step = 0;
    const _scheduleStartDate = format(new Date(i.scheduleStartDate), "yyyy-MM-dd");
    const _scheduleEndDate = format(new Date(i.scheduleEndDate), "yyyy-MM-dd");
    let layer = 1; // 1일 칸에 grid로 위치를 잡기 위해서 사용, 일정 막대바가 4개이면 grid-template-rows의 값이 4이상이어야 문제 없이 UI가 표시된다.
    let whichFloor = 0; // 현재 일정이 몇번째 층에서 작업이 되고 있는지를 결정하는 변수
    for (let j = 0; ; j++) {
      // 1-1. 일정의 시작날짜가 각 층의 기준날짜보다 뒤에 있는지 판단
      if (eachFloorBaseDate[j] <= _scheduleStartDate) {
        whichFloor = j;
        eachFloorBaseDate[j] = _scheduleStartDate;
        break;
      }
      // 1-2. 일정의 시작날짜가 달력의 1번째 날짜보다 작고 층의 기준날짜가 달력의 1번째 날짜와 같다면 => 그 층의 일정은 현재 아무것도 없는 상태이다. 그러므로 일정을 추가한다.
      else if (
        startDateOfMonth > _scheduleStartDate &&
        eachFloorBaseDate[j] == format(new Date(startDateOfMonth), "yyyy-MM-dd")
      ) {
        whichFloor = j;
        break;
      }
      // 1-3. 일정의 시작날짜가 층의 기준날짜보다 앞에 있고 또한 그 층의 첫번째 일정도 아니라면 한층을 추가하고 위에 1-2번으로 가게 만든다.
      if (eachFloorBaseDate.length == layer) {
        eachFloorBaseDate.push(
          format(new Date(startDateOfMonth), "yyyy-MM-dd"),
        );
      }
      layer++;
      maxLayer = Math.max(maxLayer, layer);
    }

    // 2-1. 첫번쨰 일정이 현재 보이는 달력날짜의 첫째날보다 작은지 판단, 일정의 시작이 달력의 첫번째 날짜보다 더 앞에 있을 수도 있으니까 잘라버려야한다.
    // 10.29일이 달력의 첫번째 날인데 일정이 10.20 ~ 12.20일 수 도 있다. => 10.29 ~ 11.9일(6주)까지로 잘라버리기 위한 과정
    if (startDateOfMonth > _scheduleStartDate) {
      let remainDays = dayIntervalCalc(
        new Date(startDateOfMonth),
        new Date(
          _scheduleEndDate > endDateOfMonth
            ? endDateOfMonth
            : _scheduleEndDate,
        ),
      );
      // 반복문을 돌면서 남은날짜들을 각 층의 기준날짜를 바꿔주면서 점차 줄여나간다. 예를 들어 남은 날짜가 10일이고 1번째 층의 처음부터라면
      // 1번째 주 1번째 층은 7일, 2번째 주 1번째 층은 3일이라는 공간을 차지하게 될것이다. 그러면 1번째 층의 기준날짜(eachFloorBaseDate[0])은 +10일이 되있을 것이다
      while (remainDays > 0) {
        if (remainDays <= 7) {
          // console.log(
          //   `scheduleSort.ts 파일 : 7이하 현재 마커 위치 ${eachFloorBaseDate[whichFloor]}`,
          // );
          const obj = {
            ...i,
            date: format(new Date(eachFloorBaseDate[whichFloor]), "yyyy-MM-dd"),
            layer: layer,
            period: remainDays,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(
                  _scheduleEndDate > endDateOfMonth
                    ? endDateOfMonth
                    : _scheduleEndDate,
                ),
              ) - 1,
            isFirst: step == 0 ? true : false,
            step: step++,
            isLast: true,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = format(
            addDays(new Date(_scheduleEndDate), 1),
            "yyyy-MM-dd",
          );
          remainDays = 0;
        } else {
          // 현재 마커 위치 + 남은날짜가 7초과인 경우
          // console.log(
          //   `scheduleSort.ts 파일 : 7초과 현재 마커 위치 ${eachFloorBaseDate[whichFloor]}`,
          // );
          const obj = {
            ...i,
            date: format(new Date(eachFloorBaseDate[whichFloor]), "yyyy-MM-dd"),
            layer: layer,
            period: 7,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor]),
              ) - 1,
            isFirst: step == 0 ? true : false,
            step: step++,
            isLast: false,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = format(
            addDays(new Date(eachFloorBaseDate[whichFloor]), 7),
            "yyyy-MM-dd",
          );
          remainDays -= 7;
        }
      }
    }
    // 2-2. 첫번쨰 일정이 현재 보이는 달력날짜의 첫째날보다 크다면 앞에 날짜를 자를필요없이 그냥 계산하면 된다. 뒤에 날짜는 달력의 마지막날짜보다 큰지는 계산해야한다.
    else {
      let remainDays = dayIntervalCalc(
        new Date(_scheduleStartDate),
        new Date(
          _scheduleEndDate > endDateOfMonth
            ? endDateOfMonth
            : _scheduleEndDate,
        ),
      );
      // console.log("scheduleSort.ts 파일 : 2-2 남은 날짜", remainDays);
      while (remainDays > 0) {
        if (
          new Date(eachFloorBaseDate[whichFloor]).getDay() + remainDays <=
          7
        ) {
          // 현재 마커 위치 + 남은날짜가 7이하인 경우
          // console.log(
          //   `scheduleSort.ts 파일 + @ : 7이하 현재 마커 위치 ${eachFloorBaseDate[whichFloor]}`,
          // );
          const obj = {
            ...i,
            date: format(new Date(eachFloorBaseDate[whichFloor]), "yyyy-MM-dd"),
            layer: layer,
            period: remainDays,
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor]),
              ) - 1,
            isFirst: step == 0 ? true : false,
            step: step++,
            isLast: true,
          };
          result.push(obj);
          eachFloorBaseDate[whichFloor] = format(
            addDays(new Date(_scheduleEndDate), 1),
            "yyyy-MM-dd",
          );
          remainDays = 0;
        } else {
          // 현재 마커 위치 + 남은날짜가 7보다 큰 경우
          // console.log(
          //   `scheduleSort.ts 파일 + @ : 7초과 현재 마커 위치 ${eachFloorBaseDate[whichFloor]}`,
          // );
          const obj = {
            ...i,
            date: format(new Date(eachFloorBaseDate[whichFloor]), "yyyy-MM-dd"),
            layer: layer,
            period: 7 - new Date(eachFloorBaseDate[whichFloor]).getDay(),
            index:
              dayIntervalCalc(
                new Date(startDateOfMonth),
                new Date(eachFloorBaseDate[whichFloor]),
              ) - 1,
            isFirst: step == 0 ? true : false,
            step: step++,
            isLast: false,
          };
          result.push(obj);
          remainDays =
            remainDays - (7 - new Date(eachFloorBaseDate[whichFloor]).getDay());
          eachFloorBaseDate[whichFloor] = format(
            addDays(
              new Date(eachFloorBaseDate[whichFloor]),
              7 - new Date(eachFloorBaseDate[whichFloor]).getDay(),
            ),
            "yyyy-MM-dd",
          );
        }
      }
    }
    // console.log(
    //   "scheduleSort.ts 파일 최종상태 eachFloorBaseDate: ",
    //   eachFloorBaseDate,
    // );
  });

  return {
    maxLayer: maxLayer - 1,
    result: result,
  };
};
