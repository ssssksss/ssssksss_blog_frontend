import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useSelector } from "react-redux";
import styled, { css, keyframes } from "styled-components";
import { RootState } from "@/redux/store/reducers";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { store } from "@/redux/store";
import OneDayPlanItem from "./OneDayPlanItem";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { SET_MONTH_PLAN_DATE } from "../../../redux/store/plan/actions";
import Space from "../common/space/Space";
import PlanSelectBox from "./PlanSelectBox";
import {
  dateFormat4y2m2d2h2m2s,
  dateFormat4y2m2d2h2m,
} from "../../../utils/fucntion/dateFormat";
import BasicCustomModal from "../Modal/BasicCustomModal";
import CustomReactQuill from "../common/editor/CustomReactQuill";
import AddPlanContainer from "./AddPlanContainer";
/**
 * Author : Sukyung Lee
 * FileName: PlanSideContainer.tsx
 * Date: 2022-09-11 09:59:51
 * Description :
 */
interface IPlanSideContainerProps {
  hide: boolean;
  sideOpenToggleHandler: () => void;
}

const PlanSideContainer = (props: IPlanSideContainerProps) => {
  const planStore = useSelector((state: RootState) => state.planStore);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [planList, setPlanList] = useState([]);
  const [isOpenAddPlanScreen, setIsOpenAddPlanScreen] = useState(false);
  // 카테고리 추가할 하는 용도의 state
  // API로 보낼때 사용하는 state
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [startDateTime, setStartDateTime] = useState(
    dateFormat4y2m2d2h2m2s(new Date())
  );
  const [endDateTime, setEndDateTime] = useState(
    dateFormat4y2m2d2h2m2s(new Date())
  );

  const updatePlanHandler = (el: any) => {
    AxiosInstance({
      url: "/api/plan",
      method: "PUT",
      data: {
        id: el.id,
        content: el.content,
        indexNumber: el.indexNumber,
        isChecked: el.isChecked,
        date: new Date(planStore.nowPlanDate),
      },
    })
      .then((response) => {
        setPlanList(response.data.data.planList);
        store.getState().planStore.monthPlanDates[planStore.nowPlanDate] =
          response.data.data.planList;
        store.dispatch(
          SET_MONTH_PLAN_DATE(store.getState().planStore.monthPlanDates)
        );
      })
      .catch((error) => {});
  };

  const deletePlanHandler = (el: any) => {
    AxiosInstance({
      url: "/api/plan",
      method: "DELETE",
      data: {
        id: el.id,
        date: planStore.nowPlanDate,
      },
    })
      .then((response) => {
        if (response.data.data == null) {
          setPlanList([]);
          delete store.getState().planStore.monthPlanDates[
            planStore.nowPlanDate
          ];
          store.dispatch(
            SET_MONTH_PLAN_DATE(store.getState().planStore.monthPlanDates)
          );
        } else {
          setPlanList(response.data.data.planList);
          store.getState().planStore.monthPlanDates[planStore.nowPlanDate] =
            response.data.data.planList;
          store.dispatch(
            SET_MONTH_PLAN_DATE(store.getState().planStore.monthPlanDates)
          );
        }
      })
      .catch((error) => {});
  };

  const toggleIsOpenAddPlanScreen = () => {
    setIsOpenAddPlanScreen((prev) => !prev);
  };

  useEffect(() => {
    AxiosInstance({
      url: "/api/plan",
      method: "GET",
      params: {
        date: planStore.nowPlanDate,
      },
    })
      .then((response) => {
        setPlanList(response.data.data.planList);
      })
      .catch((error) => {
        setPlanList([]);
      });
  }, [planStore.nowPlanDate]);

  return (
    <Container hide={props.hide}>
      {isOpenAddPlanScreen && (
        <AddPlanContainer closeHandler={toggleIsOpenAddPlanScreen} />
      )}
      <Title>
        {planStore.nowPlanDate}
        <Button onClick={props.sideOpenToggleHandler}> X </Button>
      </Title>
      <OneDayPlanList>
        <Button
          width="100%"
          padding={"10px 0px"}
          color="white"
          onClick={() => setIsOpenAddPlanScreen(true)}
        >
          일정 추가
        </Button>
        <CF.ColumnDiv gap={10}>
          {planList.length !== 0 &&
            planList.map((el: any, index: number) => (
              <OneDayPlanItem
                key={index}
                el={el}
                date={planStore.nowPlanDate}
                updatePlanHandler={updatePlanHandler}
                deletePlanHandler={deletePlanHandler}
              />
            ))}
        </CF.ColumnDiv>
      </OneDayPlanList>
    </Container>
  );
};
export default PlanSideContainer;

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
  padding-bottom: 20px;
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

const OneDayPlanList = styled(CF.ColumnDiv)`
  gap: 30px;
  padding: 0px 10px;
  overflow-y: scroll;
`;

const Title = styled(CF.RowCenterDiv)`
  height: 60px;
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
