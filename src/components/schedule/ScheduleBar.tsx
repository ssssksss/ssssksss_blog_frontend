import ModalButton from '@/components/common/button/ModalButton';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import styled from "@emotion/styled";
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file ScheduleBar.tsx
 * @version 0.0.1 "2024-01-02 06:20:40"
 * @description 설명 
 */
const ScheduleBar = (props) => {
    const [activeModal,setActiveModal] = useState(false);

    return (
      <Container
        className={"todoBar"}
        type="button"
        period={props.data.period}
        layer={props.data.layer}
        isChecked={props.data.isChecked}
        backgroundColor={props.data.scheduleCategory.backgroundColor}
        onClick={(event)=>{
          setActiveModal(true);
          event.stopPropagation();
        }}
        activeModal={activeModal}
        modal={
          <ScheduleModal
          data={props.data}
          methodType={'month'}
          edit={true}
          />
        }
        beforeCloseFunction={()=>{
          setActiveModal(false);
        }}
        modalOverlayVisible={true}
        modalMinW={'320px'}
        >
          <ContentContainer>
        {props.data.content}
          </ContentContainer>
      </Container>
    );
};
export default ScheduleBar

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
padding: 0px 4px;
margin-left: 4px;
grid-row-start: ${props => props.layer};
z-index: ${props => props.activeModal ? 10 : 4};
justify-content: flex-start;

// 배경색(background) //
background: ${props => props.theme.colors.[props.backgroundColor] || props.theme.main.[props.backgroundColor] || props.backgroundColor};

// 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
font-size: 1em;
font-family: ${props => props.theme.fontFamily.cookieRunRegular};
white-space: nowrap;
overflow: hidden;

// 애니메이션(animation) //


// 이벤트(active, focus, hover, visited, focus-within, disabled) //
/* 렌더링이 발생하기전까지 z-index가 낮아저 다른 bar가 위로 보이는 문제가 있어서 일단 보이지 않게하기 위한 설정 */
&:focus {
  z-index: 10;
}


// 반응형(media-query, overflow, scroll) //
/* overflow-x: auto; */
/* overflow-y: none; */

// 커스텀(custom css) //

`;

const ContentContainer = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
`;