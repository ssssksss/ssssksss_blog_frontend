function msToTime(duration: number): string {
  const milliseconds = parseInt(((duration % 1000) / 100).toString());
  let seconds: number | string = Math.floor((duration / 1000) % 60);
  let minutes: number | string = Math.floor((duration / (1000 * 60)) % 60);
  let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function secToTime(duration: number): string {
  let seconds: number | string = Math.floor(duration % 60);
  let minutes: number | string = Math.floor((duration / 60) % 60);
  let hours: number | string = Math.floor((duration / (60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function jsDateTypeAddDays(date: Date, days: number): string {
  let temp = new Date(date);
  temp.setDate(date.getDate() + days);
  temp.setHours(0, 0, 0, 0);
  temp = new Date(temp.getTime() - (temp.getTime() % 86400000));
  return temp.toJSON();
}

function dayIntervalCalc(start: Date, end: Date): number {
  const difference = start.getTime() - end.getTime();
  if (difference < 0) {
    return Math.ceil(Math.abs(difference) / (1000 * 3600 * 24)) + 1;
  } else {
    return -1 * Math.ceil(Math.abs(difference) / (1000 * 3600 * 24)) + 1;
  }
}

// 몇 시간, 몇 분 전과 같이 보여주는 함수
export const timeFromToday = (time: string | number | Date): string => {
  const today = new Date();
  const timeValue = new Date(time);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

// timeFunction 객체
export const timeFunction = {
  msToTime,
  secToTime,
  jsDateTypeAddDays,
  dayIntervalCalc,
  timeFromToday,
};
