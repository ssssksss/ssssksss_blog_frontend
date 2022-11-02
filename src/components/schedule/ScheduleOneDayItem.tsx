import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { useRouter } from "next/router";
import Button from "@/components/common/button/Button";

/**
 * Author : Sukyung Lee
 * FileName: ScheduleItem.tsx
 * Date: 2022-09-13 12:45:26
 * Description :
 */

interface IScheduleItemProps {
  el: {
    id: number;
    title: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
    categoryName: string;
    backgroundColor: string;
  };
  date: string;
  deleteScheduleHandler: (scheduleId: number) => void;
  updateScheduleHandler: (updateToSchedule: object) => void;
}

const ScheduleOneDayItem = (props: IScheduleItemProps) => {
  const dateTimeStringConverter = (date: string) => {
    return date.slice(0, 10) + " " + date.slice(11, 16);
  };

  return (
    <Container>
      <OneDayMarkColor style={{ background: props.el.backgroundColor }} />
      <CF.ColumnDiv width="100%" gap={6}>
        <CF.RowDiv gap={6}>
          <Title> 제목 : {props.el.title} </Title>
          <Button onClick={() => props.updateScheduleHandler(props.el)}>
            수정
          </Button>
        </CF.RowDiv>
        <CF.RowDiv gap={6}>
          <Content>
            <span> 내용 : </span>
            <span dangerouslySetInnerHTML={{ __html: props.el.content }} />
          </Content>
          <Button onClick={() => props.deleteScheduleHandler(props.el.id)}>
            삭제
          </Button>
        </CF.RowDiv>
        <CF.RowBetweenDiv>
          <StartToEndDateTime>
            {dateTimeStringConverter(props.el.startDateTime) ===
            dateTimeStringConverter(props.el.endDateTime) ? (
              <span style={{ color: props.el.backgroundColor }}>
                기간 : {dateTimeStringConverter(props.el.startDateTime)}
              </span>
            ) : (
              <span style={{ color: props.el.backgroundColor }}>
                기간 : {dateTimeStringConverter(props.el.startDateTime)} ~
                {dateTimeStringConverter(props.el.endDateTime)}
              </span>
            )}
          </StartToEndDateTime>
          <CategoryName style={{ color: props.el.backgroundColor }}>
            분류 : {props.el.categoryName}
          </CategoryName>
        </CF.RowBetweenDiv>
      </CF.ColumnDiv>
    </Container>
  );
};
export default ScheduleOneDayItem;

const Container = styled(CF.RowDiv)`
  padding: 6px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 6px;
  outline: #666666 solid 2px;
  position: relative;

  img {
    &:hover {
      animation: ${animationKeyFrames.UpToDownRepeat} infinite 1s;
    }
  }

  &:hover {
    animation: ${animationKeyFrames.UpToDownRepeat} infinite 1s;
    outline: solid black 3px;
  }
`;
const OneDayMarkColor = styled.div`
  width: 20px;
  height: 100%;
  border-radius: 4px 0px 0px 4px;
`;

const StartToEndDateTime = styled.div`
  border-radius: 2px 0px 0px 0px;
  padding: 10px 6px 6px 6px;
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 12px;
  }
`;
const CategoryName = styled.div`
  padding: 10px 6px 6px 6px;
  font-weight: 600;
`;
const Title = styled.div`
  width: 100%;
  padding: 6px;
  font-size: 20px;
  background: ${theme.backgroundColors.googleCalendarGray};

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const Content = styled(CF.RowDiv)`
  padding: 6px;
  gap: 8px;
  font-size: 20px;
  background: ${theme.backgroundColors.googleCalendarGray};

  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
const Setting = styled.div`
  display: none;
`;
