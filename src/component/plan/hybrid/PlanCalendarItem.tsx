import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import { format } from "date-fns";
import React from "react";
import PlanCalendarItemInfoModal from "./PlanCalendarItemInfoModal";


interface IPlanCalendarItem {
  state: string,
  day: number,
  data?: IPlanScheduleObject[],
  maxLayer: number,
  date: string,
}

const PlanCalendarItem = (props: IPlanCalendarItem) => {
  return (
    <div className="h-full w-full outline outline-2 outline-offset-[-2px] outline-gray-60">
      <div className={"mb-1 flex justify-start px-1 pt-1"}>
        <span
          className={`${props.state ? "text-black-60" : format(new Date(), "yyyy-MM-dd") == props.date ? "rounded-md px-1 primary-set" : "text-black-80"}`}
        >
          {props.day}
        </span>
      </div>
      <div
        className={"relative grid h-auto min-h-[4rem] w-full gap-y-1 pb-2"}
        style={{
          gridTemplateRows: props.maxLayer
            ? `repeat(${props.maxLayer + 1}, 1fr)`
            : "auto",
        }}
      >
        {props.data?.map((i) => (
          <NestedModalButton
            key={i.date}
            buttonClassName={`whitespace-nowrap hover:bg-gradient hover:animate-fill hover:fillAnimation flex justify-start items-center ${i.isFirst ? (i.isLast ? "rounded-[0.25rem]" : "rounded-l-[0.25rem]") : i.isLast ? "rounded-r-[0.25rem]" : ""} h-[1.6rem] overflow-hidden text-ellipsis z-10 relative whitespace-nowrap ${i.scheduleCategoryBackgroundColor}`}
            style={{
              gridRowStart: i.layer,
              width: i.isLast
                ? `calc(${100 * i.period}% - 0.5rem)`
                : `calc(${100 * i.period}%)`,
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            modal={<PlanCalendarItemInfoModal data={i} />}
          >
            <span
              className={`my-[0.125rem] animate-marqueeContent whitespace-nowrap px-[0.25rem] ${
                "text-" +
                i.scheduleCategoryBackgroundColor.split("-")[1] +
                "-contrast"
              }`}
            >
              {i.title}
            </span>
          </NestedModalButton>
        ))}
      </div>
    </div>
  );
};

export default React.memo(PlanCalendarItem);
