declare interface ICalendarItem {
  year: number;
  day: number;
  month: number;
  key: string;
  state: string;
  data: IPlanScheduleObject[];
  date: string;
}

declare interface ResCreatePlanSchedule {
  status: number;
  msg: string;
  data: {
    id: number;
    title: string;
    content: string;
    scheduleStartDate: string;
    scheduleEndDate: string;
    planScheduleCategory: IPlanScheduleCategory;
  };
}

declare interface ResUpdatePlanSchedule {
  status: number;
  msg: string;
  data: {
    id: number;
    title: string;
    content: string;
    scheduleStartDate: string;
    scheduleEndDate: string;
    planScheduleCategory: IPlanScheduleCategory;
  };
}

declare interface ResCreatePlanScheduleCategory {
  status: number;
  msg: string;
  data: IPlanScheduleCategory;
}

declare interface ResReadPlanScheduleCategoryList {
  status: number;
  msg: string;
  data: IPlanScheduleCategory[];
}

declare interface ResReadPlanScheduleList {
  status: number;
  msg: string;
  data: IPlanSchedule[];
}

declare interface IPlanScheduleCategory {
  id: number;
  name: string;
  backgroundColor: string;
}

declare interface IPlanSchedule {
  id: number;
  title: string;
  content: string;
  scheduleStartDate: string; // ISO 8601 형식의 날짜 문자열
  scheduleEndDate: string; // ISO 8601 형식의 날짜 문자열
  scheduleCategoryId: number;
  scheduleCategoryName: string;
  scheduleCategoryBackgroundColor: string;
}

declare interface IPlanScheduleObject {
  id: number;
  title: string;
  content: string;
  date: string; // 특정 기준일
  index: number;
  layer: number; // 몇 층
  period: number; // 너비
  scheduleStartDate: string; // 시작 날짜
  scheduleEndDate: string; // 종료 날짜
  scheduleCategoryId: number;
  scheduleCategoryName: string;
  scheduleCategoryBackgroundColor: string;
  isFirst: boolean; // 첫번쨰인지
  isLast: boolean; // 마지막인지
  step: number; // 몇 번째 토막인지
}
