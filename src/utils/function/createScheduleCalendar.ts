import { format, set } from "date-fns";

export const createScheduleCalendar = (currentDate: Date) => {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const days = [];
  const previousMonthDays = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  ).getDate();
  let num = 0;

  // 이전 달의 날짜 추가
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const year =
      currentDate.getMonth() == 0
        ? currentDate.getFullYear() - 1
        : currentDate.getFullYear();
    const month = currentDate.getMonth() == 0 ? 12 : currentDate.getMonth();
    const day = previousMonthDays - i;

    days.push({
      year,
      day,
      month,
      key: `prev-${i}`,
      state: "prev",
      data: [],
      index: num++,
      date: format(
        set(new Date(), { year, month: month - 1, date: day }),
        "yyyy-MM-dd",
      ),
    });
  }

  // 현재 달의 날짜 추가
  for (let i = 1; i <= daysInMonth; i++) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    days.push({
      year,
      day: i,
      month,
      key: i + "",
      state: "",
      data: [],
      index: num++,
      date: format(
        set(new Date(), { year, month: month - 1, date: i }),
        "yyyy-MM-dd",
      ),
    });
  }

  // 다음 달의 날짜 추가
  const remainingDays = 42 - days.length; // 6주 * 7일 = 42
  for (let i = 1; i <= remainingDays; i++) {
    const year =
      currentDate.getMonth() == 11
        ? currentDate.getFullYear() + 1
        : currentDate.getFullYear();
    const month = currentDate.getMonth() == 11 ? 1 : currentDate.getMonth() + 2;

    days.push({
      year,
      day: i,
      month,
      key: `next-${i}`,
      state: "next",
      data: [],
      index: num++,
      date: format(
        set(new Date(), { year, month: month - 1, date: i }),
        "yyyy-MM-dd",
      ),
    });
  }

  return days;
};
