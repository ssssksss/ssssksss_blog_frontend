import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useFetchCSR from "@hooks/useFetchCSR";
import useLoadingHandler from "@hooks/useLoadingHandler";
import usePlanStore from "@store/planStore";
import Image from "next/image";
import PlanCreateUpdateScheduleCategory from "./PlanCreateUpdateScheduleCategory";

const PlanScheduleCategoryModal = (props: any) => {
  const planStore = usePlanStore();
  const { loadingWithHandler } = useLoadingHandler();
  const fetchCSR = useFetchCSR();

  const deleteScheduleCategoryHandler = async (id: number) => {
    const result = await fetchCSR.requestWithHandler({
      url: `/api/plan/schedule/category?id=${id}`,
      method: "DELETE",
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
      <div className="w-full flex-col gap-y-2 flex p-2 primary-border-radius">
        <div className="relative mb-1 h-[2.75rem] w-full rounded-[1rem] bg-primary-20 px-1 text-center text-[1.2rem] font-bold default-flex">
          카테고리
          <NestedModalButton
            buttonClassName={
              "absolute top-1/2 right-1 -translate-y-1/2 h-btn-sm aspect-square default-flex hover:scale-105"
            }
            modal={<PlanCreateUpdateScheduleCategory />}
          >
            <Image alt="" src={"/images/icons/ic-plus-black.svg"} fill />
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
                  "w-full default-flex relative h-btn-sm aspect-square hover:scale-105"
                }
                modal={<PlanCreateUpdateScheduleCategory data={i} />}
              >
                <Image
                  alt=""
                  src={"/images/icons/ic-edit-black.svg"}
                  width={24}
                  height={24}
                />
              </NestedModalButton>
              <button
                className={
                  "relative aspect-square h-btn-sm w-full default-flex hover:scale-105"
                }
                onClick={() =>
                  loadingWithHandler(() => deleteScheduleCategoryHandler(i.id))
                }
              >
                <Image
                  alt=""
                  src={"/images/icons/ic-trash.svg"}
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ModalTemplate>
  );
};
export default PlanScheduleCategoryModal;
