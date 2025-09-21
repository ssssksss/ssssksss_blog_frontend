import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import useFetchCSR from "@hooks/useFetchCSR";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useUserStore from "@store/userStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { commonSchema } from "@utils/validation/CommonYup";
import { TeamSpacePositionEnum, TeamSpaceRoleEnum } from "@utils/variables/teamSpaceEnum";
import { useState } from "react";

interface ITeamSpaceMemberCreateContainer extends IModalComponent {
  // 필요 시 props 타입 추가
}

const TeamSpaceMemberCreateContainer = (
  props: ITeamSpaceMemberCreateContainer,
) => {
  const teamSpaceStore = useTeamSpaceStore();
  const userStore = useUserStore();
  const [email, setEmail] = useState("");
  const [roleList, setRoleList] = useState<TeamSpaceRoleEnum[]>([]);
  const [position, setPosition] = useState<TeamSpacePositionEnum>();
  const fetchCSR = useFetchCSR();
  const queryClient = useQueryClient();

  const {data: project} = useQuery<any>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => Promise.resolve(null), // 실제 fetch 안 함
    enabled: false, // 네트워크 요청 차단
    initialData: () =>
      queryClient.getQueryData<any>([
        "project",
        teamSpaceStore.activeProject.id,
      ]),
    select: (cached) => cached?.data, // {data: ...} → data만 꺼내쓰기
  });

  const toggleRole = (role: TeamSpaceRoleEnum) => {
    setRoleList(
      (prev) =>
        prev.includes(role)
          ? prev.filter((r) => r !== role) // 이미 선택되어 있으면 제거
          : [...prev, role], // 없으면 추가
    );
  };

  const inviteMemberHandler = async () => {
    await fetchCSR.requestWithHandler({
      url: "/api/team-space/invite",
      method: "POST",
      body: {
        teamId: project.teamSpaceTeam.id,
        projectId: project.id,
        projectTitle: project.title,
        inviterUserId: userStore.id,
        inviteeUserEmail: email,
        jobRolesJSON: JSON.stringify(roleList),
        position: position,
      },
      successMessage: "멤버 초대에 성공했습니다.",
      showSuccessToast: true,
      handleSuccess: () => {
        props.closeModal!();
      }
    });
  };

  return (
    <div className="relative flex w-full flex-col gap-4">
      {/* 이메일 입력 */}
      <label className="flex flex-col">
        <span className="mb-1 font-medium">프로젝트</span>
        <div className="rounded-lg border border-default-2 p-2">
          {project.title}
        </div>
      </label>

      <label className="flex flex-col">
        <span className="mb-1 font-medium">이메일</span>
        <input
          type="email"
          className="rounded-lg border border-gray-300 p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일 입력"
        />
      </label>

      {/* 역할 선택 */}
      <div className="flex flex-col">
        <span className="mb-1 font-medium">역할</span>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(48px,1fr))] gap-2">
          {Object.values(TeamSpaceRoleEnum).map((r) => (
            <button
              key={r}
              type="button"
              className={`rounded-lg border px-3 py-1 transition ${
                roleList.includes(r)
                  ? "text-white border-contrast-1 bg-secondary-60"
                  : "bg-white border-contrast-1 hover:bg-secondary-20"
              }`}
              onClick={(e) => {
                e.preventDefault();
                toggleRole(r);
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* 직급 선택 */}
      <label className="flex flex-col">
        <span className="mb-1 font-medium">직급</span>
        <select
          className="rounded-lg border border-gray-300 p-2"
          value={position}
          onChange={(e) => setPosition(e.target.value as TeamSpacePositionEnum)}
        >
          <option value="">직급을 선택하세요</option>
          {Object.values(TeamSpacePositionEnum).map((jr) => (
            <option key={jr} value={jr}>
              {jr}
            </option>
          ))}
        </select>
      </label>

      <ThemeActiveButton1
        className="h-[3rem]"
        isActive={
          commonSchema.isValidSync({email}) &&
          roleList.length > 0 &&
          position != undefined
        }
        onClick={async () => {
          await inviteMemberHandler();
        }}
      >
        맴버 초대
      </ThemeActiveButton1>
    </div>
  );
};

export default TeamSpaceMemberCreateContainer;
