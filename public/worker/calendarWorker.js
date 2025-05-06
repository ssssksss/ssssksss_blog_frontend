// public/calendarWorker.js
self.onmessage = function (e) {
  const currentDate = new Date(e.data);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const previousMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

  const days = [];
  let num = 0;

  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const year = currentDate.getMonth() === 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
    const month = currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
    const day = previousMonthDays - i;
    days.push({ year, month, day, key: `prev-${i}`, state: "prev", data: [], index: num++ });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: i,
      key: `${i}`,
      state: "",
      data: [],
      index: num++,
    });
  }

  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const year = currentDate.getMonth() === 11 ? currentDate.getFullYear() + 1 : currentDate.getFullYear();
    const month = currentDate.getMonth() === 11 ? 1 : currentDate.getMonth() + 2;
    days.push({ year, month, day: i, key: `next-${i}`, state: "next", data: [], index: num++ });
  }

  self.postMessage(days);
};
