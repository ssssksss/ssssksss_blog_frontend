export interface IScheduleItemProps {
  data: {
    id: number;
    title: string;
    content: string;
    isChecked: boolean;
    startDateTime: 'YYYY-M-DDThh:mm:ss';
    endDateTime: 'YYYY-M-DDThh:mm:ss';
    scheduleCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
    };
  };
}
