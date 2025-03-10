"use client";

import Button from "@component/common/button/hybrid/Button";
import useUserStore from "@store/userStore";
import dynamic from "next/dynamic";
import { useState } from "react";
import Loading from "src/app/loading";
import PlanScheduleMonthBox from "./PlanScheduleMonthBox";

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
    return <Loading />;
  }

  if (userStore.id < 1) {
    return (
      <div className="h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <div className={"flex h-full w-full flex-col pt-2 px-1 max-[440px]:text-xs"}>
      <div className="flex h-[2rem] flex-shrink-0">
        <Button
          onClick={() => setDateType("year")}
          disabled={true}
          className={`h-full w-full primary-border-radius disabled:bg-gray-80 ${dateType == "year" && "primary-set"} hover:cursor-not-allowed`}
        >
          연
        </Button>
        <Button
          onClick={() => setDateType("month")}
          className={`h-full w-full primary-border-radius ${dateType == "month" && "primary-set"}`}
        >
          월
        </Button>
        <Button
          disabled={true}
          onClick={() => setDateType("week")}
          className={`h-full w-full primary-border-radius disabled:bg-gray-80 ${dateType == "week" && "primary-set"} hover:cursor-not-allowed`}
        >
          주
        </Button>
        <Button
          onClick={() => setDateType("day")}
          disabled={true}
          className={`h-full w-full primary-border-radius disabled:bg-gray-80 ${dateType == "day" && "primary-set"} hover:cursor-not-allowed`}
        >
          일
        </Button>
      </div>
      {dateType == "month" && <PlanScheduleMonthBox />}
    </div>
  );
};
export default PlanScheduleMainBox;
