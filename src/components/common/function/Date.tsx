export const fewDaysAgoDate = (valueDate) => {
  const today = new Date();
  const temp = new Date(valueDate);

  const time = Math.floor((today.getTime() - temp.getTime()) / 1000 / 60);
  const hour = Math.floor(time / 60);
  const day = Math.floor(time / 60 / 24);

  if (time < 1) return "방금전";
  if (time < 60) return `${time}분전`;
  if (hour < 24) return `${hour}시간전`;
  if (day < 365) return `${day}일전`;
  return `${Math.floor(day / 365)}년전`;
};
