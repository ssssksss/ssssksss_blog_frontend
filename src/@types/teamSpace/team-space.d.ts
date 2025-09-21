type ITeamSpaceJobRole = "BE" | "DE" | "FE" | "HR" | "MK" | "PM" | "QA" | "";
type ITeamSpacePosition =
  | "OWNER"
  | "HEAD"
  | "MANAGER"
  | "LEAD"
  | "SENIOR"
  | "MID"
  | "JUNIOR"
  | "INTERN"
  | "";

interface ITeamSpaceUser {
  id: number;
  nickname: string;
  profileImagePath: string;
}

interface ITeamSpaceMember {
  id: number;
  nickname: string;
  position: ITeamSpacePosition;
  user: ITeamSpaceUser;
  isActive: boolean;
  jobRoles: ITeamSpaceJobRole[];
}

interface ITeamSpaceTeam {
  id: number;
  adminId: number;
  teamSpaceMembers: ITeamSpaceMember[];
}

declare interface ITeamSpaceProject {
  id: number;
  title: string;
  description: string;
  teamSpaceTeam: ITeamSpaceTeam;
  teamSpaceServices: ITeamSpaceService[];
}

declare interface ITeamSpaceService {
  id: number;
  title: string;
  description: string;
  scheduleStartAt: string;
  scheduleEndAt: string;
  teamSpaceOperations: ITeamSpaceOperation[];
}

declare interface ITeamSpaceOperation {
  id: number;
  title: string;
  description: string;
  scheduleStartAt: string;
  scheduleEndAt: string;
  teamSpaceTasks: ITeamSpaceTask[];
}

declare interface ITeamSpaceTask {
  createdAt: string;
  modifiedAt: string;
  id: number;
  title: string;
  description: string;
  assignee: ITeamSpaceMember;
  scheduledStartAt: string;
  scheduledEndAt: string;
  firstStartedAt: string | null;
  firstCompletedAt: string | null;
  refUrlJSON: string | null;
  imageURLJSON: string | null;
  processStatus: string;
  jobRole: ITeamSpaceJobRole;
  action: string;
}

declare interface IResTeamSpaceProjectList {
  projectList: ITeamSpaceProject[];
}

