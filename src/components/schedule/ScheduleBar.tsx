import { ScheduleAPI } from '@api/ScheduleAPI';
import ModalButton from '@components/common/button/ModalButton';
import Input from '@components/common/input/Input';
import ScheduleModal from '@components/schedule/modal/ScheduleModal';
import styled from '@emotion/styled';
import { useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ScheduleBar.tsx
 * @version 0.0.1 "2024-01-02 06:20:40"
 * @description 설명
 */
const ScheduleBar = (props: {
  data: {
    id: number;
    title: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
    isChecked: boolean;
    scheduleCategory: {
      id: number;
      name: string;
      backgroundColor: string;
      userId: number;
      isValid: boolean;
    };
    dayIndex: string;
    layer: number;
    period: number;
  };
}) => {
  const [activeModal, setActiveModal] = useState(false); // z-index 우선순위 문제 때문에 사용
  const [isChecked, setIsChecked] = useState(props.data.isChecked);
  const _IsCheckedToggleHandler = () => {
    ScheduleAPI.toggleCheckSchedule({
      id: props.data?.id,
    }).then((_) => {
      setIsChecked((prev) => !prev);
    });
  };

  return (
    <Container
      className={'todoBar'}
      type="button"
      period={props.data.period}
      layer={props.data.layer}
      isChecked={isChecked}
      backgroundColor={props.data.scheduleCategory.backgroundColor}
      onClick={(event) => {
        setActiveModal(true);
        event.stopPropagation();
      }}
      activeModal={activeModal}
      modal={
        <ScheduleModal data={props.data} methodType={'month'} edit={true} />
      }
      beforeCloseFunction={() => {
        setActiveModal(false);
      }}
      modalOverlayVisible={true}
      modalMinW={'32rem'}
    >
      <Title isChecked={isChecked}>{props.data.title}</Title>
      <Input
        type="checkbox"
        outline={true}
        color={'red100'}
        checked={isChecked}
        onClick={(e) => {
          _IsCheckedToggleHandler();
          e.stopPropagation();
        }}
      />
    </Container>
  );
};
export default ScheduleBar;

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
  border-radius: 0rem 0.8rem 0.8rem 0rem;
  // 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  width: ${(props) => `calc(${100 * props.period + '%'} - 0.5rem)`};
  height: 1.6rem;
  margin-left: 0.4rem;
  grid-row-start: ${(props) => props.layer};
  z-index: ${(props) => (props.activeModal ? 20 : 4)};
  justify-content: flex-start;

  // 배경색(background) //
  background: ${(props) =>
    props.isChecked
      ? props.theme.colors.gray40
      : props.theme.colors?.[props.backgroundColor] ||
        props.theme.main?.[props.backgroundColor] ||
        props.backgroundColor};

  // 폰트(color, font, line-height, letter-spacing, text-align, text-indent, vertical-align, white-space) //
  font-size: 1.2rem;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 600;
  input[type='checkbox'] {
    width: 1.2rem;
    height: 1.2rem;
  }

  @media (max-width: ${(props) => props.theme.deviceSizes.tablet}) {
    font-size: 1rem;
    white-space: pre-wrap;
    height: 1.2rem;
    input[type='checkbox'] {
      width: 0.8rem;
      height: 0.8rem;
    }
  }

  &:focus {
    z-index: 20;
  }
`;

const Title = styled.span<{ isChecked: boolean }>`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  text-decoration: ${(props) => props.isChecked && 'line-through'};
`;
