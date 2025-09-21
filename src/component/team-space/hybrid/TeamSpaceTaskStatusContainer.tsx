import BasicButton from "@component/common/button/hybrid/BasicButton";
import { Modal } from "@component/common/modal/hybrid/Modal";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import { useDragAndDrop } from "@hooks/useDragAndDrop";
import useFetchCSR from "@hooks/useFetchCSR";
import useModalState from "@hooks/useModalState";
import useTeamSpaceStore from "@store/teamSpaceStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mapTeamSpaceProcessStatusToGroup, ProcessStatus } from "@utils/variables/teamSpaceProcessStatus";
import { useMemo, useState } from "react";
import TeamSpaceTaskCard from "./TeamSpaceTaskCard";
import TeamSpaceTaskCreateModal from "./TeamSpaceTaskCreateModal";
import TeamSpaceTaskListCreateModal from "./TeamSpaceTaskListCreateModal";

interface ITeamSpaceTaskCard {
  task: ITeamSpaceTask & {
    projectId: number;
    serviceId: number;
    operationId: number;
  };
}

interface ITeamSpaceTaskStatusContainer extends IModalComponent {}

const TeamSpaceTaskStatusContainer = (props: ITeamSpaceTaskStatusContainer) => {
  const queryClient = useQueryClient();
  const teamSpaceStore = useTeamSpaceStore();
  const fetchCSR = useFetchCSR();

  // React Query 캐시에서 프로젝트 가져오기
  const {data: project} = useQuery<any>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => Promise.resolve(undefined), // fetch 안 하고도 쿼리를 활성화
    enabled: teamSpaceStore.activeProject.id > 0,
    initialData: () =>
      queryClient.getQueryData<any>([
        "project",
        teamSpaceStore.activeProject.id,
      ]),
  });

  function filterOrAll<T>(
    list: T[],
    predicate: (item: T, index: number, array: T[]) => boolean,
  ): T[] {
    const filtered = list.filter(predicate);
    return filtered.length > 0 ? filtered : list;
  }

  const taskList = useMemo(() => {
    if (teamSpaceStore.activeProject.id === 0) return [];

    const _project = project?.data;
    if (!_project) return [];

    // 1. 서비스 리스트 필터링
    const _serviceList: ITeamSpaceService[] = filterOrAll(
      _project?.teamSpaceServices ?? [],
      (i) => i.id === teamSpaceStore.activeService.id,
    );

    // 2. 오퍼레이션 리스트 필터링
    const _operationList =
      teamSpaceStore.activeService.id > 0
        ? filterOrAll(
          _serviceList[0]?.teamSpaceOperations ?? [],
          (i) => i.id === teamSpaceStore.activeOperation.id,
        )
        : _serviceList.flatMap((i) => i.teamSpaceOperations ?? []);

    // 3. 태스크 리스트 필터링 후 project, service, operation ID 포함
    return _operationList
      .flatMap((op) =>
        (op.teamSpaceTasks ?? []).map((task) => ({
          ...task,
          projectId: _project.id,
          serviceId:
            _serviceList.find((s) => s.teamSpaceOperations?.includes(op))?.id ??
            0,
          operationId: op.id,
        })),
      )
      .filter((task) =>
        teamSpaceStore.activeOwner.userId == 0
          ? true
          : task.assignee?.user.id === teamSpaceStore.activeOwner.userId,
      )
      .filter((role) =>
        teamSpaceStore.activeRole == ""
          ? true
          : role.assignee?.jobRoles.includes(teamSpaceStore.activeRole),
      );
  }, [
    project,
    teamSpaceStore.activeProject.id,
    teamSpaceStore.activeService.id,
    teamSpaceStore.activeOperation.id,
    teamSpaceStore.activeRole,
    teamSpaceStore.activeOwner.userId,
  ]);

  const dragAndDropHandle = (
    e: React.DragEvent<HTMLElement>,
    data: {status: string}
  ) => {
    if (draggingTask.status == data.status) return;
    modalState.openModal();
    setNextStatusSpace(data.status);
  };

  const {isDragging, onDragOver, onDrop} =
    useDragAndDrop<{status: string}>({
      handler: dragAndDropHandle,
    });
  
  const modalState = useModalState();

  const [nextStatusSpace, setNextStatusSpace] = useState<string>("대기중");

  const [draggingTask, setDraggingTask] = useState<{
    task: ITeamSpaceTaskCard | undefined;
    status: string;
  }>({
    task: undefined,
    status: "",
  });

  
  const handleDragStart = ({task, status}: {task: ITeamSpaceTaskCard, status: string}) => {
    setDraggingTask({
      task,
      status
    });
  };

  const updateTeamSpaceTaskHandler = async (status: string) => {
    await fetchCSR.requestWithHandler({
      url: "/api/team-space/task",
      method: "PATCH",
      body: {
        id: draggingTask.task?.task.id, // ✅ 추가
        status: status,
      },
      handleSuccess: () => {
        queryClient.setQueryData<{data: ITeamSpaceProject}>(
          ["project", teamSpaceStore.activeProject.id],
          (old) => {
            if (!old) return old;

            const updatedServices = old.data.teamSpaceServices.map((service) => {
              if (service.id !== draggingTask.task?.task.serviceId) return service;

              const updatedOperations = service.teamSpaceOperations.map((op) => {
                if (op.id !== draggingTask.task?.task.operationId) return op;

                return {
                  ...op,
                  teamSpaceTasks: op.teamSpaceTasks.map((task) =>
                    task.id === draggingTask.task?.task.id
                      ? {
                        ...draggingTask.task?.task,
                        processStatus: status,
                      }
                      : task,
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

        modalState.closeModal();
      }
    });
  };
  

  return (
    <div className="bg-default-2 px-1 pb-1">
      <div className="mb-1 flex h-[2.5rem] w-full justify-end gap-1 bg-default-1 p-1">
        {teamSpaceStore.activeProject.id > 0 &&
          teamSpaceStore.activeOperation.id > 0 && (
          <NestedModalButton
            buttonClassName="default-flex rounded-xl p-1 border border-contrast-1 hover:bg-contrast-1 hover:text-default-1"
            modal={<TeamSpaceTaskListCreateModal />}
          >
              작업 한번에 추가하기
          </NestedModalButton>
        )}
        {teamSpaceStore.activeProject.id > 0 && (
          <NestedModalButton
            buttonClassName="default-flex rounded-xl p-1 border border-contrast-1 hover:bg-contrast-1 hover:text-default-1"
            modal={<TeamSpaceTaskCreateModal />}
          >
            작업 추가하기
          </NestedModalButton>
        )}
      </div>

      <section className="flex h-[33.75rem] w-full gap-1 overflow-x-scroll scrollbar-hide">
        {["대기중", "진행중", "검토중", "완료"].map((status) => (
          <article
            key={status}
            className="w-full min-w-[12rem] bg-default-1 px-1 pt-1 text-contrast-1"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, {status: status})}
          >
            <h2 className="w-full rounded-2xl border-2 border-default-2 py-2 default-flex">
              {status}
            </h2>
            <ul className="mt-2 flex h-[calc(100%-3.5rem)] flex-col gap-1 overflow-y-scroll scrollbar-hide">
              {taskList
                .filter(
                  (i) =>
                    mapTeamSpaceProcessStatusToGroup(i.processStatus) == status,
                )
                .map((j) => (
                  <li
                    className="flex flex-col gap-3 text-contrast-1"
                    key={j.id}
                    draggable
                    onDragStart={() =>
                      handleDragStart({
                        task: {task: j}, // ✅ 감싸서 전달
                        status,
                      })
                    }
                  >
                    <TeamSpaceTaskCard task={j} />
                  </li>
                ))}
            </ul>
          </article>
        ))}
      </section>

      {modalState.isOpen && (
        <Modal modalState={modalState}>
          <ModalTemplate>
            <div className="mb-4 w-full py-2 primary-border-radius default-flex">
              {nextStatusSpace}
            </div>
            <div className="flex w-full justify-start gap-2 p-2 primary-border-radius">
              {Object.entries(ProcessStatus)
                .filter(
                  ([key]) =>
                    mapTeamSpaceProcessStatusToGroup(key) === nextStatusSpace,
                )
                .map(([key, value]) => (
                  <BasicButton
                    key={key}
                    className={`rounded-lg border-2 p-1 ${
                      mapTeamSpaceProcessStatusToGroup(key) === "대기중"
                        ? "border-gray-80"
                        : mapTeamSpaceProcessStatusToGroup(key) === "진행중"
                          ? "border-green-80"
                          : mapTeamSpaceProcessStatusToGroup(key) === "검토중"
                            ? "border-orange-80"
                            : "border-red-80"
                    }`}
                    onClick={() => updateTeamSpaceTaskHandler(key)}
                  >
                    {value}
                  </BasicButton>
                ))}
            </div>
          </ModalTemplate>
        </Modal>
      )}
    </div>
  );
};

export default TeamSpaceTaskStatusContainer;
