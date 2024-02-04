import ModalButton from '@/components/common/button/ModalButton';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import styled from '@emotion/styled';
import { ReactNode } from 'react';

type CalendarDayItemType = {
  color?: string;
  opacity?: string;
  day?: string;
  content?: any;
  id?: string;
  children?: ReactNode;
  date?: string;
  dayW?: number; // 요일 0 ~ 6
  month?: number | string;
  year?: number | string;
  layer: number;
  data?: [
    {
      id: number;
      title: string;
      content: string;
      startDateTime: string;
      endDateTime: string;
      isChecked: false;
      scheduleCategory: {
        id: number;
        name: string;
        backgroundColor: string;
        userId: number;
      };
      dayIndex: string;
      layer: number;
      period: number;
    }
  ];
};

const CalendarDayItem = (props: CalendarDayItemType) => {
  return (
    <Container
      modal={
        <ScheduleModal
          data={{
            startDateTime: `${props.id}T00:00:00`,
          }}
          methodType={'month'}
        />
      }
      color={'primary80'}
      bg={'primary20'}
      modalOverlayVisible={true}
      modalMinW={'320px'}
    >
      <DayTitle>{props.day} </DayTitle>
      <RelativePositionBox
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <CalendarListBox layer={props.layer}>
          {props.data?.map(i => (
            <ScheduleBar data={i} />
          ))}
        </CalendarListBox>
      </RelativePositionBox>
    </Container>
  );
};

export default CalendarDayItem;

const Container = styled(ModalButton)`
  width: 100%;
  &:not(:has(.todoBar:hover)):hover {
    background: ${props => props.theme.main.primary80};
    color: ${props => props.theme.main.contrast};
  }

  .todoBar:not(:has(.todoBar:hover)):hover {
    background: ${props => props.theme.main.primary80};
    color: ${props => props.theme.main.contrast};
  }

  background-color: #ffffff;
  font-weight: 600;
  outline: 1px solid #666666;
  font-size: 1rem;
  -webkit-tap-highlight-color: transparent;
  padding: 2px 0px;
  min-height: 120px;
  ${props => props.theme.flex.column.start};
  height: auto;
  /* height: min-content; */
`;

const RelativePositionBox = styled.div`
  width: 100%;
`;

const DayTitle = styled.div`
  height: 20px;
  padding: 2px 0px 0px 4px;
  font-size: 0.8rem;
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

const CalendarListBox = styled.div<{ layer: number }>`
  border-radius: 8px;
  width: 100%;
  display: grid;
  grid-template-rows: ${props => `repeat(${props.layer}, 1fr)`};
  gap: 4px 0px;
`;
