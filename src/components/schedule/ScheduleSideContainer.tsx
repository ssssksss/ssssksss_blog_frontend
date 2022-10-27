import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useDispatch, useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { RootState } from "@/redux/store/reducers";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { store } from "@/redux/store";
import ScheduleOneDayItem from "./ScheduleOneDayItem";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { SET_MONTH_SCHEDULE_DATA } from "../../../redux/store/schedule/actions";
import Space from "../common/space/Space";
import ScheduleSelectBox from "./ScheduleSelectBox";
import {
  dateFormat4y2m2d2h2m2s,
  dateFormat4y2m2d2h2m,
} from "../../../utils/fucntion/dateFormat";
import BasicCustomModal from "../Modal/BasicCustomModal";
import CustomReactQuill from "../common/editor/CustomReactQuill";
import ScheduleCreateContainer from "./ScheduleCreateContainer";
/**
 * Author : Sukyung Lee
 * FileName: ScheduleSideContainer.tsx
 * Date: 2022-09-11 09:59:51
 * Description :
 */
interface IScheduleSideContainerProps {
  hide: boolean;
  sideOpenToggleHandler: () => void;
}

const ScheduleSideContainer = (props: IScheduleSideContainerProps) => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const [scheduleList, setScheduleList] = useState([]);
  const [isOpenAddScheduleScreen, setIsOpenAddScheduleScreen] = useState(false);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updateToScheduleState, setUpdateToScheduleState] = useState<
    undefined | any
  >();

  const setScheduleHandler = (schedule: []) => {
    setScheduleList(schedule);
  };

  const toggleIsOpenAddScheduleScreen = () => {
    setIsOpenAddScheduleScreen((prev) => !prev);
    setIsEdit(false);
    setUpdateToScheduleState(null);
  };

  const updateScheduleHandler = (updateToSchedule: any) => {
    console.log("ScheduleSideContainer.tsx : ", "test");
    setIsEdit(true);
    setUpdateToScheduleState(updateToSchedule);
    setIsOpenAddScheduleScreen((prev) => true);
  };

  const deleteScheduleHandler = (scheduleId: number) => {
    AxiosInstance({
      url: "/api/schedule",
      method: "DELETE",
      data: {
        id: scheduleId,
      },
    })
      .then((response) => {
        console.log("ScheduleSideContainer.tsx : ", response.data);
        dispatch(
          SET_MONTH_SCHEDULE_DATA(
            scheduleStore.monthScheduleData.filter(
              (el: any) => el.id !== scheduleId
            )
          )
        );
      })
      .catch((error) => {
        console.log("ScheduleSideContainer.tsx : ", "에러");
      });
  };

  useEffect(() => {
    setScheduleList(
      scheduleStore.monthScheduleData.filter(
        (el: any) =>
          el?.startDateTime?.slice(0, 10) === scheduleStore.currentScheduleDate
      )
    );
  }, [scheduleStore.currentScheduleDate, scheduleStore.monthScheduleData]);

  return (
    <Container hide={props.hide}>
      {isOpenAddScheduleScreen && (
        <ScheduleCreateContainer
          closeHandler={toggleIsOpenAddScheduleScreen}
          setScheduleHandler={setScheduleHandler}
          isEdit={isEdit}
          updateToScheduleState={updateToScheduleState}
        />
      )}
      <Title>
        {scheduleStore.currentScheduleDate}
        <Button onClick={props.sideOpenToggleHandler}> X </Button>
      </Title>
      <OneDayScheduleList>
        <Button
          width="100%"
          padding={"10px 0px"}
          color="white"
          onClick={() => setIsOpenAddScheduleScreen(true)}
        >
          일정 추가
        </Button>
        <CF.ColumnDiv gap={10}>
          {scheduleList.length !== 0 &&
            scheduleList.map((el: any, index: number) => (
              <ScheduleOneDayItem
                key={index}
                el={el}
                date={scheduleStore.currentScheduleDate}
                deleteScheduleHandler={deleteScheduleHandler}
                updateScheduleHandler={updateScheduleHandler}
              />
            ))}
        </CF.ColumnDiv>
      </OneDayScheduleList>
    </Container>
  );
};
export default ScheduleSideContainer;

const Container = styled(CF.ColumnDiv)<{ hide: boolean }>`
  position: absolute;
  top: 0px;
  right: 0px;
  max-width: 90%;
  min-width: 360px;
  height: 100%;
  z-index: 10;
  border: solid 1px black;
  gap: 10px;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  min-height: calc(100% - 20px);
  align-self: stretch;
  background: white;
  display: static;
  overflow-y: scroll;
  animation: ${animationKeyFrames.RightToLeftFadein} 0.3s linear;
  ${(props) =>
    props.hide &&
    css`
      display: none;
    `}
`;

const OneDayScheduleList = styled(CF.ColumnDiv)`
  gap: 30px;
  padding: 0px 10px 20px 10px;
  overflow-y: scroll;
`;

const Title = styled(CF.RowCenterDiv)`
  height: 60px;
  min-height: 60px;
  background-color: ${theme.backgroundColors.secondary};
  color: white;
  position: relative;
  width: 100%;

  & > button {
    position: absolute;
    right: 10px;
    width: 36px;
    height: 36px;
    aspect-ratio: 1;
  }
`;
