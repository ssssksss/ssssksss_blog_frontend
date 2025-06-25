import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import EditButton from "@component/common/button/EditButton";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlanStore from "@store/planStore";
import { CiSquarePlus } from "react-icons/ci";
import PlanCreateUpdateScheduleCategory from "./PlanCreateUpdateScheduleCategory";
const PlanScheduleCategoryModal = (props: any) => {
  const planStore = usePlanStore();
  const fetchCSR = useFetchCSR();

  const deleteScheduleCategoryHandler = async (id: number) => {
    const result = await fetchCSR.requestWithHandler({
      url: `/api/plan/schedule/category?id=${id}`,
      method: "DELETE",
      showSuccessToast: true,
    });
    if (result == undefined) return;
    if (id) {
      // delete
      // 일정 카테고리에서 제외
      planStore.setScheduleCategory(
        planStore.scheduleCategory.filter((i) => i.id != id),
      );
      // 일정에서 카테고리 id와 일치하는 일정들 전부 제외
      const temp = planStore.calendar.map((i) => {
        if (i.data.length > 0) {
          i.data = i.data.filter((j) => j.scheduleCategoryId != id);
        }
        return i;
      });
      planStore.setCalendar(temp);
    }
  };

  return (
    <ModalTemplate className="h-full w-full max-w-[30rem]">
      {props.closeButtonComponent}
      {/* 목록 */}
      <div className="flex w-full flex-col gap-y-2 p-2 primary-border-radius">
        <div className="relative mb-1 h-[2.75rem] w-full rounded-[1rem] bg-primary-20 px-1 text-center text-[1.2rem] font-bold default-flex">
          카테고리
          <NestedModalButton
            buttonClassName={
              "absolute top-1/2 right-1 -translate-y-1/2 h-btn-sm aspect-square default-flex hover:scale-105"
            }
            modal={<PlanCreateUpdateScheduleCategory />}
          >
            <CiSquarePlus size="44" />
          </NestedModalButton>
        </div>
        {planStore.scheduleCategory.map((i) => (
          <div
            key={i.id}
            className="grid h-[2.5rem] w-full grid-cols-[.75rem_auto_5.5rem]"
          >
            <div className={"default-flex"}>
              <div
                className={`flex h-3 w-3 items-center rounded-[50%] p-1 ${i.backgroundColor}`}
              ></div>
            </div>
            <label className="flex items-center overflow-hidden whitespace-nowrap border-r-2">
              <div
                className={
                  "flex w-full items-center pl-1 hover:animate-marquee hover:break-all sm:animate-none"
                }
              >
                {i.name}
              </div>
            </label>
            <div className="flex justify-between">
              <NestedModalButton
                buttonClassName={
                  "w-full default-flex relative h-btn-sm aspect-square"
                }
                modal={<PlanCreateUpdateScheduleCategory data={i} />}
              >
                <EditButton size={"24"} className="h-btn-sm" />
              </NestedModalButton>
              <DeleteConfirmButton
                className={"h-btn-sm"}
                ariaLabel="일정 카테고리 삭제 버튼"
                onCancelClick={() => {}}
                onConfirmClick={() => deleteScheduleCategoryHandler(i.id)}
                loading={false}
                mainMessage={["일정 카테고리를 삭제하시겠습니까?"]}
                size="24"
              />
            </div>
          </div>
        ))}
      </div>
    </ModalTemplate>
  );
};
export default PlanScheduleCategoryModal;
