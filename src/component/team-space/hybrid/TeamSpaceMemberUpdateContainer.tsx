import ActiveButton from "@component/common/button/ActiveButton";
import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ThemeButton1 from "@component/common/button/ThemeButton1";
import ThemeInput1 from "@component/common/input/ThemeInput1";
import useFetchCSR from "@hooks/useFetchCSR";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useUserStore from "@store/userStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TeamSpacePositionEnum, TeamSpaceRoleEnum } from "@utils/variables/teamSpaceEnum";
import { useState } from "react";

interface ITeamSpaceMemberUpdateContainer extends IModalComponent {

}
const TeamSpaceMemberUpdateContainer = (props: ITeamSpaceMemberUpdateContainer) => {
  const teamSpaceStore = useTeamSpaceStore();
  const userStore = useUserStore();
  const fetchCSR = useFetchCSR();
  const queryClient = useQueryClient();
  const [roleList, setRoleList] = useState<ITeamSpaceJobRole[]>([]);
  const [activePosition, setActivePosition] = useState<ITeamSpacePosition>("");
  const [isActive, setIsActive] = useState(true);
  const [newNickname, setNewNickname] = useState("");
  const [activeMember, setActiveMember] = useState({
    userId: 0,
    nickname: "",
    isActive: false,
    memberId: 0,
    position: ""
  });

  const { data: project } = useQuery<
  { data: ITeamSpaceProject } | undefined, // 원본 타입
  Error,
  ITeamSpaceProject | undefined             // select 후 최종 타입
>({
  queryKey: ["project", teamSpaceStore.activeProject.id],
  queryFn: async () => undefined, // 타입 안전하게 정의
  enabled: false,
  initialData: () =>
    queryClient.getQueryData<{ data: ITeamSpaceProject }>([
      "project",
      teamSpaceStore.activeProject.id,
    ]),
  select: (cached) => cached?.data,
});
  const toggleRole = (role: TeamSpaceRoleEnum) => {
    setRoleList(
      (prev) =>
        prev.includes(role)
          ? prev.filter((r) => r !== role) // 이미 선택되어 있으면 제거
          : [...prev, role], // 없으면 추가
    );
  };

  const positions = Object.values(TeamSpacePositionEnum); // 높은 권한의 직급은 안보여주기 위해서 사용
  const activeIndex = positions.indexOf(project?.teamSpaceTeam.teamSpaceMembers.filter(i=>i.user.id == userStore.id)[0].position as TeamSpacePositionEnum); // 높은 권한의 직급은 안보여주기 위해서 사용
  
  
  const changeJobRoleHandler = async () => {
    await fetchCSR.requestWithHandler({
      url: "/api/team-space/member/job-role",
      method: "PUT",
      body: {
        jobRoles: roleList,
        memberId: activeMember.memberId,
      },
      showSuccessToast: true,
      successMessage: "역할 변경에 성공",
      handleSuccess: () => {
        queryClient.setQueryData<{data: ITeamSpaceProject} | undefined>(
          ["project", teamSpaceStore.activeProject.id],
          (oldData) => {
            if (!oldData) return oldData;

            const updatedMembers =
                  oldData.data.teamSpaceTeam.teamSpaceMembers.map((member) =>
                    member.id === activeMember.memberId
                      ? {...member, jobRoles: roleList}
                      : member,
                  );

            return {
              ...oldData,
              data: {
                ...oldData.data,
                teamSpaceTeam: {
                  ...oldData.data.teamSpaceTeam,
                  teamSpaceMembers: updatedMembers,
                },
              },
            };
          },
        );
            props.closeModal!();
      }
    });
  };

  const changePositionHandler = async () => {
    await fetchCSR.requestWithHandler({
      url: "/api/team-space/member/position",
      method: "PUT",
      body: {
        position: activePosition,
        memberId: activeMember.memberId,
      },
      showSuccessToast: true,
      successMessage: "직급 변경에 성공",
      handleSuccess: () => {
        queryClient.setQueryData<{data: ITeamSpaceProject} | undefined>(
          ["project", teamSpaceStore.activeProject.id],
          (oldData) => {
            if (!oldData) return oldData;

            const updatedMembers =
                  oldData.data.teamSpaceTeam.teamSpaceMembers.map((member) =>
                    member.id === activeMember.memberId
                      ? {...member, position: activePosition}
                      : member,
                  );

            return {
              ...oldData,
              data: {
                ...oldData.data,
                teamSpaceTeam: {
                  ...oldData.data.teamSpaceTeam,
                  teamSpaceMembers: updatedMembers,
                },
              },
            };
          },
        );
            props.closeModal!();
      }
    });
  };

  const changeIsActiveHandler = async () => {
    const result = await fetchCSR.requestWithHandler({
      url: "/api/team-space/member/is-active",
      method: "PUT",
      body: {
        isActive,
        memberId: activeMember.memberId,
      },
      showSuccessToast: true,
      successMessage: "활성 상태 변경에 성공",
      handleSuccess: () => {
        queryClient.setQueryData<{data: ITeamSpaceProject} | undefined>(
          ["project", teamSpaceStore.activeProject.id],
          (oldData) => {
            if (!oldData) return oldData;

            const updatedMembers =
                  oldData.data.teamSpaceTeam.teamSpaceMembers.map((member) =>
                    member.id === activeMember.memberId
                      ? {...member, isActive}
                      : member,
                  );

            return {
              ...oldData,
              data: {
                ...oldData.data,
                teamSpaceTeam: {
                  ...oldData.data.teamSpaceTeam,
                  teamSpaceMembers: updatedMembers,
                },
              },
            };
          },
        );
            props.closeModal!();
      }
    });
  };

  const changeNicknameHandler = async () => {
    await fetchCSR.requestWithHandler({
      url: "/api/team-space/member/nickname",
      method: "PUT",
      body: {
        nickname: newNickname,
        memberId: activeMember.memberId,
      },
      showSuccessToast: true,
      successMessage: "닉네임 변경에 성공",
      handleSuccess: () => {
        queryClient.setQueryData<{data: ITeamSpaceProject} | undefined>(
          ["project", teamSpaceStore.activeProject.id],
          (oldData) => {
            if (!oldData) return oldData;

            const updatedMembers =
                  oldData.data.teamSpaceTeam.teamSpaceMembers.map((member) =>
                    member.id === activeMember.memberId
                      ? {...member, nickname: newNickname}
                      : member,
                  );

            return {
              ...oldData,
              data: {
                ...oldData.data,
                teamSpaceTeam: {
                  ...oldData.data.teamSpaceTeam,
                  teamSpaceMembers: updatedMembers,
                },
              },
            };
          },
        );
      }
    });



  };

  return (
    <div className={"flex w-full flex-col"}>
      <div className="flex h-full w-full flex-col gap-2 rounded-md border-2 border-contrast-1 p-1">
        <div className="flex w-full gap-x-1 overflow-x-scroll whitespace-nowrap border border-b-contrast-1 pb-1 scrollbar-hide">
          {(project?.teamSpaceTeam.teamSpaceMembers ?? []).map(
            (member: ITeamSpaceMember) => (
              <ThemeActiveButton1
                className="inline-block w-fit rounded-xl border border-contrast-1 p-1"
                key={member.user.id}
                isActive={member.user.id === activeMember.userId}
                onClick={() => {
                  setActiveMember({
                    userId: member.user.id,
                    nickname: member.nickname,
                    isActive: member.isActive,
                    memberId: member.id,
                    position: member.position,
                  });
                  setNewNickname(member.nickname);
                  setActivePosition(member.position);
                  setRoleList(member.jobRoles);
                  setIsActive(member.isActive);
                }}
              >
                {member.nickname}
              </ThemeActiveButton1>
            ),
          )}
        </div>
        <div>
          {/* 직급 변경 - 특정 권한자만 가능 */}
          {["OWNER", "HEAD", "MANAGER", "LEAD"].some(
            (role) =>
              project?.teamSpaceTeam.teamSpaceMembers.find(
                (i: ITeamSpaceMember) => i.user.id === userStore.id,
              )?.position === role,
          ) && (
            <div className="flex gap-1">
              <div className="flex w-[4.5rem] items-center justify-start">
                직급 :
              </div>
              {/* 직급 선택 드롭다운 예시 */}
              <div className="flex flex-1 flex-wrap gap-1 rounded-lg border border-contrast-1 p-1">
                {positions.slice(activeIndex).map((p: ITeamSpacePosition) => (
                  <ThemeActiveButton1
                    className="rounded-lg px-1 py-1"
                    key={p}
                    isActive={p == activePosition}
                    onClick={() => setActivePosition(p)}
                  >
                    {p}
                  </ThemeActiveButton1>
                ))}
              </div>
              <ThemeActiveButton1
                isActive={activePosition != ""}
                disabled={
                  activePosition == "" ||
                  activePosition == activeMember.position
                }
                className="w-[4.5rem] px-2"
                onClick={() => changePositionHandler()}
              >
                변경
              </ThemeActiveButton1>
            </div>
          )}
        </div>

        <div>
          {/* 역할 변경 - 특정 권한자만 가능 */}
          {["OWNER", "HEAD", "MANAGER", "LEAD"].some(
            (role) =>
              project?.teamSpaceTeam.teamSpaceMembers.find(
                (i: ITeamSpaceMember) => i.user.id === userStore.id,
              )?.position === role,
          ) && (
            <div className="flex gap-1">
              <div className="flex w-[4.5rem] items-center justify-start">
                역할 :
              </div>
              <div className="flex flex-1 gap-1">
                <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(48px,1fr))] flex-wrap gap-2 rounded-lg border border-contrast-1 p-1">
                  {Object.values(TeamSpaceRoleEnum).map((r) => (
                    <ActiveButton
                      key={r}
                      type="button"
                      isActiveBg="bg-primary-80"
                      className={
                        "rounded-lg border border-contrast-1 px-3 py-1 transition hover:bg-primary-20"
                      }
                      isActive={roleList.includes(r) && roleList.length > 0}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleRole(r);
                      }}
                    >
                      {r}
                    </ActiveButton>
                  ))}
                </div>
                <ThemeActiveButton1
                  isActive={activePosition != "" && roleList.length > 0}
                  disabled={activePosition == "" || roleList.length == 0}
                  className="w-[4.5rem] px-2"
                  onClick={() => changeJobRoleHandler()}
                >
                  변경
                </ThemeActiveButton1>
              </div>
            </div>
          )}
        </div>
        <div>
          {/* 역할 변경 - 특정 권한자만 가능 */}
          {["OWNER", "HEAD", "MANAGER", "LEAD"].some(
            (role) =>
              project?.teamSpaceTeam.teamSpaceMembers.find(
                (i: ITeamSpaceMember) => i.user.id === userStore.id,
              )?.position === role,
          ) && (
            <div className="flex h-[2.75rem] gap-1">
              <div className="flex w-[4.5rem] items-center justify-start">
                활성화 :
              </div>
              <div className="flex flex-1 gap-1">
                <div className="flex flex-1 gap-1">
                  <ThemeActiveButton1
                    isActive={isActive}
                    className="flex-1 px-2 py-1"
                    onClick={() => setIsActive(true)}
                  >
                    ON
                  </ThemeActiveButton1>
                  <ThemeActiveButton1
                    isActive={!isActive}
                    className="flex-1 px-2 py-1"
                    onClick={() => setIsActive(false)}
                  >
                    OFF
                  </ThemeActiveButton1>
                </div>
                <ThemeActiveButton1
                  isActive={activeMember.userId > 0}
                  disabled={
                    activeMember.userId == 0 ||
                    activeMember.isActive == isActive
                  }
                  className="w-[4.5rem] px-2"
                  onClick={() => changeIsActiveHandler()}
                >
                  변경
                </ThemeActiveButton1>
              </div>
            </div>
          )}
        </div>

        <div>
          {/* 닉네임 변경 - 자기 자신만 가능 */}
          {userStore.id === activeMember.userId && (
            <div className="flex gap-1">
              <div className="flex w-[4.5rem] items-center justify-start">
                닉네임 :
              </div>
              <ThemeInput1
                className="flex-1"
                placeholder="닉네임 변경"
                defaultValue={activeMember.nickname}
                onChange={(e)=>setNewNickname(e.target.value)}
              />
              <ThemeButton1
                className="w-[4.5rem] px-2"
                onClick={() => changeNicknameHandler()}
              > 변경 </ThemeButton1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TeamSpaceMemberUpdateContainer;