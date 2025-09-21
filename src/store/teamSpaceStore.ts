import { TeamSpaceRoleType } from "@utils/variables/teamSpaceActions";
import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의
interface TeamSpaceState {
  // project: ITeamSpaceProject;
  projectList: ITeamSpaceProject[];
  serviceList: ITeamSpaceService[];
  operationList: ITeamSpaceOperation[];
  taskList: ITeamSpaceTask[];

  activeProject: {id: number; title: string};
  activeService: {id: number; title: string};
  activeOperation: {id: number; title: string};

  isDataFetched: boolean;
  activeRole: TeamSpaceRoleType;
  activeOwner: {
    nickname: string,
    memberId: number,
    userId: number
  };
  filterDate: {
    startedAt: string;
    endedAt: string;
  };
}

// 2. 액션 인터페이스 정의
interface TeamSpaceActions {
  initialize: () => void;
  // setProject: (data: ITeamSpaceProject) => void;
  setProjectList: (data: ITeamSpaceProject[]) => void;
  setServiceList: (data: ITeamSpaceService[]) => void;
  setOperationList: (data: ITeamSpaceOperation[]) => void;
  setTaskList: (data: ITeamSpaceTask[]) => void;

  setActiveProject: (data: {id: number; title: string}) => void;
  setActiveService: (data: {id: number; title: string}) => void;
  setActiveOperation: (data: {id: number; title: string}) => void;

  setActiveRole: (data: TeamSpaceRoleType) => void;
  setActiveOwner: (data: {
    nickname: string;
    memberId: number;
    userId: number;
  }) => void;
  setFilterDate: (data: {startedAt: string; endedAt: string}) => void;
}

// 3. 초기 상태 정의
const initialState: TeamSpaceState = {
  // project: {
  //   id: 0,
  //   title: "",
  //   description: "",
  //   teamSpaceTeam: {
  //     id: 0,
  //     adminId: 0,
  //     teamSpaceMembers: []
  //   },
  //   teamSpaceServices: [],
  // },
  projectList: [],
  serviceList: [],
  operationList: [],
  taskList: [],
  activeProject: {id: 0, title: ""},
  activeService: {id: 0, title: ""},
  activeOperation: {id: 0, title: ""},
  isDataFetched: false,
  activeRole: "",
  activeOwner: {
    nickname: "",
    memberId: 0,
    userId: 0,
  },
  filterDate: {
    startedAt: "all",
    endedAt: "all",
  },
};

// 4. 상태 및 액션 생성
const teamSpaceStore: StateCreator<TeamSpaceState & TeamSpaceActions> = (
  set,
) => ({
  ...initialState,

  initialize: () =>
    set((state) => ({
      ...initialState,
      projectList: state.projectList, // 기존 값 유지
      activeProject: state.activeProject
    })),

  // setProject: (data) => set({project: data}),
  setProjectList: (data) => set({projectList: data}),
  setServiceList: (data) => set({serviceList: data}),
  setOperationList: (data) => set({operationList: data}),
  setTaskList: (data) => set({taskList: data}),

  setActiveProject: (data) => set({activeProject: data}),
  setActiveService: (data) => set({activeService: data}),
  setActiveOperation: (data) => set({activeOperation: data}),

  setActiveRole: (data) => set({activeRole: data}),
  setActiveOwner: (data) => set({activeOwner: data}),
  setFilterDate: (data) => set({filterDate: data}),
});

const useTeamSpaceStore = create<TeamSpaceState & TeamSpaceActions>()<any>(
  process.env.NODE_ENV === "development"
    ? devtools(teamSpaceStore)
    : teamSpaceStore,
);

export type useTeamSpaceStoreType = TeamSpaceState & TeamSpaceActions;
export default useTeamSpaceStore;
