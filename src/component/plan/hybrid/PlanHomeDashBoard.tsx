"use client";

import LottieAuthLock from "@component/common/lottie/LottieAuthLock";
import usePlanStore from "@store/planStore";
import useUserStore from "@store/userStore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Loading from "src/app/loading";

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
  const [activeMenu, setActiveMenu] = useState({
    left: "center",
    top: "center",
  });
  const userStore = useUserStore();
  const planStore = usePlanStore();

  useEffect(() => {
    planStore.setScheduleList(props.data);
  }, []);

  if (userStore.id == 0) {
    return (
      <Loading />
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
      className={`grid h-full w-[calc(100%-0.5rem)] p-2 ${
        activeMenu.left == "center"
          ? "grid-cols-2"
          : activeMenu.left == "left"
            ? "grid-cols-[1fr_0fr]"
            : "grid-cols-[0fr_1fr]"
      } gap-x-2 transition-transform duration-300`}
    >
      <div
        className={`h-full w-full ${
          activeMenu.top == "center"
            ? "flex flex-col overflow-y-scroll"
            : activeMenu.top == "top"
              ? "grid grid-rows-[1fr_0fr]"
              : "grid grid-rows-[0fr_1fr]"
        } gap-y-2 transition-transform duration-300`}
      >
        <article
          className={`overflow-y-scroll rounded-[1rem] bg-yellow-20 ${activeMenu.top == "bottom" ? "h-0 overflow-hidden" : "h-fit min-h-fit"} ${activeMenu.left == "right" ? "w-0" : "w-full"} shadow-md`}
          style={{
            transform: activeMenu.left == "center" ? "scale(1)" : "scale(0.98)",
            transition: "transform 1.2s",
          }}
        >
          <h2
            className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg"
            onClick={() =>
              setActiveMenu((prev) => ({
                left: activeMenu.left == "center" ? "left" : "center",
                top: activeMenu.top == "center" ? "top" : "center",
              }))
            }
          >
            달력
          </h2>
          <PlanHomeCalendar />
        </article>

        <article
          className={`overflow-y-scroll rounded-[1rem] bg-red-20 ${activeMenu.top == "top" ? "h-0 overflow-hidden" : "h-full min-h-[17.5rem]"} ${activeMenu.left == "right" ? "w-0" : "w-full"} shadow-md`}
          style={{
            transform: activeMenu.left == "center" ? "scale(1)" : "scale(0.98)",
            transition: "transform 1.2s",
          }}
        >
          <h2
            className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg"
            onClick={() =>
              setActiveMenu((prev) => ({
                left: activeMenu.left == "center" ? "left" : "center",
                top: activeMenu.top == "center" ? "bottom" : "center",
              }))
            }
          >
            오늘의 일정
          </h2>
          <PlanHomeTodaySchedule />
        </article>
      </div>

      <div
        className={`h-full w-full transition-transform duration-300 ${
          activeMenu.top == "center"
            ? "flex flex-col overflow-y-scroll"
            : activeMenu.top == "top"
              ? "grid grid-rows-[1fr_0fr]"
              : "grid grid-rows-[0fr_1fr]"
        } gap-y-2`}
      >
        <article
          className={`relative h-full overflow-y-scroll rounded-[1rem] bg-blue-20 scrollbar-hide ${activeMenu.left == "left" ? "w-0" : "w-full"} shadow-md`}
          style={{
            transform: activeMenu.left == "center" ? "scale(1)" : "scale(0.98)",
            transition: "transform 1.2s",
          }}
        >
          <h2
            className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg"
            onClick={() =>
              setActiveMenu((prev) => ({
                left: activeMenu.left == "center" ? "right" : "center",
                top: activeMenu.top == "center" ? "top" : "center",
              }))
            }
          >
            메모장
          </h2>
          <PlanHomeMemo
            isActive={activeMenu.left == "right" && activeMenu.top == "top"}
          />
        </article>

        <article
          className={`rounded-[1rem] bg-green-20 ${activeMenu.top == "top" ? "h-0 overflow-hidden" : "h-fit min-h-fit"} ${activeMenu.left == "left" ? "w-0 overflow-hidden" : "w-full"} shadow-md`}
          style={{
            transform: activeMenu.left == "center" ? "scale(1)" : "scale(0.98)",
            transition: "transform 1.2s",
          }}
        >
          <h2
            className="h-[3rem] py-2 text-center font-gmarketSansBold text-lg"
            onClick={() =>
              setActiveMenu((prev) => ({
                left: activeMenu.left == "center" ? "right" : "center",
                top: activeMenu.top == "center" ? "bottom" : "center",
              }))
            }
          >
            오늘의 날씨(서울)
          </h2>
          <PlanHomeWeather />
        </article>
      </div>
    </section>
  );
};
export default PlanHomeDashBoard;
