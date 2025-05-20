"use client";

import useUserStore from "@store/userStore";
import dynamic from "next/dynamic";

const LottieAuthLock = dynamic(
  () => import("@component/common/lottie/LottieAuthLock"),
  {
    ssr: false,
  },
);

const PlanScheduleMonthBox = dynamic(
  () => import("@component/plan/hybrid/PlanScheduleMonthBox"),
  {
    ssr: false,
  },
);

interface IPlanScheduleMainBox {}
const PlanScheduleMainBox = (props: IPlanScheduleMainBox) => {
  const userStore = useUserStore();

  if (userStore.id == 0) {
    return <></>;
  }

  if (userStore.id < 1) {
    return (
      <div className="h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <div
      className={
        "flex h-full w-full flex-col bg-default-1 px-1 pt-2 max-[440px]:text-xs"
      }
    >
      <PlanScheduleMonthBox />
    </div>
  );
};
export default PlanScheduleMainBox;
