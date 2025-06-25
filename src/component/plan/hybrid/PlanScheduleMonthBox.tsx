import Button from "@component/common/button/hybrid/Button";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useCalendarWorker from "@hooks/useCalendarWorker";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
import { scheduleSort } from "@utils/function/scheduleSort";
import { format, parse } from "date-fns";
import { format as formatTZ } from "date-fns-tz";
import { useEffect, useState } from "react";
import { FaRegCalendarPlus } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import PlanConvertStatus from "../view/PlanConvertStatus";
import PlanCalendarItem from "./PlanCalendarItem";
import PlanCalendarItemInfoModal from "./PlanCalendarItemInfoModal";
import {
  default as PlanCreateSchedule,
  default as PlanCreateScheduleModal,
} from "./PlanCreateScheduleModal";
import PlanScheduleCategoryModal from "./PlanScheduleCategoryModal";

const Skeleton = ({className}: {className?: string}) => {
  return <div className={`animate-pulse bg-gray-200 ${className}`} />;
};

const PlanScheduleMonthBox = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const {calendarData} = useCalendarWorker(currentDate);
  const planStore = usePlanStore();
  const fetchCSR = useFetchCSR();

  const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);

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

  const prevYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1),
    );
  };

  const nextYear = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1),
    );
  };

  const fetchScheduleCategories = async () => {
    const result = await fetchCSR.requestWithHandler({
      url: "/api/plan/schedule/category",
      method: "GET",
    });
    if (result == undefined) {
      planStore.setScheduleCategory([]);
      return;
    }
    planStore.setScheduleCategory(result);
  };

  const fetchSchedules = async (days: ICalendarItem[]) => {
    if (!days.length) return;
    setIsLoadingSchedules(true);

    // 현재 보이는 날짜를 UTC로 맞추어서 시작날짜와 마지막 날짜를 찾음
    const getISODate = (item: ICalendarItem) =>
      parse(
        `${item.year}${item.month.toString().padStart(2, "0")}${item.day
          .toString()
          .padStart(2, "0")}`,
        "yyyyMMdd",
        new Date(),
      ).toISOString();

    const calendarStartDate = getISODate(days[0]);
    const calendarEndDate = getISODate(days[days.length - 1]);

    const result: IPlanSchedule[] = await fetchCSR.requestWithHandler({
      url: `/api/plan/schedule/list?scheduleStartDate=${calendarStartDate}&scheduleEndDate=${calendarEndDate}`,
      method: "GET",
    });

    if (result == undefined) {
      planStore.setScheduleCategory([]);
      planStore.setCalendar(days);
      setIsLoadingSchedules(false);
      return;
    }

    const sorted = scheduleSort(
      result,
      format(new Date(calendarStartDate), "yyyy-MM-dd HH:mm:ss"),
      format(new Date(calendarEndDate), "yyyy-MM-dd HH:mm:ss"),
    );

    sorted.result.forEach((schedule) => {
      days[schedule.index].data.push(schedule);
    });

    planStore.setCalendar(days);
    planStore.setMaxLayer(sorted.maxLayer);
    planStore.setScheduleList(result);
    setIsLoadingSchedules(false);
  };

  useEffect(() => {
    fetchScheduleCategories();
  }, []);

  useEffect(() => {
    fetchSchedules(calendarData);
  }, [calendarData]);

  return (
    <div className="-border-offset-[0.0625rem] mt-2 flex h-auto w-full flex-col rounded-t-[1rem] p-2 outline outline-primary-100">
      <section className="flex gap-x-2 border-b-[0.0625rem] pb-1">
        <ModalButton
          modal={<PlanCreateScheduleModal />}
          buttonClassName="hover:bg-gradient primary-border-radius h-btn-md px-2 py-[0.125rem] flex items-center gap-x-1"
          ariaLabel="달력카테고리 추가 아이콘"
        >
          <FaRegCalendarPlus size={"24"} />
        </ModalButton>
        <NestedModalButton
          modal={<PlanScheduleCategoryModal />}
          buttonClassName="hover:bg-gradient primary-border-radius h-btn-md  px-2 py-[0.125rem]"
          ariaLabel="카테고리 목록 아이콘"
        >
          <FaRegRectangleList size={"24"} />
        </NestedModalButton>
      </section>

      {/* 월간 달력 UI */}
      <section className="mx-auto mt-2 min-h-[41.25rem] w-full">
        <div className="mb-4 flex items-center justify-center gap-x-2">
          <Button
            onClick={prevYear}
            className="aspect-square w-[1.5rem] primary-border-radius"
          >
            {"<<"}
          </Button>
          <Button
            onClick={prevMonth}
            className="aspect-square w-[1.5rem] primary-border-radius"
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
            className="aspect-square w-[1.5rem] primary-border-radius"
          >
            {">"}
          </Button>
          <Button
            onClick={nextYear}
            className="aspect-square w-[1.5rem] primary-border-radius"
          >
            {">>"}
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

        {isLoadingSchedules ? (
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({length: 42}).map((_, idx) => (
              <Skeleton key={idx} className="h-20 rounded-md bg-gray-100" />
            ))}
          </div>
        ) : (
          <ModalButton
            buttonClassName="w-full grid grid-cols-7 mt-1"
            modal={<PlanCreateSchedule />}
          >
            {planStore.calendar.map((i) => (
              <PlanCalendarItem
                key={format(new Date(i.year, i.month - 1, i.day), "yyyy-MM-dd")}
                state={i.state}
                date={format(
                  new Date(i.year, i.month - 1, i.day),
                  "yyyy-MM-dd",
                )}
                day={i.day}
                data={i.data}
                maxLayer={planStore.scheduleCalendarMaxLayer}
              />
            ))}
          </ModalButton>
        )}
      </section>

      {/* 일정 리스트 */}
      <section className="mt-2 flex h-[25rem] w-full flex-col gap-y-2 overflow-hidden overflow-y-scroll p-2 scrollbar-hide primary-border-radius">
        {isLoadingSchedules
          ? Array.from({length: 5}).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-16 w-full rounded-md bg-gray-100"
            />
          ))
          : planStore.scheduleList.map((i) => (
            <NestedModalButton
              key={i.id}
              buttonClassName="flex w-full flex-col gap-y-2 p-2 primary-border-radius"
              modal={<PlanCalendarItemInfoModal data={i} />}
            >
              <div className="flex w-full justify-between">
                <span className="text-sm ">
                  {formatTZ(i.scheduleStartDate, "yyyy-MM-dd")} ~
                  {formatTZ(i.scheduleEndDate, "yyyy-MM-dd")}
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
              <p className="grid w-full grid-cols-[auto_3rem] overflow-hidden text-ellipsis whitespace-nowrap text-start">
                <span> {i.title} </span>
                <div className="rounded-2xl bg-contrast-1 px-1 text-sm default-flex">
                  <PlanConvertStatus status={i.status} />
                </div>
              </p>
            </NestedModalButton>
          ))}
      </section>
    </div>
  );
};

export default PlanScheduleMonthBox;
