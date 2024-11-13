"use client";

import Button from "@component/common/button/hybrid/Button";
import LottieAuthLock from "@component/common/lottie/LottieAuthLock";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import PlanTravelKakaoMap from "@component/travel/hybrid/PlanTravelKakaoMap";
import useLoading from "@hooks/useLoading";
import useToastifyStore from "@store/toastifyStore";
import useUserStore from "@store/userStore";
import {Info} from "lucide-react";
import Image from "next/image";
import {useState} from "react";
import TravelCreateUpdateSchedule from "./TravelCreateUpdateSchedule";
import TravelItemInfonModal from "./TravelItemInfonModal";

export const travelContentTypeId: {[key: number]: string} = {
  12: "관광지",
  14: "문화시설",
  15: "축제/공연/행사",
  25: "여행코스",
  28: "레포츠",
  32: "숙박",
  38: "쇼핑",
  39: "음식",
};

interface ITravelCreateUpdateContainer {}
const TravelCreateUpdateContainer = (props: ITravelCreateUpdateContainer) => {
  const [list, setList] = useState<IKeywordTravel[]>([]);
  const toastifyStore = useToastifyStore();
  const {loading, startLoading, stopLoading} = useLoading();
  const userStore = useUserStore();

  const addTravelLocation = (data: IKeywordTravel) => {
    startLoading();
    const temp = list.filter((i) => i.contentid == data.contentid);
    if (temp.length > 0) {
      toastifyStore.setToastify({
        type: "warning",
        message: "이미 있는 플랜입니다.",
      });
      stopLoading();
      return;
    }
    toastifyStore.setToastify({
      type: "success",
      message: "일정에 추가되었습니다.",
    });
    stopLoading();
    setList([...list, data]);
  };

  const deleteTravelLocation = (id: number) => {
    setList(list.filter((i) => +i.contentid != id));
  };

  if (userStore.id < 1) {
    return (
      <div className="min-h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <div className={"relative flex h-full w-full flex-col gap-y-2 pl-2 pt-2"}>
      <div className="grid w-[calc(100%-.5rem)] grid-cols-1 gap-y-2 md:grid-cols-2">
        <div className="h-[30rem] w-full">
          <PlanTravelKakaoMap data={list} isScale={false} isDrag={false} />
        </div>
        <div className="flex h-[30rem] w-full flex-col gap-y-2 pl-2">
          <h2 className="relative w-full rounded-[1rem] bg-primary-60 py-2 text-lg default-flex">
            일정 목록
            <ModalButton
              buttonClassName={
                "absolute top-1/2 right-1 -translate-y-1/2 w-[1.5rem] h-[1.5rem] default-flex hover:scale-[120%]"
              }
              modal={
                <TravelCreateUpdateSchedule
                  data={list}
                  addTravelLocation={addTravelLocation}
                />
              }
            >
              <Image alt="" src={"/images/icons/ic-plus-black.svg"} fill />
            </ModalButton>
          </h2>
          <ul className="flex h-full flex-col gap-y-2 overflow-y-scroll p-2 default-outline">
            {list.map((i, index) => (
              <li
                key={i.contentid}
                className="flex h-auto w-full flex-col gap-x-2 p-2 default-outline"
              >
                <div className="grid w-full grid-cols-[auto_2rem]">
                  <div className="w-fit rounded-[1rem] bg-primary-20 px-2 py-1">
                    {travelContentTypeId[+i.contenttypeid]}
                  </div>
                  <ModalButton
                    buttonClassName="default-flex"
                    modal={<TravelItemInfonModal data={i} />}
                  >
                    <Info />
                  </ModalButton>
                </div>
                <div className="grid w-full grid-cols-[auto_2rem]">
                  <div className={"flex-grow-1 flex items-center px-1"}>
                    {i.title}
                  </div>
                  <button
                    className={
                      "relative aspect-square w-[2rem] default-flex hover:scale-[120%]"
                    }
                    disabled={loading}
                    onClick={() => deleteTravelLocation(+i.contentid)}
                  >
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
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Button className={"min-h-[2.5rem] w-[calc(100%-.5rem)] default-outline"}>
        일정 생성하기(개발중)
      </Button>
    </div>
  );
};
export default TravelCreateUpdateContainer;
