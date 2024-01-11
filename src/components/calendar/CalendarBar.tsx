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
// 외곽 디자인(border-radius, outline, box-shadow) //
border-radius: 0px 8px 8px 0px;

// 컨테이너(width, height, margin, padding, border, flex, grid, position) //
width: ${props => `calc(${100 * props.period + '%'} - 5px)`};
height: 24px;
padding-left: 4px;
margin-left: 4px;
grid-row-start: ${props => props.layer};
z-index: ${props => props.activeModal ? 6 : 4};
justify-content: flex-start;

// 배경색(background) //
background: ${props => props.theme.colors.[props.backgroundColor] || props.theme.main.[props.backgroundColor] || props.backgroundColor};


// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
font-size: 1em;
color: white;
white-space: nowrap;
text-overflow: ellipsis;

// 애니메이션(animation) //


// 이벤트(active, focus, hover, visited, focus-within, disabled) //


// 반응형(media-query, overflow, scroll) //
overflow-x: auto;
overflow-y: none;

// 커스텀(custom css) //

`;