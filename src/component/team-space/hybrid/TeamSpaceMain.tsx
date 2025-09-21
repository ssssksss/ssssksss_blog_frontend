"use client";

import TeamSpaceCategoryAndProgress from "./TeamSpaceCategoryAndProgress";
import TeamSpaceProgressContainer from "./TeamSpaceProgressContainer";
import TeamSpaceTaskStatusContainer from "./TeamSpaceTaskStatusContainer";

interface ITeamSpaceMain {
  projectList: ITeamSpaceProject[];
}
const TeamSpaceMain = (props: ITeamSpaceMain) => {

  return (
    <div className={"flex w-full flex-col"}>
      <section className="flex h-full w-full flex-col gap-1 bg-default-2 p-1 sm:flex-row sm:gap-0">
        <TeamSpaceCategoryAndProgress projectList={props.projectList} />
        <TeamSpaceProgressContainer />
      </section>
      <TeamSpaceTaskStatusContainer />
    </div>
  );
};
export default TeamSpaceMain;