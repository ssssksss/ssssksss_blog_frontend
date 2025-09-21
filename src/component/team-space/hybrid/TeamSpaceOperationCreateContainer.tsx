import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useTeamSpaceStore from "@store/teamSpaceStore";
import "@styles/reactDataRange.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마

interface ITeamSpaceOperationCreateContainer extends IModalComponent {
  activeProjectId: number;
  activeServiceId: number;
}
const TeamSpaceOperationCreateContainer = (props: ITeamSpaceOperationCreateContainer) => {
  const teamSpaceStore = useTeamSpaceStore();
  const queryClient = useQueryClient();
  const [createOperationTitle, setCreateOperationTitle] = useState("");
  const [createOperationDescription, setCreateOperationDescription] =
    useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
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
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    ]);
  
  const handleResize = debounce(() => {
    setWindowWidth(window.innerWidth);
  }, 16);
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);
  
  const changeShowDate = ({year, month}: {year: number; month: number}) => {
    setYear(year);
    setMonth(month);
  };
  
  const createTeamSpaceOperationHandler = async () => {
    const response = await fetch("/api/team-space/operation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: props.activeProjectId,
        serviceId: props.activeServiceId,
        title: createOperationTitle,
        description: createOperationDescription,
        scheduledStartAt: new Date(calendarDate[0].startDate).toISOString(),
        scheduledEndAt: new Date(calendarDate[0].endDate).toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: createTeamSpaceOperationHandler,
    onSuccess: (data: {
      data: ITeamSpaceOperation;
      msg: string;
      statusCode: number;
    }) => {
      console.log("성공:", data);
      queryClient.setQueryData<{data: ITeamSpaceProject}>(
        ["project", teamSpaceStore.activeProject.id],
        (old) => {
          if (!old) return old;

          const updatedServices = old.data.teamSpaceServices.map((service) => {
            if (service.id !== teamSpaceStore.activeService.id) return service;
            return {
              ...service,
              teamSpaceOperations: [
                ...(service.teamSpaceOperations || []),
                data.data, // 새로 생성된 operation
              ],
            };
          });

          return {
            ...old,
            data: {
              ...old.data,
              teamSpaceServices: updatedServices,
            },
          };
        },
      );
      props.closeModal!();
    },
    onError: (error: Error) => {},
  });

  const handleSubmit = () => {
    if (createOperationTitle == "") return;
    if (createOperationDescription == "") return;


    mutation.mutate();
  };

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
  };

  return (
    <div className="flex min-h-[10rem] w-full flex-col gap-4 rounded-lg border border-contrast-1 p-2">
      <article className="flex flex-col gap-1">
        <h3>업무 제목 </h3>
        <ThemeInput1
          onChange={(e) => setCreateOperationTitle(e.target.value)}
          type="text"
          maxLength={30}
          placeholder="업무 제목을 입력해주세요."
          className="w-full rounded-lg"
        />
      </article>
      <article className="flex flex-col gap-1">
        <h3>업무 설명</h3>
        <ThemeInput1
          onChange={(e) => setCreateOperationDescription(e.target.value)}
          type="text"
          maxLength={30}
          placeholder="업무 설명을 입력해주세요."
          className="w-full rounded-lg"
        />
      </article>
      <article
        className={"mt-[1rem] flex flex-col items-center gap-[1.875rem] bg-default-1"}
      >
        <h3> 업무 제작 기간 </h3>
        <div className="relative">
          <DateRangePicker
            onChange={changeDateRangePicker}
            // maxDate={add(new Date(), { years: 1 })}
            showDateDisplay={false}
            onPreviewChange={undefined}
            preview={undefined}
            months={2}
            ranges={calendarDate}
            locale={ko}
            direction={windowWidth > 880 ? "horizontal" : "vertical"}
            rangeColors={["#00B488", "#F2FAF7"]}
            // color={"#ff0000"}
            onShownDateChange={(e) => {
              changeShowDate({
                year: e.getFullYear(),
                month: e.getMonth() + 1,
              });
            }}
            className="[&_.rdrDayNumber_span]:text-contrast-1 [&_.rdrDayPassive_span]:!text-gray-40 [&_.rdrMonthAndYearWrapper]:bg-default-1 [&_.rdrMonth]:bg-default-1"
          />
          <div
            className={
              "absolute left-[50%] top-6 translate-x-[-50%] font-semibold min-[880px]:left-[25%]"
            }
          >
            {year}.{month}
          </div>
          <div
            className={
              "absolute left-[50%] top-[calc(50%+46px)] translate-x-[-50%] font-semibold min-[880px]:left-[75%] min-[880px]:top-6"
            }
          >
            {year + Math.floor((month + 1) / 12)}.{(month % 12) + 1}
          </div>
        </div>
      </article>
      <ThemeActiveButton1
        className="h-[3rem]"
        onClick={() => handleSubmit()}
        isActive={
          createOperationTitle.length > 0 &&
          createOperationDescription.length > 0
        }
      >
        {mutation.isPending ? (
          <div className="h-full py-1 default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-b-4 border-blue-500"></div>
          </div>
        ) : (
          "업무 생성"
        )}
      </ThemeActiveButton1>
    </div>
  );
};
export default TeamSpaceOperationCreateContainer;