import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import EditButton from "@component/common/button/EditButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { addHours, format, parse, parseISO } from "date-fns";
import PlanConvertStatus from "../view/PlanConvertStatus";
import PlanUpdateScheduleModal from "./PlanUpdateScheduleModal";

interface IPlanCalendarItemInfoModal extends INestedModalComponent {
  data: IPlanScheduleObject | IPlanSchedule;
}

const PlanCalendarItemInfoModal = (props: IPlanCalendarItemInfoModal) => {
  const planStore = usePlanStore();
  const fetchCSR = useFetchCSR();

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "yyyy년 MM월 dd일");
    } catch {
      return dateStr;
    }
  };

  const deleteScheduleCalendar = async () => {
    const result = await fetchCSR.requestWithHandler({
      url: `/api/plan/schedule?id=${props.data.id}`,
      method: "DELETE",
      successMessage: "일정 삭제에 성공했습니다.",
      showSuccessToast: true
    });
    if (result == undefined) return;
    try {
      const tempList = planStore.scheduleList.filter((i) => i.id != props.data.id);
      const {year, month, day} = planStore.calendar[15];
      const days: ICalendarItem[] = createScheduleCalendar(
        new Date(year, month - 1, day)
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
    } finally {
      props.closeModal!();
    }
  };

  return (
    <ModalTemplate className={"w-[80vw] max-w-[37.5rem]"}>
      {props.closeButtonComponent}
      <div className="bg-white outline-bg-gray-20 w-full rounded-lg p-6 shadow-2xl outline outline-1">
        {/* 제목 */}
        <div className="mb-6">
          <h2 className="break-all text-2xl font-bold">{props.data.title}</h2>
        </div>

        {/* 날짜 정보 */}
        <div className="mb-4">
          <div className={"relative flex items-center"}>
            <span
              className={`inline-block h-4 w-4 flex-shrink-0 ${props.data.scheduleCategoryBackgroundColor} rounded-full`}
            ></span>
            <span> {props.data.scheduleCategoryName} </span>
            <div className="ml-2 rounded-2xl bg-contrast-1 px-2 text-sm default-flex">
              <PlanConvertStatus status={props.data.status} />
            </div>
            <div className="absolute right-0 top-0 flex h-[2rem] w-[4rem] gap-x-2">
              <NestedModalButton
                buttonClassName={" aspect-square w-8 default-flex relative"}
                modal={<PlanUpdateScheduleModal data={props.data} />}
                ariaLabel="일정 수정하기 버튼"
              >
                <EditButton size="24" className={"w-8"} />
              </NestedModalButton>
              <DeleteConfirmButton
                size="24"
                className={"w-8"}
                ariaLabel="일정 삭제 버튼"
                onCancelClick={() => {}}
                onConfirmClick={() => deleteScheduleCalendar()}
                mainMessage={["일정을 삭제하시겠습니까?"]}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex flex-col">
              <p className="flex text-sm">
                <span className="min-w-[2rem] font-semibold">시작:</span>
                <span>{formatDate(props.data.scheduleStartDate)}</span>
              </p>
              <p className="flex text-sm">
                <span className="min-w-[2rem] font-semibold">종료:</span>
                <span>{formatDate(props.data.scheduleEndDate)}</span>
              </p>
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-4 h-px bg-gray-200"></div>

        {/* 내용 */}
        <div className="mt-4">
          <p className="whitespace-pre-wrap break-all leading-relaxed">
            {props.data.content}
          </p>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default PlanCalendarItemInfoModal;
