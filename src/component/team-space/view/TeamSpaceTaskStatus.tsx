import { mapTeamSpaceProcessStatusToGroup } from "@utils/variables/teamSpaceProcessStatus";

interface ITeamSpaceTaskStatus {
  status: string;
}

const statusStyles: Record<string, string> = {
  대기중: "bg-[#FFF4E5] text-[#A65B00]",
  진행중: "bg-[#E6F4FF] text-[#004D80]",
  검토중: "bg-[#F5E8FF] text-[#5A0099]",
  완료: "bg-[#E8F8EE] text-[#006633]",
  기타: "bg-gray-100 text-gray-700",
};

const TeamSpaceTaskStatus = (props: ITeamSpaceTaskStatus) => {
  const group = mapTeamSpaceProcessStatusToGroup(props.status);
  const style = statusStyles[group] ?? statusStyles["기타"];

  return (
    <div className={`rounded-lg p-1 text-sm font-medium ${style}`}>{props.status}</div>
  );
};

export default TeamSpaceTaskStatus;
