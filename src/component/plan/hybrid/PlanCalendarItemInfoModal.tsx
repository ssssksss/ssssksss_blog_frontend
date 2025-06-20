import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import EditButton from "@component/common/button/EditButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useFetchCSR from "@hooks/useFetchCSR";
import useLoading from "@hooks/useLoading";
import usePlanStore from "@store/planStore";
import { createScheduleCalendar } from "@utils/function/createScheduleCalendar";
import { scheduleSort } from "@utils/function/scheduleSort";
import { addHours, format, parse, parseISO } from "date-fns";
import PlanUpdateScheduleModal from "./PlanUpdateScheduleModal";

interface IPlanCalendarItemInfoModal extends INestedModalComponent {
  data: IPlanScheduleObject | IPlanSchedule;
}

const PlanCalendarItemInfoModal = (props: IPlanCalendarItemInfoModal) => {
  const {data} = props;
  const planStore = usePlanStore();
  const { loading, startLoading, stopLoading } = useLoading();
  const fetchCSR = useFetchCSR();

  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "yyyy년 MM월 dd일");
    } catch {
      return dateStr;
    }
  };

  const deleteScheduleCalendar = async () => {
    startLoading();
    try {
      const result = await fetchCSR.requestWithHandler({
        url: `/api/plan/schedule?id=${data.id}`,
        method: "DELETE",
        successMessage: "일정 삭제에 성공했습니다.",
        showSuccessToast: true
      });
      if (result == undefined) return;
      const tempList = planStore.scheduleList.filter((i) => i.id != data.id);
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
    } finally {
      stopLoading();
    }
  };

  return (
    <ModalTemplate className={"w-[80vw] max-w-[37.5rem]"}>
      {props.closeButtonComponent}
      <div className="bg-white outline-bg-gray-20 w-full rounded-lg p-6 shadow-2xl outline outline-1">
        {/* 제목 */}
        <div className="mb-6">
          <h2 className="break-all text-2xl font-bold">{data.title}</h2>
        </div>

        {/* 날짜 정보 */}
        <div className="mb-4">
          <div className={"relative flex items-center"}>
            <span
              className={`inline-block h-4 w-4 flex-shrink-0 ${data.scheduleCategoryBackgroundColor} rounded-full`}
            ></span>
            <span> {data.scheduleCategoryName} </span>
            <div className="absolute right-0 top-0 flex h-[2rem] w-[4rem] gap-x-2">
              <NestedModalButton
                buttonClassName={
                  " aspect-square w-8 default-flex relative"
                }
                modal={<PlanUpdateScheduleModal data={data} />}
                ariaLabel="일정 수정하기 버튼"
              >
                <EditButton />
              </NestedModalButton>
              {loading ? (
                <div className="h-6 w-6 animate-spin rounded-full border-b-2"></div>
              ) : (
                <DeleteConfirmButton
                  className={
                    "w-8"
                  }
                  ariaLabel="일정 삭제 버튼"
                  onCancelClick={() => {
                    stopLoading();
                  }}
                  onConfirmClick={() => deleteScheduleCalendar()}
                  mainMessage={["일정을 삭제하시겠습니까?"]}
                  loading={loading}
                />
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex flex-col">
              <p className="flex text-sm">
                <span className="min-w-[2rem] font-semibold">시작:</span>
                <span>{formatDate(data.scheduleStartDate)}</span>
              </p>
              <p className="flex text-sm">
                <span className="min-w-[2rem] font-semibold">종료:</span>
                <span>{formatDate(data.scheduleEndDate)}</span>
              </p>
            </span>
          </div>
        </div>

        {/* 구분선 */}
        <div className="my-4 h-px bg-gray-200"></div>

        {/* 내용 */}
        <div className="mt-4">
          <p className="whitespace-pre-wrap break-all leading-relaxed">
            {data.content}
          </p>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default PlanCalendarItemInfoModal;
