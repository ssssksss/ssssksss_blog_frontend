import DeleteConfirmButton from "@component/common/button/DeleteConfirmButton";
import BasicButton from "@component/common/button/hybrid/BasicButton";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import CustomEditor from "@component/common/editor/CustomEditor";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useFetchCSR from "@hooks/useFetchCSR";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useUserStore from "@store/userStore";
import "@styles/reactDataRange.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MarkdownPreview from "@utils/editor/MarkdownPreview";
import { teamSpaceGetActionList, TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import { ProcessStatus } from "@utils/variables/teamSpaceProcessStatus";
import { isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { DateRangePicker, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // 기본 스타일
import "react-date-range/dist/theme/default.css"; // 기본 테마
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface ITeamSpaceTaskUpdateDeleteModal extends IModalComponent {
  task: ITeamSpaceTask & {
    projectId: number;
    serviceId: number;
    operationId: number;
  };
}
const TeamSpaceTaskUpdateDeleteModal = (props: ITeamSpaceTaskUpdateDeleteModal) =>
{
  const teamSpaceStore = useTeamSpaceStore();
  const userStore = useUserStore();
  const fetchCSR = useFetchCSR();
  const queryClient = useQueryClient();
  const [createTaskTitle, setCreateTaskTitle] = useState(props.task.title);
  const [createTaskDescription, setCreateTaskDescription] = useState(props.task.description);
  const [year, setYear] = useState(
    new Date(new Date(props.task.scheduledStartAt).toISOString()).getFullYear(),
  );
  const [month, setMonth] = useState(
    new Date(new Date(props.task.scheduledStartAt).toISOString()).getMonth() +
      1,
  );
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const cachedProject = queryClient.getQueryData<{data: ITeamSpaceProject}>([
    "project",
    teamSpaceStore.activeProject.id,
  ]);
  const project = cachedProject?.data;
  const [activeService, setActiveService] = useState({
    id: props.task.serviceId,
  });
  const [activeAssignee, setActiveAssignee] = useState<{
    id: number;
  }>({
    id: props.task.assignee.id,
  });
  const [activeOperation, setActiveOperation] = useState({
    id: props.task.operationId,
  });
  const [activeJobRole, setActiveJobRole] = useState<TeamSpaceRoleType>(
    props.task.jobRole,
  );
  const [activeAction, setActiveAction] = useState<{
    key: string;
  }>({
    key: props.task.action,
  });
  const [activeStatus, setActiveStatus] = useState<string>(
    props.task.processStatus,
  );
  const [referenceUrls, setReferenceUrls] = useState<string[]>([props.task.refUrlJSON ? JSON.parse(props.task.refUrlJSON) : ""]);
  const [imageUrls, setImageUrls] = useState<string[]>([props.task.imageURLJSON ? JSON.parse(props.task.imageURLJSON) : ""]);
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
      startDate: new Date(new Date(props.task.scheduledStartAt).toISOString()),
      endDate: new Date(new Date(props.task.scheduledEndAt).toISOString()),
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

  const updateTeamSpaceTaskHandler = async () => {
    const response = await fetch("/api/team-space/task", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.task.id, // ✅ 추가
        title: createTaskTitle,
        description: createTaskDescription,
        scheduledStartAt: new Date(calendarDate[0].startDate).toISOString(),
        scheduledEndAt: new Date(calendarDate[0].endDate).toISOString(),
        projectId: teamSpaceStore.activeProject.id,
        serviceId: activeService.id,
        operationId: activeOperation.id,
        assigneeId: activeAssignee.id,
        jobRole: activeJobRole,
        status: activeStatus,
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

  const updateTaskMutation = useMutation({
    mutationFn: updateTeamSpaceTaskHandler,
    onSuccess: (data: {
      data: ITeamSpaceTask;
      msg: string;
      statusCode: number;
    }) => {
      queryClient.setQueryData<{data: ITeamSpaceProject}>(
        ["project", teamSpaceStore.activeProject.id],
        (old) => {
          if (!old) return old;

          const updatedServices = old.data.teamSpaceServices.map((service) => {
            if (service.id !== activeService.id) return service;

            const updatedOperations = service.teamSpaceOperations.map((op) => {
              if (op.id !== activeOperation.id) return op;

              return {
                ...op,
                teamSpaceTasks: op.teamSpaceTasks.map((task) =>
                  task.id === data.data.id ? data.data : task,
                ),
              };
            });

            return {
              ...service,
              teamSpaceOperations: updatedOperations,
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

  // ✅ 호출 방법
  const handleDelete = async () => {
    await fetchCSR.requestWithHandler(
      {
        url: `/api/team-space/task?id=${props.task.id}`,
        method: "DELETE",
        handleSuccess: () => {
          queryClient.setQueryData<{data: ITeamSpaceProject}>(
            ["project", teamSpaceStore.activeProject.id],
            (old) => {
              if (!old) return old;

              const updatedServices = old.data.teamSpaceServices.map((service) => {
                if (service.id !== activeService.id) return service;

                const updatedOperations = service.teamSpaceOperations.map((op) => {
                  if (op.id !== activeOperation.id) return op;

                  return {
                    ...op,
                    teamSpaceTasks: op.teamSpaceTasks.filter(
                      (task) => task.id !== props.task.id, // ✅ props.task.id 사용
                    ),
                  };
                });

                return {
                  ...service,
                  teamSpaceOperations: updatedOperations,
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

          props.closeModal?.();
        }
      },
    );
  };

  const handleSubmit = () => {
    // 1. 수정한데이터가 카테고리가 변경되었으면 지우고 목록에 추가해줄 것
    if (createTaskTitle == "") return;
    if (createTaskDescription == "") return;
    if (activeService.id == 0) return;
    if (activeOperation.id == 0) return;
    if (activeAssignee.id == 0) return;
    if (activeJobRole == "") return;
    if (activeAction.key == "") return;
    updateTaskMutation.mutate();
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

  const isManager = ["OWNER", "HEAD", "MANAGER", "LEAD"].some((position) => {
    const _member = project?.teamSpaceTeam.teamSpaceMembers.find(
      (i: ITeamSpaceMember) => i.user.id === userStore.id,
    );

    if (position === "LEAD") {
      return _member?.jobRoles.includes(props.task.jobRole) ?? false;
    }
    return _member?.position === position;
  });

  const isEditPossible = userStore.id == props.task.assignee.id || isManager;

  const handleContentChange = (value: string) => {
    setCreateTaskDescription(value);
  };

  const addS3ImageUrl = (keyPath: string) => { };
  
  return (
    <ModalTemplate style={{width: "100vw"}}>
      {props.closeButtonComponent}
      <div className="flex min-h-[10rem] w-full flex-col gap-4 overflow-y-scroll rounded-lg border border-contrast-1 p-2 scrollbar-hide">
        <article
          className={`flex flex-col gap-1 ${isEditPossible ? "" : "pointer-events-none"}`}
        >
          <h3>작업 제목 </h3>
          <ThemeInput1
            onChange={(e) => setCreateTaskTitle(e.target.value)}
            type="text"
            maxLength={30}
            placeholder="작업 제목을 입력해주세요."
            className="w-full rounded-lg"
            defaultValue={props.task.title}
          />
        </article>
        <article
          className={`flex h-[40rem] flex-shrink-0 flex-col gap-1 ${isEditPossible ? "" : "pointer-events-none"}`}
        >
          <h3>작업 설명</h3>
          {isEditPossible ? (
            <CustomEditor
              defaultValue={props.task.description}
              handleContentChange={handleContentChange}
              addS3ImageUrl={addS3ImageUrl}
              isPreview={true}
              s3DirectoryPath="team-space/description"
            />
          ) : (
            <div className="h-[38.5rem] flex-shrink-0 p-1 primary-border-radius">
              <MarkdownPreview content={createTaskDescription} />
            </div>
          )}
        </article>
        <article className="grid grid-cols-[120px_auto] items-start gap-1">
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            프로젝트
          </div>
          <div className="flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {project?.title}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            서비스
          </div>
          <div className="flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {
              project?.teamSpaceServices.find((i) => i.id == activeService.id)
                ?.title
            }
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            업무
          </div>
          <div className="flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {
              project?.teamSpaceServices
                .find((i) => i.id == activeService.id)
                ?.teamSpaceOperations.find((j) => j.id == activeOperation.id)
                ?.title
            }
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            담당자
          </div>
          <div className="flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {isManager
              ? project?.teamSpaceTeam?.teamSpaceMembers
                .filter((i) => i.jobRoles.includes(props.task.jobRole))
                .map((j) => (
                  <ThemeActiveButton1
                    isActive={j.id == activeAssignee.id}
                    key={j.id}
                    className="p-1"
                    onClick={() => setActiveAssignee({id: j.id})}
                  >
                    {j.nickname}
                  </ThemeActiveButton1>
                ))
              : props.task.assignee.nickname}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            역할
          </div>
          <div className="flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            {activeJobRole}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            행동
          </div>
          <div className="flex min-h-[44px] w-full flex-wrap items-center gap-1 rounded-lg border border-contrast-1 p-1">
            {/* {isEditPossible
              ? Object.entries(teamSpaceGetActionList(activeJobRole) || {}).map(
                ([key, value]) => (
                  <ThemeActiveButton1
                    isActive={key === activeAction.key}
                    key={key}
                    className="p-1"
                    onClick={() =>
                      setActiveAction({
                        key: key as string,
                      })
                    }
                  >
                    {value as string}
                  </ThemeActiveButton1>
                ),
              )
              : teamSpaceGetActionList(activeJobRole)[activeAction.key]} */}
            {teamSpaceGetActionList(activeJobRole)[activeAction.key]}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            상태
          </div>
          <div className="flex min-h-[44px] w-full flex-wrap items-center gap-1 rounded-lg border border-contrast-1 p-1">
            {isEditPossible
              ? Object.entries(ProcessStatus).map(([key, value], index) => (
                <BasicButton
                  key={key}
                  className={`rounded-lg border-2 p-1 ${index < 3 ? "border-gray-80" : index < 7 ? "border-green-80" : index < 10 ? "border-orange-80" : "border-red-80"} ${key == activeStatus && (index < 3 ? "bg-gray-40" : index < 7 ? "bg-green-60" : index < 10 ? "bg-orange-60" : "bg-red-60")}`}
                  onClick={() => setActiveStatus(key)}
                >
                  {value as string}
                </BasicButton>
              ))
              : activeStatus}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            참고 URL
          </div>
          <div className="flex min-h-[44px] flex-col items-center rounded-lg border border-contrast-1 p-1">
            {referenceUrls.map((url, index) => (
              <div
                key={index}
                className="mr-1 mt-1 flex min-h-[44px] w-full items-center rounded-lg border border-contrast-1 p-1"
              >
                {isEditPossible ? (
                  <>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) =>
                        handleChange(index, e.target.value, "url")
                      }
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
                  </>
                ) : (
                  <div> {url} </div>
                )}
              </div>
            ))}
            {isEditPossible && (
              <div className="mr-1 mt-1 flex min-h-[44px] w-full rounded-lg border border-contrast-1 p-1">
                <button
                  type="button"
                  onClick={() => handleAddField("url")}
                  className="w-full text-blue-500 default-flex hover:text-blue-700"
                >
                  <IoAddCircleOutline size={22} />
                </button>
              </div>
            )}
          </div>
          <div className="mr-1 flex min-h-[44px] items-center rounded-lg border border-contrast-1 p-1">
            참고 이미지
          </div>
          <div className="flex min-h-[44px] flex-col items-center rounded-lg border border-contrast-1 p-1">
            {imageUrls.map((img, index) => (
              <div
                key={index}
                className="mt-1 flex min-h-[44px] w-full items-center rounded-lg border border-contrast-1 p-1"
              >
                {isEditPossible ? (
                  <>
                    <input
                      type="text"
                      value={img}
                      onChange={(e) =>
                        handleChange(index, e.target.value, "image")
                      }
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
                  </>
                ) : (
                  <div> {img} </div>
                )}
              </div>
            ))}
            {isEditPossible && (
              <div className="mr-1 mt-1 flex min-h-[44px] w-full rounded-lg border border-contrast-1 p-1">
                <button
                  type="button"
                  onClick={() => handleAddField("image")}
                  className="w-full text-blue-500 default-flex hover:text-blue-700"
                >
                  <IoAddCircleOutline size={22} />
                </button>
              </div>
            )}
          </div>
        </article>
        <article
          className={`mt-[1rem] flex flex-col items-center gap-2 rounded-sm border border-primary-60 bg-default-1 pt-[2rem] ${isEditPossible ? "" : "pointer-events-none"}`}
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
        {isEditPossible && (
          <div className="flex gap-2">
            <ThemeActiveButton1
              className="h-[3rem] flex-1 flex-shrink-0"
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
              {updateTaskMutation.isPending ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="aspect-square h-4 animate-spin rounded-full border-b-4 border-blue-500"></div>
                </div>
              ) : (
                "작업 수정"
              )}
            </ThemeActiveButton1>
            <DeleteConfirmButton
              className="h-[3rem] w-[4rem] flex-shrink-0"
              onConfirmClick={async () => await handleDelete()}
              onCancelClick={() => ""}
            />
          </div>
        )}
      </div>
    </ModalTemplate>
  );
};
export default TeamSpaceTaskUpdateDeleteModal;