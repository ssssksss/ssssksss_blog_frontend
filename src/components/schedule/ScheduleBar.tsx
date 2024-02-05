import { ScheduleAPI } from '@/api/ScheduleAPI';
import { Button } from '@/components/common/button/Button';
import ModalButton from '@/components/common/button/ModalButton';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import styled from "@emotion/styled";
import { useState } from 'react';
import { Input } from '../common/input/Input';
/**
 * @author Sukyung Lee <ssssksss@naver.com> 
 * @file ScheduleBar.tsx
 * @version 0.0.1 "2024-01-02 06:20:40"
 * @description 설명 
 */
const ScheduleBar = (props) => {
    const [activeModal,setActiveModal] = useState(false);
    const [isChecked, setIsChecked] = useState(props.data.isChecked);

    const _IsCheckedToggleHandler = () => {
      ScheduleAPI.toggleCheckSchedule({
        id: props.data?.id,
      }).then((res: any) => {
        // let temp = store.getState().scheduleStore.monthScheduleList.map(i => {
        //   if (i.id == props.data?.id) {
          // i.isChecked = !props.data?.isChecked;
        //     setIsChecked(prev => !prev);
        //   }
        //   return i;
        // });
        // store.dispatch(rootActions.scheduleStore.SET_MONTH_SCHEDULE_LIST(temp));
        setIsChecked(prev => !prev);
      });
    };

    return (
      <Container
        className={"todoBar"}
        type="button"
        period={props.data.period}
        layer={props.data.layer}
        isChecked={isChecked}
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
          <Title isChecked={isChecked}>
        {props.data.title}
          </Title>
                <Input
          type="checkbox"
          outline={true}
          color={'red100'}
          w={'16px'} 
          h={'16px'} 
          checked={isChecked}
          onClick={(e) => {
            _IsCheckedToggleHandler();
            e.stopPropagation();
          }}
        />
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
  height: 16px;
  margin-left: 4px;
  grid-row-start: ${props => props.layer};
  z-index: ${props => props.activeModal ? 10 : 4};
  justify-content: flex-start;

  // 배경색(background) //
  background: ${props => props.isChecked ? props.theme.colors.gray40 : props.theme.colors.[props.backgroundColor] || props.theme.main.[props.backgroundColor] || props.backgroundColor};

  // 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  font-size: 0.7em;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 800;

  &:focus {
    z-index: 10;
  }
`;

const Title = styled.div<{ isChecked: boolean }>`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  text-decoration: ${props => props.isChecked && 'line-through'};

`;

const VisibleButton = styled(Button)`
  width: 8px;
  height: 16px;
  border-radius: 0px 8px 8px 0px;
  z-index: 9;
`;