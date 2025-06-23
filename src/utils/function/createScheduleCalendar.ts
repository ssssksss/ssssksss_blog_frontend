// import { format, set } from "date-fns";

// // currentDate는 그냥 이번달의 중간정도의 날짜 // Mon Jun 16 2025 00:00:00 GMT+0900 (한국 표준시)
// export const createScheduleCalendar = (currentDate: Date) => {
//   // 이번 달의 총 일수
//   const totalDaysInCurrentMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//     0,
//   ).getDate();
//   // 이번달의 1일이 무슨요일인지
//   const firstDayOfWeekInCurrentMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     1,
//   ).getDay();
//   // 이전달의 마지막 날짜(이전달의 날짜 총합)
//   const totalDaysInPreviousMonth = new Date(
//     currentDate.getFullYear(),
//     currentDate.getMonth(),
//     0,
//   ).getDate();

//   const days = [];
//   let num = 0;

//   // 이전 달 날짜 추가
//   for (let i = firstDayOfWeekInCurrentMonth - 1; i >= 0; i--) {
//     const year =
//       currentDate.getMonth() === 0
//         ? currentDate.getFullYear() - 1
//         : currentDate.getFullYear();
//     const month = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
//     const day = totalDaysInPreviousMonth - i;

//     try {
//       days.push({
//         year,
//         month,
//         day,
//         key: `prev-${i}`,
//         state: "prev",
//         data: [],
//         index: num++,
//         date: format(
//           set(new Date(0), {year, month: month - 1, date: day}),
//           "yyyy-MM-dd",
//         ),
//       });
//     } catch {
//       console.log("createScheduleCalendar.ts 파일1 : ", year);
//       console.log("createScheduleCalendar.ts 파일1 : ", month - 1);
//       console.log("createScheduleCalendar.ts 파일1 : ", day);
//     }
//   }
//   console.log("createScheduleCalendar.ts 파일1 : ", days);
  
//   // 현재 달 날짜 추가
//   for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth() + 1;
    
//     try {
//       days.push({
//         year,
//         month,
//         day: i,
//         key: `${i}`,
//         state: "",
//         data: [],
//         index: num++,
//         date: format(
//           set(new Date(0), {year, month: month - 1, date: i}),
//           "yyyy-MM-dd",
//         ),
//       });
//     } catch {
//       console.log("createScheduleCalendar.ts 파일2 : ", year);
//       console.log("createScheduleCalendar.ts 파일2 : ", month - 1);
//       console.log("createScheduleCalendar.ts 파일2 : ", i);
//     }
//   }
//   console.log("createScheduleCalendar.ts 파일2 : ", days);
  
//   // 다음 달 날짜 추가
//   const remainingDays = 42 - days.length;
//   for (let i = 1; i <= remainingDays; i++) {
//     const year =
//       currentDate.getMonth() === 11
//         ? currentDate.getFullYear() + 1
//         : currentDate.getFullYear();
//     const month =
//       currentDate.getMonth() === 11 ? 1 : currentDate.getMonth() + 2;

//     try {
//       days.push({
//         year,
//         month,
//         day: i,
//         key: `next-${i}`,
//         state: "next",
//         data: [],
//         index: num++,
//         date: format(
//           set(new Date(0), {year, month: month - 1, date: i}),
//           "yyyy-MM-dd",
//         ),
//       });
//     } catch {
//       console.log("createScheduleCalendar.ts 파일3 : ", year);
//       console.log("createScheduleCalendar.ts 파일3 : ", month - 1);
//       console.log("createScheduleCalendar.ts 파일3 : ", i);
//     }
//   }

//   return days;
// };


import { format, set } from "date-fns";

export const createScheduleCalendar = (currentDate: Date) => {
  const totalDaysInCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();

  const firstDayOfWeekInCurrentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const totalDaysInPreviousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  ).getDate();

  const days = [];
  let index = 0;

  // 이전 달 날짜 추가
  const prevMonth =
    currentDate.getMonth() === 0 ? 11 : currentDate.getMonth() - 1;
  const prevYear =
    currentDate.getMonth() === 0
      ? currentDate.getFullYear() - 1
      : currentDate.getFullYear();
  const prevStart =
    firstDayOfWeekInCurrentMonth === 0 ? 6 : firstDayOfWeekInCurrentMonth - 1;

  for (let i = prevStart; i >= 0; i--) {
    const day = totalDaysInPreviousMonth - i;
    days.push({
      year: prevYear,
      month: prevMonth + 1, // 사람 기준
      day,
      key: `prev-${index}`,
      state: "prev",
      data: [],
      index: index++,
      date: format(
        set(new Date(0), {year: prevYear, month: prevMonth, date: day}),
        "yyyy-MM-dd",
      ),
    });
  }

  // 현재 달 날짜 추가
  const currYear = currentDate.getFullYear();
  const currMonth = currentDate.getMonth();
  for (let i = 1; i <= totalDaysInCurrentMonth; i++) {
    days.push({
      year: currYear,
      month: currMonth + 1, // 사람 기준
      day: i,
      key: `curr-${index}`,
      state: "",
      data: [],
      index: index++,
      date: format(
        set(new Date(0), {year: currYear, month: currMonth, date: i}),
        "yyyy-MM-dd",
      ),
    });
  }

  // 다음 달 날짜 추가
  const nextMonth =
    currentDate.getMonth() === 11 ? 0 : currentDate.getMonth() + 1;
  const nextYear =
    currentDate.getMonth() === 11
      ? currentDate.getFullYear() + 1
      : currentDate.getFullYear();
  const remainingDays = 42 - days.length;

  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      year: nextYear,
      month: nextMonth + 1, // 사람 기준
      day: i,
      key: `next-${index}`,
      state: "next",
      data: [],
      index: index++,
      date: format(
        set(new Date(0), {year: nextYear, month: nextMonth, date: i}),
        "yyyy-MM-dd",
      ),
    });
  }

  return days;
};
