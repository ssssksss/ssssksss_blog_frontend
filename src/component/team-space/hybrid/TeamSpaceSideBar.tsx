import SubSideBar from "@component/common/layout/hybrid/SubSideBar";
import { CiMail } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import { VscGithubProject } from "react-icons/vsc";
interface ITeamSpaceSideBar {

}

const LeftNavItems = [
  {
    icon: <FaHome size={"24"} />,
    labelTitle: "팀홈",
    href: "/team-space",
    options: {isRequiredAuth: true},
  },
  {
    icon: <GoWorkflow size={"24"} />,
    labelTitle: "흐름",
    href: "/team-space/workflow",
    options: {isRequiredAuth: true},
  },
  {
    icon: <VscGithubProject size={"24"} />,
    labelTitle: "프로젝트",
    href: "/team-space/workspace",
    options: {isRequiredAuth: true},
  },
  {
    icon: <CiMail size={"24"} />,
    labelTitle: "팀 초대 조회",
    href: "/team-space/invite",
    options: {isRequiredAuth: true},
  },
];

const TeamSpaceSideBar = (props: ITeamSpaceSideBar) => {
  return <SubSideBar LeftNavItems={LeftNavItems} />;
};
export default TeamSpaceSideBar;