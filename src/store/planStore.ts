import { StateCreator, create } from "zustand";
import { devtools } from "zustand/middleware";

// 1. 상태 인터페이스 정의

interface planStoreState {
  calendar: ICalendarItem[];
  scheduleList: IPlanSchedule[];
  scheduleCategory: IPlanScheduleCategory[];
  scheduleCalendarMaxLayer: number;
}

// 2. 액션 인터페이스 정의
interface planStoreActions {
  initialize: () => void;
  setCalendar: (data: ICalendarItem[]) => void;
  setScheduleList: (data: IPlanSchedule[]) => void;
  setMaxLayer: (layer: number) => void;
  setScheduleCategory: (data: IPlanScheduleCategory[]) => void;
}

// 3. 초기 상태 정의
const initialState: planStoreState = {
  calendar: [],
  scheduleList: [],
  scheduleCategory: [],
  scheduleCalendarMaxLayer: 2,
};

// 4. 상태 및 액션 생성
const planStore: StateCreator<planStoreState & planStoreActions> = (
  set,
  get,
) => ({
  ...initialState,
  initialize: () =>
    set({
      ...initialState,
    }),
  setCalendar: (data: ICalendarItem[]) =>
    set(() => ({
      calendar: [...data],
    })),
  setScheduleList: (data: IPlanSchedule[]) =>
    set(() => ({
      scheduleList: data,
    })),
  setScheduleCategory: (data: IPlanScheduleCategory[]) =>
    set(() => ({
      scheduleCategory: [...data],
    })),
  setMaxLayer: (layer: number) =>
    set(() => ({
      scheduleCalendarMaxLayer: layer,
    })),
});

const usePlanStore = create<planStoreState & planStoreActions>(
  // devtools와 관련된 타입에러인데 나중에 해결
  // @ts-ignore
  process.env.NODE_ENV === "development" ? devtools(planStore) : planStore,
);

export type usePlanStoreType = planStoreState & planStoreActions;

export default usePlanStore;
