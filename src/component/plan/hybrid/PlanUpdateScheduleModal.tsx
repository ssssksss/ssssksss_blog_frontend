import Button from "@component/common/button/hybrid/Button";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import usePlanStore from "@store/planStore";
import useToastifyStore from "@store/toastifyStore";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { PlanUpdateScheduleYup } from "@utils/validation/PlanScheduleYup";
import { addHours, format, isSameDay, parse } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";

interface IPlanUpdateScheduleModal extends INestedModalComponent {
  data: IPlanScheduleObject | IPlanSchedule;
}
const PlanUpdateScheduleModal = (props: IPlanUpdateScheduleModal) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectCategoryId, setSelectCategoryId] = useState(
    props.data.scheduleCategoryId,
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const planStore = usePlanStore();
  const toastifyStore = useToastifyStore();
  const {formState, handleSubmit, setValue, getValues} = useForm({
    resolver: yupResolver(PlanUpdateScheduleYup),
    mode: "onChange",
    defaultValues: {
      planScheduleCategory: props.data.scheduleCategoryId,
      id: props.data.id,
      title: props.data.title,
      content: props.data.content,
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
      startDate: new Date(props.data.scheduleStartDate),
      endDate: new Date(props.data.scheduleEndDate),
      key: "selection",
    },
  ]);

  const selectCalendarCategory = (data: IPlanScheduleCategory) => {
    setValue("planScheduleCategory", data.id, {shouldValidate: true});
    setSelectCategoryId(data.id);
  };

  const onClickSubmit = async (data: {
    id: number;
    content: string;
    title: string;
    planScheduleCategory: number;
  }) => {
    const response = await fetch("/api/plan/schedule", {
      method: "PUT",
      body: JSON.stringify({
        id: data.id,
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
    const result: ResUpdatePlanSchedule = await response.json();
    // update 된 데이터를 형식에 맞게 변경
    const temp = {
      scheduleCategoryName: result.data.planScheduleCategory.name,
      scheduleEndDate: format(
        new Date(result.data.scheduleEndDate),
        "yyyy-MM-dd HH:mm:ss",
      ),
      scheduleCategoryId: result.data.planScheduleCategory.id,
      scheduleStartDate: format(
        new Date(result.data.scheduleStartDate),
        "yyyy-MM-dd HH:mm:ss",
      ),
      id: result.data.id,
      title: result.data.title,
      content: result.data.content,
      scheduleCategoryBackgroundColor:
        result.data.planScheduleCategory.backgroundColor,
    };
    // 리스트에서 id값이 일치하는 요소의 데이터를 변경
    const tempList = planStore.scheduleList.map((i) => {
      if (i.id == temp.id) {
        i = temp;
      }
      return i;
    });
    // 아래 과정은 새로운 달력을 만드는 로직
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
    props.closeModal!();
  };

  const onClickErrorSubmit = (error: any) => {};

  return (
    <ModalTemplate className="w-full max-w-[60rem]">
      {props.closeButtonComponent}
      <div className={"flex w-full flex-col gap-y-2"}>
        <h2 className={"text-[1.5rem] font-bold default-flex"}> 일정 수정 </h2>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            카테고리
          </div>
          <div className="flex h-[3rem] items-center gap-x-2 rounded-[1rem] p-1 text-[1.2rem] font-bold">
            {planStore.scheduleCategory.map((i) => (
              <button
                key={i.name}
                onClick={() => selectCalendarCategory(i)}
                className={`${i.backgroundColor} h-[2rem] rounded-[1rem] p-2 default-flex ${selectCategoryId == i.id && "animate-updown"}`}>
                {i.name}
              </button>
            ))}
          </div>
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-outline">
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
          </div>
          <div
            className={"mt-[1rem] flex flex-col items-center gap-[1.875rem]"}>
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
                }>
                {year}.{month}
              </div>
              <div
                className={
                  "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[880px]:left-[75%] min-[880px]:top-6"
                }>
                {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            제목
          </div>
          <input
            onChange={(e) =>
              setValue("title", e.target.value, {shouldValidate: true})
            }
            defaultValue={props.data.title}
            className={
              "mt-[1rem] h-[2rem] w-full rounded-[1rem] bg-gray-20 px-1"
            }
            placeholder="제목"
          />
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            내용
          </div>
          <textarea
            onChange={(e) =>
              setValue("content", e.target.value, {shouldValidate: true})
            }
            defaultValue={props.data.content}
            className={
              "mt-[1rem] min-h-[10rem] w-full resize-none rounded-[1rem] bg-gray-20 p-1 px-1"
            }
            placeholder="내용"
          />
        </div>
        <div className="h-[3rem] default-flex">
          <Button
            className={
              "rounded-[1rem] bg-primary-20 px-8 py-2 disabled:bg-gray-60"
            }
            disabled={!formState.isValid}
            onClick={handleSubmit(onClickSubmit, onClickErrorSubmit)}>
            일정 수정하기
          </Button>
        </div>
      </div>
    </ModalTemplate>
  );
};
export default PlanUpdateScheduleModal;
