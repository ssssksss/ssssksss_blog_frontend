import theme from '@/styles/theme';
import styled from '@emotion/styled';
import React, { ReactNode, useEffect, useReducer, useState } from 'react';
import { CC } from '@/styles/commonComponentStyle';
import { dateFormat4y2m2d } from '@/utils/function/dateFormat';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { Primary } from './../../stories/Button.stories';
import ModalButton from '@/components/common/button/ModalButton';
import ScheduleModal from '@/components/schedule/modal/ScheduleModal';
import CalendarBar from './CalendarBar';

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
      modalW={'80%'}
    >
      <DayTitle>{props.day} </DayTitle>
      <RelativePositionBox
        onClick={event => {
          event.stopPropagation();
        }}
      >
        {/* <RelativePositionBox onClick={event => event.stopPropagation()}> */}
        <CalendarListBox layer={props.layer}>
          {props.data?.map(i => (
            <CalendarBar data={i} />
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
    outline: solid black 2px;
    outline-offset: -2px;
  }

  .todoBar:not(:has(.todoBar:hover)):hover {
    outline: solid black 2px;
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
