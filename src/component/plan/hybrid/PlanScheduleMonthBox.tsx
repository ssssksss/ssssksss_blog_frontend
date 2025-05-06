import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useCalendarWorker from "@hooks/useCalendarWorker";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
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
  const {calendarData} = useCalendarWorker(currentDate);
  const planStore = usePlanStore();
  const fetchCSR = useFetchCSR();

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  useEffect(() => {
    const temp = async () => {
      const result = await fetchCSR.requestWithHandler({
        url: "/api/plan/schedule/category",
        method: "GET",
      });
      planStore.setScheduleCategory(result ?? []);
    };
    temp();
  }, []);

  // 일정 리스트 조회
  useEffect(() => {
    const days: ICalendarItem[] = calendarData;
    if (days.length == 0) return;
    const calendarStartDate = parse(
      days[0].year +
        days[0].month.toString().padStart(2, "0") +
        days[0].day.toString().padStart(2, "0"),
      "yyyyMMdd",
      new Date(),
    ).toISOString();
    const calendarEndDate = parse(
      days[days.length - 1].year +
        days[days.length - 1].month.toString().padStart(2, "0") +
        days[days.length - 1].day.toString().padStart(2, "0"),
      "yyyyMMdd",
      new Date(),
    ).toISOString();

    const temp = async () => {
      const result: IPlanSchedule[] = await fetchCSR.requestWithHandler({
        url: `/api/plan/schedule?scheduleStartDate=${calendarStartDate}&scheduleEndDate=${calendarEndDate}`,
        method: "GET",
      });
      if (result == undefined) {
        planStore.setScheduleCategory([]);
        planStore.setCalendar(days);
        return;
      }
      const t = scheduleSort(
        result,
        format(new Date(calendarStartDate), "yyyy-MM-dd HH:mm:ss"),
        format(new Date(calendarEndDate), "yyyy-MM-dd HH:mm:ss"),
      );
      t.result.forEach((schedule) => {
        days[schedule.index].data.push(schedule);
      });
      planStore.setCalendar(days);
      planStore.setMaxLayer(t.maxLayer);
      planStore.setScheduleList(result);
    };
    temp();
  }, [calendarData]);

  return (
    <div
      className={
        "-border-offset-[0.0625rem] mt-2 flex h-auto w-full flex-col rounded-t-[1rem] p-2 outline outline-primary-20"
      }
    >
      {/* <LoadingSpinner loading={loading} /> */}
      <section className={"flex gap-x-2 border-b-[0.0625rem] pb-1"}>
        <ModalButton
          modal={<PlanCreateScheduleModal />}
          buttonClassName={
            "hover:bg-gradient primary-border-radius px-2 py-[0.125rem] flex items-center gap-x-1"
          }
        >
          <div className={"relative h-6 w-6 default-flex"}>
            <Image alt="달력 아이콘" src="/images/icons/ic-calendar.svg" fill />
          </div>
          <span> + </span>
        </ModalButton>
        <NestedModalButton
          modal={<PlanScheduleCategoryModal />}
          buttonClassName={
            "hover:bg-gradient primary-border-radius px-2 py-[0.125rem]"
          }
        >
          <div className={"relative h-4 w-4 default-flex"}>
            <Image
              alt="카테고리 목록 아이콘"
              src="/images/icons/ic-list.svg"
              fill
            />
          </div>
        </NestedModalButton>
      </section>
      {/* 월간 달력 UI */}
      <section className="mx-auto mt-2 min-h-[41.25rem] w-full">
        <div className="mb-4 flex items-center justify-center gap-x-2">
          <Button
            onClick={prevMonth}
            className={"aspect-square w-[1.5rem] primary-border-radius"}
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
            className={"aspect-square w-[1.5rem] primary-border-radius"}
          >
            {">"}
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <div
              key={day}
              className="min-h-[2rem] text-center font-bold primary-border-radius default-flex"
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
              key={format(new Date(i.year, i.month - 1, i.day), "yyyy-MM-dd")}
              state={i.state}
              date={format(new Date(i.year, i.month - 1, i.day), "yyyy-MM-dd")}
              day={i.day}
              data={i.data}
              maxLayer={planStore.scheduleCalendarMaxLayer}
            />
          ))}
        </ModalButton>
      </section>
      {/* TODO : 이 부분은 Lazy Load해서 LCP 줄이기 */}
      {/* 하단에 일정 목록 보여주는 UI */}
      <section className="mt-2 flex h-[25rem] w-full flex-col gap-y-2 overflow-hidden overflow-y-scroll p-2 scrollbar-hide primary-border-radius">
        {planStore.scheduleList.map((i) => (
          <NestedModalButton
            key={i.id}
            buttonClassName={
              "flex w-full flex-col gap-y-2 p-2 primary-border-radius"
            }
            modal={<PlanCalendarItemInfoModal data={i} />}
          >
            <div className="flex w-full justify-between">
              <span className="text-sm text-black-80">
                {format(i.scheduleStartDate, "yyyy-MM-dd")} ~
                {format(i.scheduleEndDate, "yyyy-MM-dd")}
              </span>
              <span
                className={`${i.scheduleCategoryBackgroundColor} rounded-2xl px-4 default-flex ${
                  "text-" +
                  i.scheduleCategoryBackgroundColor.split("-")[1] +
                  "-contrast"
                }`}
              >
                {i.scheduleCategoryName}
              </span>
            </div>
            <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-start">
              {i.title}
            </p>
          </NestedModalButton>
        ))}
      </section>
    </div>
  );
};
export default PlanScheduleMonthBox;
