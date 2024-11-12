import usePlanStore from "@store/planStore";
import {format} from "date-fns";

interface IPlanHomeTodaySchedule {}
const PlanHomeTodaySchedule = (props: IPlanHomeTodaySchedule) => {
  const todayString = format(new Date(), "yyyy-MM-dd");
  const planStore = usePlanStore();

  return (
    <ul className="flex h-[calc(100%-3rem)] w-full flex-col gap-y-2 overflow-y-scroll rounded-[1rem] glassmorphism">
      {planStore.scheduleList
        .filter((i) => {
          if (
            i.scheduleStartDate.substring(0, 10) <= todayString &&
            i.scheduleEndDate.substring(0, 10) >= todayString
          ) {
            return true;
          }
          return false;
        })
        .map((j) => (
          <li
            key={j.id}
            className="flex h-auto w-full flex-col gap-y-1 rounded-[1rem] p-2 shadow-xl glassmorphism">
            <div
              className={`text-white w-fit rounded-full ${j.scheduleCategoryBackgroundColor} text-md px-2 py-1 font-medium`}>
              {j.scheduleCategoryName}
            </div>
            <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold text-gray-800">
              {j.title}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="break-all text-sm text-gray-600 sm:flex sm:gap-x-2">
                <div>{format(new Date(j.scheduleStartDate), "yyyy-MM-dd")}</div>
                <div className="hidden sm:block"> ~ </div>
                <div>{format(new Date(j.scheduleEndDate), "yyyy-MM-dd")}</div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
};
export default PlanHomeTodaySchedule;
