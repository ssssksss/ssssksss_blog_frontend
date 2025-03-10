import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import usePlanStore from "@store/planStore";
import useToastifyStore from "@store/toastifyStore";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { PlanUpdateScheduleYup } from "@utils/validation/PlanScheduleYup";
import { addHours, format, isSameDay, parse } from "date-fns";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { FormProvider, useForm } from "react-hook-form";
import PlanCreateUpdateScheduleModalView from "../view/PlanCreateUpdateScheduleModalView";

interface IPlanUpdateScheduleModal extends INestedModalComponent {
  data: IPlanScheduleObject | IPlanSchedule;
}
const PlanUpdateScheduleModal = (props: IPlanUpdateScheduleModal) => {
  const [year, setYear] = useState(+props.data.scheduleStartDate.substring(0,4));
  const [month, setMonth] = useState(
    +props.data.scheduleStartDate.substring(5, 7),
  );
  const [selectCategoryId, setSelectCategoryId] = useState(
    props.data.scheduleCategoryId,
  );
  const [isFoldCalendar, setIsFoldCalendar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const planStore = usePlanStore();
  const toastifyStore = useToastifyStore();
  const methods = useForm<{
    id: number;
    content: string;
    title: string;
    planScheduleCategory: number;
  }>({
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

  const [calendarDate, setCalendarDate] = useState<
    [
      {
        startDate: Date;
        endDate: Date;
        key: string;
      },
    ]
  >([
    {
      startDate: new Date(props.data.scheduleStartDate),
      endDate: new Date(props.data.scheduleEndDate),
      key: "selection",
    },
  ]);

  const selectCalendarCategory = (data: IPlanScheduleCategory) => {
    methods.setValue("planScheduleCategory", data.id, {shouldValidate: true});
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
    toastifyStore.setToastify({
      message: "일정이 수정되었습니다."
    });
    props.closeModal!();
  };

  const onClickErrorSubmit = (error: any) => { };

  const changeDateRangePicker = (rangesByKey: RangeKeyDict) => {
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
        selection.startDate?.getMonth() != selection.endDate?.getMonth()
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
  };
  
  const changeShowDate = ({year, month}: {year: number; month: number}) => {
    setYear(year);
    setMonth(month);
  };
  
  return (
    <ModalTemplate className="w-full max-w-[60rem]">
      {props.closeButtonComponent}
      <FormProvider {...methods}>
        <PlanCreateUpdateScheduleModalView
          isEdit={true}
          scheduleCategoryList={planStore.scheduleCategory}
          selectCalendarCategory={selectCalendarCategory}
          selectCategoryId={selectCategoryId}
          calendarDate={calendarDate}
          changeDateRangePicker={changeDateRangePicker}
          windowWidth={windowWidth}
          changeShowDate={changeShowDate}
          year={year}
          month={month}
          onClickSubmit={onClickSubmit}
          onClickErrorSubmit={onClickErrorSubmit}
          data={props.data}
        />
      </FormProvider>
    </ModalTemplate>
  );
};
export default PlanUpdateScheduleModal;
