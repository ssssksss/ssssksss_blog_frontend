import styled from "@emotion/styled";
import ModalButton from '@/components/common/button/ModalButton';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file CalendarBar.tsx
 * @version 0.0.1 "2024-01-02 06:20:40"
 * @description 설명 
 */
const CalendarBar = (props) => {
    const [activeModal,setActiveModal] = useState(false);

    return (
    <Container
    className={"todoBar"}
    type="button"
    period={props.data.period}
    layer={props.data.layer}
    isChecked={props.data.isChecked}
    backgroundColor={props.data.scheduleCategory.backgroundColor}
    onClick={()=>setActiveModal(true)}
    activeModal={activeModal}
    modal={
      <ScheduleModal
        modalW={'80%'}
        data={props.data}
        methodType={'month'}
        edit={true}
        beforeCloseFunction={()=>setActiveModal(false)}
      />
    }
    >
    {props.data.content}
  </Container>
  );
};
export default CalendarBar

interface ICalendarBoxProps {
    isChecked: boolean;
    layer: number;
    period: number;
    backgroundColor: string;
    activeModal: boolean;
  }

const Container = styled(ModalButton)<{
    props: ICalendarBoxProps;
  }>`
  height: 24px;
  border-radius: 0px 8px 8px 0px;
  font-size: 1em;
  color: white;
  text-align: left;
  white-space: nowrap;
  overflow-x: auto;
  overflow-y: none;
  text-overflow: ellipsis;
  padding-left: 4px;
  width: ${props => `calc(${100 * props.period + '%'} - 5px)`};
  margin-left: 4px;
  grid-row-start: ${props => props.layer};
  z-index: ${props => props.activeModal ? 6 : 4};
  background: ${props => props.theme.colors.[props.backgroundColor] || props.theme.main.[props.backgroundColor] || props.backgroundColor};

`;