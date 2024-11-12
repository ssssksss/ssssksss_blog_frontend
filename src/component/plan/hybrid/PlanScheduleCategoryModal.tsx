import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import usePlanStore from "@store/planStore";
import useToastifyStore from "@store/toastifyStore";
import Image from "next/image";
import PlanCreateUpdateScheduleCategory from "./PlanCreateUpdateScheduleCategory";

const PlanScheduleCategoryModal = (props: any) => {
  const toastifyStore = useToastifyStore();
  const planStore = usePlanStore();
  const {loading, startLoading, stopLoading} = useLoading();

  const deleteScheduleCategory = async (id: number) => {
    startLoading();
    const response = await fetch(`/api/plan/schedule/category?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      toastifyStore.setToastify({
        type: "error",
        message: data.msg,
      });
      stopLoading();
      return;
    }
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
    stopLoading();
  };

  return (
    <ModalTemplate className="h-full w-full max-w-[30rem]">
      {props.closeButtonComponent}
      <LoadingSpinner loading={loading} />
      {/* 목록 */}
      <div className={"flex w-full flex-col gap-y-2"}>
        <div className="min-h-[4rem] w-full flex-shrink-0 gap-y-1 p-2 default-outline">
          <div className="relative mb-1 w-full rounded-[1rem] bg-primary-20 px-1 text-center text-[1.2rem] font-bold">
            카테고리
            <NestedModalButton
              buttonClassName={
                "absolute top-1/2 right-1 -translate-y-1/2 w-[1.5rem] h-[1.5rem] default-flex hover:scale-[120%]"
              }
              modal={<PlanCreateUpdateScheduleCategory />}>
              <Image alt="" src={"/images/icons/ic-plus-black.svg"} fill />
            </NestedModalButton>
          </div>
          {planStore.scheduleCategory.map((i) => (
            <div
              key={i.id}
              className="grid h-[2.5rem] w-full grid-cols-[.75rem_auto_2rem_2rem]">
              <div className={"default-flex"}>
                <div
                  className={`flex h-3 w-3 items-center rounded-[50%] p-1 ${i.backgroundColor}`}></div>
              </div>
              <label className="flex items-center overflow-hidden whitespace-nowrap border-r-2">
                <div
                  className={
                    "flex w-full animate-marquee items-center pl-1 hover:animate-none sm:animate-none sm:break-all"
                  }>
                  {i.name}
                </div>
              </label>
              <NestedModalButton
                buttonClassName={
                  "w-full default-flex relative  hover:scale-[120%]"
                }
                modal={<PlanCreateUpdateScheduleCategory data={i} />}>
                <Image
                  alt=""
                  src={"/images/icons/ic-edit-black.svg"}
                  width={16}
                  height={16}
                />
              </NestedModalButton>
              <button
                className={"relative w-full default-flex hover:scale-[120%]"}
                disabled={loading}
                onClick={() => deleteScheduleCategory(i.id)}>
                {loading ? (
                  <Image
                    alt=""
                    src={"/images/gif/totoro-left-move.gif"}
                    fill
                    style={{objectFit: "cover"}}
                  />
                ) : (
                  <Image
                    alt=""
                    src={"/images/icons/ic-trash.svg"}
                    width={16}
                    height={16}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ModalTemplate>
  );
};
export default PlanScheduleCategoryModal;
