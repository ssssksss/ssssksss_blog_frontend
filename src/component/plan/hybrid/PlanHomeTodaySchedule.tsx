import usePlanStore from "@store/planStore";
import { format } from "date-fns-tz";

interface IPlanHomeTodaySchedule {}
const PlanHomeTodaySchedule = (props: IPlanHomeTodaySchedule) => {
  const todayString = format(new Date(), "yyyy-MM-dd");
  const planStore = usePlanStore();

  const todayScheduleList = planStore.scheduleList.filter((i) => {
    if (
      i.scheduleStartDate.substring(0, 10) <= todayString &&
      i.scheduleEndDate.substring(0, 10) >= todayString
    ) {
      return true;
    }
    return false;
  });

  return (
    <ul className="flex min-h-[5rem] h-full w-full flex-col gap-y-2 overflow-y-scroll rounded-[1rem] glassmorphism">
      {todayScheduleList?.map((j) => (
        <li
          key={j.id}
          className="flex h-auto w-full flex-col gap-y-1 rounded-[1rem] p-2 shadow-xl glassmorphism"
        >
          <div className="flex w-full justify-between">
            <span className="text-sm text-black-80">
              {format(j.scheduleStartDate, "yyyy-MM-dd")} ~
              {format(j.scheduleEndDate, "yyyy-MM-dd")}
            </span>
            <span
              className={`${j.scheduleCategoryBackgroundColor} rounded-2xl px-4 default-flex ${
                "text-" +
                j.scheduleCategoryBackgroundColor.split("-")[1] +
                "-contrast"
              }`}
            >
              {j.scheduleCategoryName}
            </span>
          </div>
          <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start">
            {j.title}
          </p>
        </li>
      ))}
      {todayScheduleList.length == 0 && <div className="w-full h-full default-flex"> 오늘은 일정이 없습니다. </div>}
    </ul>
  );
};
export default PlanHomeTodaySchedule;
