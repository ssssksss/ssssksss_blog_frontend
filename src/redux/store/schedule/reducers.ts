import { createCalendar } from '@utils/function/schedule/createCalendar';

const initialState = {
  currentScheduleDate: '',
  monthScheduleData: [],
  calendarYear: Number(new Date().getFullYear()),
  // month는 +1을 하지 않고 그냥 사용
  calendarMonth: Number(new Date().getMonth()),
  calendar: createCalendar({
    year: Number(new Date().getFullYear()),
    month: Number(new Date().getMonth()),
  }),
  calendarDay: new Date().getDate(),
  calendarDayOfWeek: new Date().getDay(),
  calendarStartDateOfWeekList: [],
  todayScheduleList: [],
  scheduleCategoryList: [],
  monthScheduleList: [],
  toggleUptoDateMonthSchedule: true,
};

export const scheduleReducer = (state = initialState, action: unknown) => {
  switch (action.type) {
    case 'CURRENT_SCHEDULE_DATE':
      return { ...state, currentScheduleDate: action.payload };
    // 저번달, 이번달, 다음달의 일정을 모두 보관하는 state
    case 'MONTH_SCHEDULE_DATA':
      return { ...state, monthScheduleData: action.payload };
    case 'CALENDAR_START_DATE_OF_WEEK_LIST':
      return { ...state, calendarStartDateOfWeekList: action.payload };
    case 'CALENDAR':
      return { ...state, calendar: action.payload };
    case 'CALENDAR_YEAR':
      return { ...state, calendarYear: action.payload };
    case 'CALENDAR_MONTH':
      return { ...state, calendarMonth: action.payload };
    case 'CALENDAR_DAY':
      return { ...state, calendarDay: action.payload };
    case 'CALENDAR_DAY_OF_WEEK':
      return { ...state, calendarDayOfWeek: action.payload };
    case 'TODAY_SCHEDULE_LIST':
      return { ...state, todayScheduleList: action.payload };
    case 'SCHEDULE_CATEGORY_LIST':
      return { ...state, scheduleCategoryList: action.payload };
    case 'MONTH_SCHEDULE_LIST':
      return { ...state, monthScheduleList: action.payload };
    case 'TOGGLE_UP_TO_DATE_MONTH_SCHEDULE':
      return { ...state, toggleUptoDateMonthSchedule: action.payload };
    default:
      return state;
  }
};
