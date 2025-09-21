"use client";

import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useUserStore from "@store/userStore";
import { useQuery } from "@tanstack/react-query";
import { TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import { useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import TeamSpaceMemberCreateUpdateDeleteModal from "./TeamSpaceMemberCreateUpdateDeleteModal";
import TeamSpaceOperationCreateUpdateDeleteModal from "./TeamSpaceOperationCreateUpdateDeleteModal";
import TeamSpaceProjectCreateUpdateDeleteModal from "./TeamSpaceProjectCreateUpdateDeleteModal";
import TeamSpaceServiceCreateUpdateDeleteModal from "./TeamSpaceServiceCreateUpdateDeleteModal";

interface ITeamSpaceCategoryAndProgress {
  projectList: ITeamSpaceProject[]
}

const TeamSpaceCategoryAndProgress = (props: ITeamSpaceCategoryAndProgress) => {
  const teamSpaceStore = useTeamSpaceStore();
  const userStore = useUserStore();

  const fetchProject = async (projectId: number) => {
    const res = await fetch(`/api/team-space/project/${projectId}`);

    if (!res.ok) {
      throw new Error("프로젝트를 불러오는 데 실패했습니다.");
    }

    return res.json();
  };

  const {
    data: project,
    isLoading,
    error,
  } = useQuery<{data: ITeamSpaceProject}>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => fetchProject(teamSpaceStore.activeProject.id),
    enabled: teamSpaceStore.activeProject.id > 0,
  });

  useEffect(() => {
    teamSpaceStore.setProjectList(props.projectList);
  }, []);

  console.log("TeamSpaceCategoryAndProgress.tsx 파일 : ",project);

  return (
    <div className="flex h-[22.5rem] w-full flex-col gap-1 bg-default-1 p-1 text-contrast-1">
      {/* 프로젝트 */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">프로젝트 </div>
        <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
          {teamSpaceStore.projectList.map((i) => (
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              key={i.id}
              isActive={i.id === teamSpaceStore.activeProject.id}
              onClick={() => {
                teamSpaceStore.setActiveProject({
                  id: i.id,
                  title: i.title,
                });
                teamSpaceStore.setActiveService({
                  id: 0,
                  title: "",
                });
                teamSpaceStore.setActiveOperation({
                  id: 0,
                  title: "",
                });
                teamSpaceStore.setActiveRole("");
                teamSpaceStore.setActiveOwner({
                  nickname: "",
                  memberId: 0,
                  userId: 0,
                });
                teamSpaceStore.setFilterDate({
                  startedAt: "all",
                  endedAt: "all",
                });
              }}
            >
              {i.title}
            </ThemeActiveButton1>
          ))}
          <NestedModalButton
            buttonClassName="default-flex rounded-xl aspect-square w-[2rem] border border-contrast-1"
            modal={<TeamSpaceProjectCreateUpdateDeleteModal />}
          >
            <IoIosSettings size={24} />
          </NestedModalButton>
        </div>
      </div>

      {/* 서비스 */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">서비스</div>
        {isLoading ? (
          <div className="relative h-[2rem] w-[4rem] rounded-2xl py-1 primary-set default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              isActive={teamSpaceStore.activeService.id == 0}
              onClick={() => {
                teamSpaceStore.setActiveService({
                  id: 0,
                  title: "",
                });
              }}
            >
              all
            </ThemeActiveButton1>
            {project?.data?.teamSpaceServices?.map((i: ITeamSpaceService) => (
              <ThemeActiveButton1
                className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
                key={i.id}
                isActive={i.id === teamSpaceStore.activeService.id}
                onClick={() =>
                  teamSpaceStore.setActiveService({
                    id: i.id,
                    title: i.title,
                  })
                }
              >
                {i.title}
              </ThemeActiveButton1>
            ))}
            {teamSpaceStore.activeProject.id > 0 && (
              <NestedModalButton
                buttonClassName="default-flex rounded-xl aspect-square w-[2rem] border border-contrast-1"
                modal={
                  <TeamSpaceServiceCreateUpdateDeleteModal
                    activeProjectId={teamSpaceStore.activeProject.id}
                  />
                }
              >
                <IoIosSettings size={24} />
              </NestedModalButton>
            )}
          </div>
        )}
      </div>

      {/* 업무 (operations) */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">업무</div>
        {isLoading ? (
          <div className="relative h-[2rem] w-[4rem] rounded-2xl py-1 primary-set default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              isActive={teamSpaceStore.activeOperation.id == 0}
              onClick={() =>
                teamSpaceStore.setActiveOperation({
                  id: 0,
                  title: "",
                })
              }
            >
              all
            </ThemeActiveButton1>
            {project?.data?.teamSpaceServices
              ?.find((i) => i.id === teamSpaceStore.activeService.id)
              ?.teamSpaceOperations?.map((j) => (
                <ThemeActiveButton1
                  className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
                  key={j.id}
                  isActive={j.id === teamSpaceStore.activeOperation.id}
                  onClick={() =>
                    teamSpaceStore.setActiveOperation({
                      id: j.id,
                      title: j.title,
                    })
                  }
                >
                  {j.title}
                </ThemeActiveButton1>
              ))}
            {teamSpaceStore.activeProject.id > 0 &&
              teamSpaceStore.activeService.id > 0 && (
              <NestedModalButton
                buttonClassName="default-flex rounded-xl aspect-square w-[2rem] border border-contrast-1"
                modal={
                  <TeamSpaceOperationCreateUpdateDeleteModal
                    activeProjectId={teamSpaceStore.activeProject.id}
                    activeServiceId={teamSpaceStore.activeService.id}
                  />
                }
              >
                <IoIosSettings size={24} />
              </NestedModalButton>
            )}
          </div>
        )}
      </div>

      {/* 역할 */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">역할</div>
        {isLoading ? (
          <div className="relative h-[2rem] w-[4rem] rounded-2xl py-1 primary-set default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              isActive={"" === teamSpaceStore.activeRole}
              onClick={() => teamSpaceStore.setActiveRole("")}
            >
              all
            </ThemeActiveButton1>

            {(project?.data?.teamSpaceTeam.teamSpaceMembers ?? [])
              .filter((i) =>
                teamSpaceStore.activeOwner.userId == 0
                  ? true
                  : i.user.id == teamSpaceStore.activeOwner.userId,
              )
              .flatMap((member) => member?.jobRoles ?? [])
              .filter(Boolean) // 혹시 undefined/null 제거
              .filter((value, index, self) => self.indexOf(value) === index) // 중복 제거
              .map((role: TeamSpaceRoleType) => (
                <ThemeActiveButton1
                  className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
                  key={role}
                  isActive={role === teamSpaceStore.activeRole}
                  onClick={() => teamSpaceStore.setActiveRole(role)}
                >
                  {role}
                </ThemeActiveButton1>
              ))}
          </div>
        )}
      </div>

      {/* 담당자 */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">담당</div>
        {isLoading ? (
          <div className="relative h-[2rem] w-[4rem] rounded-2xl py-1 primary-set default-flex">
            <div className="border-white-500 aspect-square h-full animate-spin rounded-full border-2 border-t-transparent"></div>
          </div>
        ) : (
          <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
            <ThemeActiveButton1
              className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
              isActive={teamSpaceStore.activeOwner.userId == 0}
              onClick={() => teamSpaceStore.setActiveOwner({
                nickname: "",
                memberId: 0,
                userId: 0
              })}
            >
              all
            </ThemeActiveButton1>
            {(project?.data?.teamSpaceTeam.teamSpaceMembers ?? [])
              .filter((i) =>
                teamSpaceStore.activeRole == ""
                  ? true
                  : i.jobRoles.includes(teamSpaceStore.activeRole),
              )
              .map((member) => (
                <ThemeActiveButton1
                  className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
                  key={member.user.id}
                  isActive={member.user.id === teamSpaceStore.activeOwner.userId}
                  onClick={() => teamSpaceStore.setActiveOwner({
                    nickname: member.nickname,
                    memberId: member.id,
                    userId: member.user.id,
                  })}
                >
                  {member.nickname}
                </ThemeActiveButton1>
              ))}
            {teamSpaceStore.activeProject.id > 0 &&
              ["OWNER", "HEAD", "MANAGER", "LEAD"].some(
                (role) =>
                  project?.data?.teamSpaceTeam.teamSpaceMembers.find(
                    (i) => i.user.id === userStore.id,
                  )?.position === role,
              ) && (
              <NestedModalButton
                buttonClassName="default-flex rounded-xl aspect-square w-[2rem] border border-contrast-1"
                modal={<TeamSpaceMemberCreateUpdateDeleteModal />}
              >
                <IoIosSettings size={24} />
              </NestedModalButton>
            )}
          </div>
        )}
      </div>

      {/* 날짜 */}
      <div className="grid h-full grid-cols-[4rem_auto] items-center rounded-md border-2 border-contrast-1 p-1">
        <div className="font-semibold">날짜</div>
        <div className="flex gap-x-1 overflow-x-scroll whitespace-nowrap px-1 scrollbar-hide">
          <ThemeActiveButton1
            className="inline-block w-fit rounded-xl border border-contrast-1 px-2 py-1"
            isActive={"all" === teamSpaceStore.filterDate.startedAt}
            onClick={() =>
              teamSpaceStore.setFilterDate({
                startedAt: "all",
                endedAt: "all",
              })
            }
          >
            all
          </ThemeActiveButton1>
          {teamSpaceStore.activeProject.id > 0 && (
            <NestedModalButton
              buttonClassName="default-flex rounded-xl px-2 h-[2.125rem] border border-contrast-1"
              modal={<div />}
            >
              날짜 선택
            </NestedModalButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSpaceCategoryAndProgress;
