import { format } from "date-fns-tz";

interface IPlanHomeTodaySchedule {
  scheduleList: IPlanSchedule[];
}
const PlanHomeTodaySchedule = (props: IPlanHomeTodaySchedule) => {
  const todayString = format(new Date(), "yyyy-MM-dd");

  const todayScheduleList = props.scheduleList.filter((i) => {
    if (
      i.scheduleStartDate.substring(0, 10) <= todayString &&
      i.scheduleEndDate.substring(0, 10) >= todayString
    ) {
      return true;
    }
    return false;
  });

  if (todayScheduleList.length == 0) {
    return (
      <div className="h-[10rem] w-full default-flex">
          오늘은 일정이 없습니다.
      </div>)
    ;
  }
  return (
    <ul className=" flex h-full w-full flex-col gap-y-2 overflow-y-scroll rounded-[1rem] ">
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
    </ul>
  );
};
export default PlanHomeTodaySchedule;
