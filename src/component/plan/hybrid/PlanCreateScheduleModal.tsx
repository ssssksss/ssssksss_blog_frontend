import BasicButton from "@component/common/button/hybrid/BasicButton";
import BasicInput from "@component/common/input/BasicInput";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import BasicTextarea from "@component/common/textarea/BasicTextarea";
import { yupResolver } from "@hookform/resolvers/yup";
import usePlanStore from "@store/planStore";
import useToastifyStore from "@store/toastifyStore";
import "@styles/reactDataRange.css";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { PlanCreateScheduleYup } from "@utils/validation/PlanScheduleYup";
import { addHours, format, isSameDay, parse } from "date-fns";
import { ko } from "date-fns/locale";
import debounce from "lodash/debounce";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마
import { useForm } from "react-hook-form";

const PlanCreateScheduleModal = (props: any) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [isFoldCalendar, setIsFoldCalendar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const planStore = usePlanStore();
  const toastifyStore = useToastifyStore();
  const {formState, handleSubmit, setValue, getValues} = useForm({
    resolver: yupResolver(PlanCreateScheduleYup),
    mode: "onChange",
    defaultValues: {
      planScheduleCategory: 0,
      title: "",
      content: "",
    },
  });

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 16);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const selectCalendarCategory = (data: IPlanScheduleCategory) => {
    setValue("planScheduleCategory", data.id, {shouldValidate: true});
    setSelectCategoryId(data.id);
  };

  const onClickSubmit = async (data: {
    content: string;
    title: string;
    planScheduleCategory: number;
  }) => {
    const response = await fetch("/api/plan/schedule", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        categoryId: data.planScheduleCategory,
        scheduleStartDate: new Date(calendarDate[0].startDate).toISOString(),
        scheduleEndDate: new Date(calendarDate[0].endDate).toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toastifyStore.setToastify({
        type: "error",
        message: "서버 에러",
      });
      return;
    }
    const result: ResCreatePlanSchedule = await response.json();
    const temp = {
      scheduleCategoryName: result.data.planScheduleCategory.name,
      scheduleEndDate: format(
        addHours(new Date(result.data.scheduleEndDate), 9),
        "yyyy-MM-dd HH:mm:ss",
      ),
      scheduleCategoryId: result.data.planScheduleCategory.id,
      scheduleStartDate: format(
        addHours(new Date(result.data.scheduleStartDate), 9),
        "yyyy-MM-dd HH:mm:ss",
      ),
      id: result.data.id,
      title: result.data.title,
      content: result.data.content,
      scheduleCategoryBackgroundColor:
        result.data.planScheduleCategory.backgroundColor,
    };
    const index = planStore.scheduleList.findIndex(
      (i) => i.scheduleStartDate >= temp.scheduleStartDate,
    );
    const tempList = [
      ...planStore.scheduleList.slice(0, index),
      temp,
      ...planStore.scheduleList.slice(index),
    ];
    const days: ICalendarItem[] = createScheduleCalendar(
      new Date(planStore.calendar[15].date),
    );
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

    const list = tempList;
    const t = scheduleSort(
      list,
      format(addHours(new Date(scheduleStartDate), 9), "yyyy-MM-dd HH:mm:ss"),
      format(addHours(new Date(scheduleEndDate), 9), "yyyy-MM-dd HH:mm:ss"),
    );
    t.result.forEach((schedule) => {
      days[schedule.index].data.push(schedule);
    });
    planStore.setCalendar(days);
    planStore.setMaxLayer(t.maxLayer);
    planStore.setScheduleList(tempList);
    toastifyStore.setToastify({
      message: "일정이 추가되었습니다.",
    });
    props.closeModal();
  };

  const onClickErrorSubmit = (error: any) => {
  };

  return (
    <ModalTemplate className="w-full max-w-[60rem]">
      {props.closeButtonComponent}
      <div className={"flex w-full flex-col gap-y-2"}>
        <h2 className={"text-[1.5rem] font-bold default-flex"}> 일정 생성 </h2>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            카테고리
          </div>
          <div className="flex h-[3rem] items-center gap-x-2 rounded-[1rem] p-1 text-[1.2rem] font-bold">
            {planStore.scheduleCategory.map((i) => (
              <button
                key={i.name}
                onClick={() => selectCalendarCategory(i)}
                className={`${i.backgroundColor} h-[2rem] rounded-[1rem] p-2 default-flex ${selectCategoryId == i.id && "animate-updown"}`}
              >
                {i.name}
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="flex items-center gap-x-2 rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            기간
            <div className={"flex justify-center text-[1rem]"}>
              (<span> {format(calendarDate[0].startDate, "yy.MM.dd")} </span>
              {format(calendarDate[0].startDate, "yy.MM.dd") !=
                format(calendarDate[0].endDate, "yy.MM.dd") && (
                <span> {format(calendarDate[0].endDate, "~ yy.MM.dd")} </span>
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
            className={`mt-[1rem] flex flex-col items-center gap-[1.875rem] bg-default-1 dynamic-opacity ${isFoldCalendar ? "h-0 overflow-hidden outline-none" : "default-primary-outline"}`}
          >
            <div className="relative">
              <DateRangePicker
                onChange={(rangesByKey: RangeKeyDict) => {
                  const selection = rangesByKey.selection;
                  if (
                    selection.startDate &&
                    selection.endDate &&
                    isSameDay(selection.startDate, selection.endDate)
                  ) {
                    setMonth(selection.startDate.getMonth() + 1);
                  }
                  if (
                    selection.startDate?.getFullYear() !=
                      selection.endDate?.getFullYear() ||
                    selection.startDate?.getMonth() !=
                      selection.endDate?.getMonth()
                  ) {
                    setMonth(selection.startDate!.getMonth() + 1);
                    setYear(selection.startDate!.getFullYear());
                  }
                  setCalendarDate([
                    {
                      startDate: selection.startDate as Date,
                      endDate: selection.endDate as Date,
                      key: "selection",
                    },
                  ]);
                }}
                // maxDate={add(new Date(), { years: 1 })}
                showDateDisplay={false}
                months={2}
                ranges={calendarDate}
                locale={ko}
                direction={windowWidth > 880 ? "horizontal" : "vertical"}
                rangeColors={["#00B488", "#F2FAF7"]}
                color={"#ff0000"}
                onShownDateChange={(e) => {
                  setMonth(e.getMonth() + 1);
                  setYear(e.getFullYear());
                }}
              />
              <div
                className={
                  "absolute left-[50%] top-6 translate-x-[-50%] font-semibold min-[880px]:left-[25%]"
                }
              >
                {year}.{month}
              </div>
              <div
                className={
                  "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[880px]:left-[75%] min-[880px]:top-6"
                }
              >
                {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            제목
          </div>
          <BasicInput
            onChange={(e) =>
              setValue("title", e.target.value, {shouldValidate: true})
            }
            className={
              "mt-[1rem] h-[2rem] w-full rounded-[1rem] px-1"
            }
            placeholder="제목"
          />
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            내용
          </div>
          <BasicTextarea
            onChange={(e) =>
              setValue("content", e.target.value, {shouldValidate: true})
            }
            className={
              "mt-[1rem] min-h-[16rem] w-full resize-none rounded-[1rem] p-1 px-1 primary-outline"
            }
            placeholder="내용"
          />
        </div>
        <div className="h-[3rem] default-flex">
          <BasicButton
            theme={1}
            className={"px-8 py-2"}
            disabled={!formState.isValid}
            onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}
          >
            일정 추가하기
          </BasicButton>
        </div>
      </div>
    </ModalTemplate>
  );
};
export default PlanCreateScheduleModal;
