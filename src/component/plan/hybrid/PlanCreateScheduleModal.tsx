import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
import "@styles/reactDataRange.css";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { PlanCreateScheduleYup } from "@utils/validation/PlanScheduleYup";
import { format, isSameDay, parse } from "date-fns";
import debounce from "lodash/debounce";
import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마
import { FormProvider, useForm } from "react-hook-form";
import PlanCreateUpdateScheduleModalView from "../view/PlanCreateUpdateScheduleModalView";

const PlanCreateScheduleModal = (props: any) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [selectCategoryId, setSelectCategoryId] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const planStore = usePlanStore();
  const fetchCSR = useFetchCSR();
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
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  const methods = useForm({
    resolver: yupResolver(PlanCreateScheduleYup),
    mode: "onChange",
    defaultValues: {
      planScheduleCategory: 0,
      title: "",
      content: "",
      status: "PLANNED",
    },
  });

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
  };

  const changeShowDate = ({ year, month }: { year: number, month: number }) => {
    setYear(year);
    setMonth(month);
  };

  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 16);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);


  const selectCalendarCategory = (data: IPlanScheduleCategory) => {
    methods.setValue("planScheduleCategory", data.id, {shouldValidate: true});
    setSelectCategoryId(data.id);
  };

  const onClickSubmit = async (data: {
    content: string;
    title: string;
    planScheduleCategory: number;
    status: string;
  }) => {
    const result: IPlanScheduleDTO = await fetchCSR.requestWithHandler({
      url: "/api/plan/schedule",
      method: "POST",
      body: {
        title: data.title,
        content: data.content,
        categoryId: data.planScheduleCategory,
        scheduleStartDate: new Date(calendarDate[0].startDate).toISOString(),
        scheduleEndDate: new Date(calendarDate[0].endDate).toISOString(),
        status: data.status
      },
      showSuccessToast: true,
      successMessage: "일정 생성에 성공했습니다."
    });
    if (result == undefined) return;
    const temp = {
      scheduleCategoryName: result.planScheduleCategory.name,
      scheduleEndDate: format(
        new Date(result.scheduleEndDate),
        "yyyy-MM-dd HH:mm:ss",
      ),
      scheduleCategoryId: result.planScheduleCategory.id,
      scheduleStartDate: format(
        new Date(result.scheduleStartDate),
        "yyyy-MM-dd HH:mm:ss",
      ),
      id: result.id,
      title: result.title,
      content: result.content,
      scheduleCategoryBackgroundColor:
        result.planScheduleCategory.backgroundColor,
      status: result.status
    };
    const index = planStore.scheduleList.findIndex(
      (i) => i.scheduleStartDate >= temp.scheduleStartDate,
    );
    const tempList = [
      ...planStore.scheduleList.slice(0, index),
      temp,
      ...planStore.scheduleList.slice(index),
    ];
    const {year, month, day} = planStore.calendar[15];
    const days: ICalendarItem[] = createScheduleCalendar(
      new Date(year, month - 1, day),
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
      format(new Date(scheduleStartDate), "yyyy-MM-dd HH:mm:ss"),
      format(new Date(scheduleEndDate), "yyyy-MM-dd HH:mm:ss"),
    );
    t.result.forEach((schedule) => {
      days[schedule.index].data.push(schedule);
    });
    planStore.setCalendar(days);
    planStore.setMaxLayer(t.maxLayer);
    planStore.setScheduleList(tempList);
    props.closeModal();
  };

  const onClickErrorSubmit = (error: any) => {
  };

  return (
    <ModalTemplate className="w-full max-w-[60rem]">
      {props.closeButtonComponent}
      <FormProvider {...methods}>
        <PlanCreateUpdateScheduleModalView
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
export default PlanCreateScheduleModal;
