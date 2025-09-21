import NestedModalButton from "@component/common/modal/hybrid/NestedModalButton";
import { AWSS3Prefix } from "@utils/variables/s3url";
import { teamSpaceGetActionList, TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import TeamSpaceTaskStatus from "../view/TeamSpaceTaskStatus";
import TeamSpaceTaskUpdateDeleteModal from "./TeamSpaceTaskUpdateDeleteModal";

interface ITeamSpaceTaskCard {
  task: ITeamSpaceTask & {
    projectId: number,
    serviceId: number,
    operationId: number
  };
}
const TeamSpaceTaskCard = ({task}: ITeamSpaceTaskCard) => {
  return (
    <NestedModalButton
      key={task.id}
      buttonClassName="flex w-full flex-col gap-1 rounded-2xl border-2 border-default-2 p-2 transition-shadow hover:bg-primary-60 hover:shadow-md"
      modal={<TeamSpaceTaskUpdateDeleteModal task={task} />}
    >
      <span className="overflow-hidden overflow-ellipsis whitespace-nowrap text-start text-lg font-semibold">
        {task.title}
      </span>

      <div className="mb-2 flex w-fit items-center rounded-md bg-secondary-40 px-1 py-[0.125rem] text-sm text-contrast-1">
        {
          (
            teamSpaceGetActionList(task.jobRole as TeamSpaceRoleType) as Record<
              string,
              string
            >
          )[task.action]
        }
      </div>
      <div className="w-48 pt-2 text-sm text-contrast-1">
        {new Date(task.scheduledStartAt).toLocaleDateString()} {" ~ "}
        {new Date(task.scheduledEndAt).toLocaleDateString()}
      </div>

      <div className="flex w-full items-center justify-between">
        <div
          className="relative aspect-square w-[3rem]"
          title={task.assignee.user.nickname}
        >
          {task.assignee.user.profileImagePath ? (
            <Image
              className="object-contain"
              src={`${AWSS3Prefix}${task.assignee.user.profileImagePath}`}
              alt={""}
              fill
            />
          ) : (
            <FaRegUser />
          )}
        </div>
        <TeamSpaceTaskStatus status={task.processStatus} />
      </div>
    </NestedModalButton>
  );
};
export default TeamSpaceTaskCard;