import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { addDays, differenceInDays, format } from "date-fns";

interface ISchedule {
  id: number;
  content: string;
  scheduleCategoryBackgroundColor: string;
  scheduleCategoryId: number;
  scheduleCategoryName: string;
  scheduleEndDate: string;
  scheduleStartDate: string;
  title: string;
}

interface IPlanHomeCalendar {
  scheduleList: IPlanSchedule[];
}

const PlanHomeCalendar = (props: IPlanHomeCalendar) => {
  // 날짜별 일정을 그룹화하는 함수
  const groupSchedulesByDate = (schedules: ISchedule[]) => {
    const grouped: {[key: string]: ISchedule[]} = {};
    schedules.forEach((schedule) => {
      const startDate = format(
        new Date(schedule.scheduleStartDate),
        "yyyy-MM-dd",
      );
      const daysDifference = differenceInDays(
        new Date(schedule.scheduleEndDate),
        new Date(schedule.scheduleStartDate),
      );
      for (let i = 0; i <= daysDifference; i++) {
        const date = format(addDays(new Date(startDate), i), "yyyy-MM-dd");
        if (!grouped[date]) {
          grouped[date] = [];
        }
        grouped[date].push(schedule);
      }
    });
    return grouped;
  };

  const schedulesGroupedByDate = groupSchedulesByDate(props.scheduleList);

  return (
    <div className="flex w-full flex-col gap-y-2 overflow-y-scroll min-h-[13.5rem] rounded-[1rem] glassmorphism">
      <div className="mx-auto mt-2 w-full p-1">
        <div className="mb-2 flex items-center justify-center gap-x-2 ">
          <h2 className="font-semibold max-[440px]:text-sm px-2 py-1">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>
        <div className="grid grid-cols-7 gap-1 py-2">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className={`min-h-[2rem] rounded-[0.5rem] text-center font-bold outline outline-2 outline-offset-[-1px] outline-black-40 default-flex ${
                day == "토" ? "text-blue-100" : day == "일" && "text-red-60"
              }`}
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 rounded-[1rem] py-2 outline outline-1 outline-offset-[-1px] outline-black-40">
          {createScheduleCalendar(new Date()).map((i) => (
            <div
              key={i.key}
              className={`flex min-h-[2rem] flex-col items-center ${
                i.date == format(new Date(), "yyyy-MM-dd") &&
                "rounded-2xl outline outline-1 outline-black-40 glassmorphism"
              } ${
                (i.index + 1) % 7 == 0
                  ? "text-blue-100"
                  : (i.index + 1) % 7 == 1 && "text-red-60"
              }`}
            >
              <span className="mb-1">{i.day}</span>
              {schedulesGroupedByDate[i.date] && (
                <div className="flex flex-wrap gap-1 px-2 pb-2">
                  {schedulesGroupedByDate[i.date].map((schedule, idx) => (
                    <div
                      key={schedule.id}
                      className={`h-1.5 w-1.5 rounded-full ${schedule.scheduleCategoryBackgroundColor}`}
                      title={schedule.title}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanHomeCalendar;
