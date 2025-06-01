"use client";

import LottieAuthLock from "@component/common/lottie/LottieAuthLock";
import usePlanStore from "@store/planStore";
import useUserStore from "@store/userStore";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const PlanHomeCalendar = dynamic(() => import("./PlanHomeCalendar"), {
  ssr: false,
});

const PlanHomeMemo = dynamic(() => import("./PlanHomeMemo"), {
  ssr: false,
});

const PlanHomeTodaySchedule = dynamic(() => import("./PlanHomeTodaySchedule"), {
  ssr: false,
});

const PlanHomeWeather = dynamic(() => import("./PlanHomeWeather"), {
  ssr: false,
});

interface IPlanDashBoard {
  data: IPlanSchedule[];
}
const PlanHomeDashBoard = (props: IPlanDashBoard) => {
  const userStore = useUserStore();
  const planStore = usePlanStore();

  useEffect(() => {
    planStore.setScheduleList(props.data);
  }, []);
  if (userStore.id == 0) {
    return (
      <> </>
    );
  }

  if (userStore.id < 1) {
    return (
      <div className="h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <section
      className={
        "grid h-full w-full gap-2 p-2 transition-transform duration-300 text-black-80"
      }
    >
      <article className={"rounded-[1rem] bg-green-20 p-1 shadow-md"}>
        <h2 className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg">
          오늘의 날씨(서울)
        </h2>
        <PlanHomeWeather />
      </article>

      <article className={"rounded-[1rem] bg-yellow-20 p-1 shadow-md"}>
        <PlanHomeCalendar />
      </article>

      <article className={"rounded-[1rem] bg-red-20 p-1 shadow-md"}>
        <PlanHomeTodaySchedule />
      </article>

      <article
        className={
          "h-full rounded-[1rem] bg-blue-20 shadow-md scrollbar-hide"
        }
      >
        <h2 className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg">
          메모장
        </h2>
        <PlanHomeMemo isActive={false} />
      </article>
    </section>
  );
};
export default PlanHomeDashBoard;
