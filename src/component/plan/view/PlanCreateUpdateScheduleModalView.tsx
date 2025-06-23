import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import BasicInput from "@component/common/input/BasicInput";
import BasicTextarea from "@component/common/textarea/BasicTextarea";
import "@styles/reactDataRange.css";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useFormContext } from "react-hook-form";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
type SubmitDataWithId = {
  id: number;
  content: string;
  title: string;
  planScheduleCategory: number;
  status: string;
};
type SubmitDataWithoutId = {
  content: string;
  title: string;
  planScheduleCategory: number;
  status: string;
};

interface IPlanCreateUpdateScheduleModalViewBase<T extends boolean> {
  scheduleCategoryList: IPlanScheduleCategory[];
  selectCalendarCategory: (data: IPlanScheduleCategory) => void;
  selectCategoryId: number;
  calendarDate: [
    {
      startDate: Date;
      endDate: Date;
      key: string;
    },
  ];
  changeDateRangePicker: (rangesByKey: RangeKeyDict) => void;
  windowWidth: number;
  changeShowDate: ({year, month}: {year: number; month: number}) => void;
  year: number;
  month: number;
  isEdit?: T;
  data?: T extends true ? IPlanScheduleObject | IPlanSchedule : undefined;
  onClickSubmit: T extends true
    ? (data: SubmitDataWithId) => void
    : (data: SubmitDataWithoutId) => void;
  onClickErrorSubmit: (error: any) => void;
}

const PlanCreateUpdateScheduleModalView = <T extends boolean>(
  props: IPlanCreateUpdateScheduleModalViewBase<T>,
) => {
  const [isFoldCalendar, setIsFoldCalendar] = useState(false);
  const { formState, handleSubmit, setValue, getValues } = useFormContext();

  const statuses = [
    {value: "PLANNED", label: "예정"},
    {value: "PROGRESS", label: "진행중"},
    {value: "COMPLETED", label: "완료"},
    {value: "HOLD", label: "보류"},
    {value: "CANCELED", label: "취소"},
    {value: "REVIEW", label: "검토중"},
    {value: "DELAYED", label: "지연"},
  ];

  return (
    <div className={"flex w-full flex-col gap-y-2"}>
      <h2 className={"text-[1.5rem] font-bold default-flex"}>
        {props.isEdit ? "일정 수정" : "일정 생성"}
      </h2>
      <section className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex h-[2.75rem] items-center rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
          카테고리
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-[1rem] pt-2 text-[1.2rem]">
          {props.scheduleCategoryList.map((i) => (
            <button
              key={i.name}
              onClick={() => props.selectCalendarCategory(i)}
              className={` ${i.backgroundColor} h-btn-md rounded-[1rem] p-2 default-flex ${props.selectCategoryId == i.id && "animate-updown"} ${"text-" + i.backgroundColor.split("-")[1] + "-contrast"} overflow-hidden text-ellipsis whitespace-nowrap`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </section>
      <section className="flex min-h-[4rem] flex-col gap-y-2 p-2 primary-border-radius">
        <div className="flex h-[2.75rem] items-center gap-x-2 rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
          진행 상황
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-3 md:grid-cols-4">
          {statuses.map((statusOption) => (
            <ThemeActiveButton1
              key={statusOption.value}
              onClick={() =>
                setValue("status", statusOption.value, {shouldValidate: true})
              }
              className={
                "h-btn-md rounded-2xl border px-1 text-sm font-medium transition"
              }
              isActive={statusOption.value === getValues("status")}
            >
              {statusOption.label}
            </ThemeActiveButton1>
          ))}
        </div>
      </section>
      <section className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex items-center gap-x-2 rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
          기간
          <div className={"flex justify-center text-[1rem]"}>
            (<span>{format(props.calendarDate[0].startDate, "yy.MM.dd")}</span>
            {format(props.calendarDate[0].startDate, "yy.MM.dd") !=
              format(props.calendarDate[0].endDate, "yy.MM.dd") && (
              <span>{format(props.calendarDate[0].endDate, "~ yy.MM.dd")}</span>
            )}
            )
          </div>
          <button
            onClick={() => setIsFoldCalendar((prev) => !prev)}
            className="h-btn-md"
          >
            {isFoldCalendar ? (
              <FiMaximize2 size="28" />
            ) : (
              <FiMinimize2 size="28" />
            )}
          </button>
        </div>
        <div
          className={`flex flex-col items-center gap-[1.875rem] bg-default-1 ${isFoldCalendar ? "h-0 overflow-hidden outline-none" : "mt-[1rem]"}`}
        >
          <div className="relative">
            <DateRangePicker
              onChange={props.changeDateRangePicker}
              // maxDate={add(new Date(), { years: 1 })}
              showDateDisplay={false}
              onPreviewChange={undefined}
              preview={undefined}
              months={2}
              ranges={props.calendarDate}
              locale={ko}
              direction={props.windowWidth > 880 ? "horizontal" : "vertical"}
              rangeColors={["#00B488", "#F2FAF7"]}
              // color={"#ff0000"}
              onShownDateChange={(e) => {
                props.changeShowDate({
                  year: e.getFullYear(),
                  month: e.getMonth() + 1,
                });
              }}
              className="[&_.rdrDayNumber_span]:text-contrast-1 [&_.rdrDayPassive_span]:!text-gray-40 [&_.rdrMonthAndYearWrapper]:bg-default-1 [&_.rdrMonth]:bg-default-1"
            />
            <div
              className={
                "absolute left-[50%] top-6 translate-x-[-50%] font-semibold min-[880px]:left-[25%]"
              }
            >
              {props.year}.{props.month}
            </div>
            <div
              className={
                "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[880px]:left-[75%] min-[880px]:top-6"
              }
            >
              {props.year + Math.floor((props.month + 1) / 12)}.
              {(props.month % 12) + 1}
            </div>
          </div>
        </div>
      </section>
      <div className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex h-[2.75rem] items-center justify-between rounded-[1rem] bg-primary-20 pl-1 pr-2 text-[1.2rem] font-bold">
          <span> 제목 </span>
          <span className="text-sm">{getValues("title").length} / 30</span>
        </div>
        <BasicInput
          onChange={(e) =>
            setValue("title", e.target.value, {shouldValidate: true})
          }
          defaultValue={props.data?.title}
          className={"mt-[1rem] h-[2.75rem] w-full rounded-[1rem] px-1"}
          maxLength={30}
          placeholder="제목"
        />
      </div>
      <section className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex h-[2.75rem] items-center justify-between rounded-[1rem] bg-primary-20 pl-1 pr-2 text-[1.2rem] font-bold">
          <span> 내용 </span>
          {/* <span className="text-sm">{getValues("content").length} / 255</span> */}
        </div>
        <BasicTextarea
          onChange={(e) =>
            setValue("content", e.target.value, {shouldValidate: true})
          }
          defaultValue={props.data?.content}
          className={
            "mt-[1rem] min-h-[16rem] w-full rounded-[1rem] p-1 px-1 primary-border"
          }
          placeholder="내용"
        />
      </section>
      <ThemeButton1
        className={"h-[3rem] px-8 py-2 default-flex"}
        disabled={!formState.isValid}
        onClick={handleSubmit(
          props.onClickSubmit as any,
          props.onClickErrorSubmit,
        )}
      >
        {props.isEdit ? "일정 수정하기" : "일정 생성하기"}
      </ThemeButton1>
    </div>
  );
};
export default PlanCreateUpdateScheduleModalView;