"use client";

import useTeamSpaceStore from "@store/teamSpaceStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { mapTeamSpaceProcessStatusToGroup } from "@utils/variables/teamSpaceProcessStatus";
import { useMemo } from "react";

function isCompletedTask(status: string) {
  const group = mapTeamSpaceProcessStatusToGroup(status);
  return group === "완료";
}

interface ProgressBarProps {
  label: string;
  completed: number;
  total: number;
}

interface Progress {
  completed: number;
  total: number;
}

function addProgress(
  map: Map<string, Progress>,
  key: string,
  completed: boolean,
) {
  const prev = map.get(key) ?? {completed: 0, total: 0};
  map.set(key, {
    completed: prev.completed + (completed ? 1 : 0),
    total: prev.total + 1,
  });
}

function aggregateProgress(project: ITeamSpaceProject) {
  const serviceProgress = new Map<string, Progress>();
  const operationProgress = new Map<string, Progress>();
  const roleProgress = new Map<string, Progress>();
  const userProgress = new Map<string, Progress>();

  project.teamSpaceServices.forEach((service) => {
    service.teamSpaceOperations.forEach((op) => {
      op.teamSpaceTasks.forEach((task) => {
        const completed = isCompletedTask(task.processStatus);
        addProgress(serviceProgress, service.title, completed);
        addProgress(operationProgress, op.title, completed);
        if (task.jobRole) addProgress(roleProgress, task.jobRole, completed);
        if (task.assignee?.user)
          addProgress(userProgress, task.assignee.user.nickname, completed);
      });
    });
  });

  return {
    service: Object.fromEntries(serviceProgress),
    operation: Object.fromEntries(operationProgress),
    jobRole: Object.fromEntries(roleProgress),
    user: Object.fromEntries(userProgress),
  };
}

const ProgressBar = ({label, completed, total}: ProgressBarProps) => {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="relative w-fix px-1">
      <div className="relative z-10 h-full flex max-w-[8.5rem] flex-col justify-center items-center p-1">
        <span className="font-medium max-w-[8rem] w-full overflow-hidden text-ellipsis whitespace-nowrap default-flex">{label}</span>
        <span className="text-xs">
          {percent}% ({completed}/{total})
        </span>
      </div>
      <div className="absolute left-0 top-0 h-full w-full rounded-md border border-primary-60">
        <div
          className="h-full bg-default-2 transition-all duration-500"
          style={{width: `${percent}%`}}
        />
      </div>
    </div>
  );
};

const TeamSpaceProgressContainer = () => {
  const queryClient = useQueryClient();
  const teamSpaceStore = useTeamSpaceStore();

  const {data: project} = useQuery<any>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => Promise.resolve(null), // 실제 fetch 안 함
    enabled: false, // 네트워크 요청 차단
    initialData: () =>
      queryClient.getQueryData<any>(["project", teamSpaceStore.activeProject.id]),
    select: (cached) => cached?.data, // {data: ...} → data만 꺼내쓰기
  });

  const progress = useMemo(() => {
    if (!project) return null;
    return aggregateProgress(project);
  }, [teamSpaceStore.activeProject.id, project]);

  if (!project || !progress) return null;

  return (
    <div className="flex h-[22.5rem] w-full flex-col gap-1 bg-default-1 p-1 text-contrast-1">
      {/* 프로젝트명 */}
      <div className="h-[3rem] rounded-md border-2 border-contrast-1 p-2 text-xl font-bold default-flex">
        {project.title}
      </div>

      {/* 서비스 */}
      <div className="flex h-full gap-2 overflow-x-scroll rounded-md border-2 border-contrast-1 p-1 scrollbar-hide">
        <div className="w-[2rem] rounded-lg border border-contrast-1 text-center text-sm font-semibold tracking-[-0.2em] default-flex [writing-mode:vertical-rl]">
          서비스
        </div>
        <div className="flex gap-2 scrollbar-hide overflow-x-scroll">
          {Object.entries(progress.service).map(([title, {completed, total}]) => (
            <ProgressBar
              key={title}
              label={title}
              completed={completed}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* 업무 */}
      <div className="flex h-full gap-2 overflow-x-scroll rounded-md border-2 border-contrast-1 p-1 scrollbar-hide">
        <div className="w-[2rem] rounded-lg border border-contrast-1 text-center text-sm font-semibold tracking-[0.2em] default-flex [writing-mode:vertical-rl]">
          업무
        </div>
        <div className="flex gap-2 scrollbar-hide overflow-x-scroll">
          {Object.entries(progress.operation).map(
            ([title, {completed, total}]) => (
              <ProgressBar
                key={title}
                label={title}
                completed={completed}
                total={total}
              />
            ),
          )}
        </div>
      </div>

      {/* 직군 */}
      <div className="flex h-full gap-2 overflow-x-scroll rounded-md border-2 border-contrast-1 p-1 scrollbar-hide">
        <div className="w-[2rem] rounded-lg border border-contrast-1 text-center text-sm font-semibold tracking-[0.2em] default-flex [writing-mode:vertical-rl]">
          직군
        </div>
        <div className="flex gap-2 scrollbar-hide overflow-x-scroll">
          {Object.entries(progress.jobRole).map(([role, {completed, total}]) => (
            <ProgressBar
              key={role}
              label={role}
              completed={completed}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* 담당자 */}
      <div className="flex h-full gap-2 overflow-x-scroll rounded-md border-2 border-contrast-1 p-1 scrollbar-hide">
        <div className="w-[2rem] rounded-lg border border-contrast-1 text-center text-sm font-semibold tracking-[-0.2em] default-flex [writing-mode:vertical-rl]">
          담당자
        </div>
        <div className="flex gap-2 scrollbar-hide overflow-x-scroll">
          {Object.entries(progress.user).map(([name, {completed, total}]) => (
            <ProgressBar
              key={name}
              label={name}
              completed={completed}
              total={total}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamSpaceProgressContainer;
