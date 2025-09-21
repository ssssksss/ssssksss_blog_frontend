import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useTeamSpaceStore from "@store/teamSpaceStore";
import "@styles/reactDataRange.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { teamSpaceGetActionList, TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import { isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface ITeamSpaceTaskCreateModal extends IModalComponent {

}
const TeamSpaceTaskCreateModal = (props: ITeamSpaceTaskCreateModal) =>
{
  const teamSpaceStore = useTeamSpaceStore();
  const queryClient = useQueryClient();
  const [createTaskTitle, setCreateTaskTitle] = useState("");
  const [createTaskDescription, setCreateTaskDescription] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const cachedProject = queryClient.getQueryData<{data: ITeamSpaceProject}>([
    "project",
    teamSpaceStore.activeProject.id,
  ]);
  const project = cachedProject?.data;
  const [activeService, setActiveService] = useState({
    id: 0,
    title: "",
  });
  const [activeAssignee, setActiveAssignee] = useState<{
    id: number;
    jobRoles: string[];
  }>({
    id: 0,
    jobRoles: [],
  });
  const [activeOperation, setActiveOperation] = useState({
    id: 0,
    title: "",
  });
  const [activeJobRole, setActiveJobRole] = useState<TeamSpaceRoleType>("");
  const [activeAction, setActiveAction] = useState<
    {
      key: string,
      value: string,
    }>({
      key: "",
      value: ""
    });
  const [referenceUrls, setReferenceUrls] = useState<string[]>([""]);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
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

  const createTeamSpaceTaskHandler = async () => {
    const response = await fetch("/api/team-space/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: createTaskTitle,
        description: createTaskDescription,
        scheduledStartAt: new Date(calendarDate[0].startDate).toISOString(),
        scheduledEndAt: new Date(calendarDate[0].endDate).toISOString(),
        projectId: teamSpaceStore.activeProject.id,
        serviceId: activeService.id,
        operationId: activeOperation.id,
        assigneeId: activeAssignee.id,
        jobRole: activeJobRole,
        action: activeAction.key,
        referenceUrls: JSON.stringify(referenceUrls),
        imageUrls: JSON.stringify(imageUrls),
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json(); // 응답 데이터를 JSON으로 파싱
  };

  const mutation = useMutation({
    mutationFn: createTeamSpaceTaskHandler,
    onSuccess: (data: {
    data: ITeamSpaceTask;
    msg: string;
    statusCode: number;
  }) => {
      queryClient.setQueryData<{data: ITeamSpaceProject}>(
        ["project", teamSpaceStore.activeProject.id],
        (old) => {
          if (!old) return old;

          const newData: ITeamSpaceProject = {
            ...old.data,
            teamSpaceServices: old.data.teamSpaceServices.map((service) => ({
              ...service,
              teamSpaceOperations: service.teamSpaceOperations.map((op) => ({
                ...op,
                teamSpaceTasks: [...(op.teamSpaceTasks || []), data.data],
              })),
            })),
          };

          return {
            ...old,
            data: newData, // 새로운 객체
          };
        },
      );

    props.closeModal!();
    },
    onError: (error: Error) => {},
  });

  const handleSubmit = () => {
    if (createTaskTitle == "") return;
    if (createTaskDescription == "") return;
    if (activeService.id == 0) return;
    if (activeOperation.id == 0) return;
    if (activeAssignee.id == 0) return;
    if (activeJobRole == "") return;
    if (activeAction.key == "") return;
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
      selection.startDate?.getFullYear() != selection.endDate?.getFullYear() ||
      selection.startDate?.getMonth() != selection.endDate?.getMonth()
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

  // 값 변경
  const handleChange = (
    index: number,
    value: string,
    type: "url" | "image",
  ) => {
    if (type === "url") {
      setReferenceUrls((prev) => {
        const copy = [...prev];
        copy[index] = value;
        return copy;
      });
    } else {
      setImageUrls((prev) => {
        const copy = [...prev];
        copy[index] = value;
        return copy;
      });
    }
  };

  // 필드 추가
  const handleAddField = (type: "url" | "image") => {
    if (type === "url") {
      setReferenceUrls((prev) => [...prev, ""]);
    } else {
      setImageUrls((prev) => [...prev, ""]);
    }
  };

  // 필드 제거
  const handleRemoveField = (index: number, type: "url" | "image") => {
    if (type === "url") {
      setReferenceUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImageUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <ModalTemplate style={{width: "100vw"}}>
      {props.closeButtonComponent}
      <div className="flex min-h-[10rem] w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-contrast-1 p-2">
        <article className="flex flex-col gap-1">
          <h3>작업 제목 </h3>
          <ThemeInput1
            onChange={(e) => setCreateTaskTitle(e.target.value)}
            type="text"
            maxLength={30}
            placeholder="작업 제목을 입력해주세요."
            className="w-full rounded-lg"
          />
        </article>
        <article className="flex flex-col gap-1">
          <h3>작업 설명</h3>
          <ThemeInput1
            onChange={(e) => setCreateTaskDescription(e.target.value)}
            type="text"
            maxLength={30}
            placeholder="작업 설명을 입력해주세요."
            className="w-full rounded-lg"
          />
        </article>
        <article className="grid grid-cols-[120px_auto] items-start gap-1">
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            프로젝트
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.title}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            서비스
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceServices.map((i) => (
              <ThemeActiveButton1
                isActive={i.id == activeService.id}
                key={i.id}
                className="p-1"
                onClick={() => {
                  setActiveService({
                    id: i.id,
                    title: i.title,
                  });
                  if (i.id == activeService.id) {
                    setActiveOperation({
                      id: 0,
                      title: "",
                    });
                    setActiveAssignee({
                      id: 0,
                      jobRoles: [],
                    });
                  }
                }}
              >
                {i.title}
              </ThemeActiveButton1>
            ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            업무
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceServices
              .find((i) => i.id == activeService.id)
              ?.teamSpaceOperations.map((j) => (
                <ThemeActiveButton1
                  isActive={j.id == activeOperation.id}
                  key={j.id}
                  className="p-1"
                  onClick={() => {
                    setActiveOperation({
                      id: j.id,
                      title: j.title,
                    });
                  }}
                >
                  {j.title}
                </ThemeActiveButton1>
              ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            담당자
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceTeam?.teamSpaceMembers.map((i) => (
              <ThemeActiveButton1
                isActive={i.id == activeAssignee.id}
                key={i.id}
                className="p-1"
                onClick={() => {
                  setActiveAssignee({
                    id: i.id,
                    jobRoles: [],
                  });
                }}
              >
                {i.nickname}
              </ThemeActiveButton1>
            ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            역할
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.teamSpaceTeam?.teamSpaceMembers
              .find((i) => i.id == activeAssignee.id)
              ?.jobRoles.map((j) => (
                <ThemeActiveButton1
                  isActive={j == activeJobRole}
                  key={j}
                  className="p-1"
                  onClick={() => {
                    setActiveJobRole(j);
                    setActiveAction({
                      key: "",
                      value: "",
                    });
                  }}
                >
                  {j}
                </ThemeActiveButton1>
              ))}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            행동
          </div>
          <div className="mr-1 flex min-h-[44px] w-full flex-wrap items-center gap-1 rounded-lg border border-contrast-1 p-1">
            {Object.entries(teamSpaceGetActionList(activeJobRole) || {}).map(
              ([key, value]) => (
                <ThemeActiveButton1
                  isActive={value === activeAction.value}
                  key={key}
                  className="p-1"
                  onClick={() =>
                    setActiveAction({
                      key: key as string,
                      value: value as string,
                    })
                  }
                >
                  {value as string}
                </ThemeActiveButton1>
              ),
            )}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            참고 URL
          </div>
          <div className="mr-1 flex min-h-[44px] flex-col items-center rounded-lg border border-contrast-1 p-1">
            {referenceUrls.map((url, index) => (
              <div
                key={index}
                className="mr-1 mt-1 flex min-h-[44px] w-full items-center rounded-lg border border-contrast-1 p-1"
              >
                <input
                  type="text"
                  value={url}
                  onChange={(e) => handleChange(index, e.target.value, "url")}
                  placeholder="참고 URL 입력"
                  className="flex-1 outline-none"
                />
                <div className="ml-2 flex items-center gap-1">
                  {/* 삭제 버튼 (1개 이상일 때만) */}
                  {referenceUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, "url")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IoRemoveCircleOutline size={22} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="mr-1 mt-1 flex min-h-[44px] w-full rounded-lg border border-contrast-1 p-1">
              <button
                type="button"
                onClick={() => handleAddField("url")}
                className="w-full text-blue-500 default-flex hover:text-blue-700"
              >
                <IoAddCircleOutline size={22} />
              </button>
            </div>
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            참고 이미지
          </div>
          <div className="mr-1 flex min-h-[44px] flex-col items-center rounded-lg border border-contrast-1 p-1">
            {imageUrls.map((img, index) => (
              <div
                key={index}
                className="mr-1 mt-1 flex min-h-[44px] w-full items-center rounded-lg border border-contrast-1 p-1"
              >
                <input
                  type="text"
                  value={img}
                  onChange={(e) => handleChange(index, e.target.value, "image")}
                  placeholder="참고 이미지 URL 입력"
                  className="flex-1 outline-none"
                />
                <div className="ml-2 flex items-center gap-1">
                  {imageUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index, "image")}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IoRemoveCircleOutline size={22} />
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="mr-1 mt-1 flex min-h-[44px] w-full rounded-lg border border-contrast-1 p-1">
              <button
                type="button"
                onClick={() => handleAddField("image")}
                className="w-full text-blue-500 default-flex hover:text-blue-700"
              >
                <IoAddCircleOutline size={22} />
              </button>
            </div>
          </div>
        </article>
        <article
          className={
            "bg-default-1} mt-[1rem] flex flex-col items-center gap-2 rounded-sm border border-primary-60 pt-[2rem]"
          }
        >
          <h3> 작업 제작 기간 </h3>
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
          className="h-[3rem] flex-shrink-0"
          onClick={() => handleSubmit()}
          isActive={
            createTaskTitle.trim().length > 0 &&
            createTaskDescription.trim().length > 0 &&
            activeService.id !== 0 &&
            activeOperation.id !== 0 &&
            activeAssignee.id !== 0 &&
            activeJobRole !== "" &&
            activeAction.key != ""
          }
          disabled={
            !(
              createTaskTitle.trim().length > 0 &&
              createTaskDescription.trim().length > 0 &&
              activeService.id !== 0 &&
              activeOperation.id !== 0 &&
              activeAssignee.id !== 0 &&
              activeJobRole !== "" &&
              activeAction.key != ""
            )
          }
        >
          {mutation.isPending ? (
            <div className="h-full py-1 default-flex">
              <div className="border-white-500 aspect-square h-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
            </div>
          ) : (
            "작업 생성"
          )}
        </ThemeActiveButton1>
      </div>
    </ModalTemplate>
  );
};
export default TeamSpaceTaskCreateModal;

