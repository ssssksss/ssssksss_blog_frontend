import ThemeActiveButton1 from "@component/common/button/ThemeActiveButton1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { useState } from "react";
import TeamSpaceOperationCreateContainer from "./TeamSpaceOperationCreateContainer";

interface ITeamSpaceOperationCreateUpdateDeleteModal extends IModalComponent {
  activeProjectId: number;
  activeServiceId: number;
}
const TeamSpaceOperationCreateUpdateDeleteModal = (props: ITeamSpaceOperationCreateUpdateDeleteModal) => {

  const [activeMenu, setActiveMenu] = useState("생성");
  const _menuList = ["생성", "수정", "삭제"];

  // 수정에는 감추는 기능도 포함해야함.

  return (
    <ModalTemplate>
      {props.closeButtonComponent}
      <section className="flex flex-col gap-2 w-full">
        <h2> Operation </h2>
        <div className="w-full flex gap-x-2">
          {
            _menuList.map(i =>
              <ThemeActiveButton1 key={i} onClick={()=>setActiveMenu(i)} isActive={activeMenu === i} className="flex w-full justify-start text-lg py-1 font-bold"> {i} </ThemeActiveButton1>
            )
          }
        </div>
        {
          activeMenu === "생성" &&
          <TeamSpaceOperationCreateContainer
            activeProjectId={props.activeProjectId}
            activeServiceId={props.activeServiceId}
            closeModal={props.closeModal}
          />
        }
      </section>
    </ModalTemplate>
  );
};
export default TeamSpaceOperationCreateUpdateDeleteModal;