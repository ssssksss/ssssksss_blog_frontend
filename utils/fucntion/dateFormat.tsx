/**
 *
 * Date 타입을 String "2000-11-11" 형식으로 바꾸어주는 함수
 * @returns "yyyy-mm-dd"
 */
export const dateFormat4y2m2d = (date1: string) => {
  const date = new Date(date1);
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();

  return (
    date.getFullYear() +
    '-' +
    month.toString().padStart(2, '0') +
    '-' +
    day.toString().padStart(2, '0')
  );
};

export const dateFormat4y2m2d2h2m = (date1: number | string | Date) => {
  const date = new Date(date1);
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;

  return (
    date.getFullYear() + '-' + month + '-' + day + ' ' + hour + ':' + minute
  );
};
export const dateFormat4y2m2d2h2m2s = (date1: number | string | Date) => {
  const date = new Date(date1);
  let month: number | string = date.getMonth() + 1;
  let day: number | string = date.getDate();
  let hour: number | string = date.getHours();
  let minute: number | string = date.getMinutes();
  let second: number | string = date.getSeconds();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;
  hour = hour >= 10 ? hour : '0' + hour;
  minute = minute >= 10 ? minute : '0' + minute;
  second = second >= 10 ? second : '0' + second;

  return (
    date.getFullYear() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minute +
    ':' +
    second
  );
};
