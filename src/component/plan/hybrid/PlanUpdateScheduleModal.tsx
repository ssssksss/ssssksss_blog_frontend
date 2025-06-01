import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { yupResolver } from "@hookform/resolvers/yup";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
import "@styles/reactDataRange.css";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { PlanUpdateScheduleYup } from "@utils/validation/PlanScheduleYup";
import { format, isSameDay, parse } from "date-fns";
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
  const fetchCSR = useFetchCSR();
  const methods = useForm<{
    id: number;
    content: string;
    title: string;
    planScheduleCategory: number;
    status: string;
  }>({
    resolver: yupResolver(PlanUpdateScheduleYup),
    mode: "onChange",
    defaultValues: {
      planScheduleCategory: props.data.scheduleCategoryId,
      id: props.data.id,
      title: props.data.title,
      content: props.data.content,
      status: props.data.status,
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
    status: string;
  }) => {
    const result: IPlanScheduleDTO = await fetchCSR.requestWithHandler({
      url: "/api/plan/schedule",
      method: "PUT",
      body: {
        id: data.id,
        title: data.title,
        content: data.content,
        categoryId: data.planScheduleCategory,
        scheduleStartDate: new Date(calendarDate[0].startDate).toISOString(),
        scheduleEndDate: new Date(calendarDate[0].endDate).toISOString(),
        status: data.status
      },
      showSuccessToast: true,
      successMessage: "일정이 수정되었습니다."
    });
    // update 된 데이터를 형식에 맞게 변경
    const scheduleDTO = {
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
      status: result.status,
    };
    let flag = false;
    const scheduleDTOList: IPlanSchedule[] = planStore.scheduleList.reduce<
      IPlanSchedule[]
      >((acc, cur) => {
        if (cur.id == scheduleDTO.id) {
        // 만일 수정한 id값과 일정에 있는 id값이 같으면 수정된 일정이므로 제외처리
        } else {
          if (!flag) {
            if (cur.scheduleStartDate >= scheduleDTO.scheduleStartDate) {
              flag = true;
              acc.push(scheduleDTO);
            }
          }
          acc.push(cur);
        }
        return acc;
      }, []);
    // 일정이 다른 일정들보다 제일 뒤에 있으면 일정이 추가되지 않으므로 아래와 같은 작업 필요
    if (!flag) {
      scheduleDTOList.push(scheduleDTO);
    }
    // 아래 과정은 새로운 달력을 만드는 로직, [15]는 이번달의 날짜를 가져와서 넣을뿐 의미는 없음
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

    const list = scheduleDTOList;
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
    planStore.setScheduleList(scheduleDTOList);
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
