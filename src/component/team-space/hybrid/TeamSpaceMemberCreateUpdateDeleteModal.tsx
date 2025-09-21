import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import useTeamSpaceStore from "@store/teamSpaceStore";
import useUserStore from "@store/userStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import TeamSpaceMemberCreateContainer from "./TeamSpaceMemberCreateContainer";
import TeamSpaceMemberDeleteContainer from "./TeamSpaceMemberDeleteContainer";
import TeamSpaceMemberUpdateContainer from "./TeamSpaceMemberUpdateContainer";

interface ITeamSpaceMemberCreateUpdateDeleteModal extends IModalComponent {
}
const TeamSpaceMemberCreateUpdateDeleteModal = (props: ITeamSpaceMemberCreateUpdateDeleteModal) => {

  const [activeMenu, setActiveMenu] = useState("수정");
  const _menuList = ["생성", "수정", "삭제"];
  const teamSpaceStore = useTeamSpaceStore();
  const queryClient = useQueryClient();
  const userStore = useUserStore();

  const {data: project} = useQuery<any>({
    queryKey: ["project", teamSpaceStore.activeProject.id],
    queryFn: () => Promise.resolve(null), // 실제 fetch 안 함
    enabled: false, // 네트워크 요청 차단
    initialData: () =>
      queryClient.getQueryData<any>([
        "project",
        teamSpaceStore.activeProject.id,
      ]),
    select: (cached) => cached?.data,
  });


  return (
    <ModalTemplate className={"w-[calc(100vw-1rem)]"}>
      {props.closeButtonComponent}
      <section className="flex w-full flex-col gap-2">
        <h2> member </h2>
        <div className="flex w-full gap-x-2">
          {_menuList.map((i) => (
            <ThemeActiveButton1
              key={i}
              onClick={() => setActiveMenu(i)}
              isActive={activeMenu === i}
              className="flex w-full justify-start py-1 text-lg font-bold"
            >
              {i}
            </ThemeActiveButton1>
          ))}
        </div>
        {teamSpaceStore.activeProject.id > 0 &&
          ["OWNER", "HEAD", "MANAGER", "LEAD"].some(
            (role) =>
              project?.teamSpaceTeam.teamSpaceMembers.find(
                (i: ITeamSpaceMember) => i.user.id === userStore.id,
              )?.position === role,
          ) &&
          activeMenu === "생성" && (
          <TeamSpaceMemberCreateContainer closeModal={props.closeModal} />
        )}
        {activeMenu === "수정" && (
          <TeamSpaceMemberUpdateContainer closeModal={props.closeModal} />
        )}
        {teamSpaceStore.activeProject.id > 0 &&
          ["OWNER", "HEAD", "MANAGER", "LEAD"].some(
            (position) =>
              project?.teamSpaceTeam.teamSpaceMembers.find(
                (i: ITeamSpaceMember) => i.user.id === userStore.id,
              )?.position === position,
          ) &&
          activeMenu === "삭제" && <TeamSpaceMemberDeleteContainer />}
      </section>
    </ModalTemplate>
  );
};
export default TeamSpaceMemberCreateUpdateDeleteModal;