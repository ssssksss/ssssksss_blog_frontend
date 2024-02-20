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

export const createCalendar = (props: { year: number; month: number }) => {
  // 달력의 첫번째 날짜와 마지막 날짜
  // 초기 날짜 기준 데이터
  const { year, month } = props;

  const baseDate = new Date(year, month, 1);
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

  // [1]시작일이 일요일일 경우(저번달은 보여줄 필요가 없다.)
  const temp = [];
  if (baseDateStartDayW === 0) {
    // 이번달
    for (let i = 1; i <= baseDateEndDay; i++) {
      temp.push({
        date: dateString(year, month + 1, i),
        day: i,
        dayW: (i - 1) % 7,
        opacity: false,
        data: [],
        layer: 1,
      });
    }

    // 다음달(일요일로 시작하면 제외)
    if (nextDateStartDayW !== 0) {
      for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
        temp.push({
          date: dateString(year, month + 2, i),
          day: i,
          dayW: nextDateStartDayW + i - 1,
          opacity: true,
          data: [],
          layer: 1,
        });
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
      temp.push({
        date: dateString(year, month, i),
        day: i,
        dayW: j,
        opacity: true,
        data: [],
        layer: 1,
      });
    }
    // 이번달
    for (let i = 1; i <= baseDateEndDay; i++) {
      temp.push({
        date: dateString(year, month + 1, i),
        day: i,
        dayW: (i - 1 + baseDateStartDayW) % 7,
        opacity: false,
        data: [],
        layer: 1,
      });
    }
    // 다음달
    if (nextDateStartDayW !== 0) {
      for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
        temp.push({
          date: dateString(year, month + 2, i),
          day: i,
          dayW: nextDateStartDayW + i - 1,
          opacity: true,
          data: [],
          layer: 1,
        });
      }
    }
  }
  // 달력에서 첫째날짜와 마지막날짜를 넣는 방법
  let objLength = Object.keys(temp).length - 1;
  let startDateOfMonth = temp[0].date;
  let endDateOfMonth = temp[objLength].date;

  return {
    calendar: temp,
    startDateOfMonth: startDateOfMonth,
    endDateOfMonth: endDateOfMonth,
  };
};
