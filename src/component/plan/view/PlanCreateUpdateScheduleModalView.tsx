import ThemeButton1 from "@component/common/button/ThemeButton1";
import BasicInput from "@component/common/input/BasicInput";
import BasicTextarea from "@component/common/textarea/BasicTextarea";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useFormContext } from "react-hook-form";

type SubmitDataWithId = {
  id: number;
  content: string;
  title: string;
  planScheduleCategory: number;
};
type SubmitDataWithoutId = {
  content: string;
  title: string;
  planScheduleCategory: number;
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
  const {formState, handleSubmit, setValue, getValues} = useFormContext();

  return (
    <div className={"flex w-full flex-col gap-y-2"}>
      <h2 className={"text-[1.5rem] font-bold default-flex"}>
        일정 {props.isEdit ? "수정" : "생성"}
      </h2>
      <div className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
          카테고리
        </div>
        <div className="flex h-[3rem] items-center gap-x-2 rounded-[1rem] p-1 text-[1.2rem] font-bold">
          {props.scheduleCategoryList.map((i) => (
            <button
              key={i.name}
              onClick={() => props.selectCalendarCategory(i)}
              className={`${i.backgroundColor} h-[2rem] rounded-[1rem] p-2 default-flex ${props.selectCategoryId == i.id && "animate-updown"}`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
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
          <button onClick={() => setIsFoldCalendar((prev) => !prev)}>
            {isFoldCalendar ? (
              <Image
                alt="ic"
                src={"/images/icons/ic-minimize.svg"}
                width={22}
                height={22}
              />
            ) : (
              <Image
                alt="ic"
                src={"/images/icons/ic-maximize.svg"}
                width={22}
                height={22}
              />
            )}
          </button>
        </div>
        <div
          className={`mt-[1rem] flex flex-col items-center gap-[1.875rem] bg-default-1 dynamic-opacity ${isFoldCalendar ? "h-0 overflow-hidden outline-none" : "primary-border-radius"}`}
        >
          <div className="relative">
            <DateRangePicker
              onChange={props.changeDateRangePicker}
              // maxDate={add(new Date(), { years: 1 })}
              showDateDisplay={false}
              months={2}
              ranges={props.calendarDate}
              locale={ko}
              direction={props.windowWidth > 880 ? "horizontal" : "vertical"}
              rangeColors={["#00B488", "#F2FAF7"]}
              color={"#ff0000"}
              onShownDateChange={(e) => {
                props.changeShowDate({
                  year: e.getFullYear(),
                  month: e.getMonth() + 1,
                });
              }}
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
      </div>
      <div className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex items-center justify-between rounded-[1rem] bg-primary-20 pl-1 pr-2 text-[1.2rem] font-bold">
          <span> 제목 </span>
          <span className="text-sm">{getValues("title").length} / 30</span>
        </div>
        <BasicInput
          onChange={(e) =>
            setValue("title", e.target.value, {shouldValidate: true})
          }
          defaultValue={props.data?.title}
          className={"mt-[1rem] h-[2rem] w-full rounded-[1rem] px-1"}
          maxLength={30}
          placeholder="제목"
        />
      </div>
      <div className="min-h-[4rem] flex-shrink-0 p-2 primary-border-radius">
        <div className="flex items-center justify-between rounded-[1rem] bg-primary-20 pl-1 pr-2 text-[1.2rem] font-bold">
          <span> 내용 </span>
          <span className="text-sm">{getValues("content").length} / 255</span>
        </div>
        <BasicTextarea
          onChange={(e) =>
            setValue("content", e.target.value, {shouldValidate: true})
          }
          defaultValue={props.data?.content}
          className={
            "mt-[1rem] min-h-[16rem] w-full resize-none rounded-[1rem] p-1 px-1 primary-border"
          }
          maxLength={255}
          placeholder="내용"
        />
      </div>
      <div className="h-[3rem] default-flex">
        <ThemeButton1
          className={"px-8 py-2"}
          disabled={!formState.isValid}
          onClick={handleSubmit(
            props.onClickSubmit as any,
            props.onClickErrorSubmit,
          )}
        >
          일정 {props.isEdit ? "수정하기" : "생성하기"}
        </ThemeButton1>
      </div>
    </div>
  );
};
export default PlanCreateUpdateScheduleModalView;