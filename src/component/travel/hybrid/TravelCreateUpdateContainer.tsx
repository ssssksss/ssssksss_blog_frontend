"use client";

import LottieAuthLock from "@component/common/lottie/LottieAuthLock";
import ModalButton from "@component/common/modal/hybrid/ModalButton";
import LoadingSpinner from "@component/common/spinner/LoadingSpinner";
import useLoading from "@hooks/useLoading";
import useToastifyStore from "@store/toastifyStore";
import useUserStore from "@store/userStore";
import "@styles/reactDataRange.css";
import { addDays, differenceInDays, format, isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, Info } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마
import PlanTravelKakaoMap from "./PlanTravelKakaoMap";
import TravelItemInfonModal from "./TravelItemInfonModal";

const TravelCreateUpdateSchedule = dynamic(() => import("./TravelCreateUpdateSchedule"));


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
  const toastifyStore = useToastifyStore();
  const {loading, startLoading, stopLoading} = useLoading();
  const userStore = useUserStore();
  const [isOpenCalendar, setIsOpenCalendar] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [group, setGroup] = useState<{place: IKeywordTravel[]}[] | undefined>(
    undefined,
  );
  const [activeGroup, setActiveGroup] = useState(-1);
  const [calendarDate, setCalendarDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const addTravelLocation = (data: IKeywordTravel) => {
    startLoading();
    if (!group) {
      toastifyStore.setToastify({
        type: "warning",
        message: "날짜를 먼저 선택해주세요",
      });
      stopLoading();
      return;
    }
    const isExist =
      group
        .filter((_, index) => index == activeGroup)[0]
        .place.filter((i) => i.contentid == data.contentid).length > 0;
    if (isExist) {
      toastifyStore.setToastify({
        type: "warning",
        message: "이미 있는 플랜입니다.",
      });
      stopLoading();
      return;
    }
    group.map((i, index) => {
      if (index == activeGroup) {
        i.place.push(data);
      }
      return i;
    });
    toastifyStore.setToastify({
      type: "success",
      message: "일정에 추가되었습니다.",
    });
    stopLoading();
  };

  const deleteTravelLocation = (id: number) => {
    const newGroup = group!.map((i, index) => {
      if (index == activeGroup) {
        i.place = i.place.filter((i) => +i.contentid != id);
      }
      return i;
    });
    setGroup(newGroup);
  };


  const selectCalender = () => {
    setIsOpenCalendar(false);
    let temp: any[] = Array.from(
      {
        length:
          differenceInDays(calendarDate[0].endDate, calendarDate[0].startDate) +
          1,
      },
      () => ({place: []}), // 객체를 암묵적으로 반환하도록 괄호 사용
    );
    if (group == undefined) {
      setGroup(temp);
    } else {
      temp = temp.map((i, index) => {
        if (group.length > index) {
          i.place = group[index].place;
        }
        return i;
      });
      setGroup(temp);
    }
    setActiveGroup(0);
  };

  if (userStore.id == 0) {
    return (
      <div className="min-h-full w-full default-flex">
        <LoadingSpinner loading={true} />
      </div>
    );
  }

  if (userStore.id < 1) {
    return (
      <div className="min-h-full w-full default-flex">
        <LottieAuthLock text={"로그인이 필요합니다."} />
      </div>
    );
  }

  return (
    <div
      className={
        "relative flex h-full w-[calc(100%-.5rem)] flex-col gap-y-2 pl-2 pt-2"
      }
    >
      <div className="grid w-full grid-cols-1 gap-x-2 gap-y-2 lg:grid-cols-2">
        <div className="h-[30rem] max-h-[30rem] w-full overflow-hidden rounded-2xl">
          <PlanTravelKakaoMap
            data={activeGroup >= 0 ? [...group![activeGroup].place] : []}
            isScale={false}
            isDrag={false}
          />
        </div>
        <div className="flex h-[30rem] max-h-[30rem] w-full flex-col gap-y-2">
          <div className="relative w-full rounded-[1rem] bg-primary-60 py-2 text-lg default-flex">
            {!isOpenCalendar && (
              <button
                onClick={() => setIsOpenCalendar(true)}
                className="absolute left-1 top-1/2 -translate-y-1/2 px-2 py-1 shadow-2xl default-outline"
              >
                <Calendar />
              </button>
            )}
            <h2> 일정 목록 </h2>
            <button
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-white-100 px-2 py-1 shadow-2xl default-outline disabled:bg-gray-60"
              disabled={group == undefined}
            >
                일정 등록
            </button>
          </div>
          <div className="h-full p-2 default-outline">
            {isOpenCalendar ? (
              <div className="relative h-full w-full default-flex">
                <div className={"flex flex-col items-center gap-[1.875rem]"}>
                  <div className="relative">
                    <DateRangePicker
                      onChange={(rangesByKey: RangeKeyDict) => {
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
                      }}
                      // maxDate={add(new Date(), { years: 1 })}
                      showDateDisplay={false}
                      months={1}
                      ranges={calendarDate}
                      locale={ko}
                      rangeColors={["#00B488", "#F2FAF7"]}
                      color={"#ff0000"}
                      onShownDateChange={(e) => {
                        setMonth(e.getMonth() + 1);
                        setYear(e.getFullYear());
                      }}
                    />
                    <div
                      className={
                        "absolute left-[50%] top-6 translate-x-[-50%] font-semibold"
                      }
                    >
                      {year}.{month}
                    </div>
                  </div>
                </div>
                <button
                  className="absolute bottom-1 left-1/2 flex -translate-x-1/2 items-center"
                  onClick={() => selectCalender()}
                >
                  <div className="w-[20rem] gap-x-2 px-4 py-2 default-outline default-flex">
                    <span>
                      {format(calendarDate[0].startDate, "yyyy-MM-dd")}
                    </span>
                    <span>~</span>
                    <span>{format(calendarDate[0].endDate, "yyyy-MM-dd")}</span>
                    <span>선택</span>
                  </div>
                </button>
              </div>
            ) : (
              <div className="grid h-[26rem] w-full grid-cols-[7rem_auto] gap-x-1 overflow-hidden">
                <ul
                  className={
                    "flex h-full flex-col gap-y-2 overflow-scroll pb-1"
                  }
                >
                  {group?.map((i, index) => (
                    <button
                      key={index}
                      className={`w-full default-outline ${activeGroup == index && "bg-primary-20"}`}
                      onClick={() => setActiveGroup(index)}
                    >
                      <div className="w-full p-2">
                        <div>Days {index + 1}</div>
                        <div>
                          {format(
                            addDays(calendarDate[0].startDate, index),
                            "yyyy-MM-dd",
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </ul>
                <ul className="flex h-full flex-col gap-y-2 overflow-y-scroll p-2 default-outline">
                  {group
                    ?.filter((_, index) => index == activeGroup)[0]
                    ?.place.map((i, index) => (
                      <li
                        key={index}
                        className={"flex w-full p-2 default-outline"}
                      >
                        <div className="relative mx-auto aspect-square w-[5rem]">
                          <Image
                            alt=""
                            src={i.firstimage || "/images/icons/ic-plane.svg"}
                            fill
                          />
                        </div>
                        <div className="flex h-auto w-full flex-col justify-between gap-x-2">
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
                            <div
                              className={"flex-grow-1 flex items-center px-1"}
                            >
                              {i.title}
                            </div>
                            <div className="flex gap-x-2">
                              <button
                                className={
                                  "relative aspect-square w-[2rem] default-flex hover:scale-[120%]"
                                }
                                disabled={loading}
                                onClick={() =>
                                  deleteTravelLocation(+i.contentid)
                                }
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
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="relative max-h-[calc(100vh-36rem)] min-h-[800px] flex-1 pb-2">
        <TravelCreateUpdateSchedule addTravelLocation={addTravelLocation} />
      </div>
    </div>
  );
};
export default TravelCreateUpdateContainer;
