import BasicButton from "@component/common/button/hybrid/BasicButton";
import BasicInput from "@component/common/input/BasicInput";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import usePlanStore from "@store/planStore";
import useToastifyStore from "@store/toastifyStore";
import "@styles/reactDataRange.css";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마

interface IPlanCreateUpdateScheduleCategory extends INestedModalComponent {
  data?: IPlanScheduleCategory;
}

const PlanCreateUpdateScheduleCategory = (
  props: IPlanCreateUpdateScheduleCategory,
) => {
  const [color, setColor] = useState(props.data?.backgroundColor || "");
  const [name, setName] = useState(props.data?.name || "");
  const toastifyStore = useToastifyStore();
  const planStore = usePlanStore();

  const submitCreateUpdatePlanScheduleCategory = async (id?: number) => {
    const response = await fetch("/api/plan/schedule/category", {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(
        id
          ? {name: name, backgroundColor: color, id: id}
          : {name: name, backgroundColor: color},
      ),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      if (id) {
        // update
        planStore.setScheduleCategory(
          planStore.scheduleCategory.map((i) => {
            if (i.id == id) {
              i.name = name;
              i.backgroundColor = color;
            }
            return i;
          }),
        );
        // 카테고리 id값이 같은 것들은 색상과 이름을 변경해서 업데이트 해준다.
        const temp = planStore.calendar.map((i) => {
          if (i.data.length > 0) {
            i.data = i.data.map((j) => {
              if (j.scheduleCategoryId == id) {
                j.scheduleCategoryBackgroundColor = color;
                j.scheduleCategoryName = name;
              }
              return j;
            });
          }
          return i;
        });
        planStore.setCalendar(temp);
      }
      if (!id) {
        // create
        const result: ResCreatePlanScheduleCategory = await response.json();
        planStore.setScheduleCategory([
          ...planStore.scheduleCategory,
          result.data,
        ]);
      }
      toastifyStore.setToastify({
        type: "success",
        message: id ? "카테고리 수정 완료" : "카테고리 추가 완료",
      });
      props.closeModal!();
    } else if (response.status == 409) {
      toastifyStore.setToastify({
        type: "error",
        message: "카테고리 이름 중복",
      });
    } else {
      toastifyStore.setToastify({
        type: "error",
        message: "서버 에러",
      });
      return;
    }
  };

  return (
    <ModalTemplate className="w-full">
      {props.closeButtonComponent}
      <div className={"flex w-full flex-col gap-y-2"}>
        <h2 className="w-full rounded-[1rem] px-1 text-center text-[1.2rem] font-bold">
          {props.data?.id ? "카테고리 수정" : "카테고리 생성"}
        </h2>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            카테고리
          </div>
          <BasicInput
            className={
              "mt-[1rem] h-[2rem] w-full rounded-[1rem] bg-gray-20 px-1"
            }
            onChange={(e) => setName(e.target.value)}
            defaultValue={props.data?.name}
            placeholder="카테고리 이름 작성"
          />
        </div>
        <div className="min-h-[4rem] flex-shrink-0 p-2 default-primary-outline">
          <div className="rounded-[1rem] bg-primary-20 px-1 text-[1.2rem] font-bold">
            카테고리 색상 선택
          </div>
          <div className={"grid grid-cols-4 flex-wrap gap-2 p-2"}>
            {[
              "bg-red-100",
              "bg-red-80",
              "bg-red-60",
              "bg-red-40",
              "bg-orange-100",
              "bg-orange-80",
              "bg-orange-60",
              "bg-orange-40",
              "bg-green-100",
              "bg-green-80",
              "bg-green-60",
              "bg-green-40",
              "bg-skyblue-100",
              "bg-skyblue-80",
              "bg-skyblue-60",
              "bg-skyblue-40",
              "bg-blue-100",
              "bg-blue-80",
              "bg-blue-60",
              "bg-blue-40",
              "bg-purple-100",
              "bg-purple-80",
              "bg-purple-60",
              "bg-purple-40",
              "bg-pink-100",
              "bg-pink-80",
              "bg-pink-60",
              "bg-pink-40",
              "bg-black-100",
              "bg-black-80",
              "bg-black-60",
              "bg-black-40",
              "bg-gray-100",
              "bg-gray-80",
              "bg-gray-60",
              "bg-gray-40",
              "bg-gradient",
            ].map((i) => (
              <button
                key={i}
                onClick={() => setColor(i)}
                className={`h-10 w-10 flex-shrink-0 rounded-[2.5rem] hover:outline ${i} ${i == color && "outline outline-offset-1 focus:outline"}`}></button>
            ))}
          </div>
        </div>
        <div className="h-[3rem] default-flex">
          <BasicButton
            onClick={() =>
              submitCreateUpdatePlanScheduleCategory(props.data?.id)
            }
            disabled={!color || !name}
            theme={1}
            className={
              "w-full py-2"
            }>
            {props.data?.id ? "카테고리 수정하기" : "카테고리 생성하기"}
          </BasicButton>
        </div>
      </div>
    </ModalTemplate>
  );
};
export default PlanCreateUpdateScheduleCategory;
