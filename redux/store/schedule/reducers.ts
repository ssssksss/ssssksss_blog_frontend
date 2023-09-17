import * as actions from './actions';
import { dateFormat4y2m2d } from '../../../utils/fucntion/dateFormat';

const initialState = {
  currentScheduleDate: '',
  monthScheduleData: [],
  calendarYear: new Date().getFullYear(),
  // month는 +1을 하지 않고 그냥 사용
  calendarMonth: new Date().getMonth(),
  calendarDay: new Date().getDate(),
  calendarDayOfWeek: new Date().getDay(),
  calendarStartDateOfWeekList: [],
};

export const scheduleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'CURRENT_SCHEDULE_DATE':
      return { ...state, currentScheduleDate: action.payload };
    // 저번달, 이번달, 다음달의 일정을 모두 보관하는 state
    case 'MONTH_SCHEDULE_DATA':
      return { ...state, monthScheduleData: action.payload };
    case 'CALENDAR_START_DATE_OF_WEEK_LIST':
      return { ...state, calendarStartDateOfWeekList: action.payload };
    case 'CALENDAR_YEAR':
      return { ...state, calendarYear: action.payload };
    case 'CALENDAR_MONTH':
      return { ...state, calendarMonth: action.payload };
    case 'CALENDAR_DAY':
      return { ...state, calendarDay: action.payload };
    case 'CALENDAR_DAY_OF_WEEK':
      return { ...state, calendarDayOfWeek: action.payload };
    default:
      return state;
  }
};
