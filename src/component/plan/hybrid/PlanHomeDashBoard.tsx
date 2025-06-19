import PlanHomeCalendar from "./PlanHomeCalendar";
import PlanHomeTodaySchedule from "./PlanHomeTodaySchedule";
import PlanHomeWeather from "./PlanHomeWeather";

interface IPlanDashBoard {
  data: IPlanSchedule[];
}
const PlanHomeDashBoard = (props: IPlanDashBoard) => {
  
  return (
    <section
      className={
        "flex w-full flex-col gap-2 p-2 text-black-80 transition-transform duration-300"
      }
    >
      <article className={"rounded-[1rem] bg-green-20 p-1 shadow-md"}>
        <h2 className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg">
          오늘의 날씨(서울)
        </h2>
        <PlanHomeWeather />
      </article>

      <article className={"rounded-[1rem] bg-yellow-20 p-1 shadow-md"}>
        <PlanHomeCalendar scheduleList={props.data} />
      </article>

      <article className={"rounded-[1rem] bg-red-20 p-1 shadow-md"}>
        <PlanHomeTodaySchedule scheduleList={props.data} />
      </article>
    </section>
  );
};
export default PlanHomeDashBoard;
