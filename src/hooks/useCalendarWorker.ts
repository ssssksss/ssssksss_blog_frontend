import { useEffect, useState } from "react";

const useCalendarWorker = (currentDate: Date) => {
  const [calendarData, setCalendarData] = useState<ICalendarItem[]>([]);

  useEffect(() => {
    const worker = new Worker("/worker/calendarWorker.js");
    worker.postMessage(currentDate);
    worker.onmessage = (e) => {
      setCalendarData(e.data);
      worker.terminate();
    };

    return () => {
      worker.terminate(); // 날짜 변경되면 이전 워커 종료
    };
  }, [currentDate]); // currentDate 변경 시 재실행

  return {calendarData};
};

export default useCalendarWorker;
