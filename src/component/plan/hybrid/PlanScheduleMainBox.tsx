"use client";

import Button from "@component/common/button/hybrid/Button";
import useUserStore from "@store/userStore";
import dynamic from "next/dynamic";
import { useState } from "react";

const PlanScheduleMonthBox = dynamic(() => import("./PlanScheduleMonthBox"), {
  ssr: false,
});

const LottieAuthLock = dynamic(
  () => import("@component/common/lottie/LottieAuthLock"),
  {
    ssr: false,
  },
);

const LoadingSpinner = dynamic(
  () => import("@component/common/spinner/LoadingSpinner"),
  {
    ssr: false,
  },
);

interface IPlanScheduleMainBox {}
const PlanScheduleMainBox = (props: IPlanScheduleMainBox) => {
  const [dateType, setDateType] = useState("month");
  const userStore = useUserStore();

  if (userStore.id == 0) {
    return (
      <div className="min-h-full w-full default-flex">
        <LoadingSpinner loading={true} />
      </div>
    );
  }

  if (userStore.id < 1) {
    return (
      <div className="min-h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <div className={"flex h-full w-full flex-col pt-2 max-[440px]:text-xs"}>
      <div className="flex h-[2rem] flex-shrink-0">
        <Button
          onClick={() => setDateType("year")}
          disabled={true}
          className={`h-full w-full rounded-l-[1rem] outline outline-[0.0625rem] outline-primary-60 disabled:bg-gray-80 ${dateType == "year" && "bg-primary-20"}`}>
          연
        </Button>
        <Button
          onClick={() => setDateType("month")}
          className={`h-full w-full outline outline-[0.0625rem] outline-primary-60 ${dateType == "month" && "bg-primary-20"}`}>
          월
        </Button>
        <Button
          disabled={true}
          onClick={() => setDateType("week")}
          className={`h-full w-full outline outline-[0.0625rem] outline-primary-60 disabled:bg-gray-80 ${dateType == "week" && "bg-primary-20"}`}>
          주
        </Button>
        <Button
          onClick={() => setDateType("day")}
          disabled={true}
          className={`h-full w-full rounded-r-[1rem] outline outline-[0.0625rem] outline-primary-60 disabled:bg-gray-80 ${dateType == "day" && "bg-primary-20"}`}>
          일
        </Button>
      </div>
      {dateType == "month" && <PlanScheduleMonthBox />}
    </div>
  );
};
export default PlanScheduleMainBox;
