import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import usePlanStore from "@store/planStore";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { parse } from "date-fns";
import { format } from "date-fns-tz";
import Image from "next/image";
import { useEffect, useState } from "react";
import PlanCalendarItem from "./PlanCalendarItem";
import PlanCalendarItemInfoModal from "./PlanCalendarItemInfoModal";
import {
  default as PlanCreateSchedule,
  default as PlanCreateScheduleModal,
} from "./PlanCreateScheduleModal";
import PlanScheduleCategoryModal from "./PlanScheduleCategoryModal";

const PlanScheduleMonthBox = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const planStore = usePlanStore();
  const {loading, startLoading, stopLoading} = useLoading(true);

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
    startLoading();
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
    startLoading();
  };

  useEffect(() => {
    const temp = async () => {
      const response = await fetch("/api/plan/schedule/category", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        planStore.setScheduleCategory([]);
        return;
      }
      const result: ResReadPlanScheduleCategoryList = await response.json();
      planStore.setScheduleCategory(result.data);
    };
    temp();
  }, []);

  // 일정 리스트 조회
  useEffect(() => {
    const days: ICalendarItem[] = createScheduleCalendar(currentDate);
    const scheduleStartDate = parse(
      days[0].year +
        days[0].month.toString().padStart(2, "0") +
        days[0].day.toString().padStart(2, "0"),
      "yyyyMMdd",
      new Date(),
    ).toISOString();
    const scheduleEndDate = parse(
      days[days.length - 1].year +
        days[days.length - 1].month.toString().padStart(2, "0") +
        days[days.length - 1].day.toString().padStart(2, "0"),
      "yyyyMMdd",
      new Date(),
    ).toISOString();

    const temp = async () => {
      const response = await fetch(
        `/api/plan/schedule?scheduleStartDate=${scheduleStartDate}&scheduleEndDate=${scheduleEndDate}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        planStore.setScheduleCategory([]);
        planStore.setCalendar(createScheduleCalendar(currentDate));
        stopLoading();
        return;
      }
      const result: ResReadPlanScheduleList = await response.json();
      const data = result.data;
      const t = scheduleSort(
        data,
        format(new Date(scheduleStartDate), "yyyy-MM-dd HH:mm:ss"),
        format(new Date(scheduleEndDate), "yyyy-MM-dd HH:mm:ss"),
      );
      // const t = scheduleSort(
      //   data,
      //   format(addHours(new Date(scheduleStartDate), 9), "yyyy-MM-dd HH:mm:ss"),
      //   format(addHours(new Date(scheduleEndDate), 9), "yyyy-MM-dd HH:mm:ss"),
      // );
      t.result.forEach((schedule) => {
        days[schedule.index].data.push(schedule);
      });
      planStore.setCalendar(days);
      planStore.setMaxLayer(t.maxLayer);
      planStore.setScheduleList(data);
      stopLoading();
    };
    temp();
  }, [currentDate]);

  return (
    <div
      className={
        "mt-2 flex h-auto w-full flex-col rounded-t-[1rem] p-2 outline outline-offset-[-0.0625rem] outline-primary-20"
      }
    >
      <LoadingSpinner loading={loading} />
      <div className={"flex gap-x-2 border-b-[0.0625rem] pb-1"}>
        <ModalButton
          modal={<PlanCreateScheduleModal />}
          buttonClassName={
            "hover:bg-gradient default-primary-outline px-2 py-[0.125rem] flex items-center gap-x-1"
          }
        >
          <div className={"relative h-6 w-6 default-flex"}>
            <Image alt="" src="/images/icons/ic-calendar.svg" fill />
          </div>
          <span> + </span>
        </ModalButton>
        <NestedModalButton
          modal={<PlanScheduleCategoryModal />}
          buttonClassName={
            "hover:bg-gradient default-primary-outline px-2 py-[0.125rem]"
          }
        >
          <div className={"relative h-4 w-4 default-flex"}>
            <Image alt="" src="/images/icons/ic-list.svg" fill />
          </div>
        </NestedModalButton>
      </div>
      <div className="mx-auto mt-2 w-full">
        <div className="mb-4 flex items-center justify-center gap-x-2">
          <Button
            onClick={prevMonth}
            className={"aspect-square w-[1.5rem] default-primary-outline"}
          >
            {"<"}
          </Button>
          <h2 className="font-semibold max-[440px]:text-sm">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            onClick={nextMonth}
            className={"aspect-square w-[1.5rem] default-primary-outline"}
          >
            {">"}
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className="min-h-[2rem] text-center font-bold default-primary-outline default-flex"
            >
              {day}
            </div>
          ))}
        </div>
        <ModalButton
          buttonClassName="w-full grid grid-cols-7 mt-1"
          modal={<PlanCreateSchedule />}
        >
          {planStore.calendar.map((i, index) => (
            <PlanCalendarItem
              key={i.key}
              state={i.state}
              date={format(new Date(i.year, i.month - 1, i.day), "yyyy-MM-dd")}
              day={i.day}
              data={i.data}
              maxLayer={planStore.scheduleCalendarMaxLayer}
            />
          ))}
        </ModalButton>
      </div>
      <section className="mt-2 flex h-[25rem] max-h-[25rem] w-full flex-col gap-y-2 overflow-y-scroll p-2 default-primary-outline">
        {planStore.scheduleList.map((i) => (
          <NestedModalButton
            key={i.id}
            buttonClassName={"flex w-full flex-col gap-y-2 p-2 default-primary-outline"}
            modal={<PlanCalendarItemInfoModal data={i} />}
          >
            <div className="w-full flex justify-between ">
              <span className="text-sm text-black-80">
                {format(i.scheduleStartDate, "yyyy-MM-dd")} ~
                {format(i.scheduleEndDate, "yyyy-MM-dd")}
              </span>
              <span
                className={`${i.scheduleCategoryBackgroundColor} rounded-2xl px-4`}
              >
                {i.scheduleCategoryName}
              </span>
            </div>
            <p className="w-full text-start overflow-hidden text-ellipsis whitespace-nowrap">
              {i.title}
            </p>
          </NestedModalButton>
        ))}
      </section>
    </div>
  );
};
export default PlanScheduleMonthBox;
