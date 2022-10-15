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
import PlanItem from "./PlanItem";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import { SET_MONTH_PLAN_DATE } from "../../../redux/store/plan/actions";

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
  const [content, setContent] = useState("");
  const [planList, setPlanList] = useState([]);

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
        setPlanList(response.data.data.planlist);
        store.getState().planStore.monthPlanDates[planStore.nowPlanDate] =
          response.data.data.planlist;
        store.dispatch(
          SET_MONTH_PLAN_DATE(store.getState().planStore.monthPlanDates)
        );
      })
      .catch((error) => {});
  };

  const addPlan = () => {
    if (content === "") return;
    AxiosInstance({
      url: "/api/plan",
      method: "POST",
      data: {
        content: content,
        date: planStore.nowPlanDate,
      },
    })
      .then((response) => {
        setPlanList(response.data.data.planlist);
        setContent("");
        if (store.getState().planStore.monthPlanDates === undefined) {
          const temp: any = {};
          temp[`${planStore.nowPlanDate}`] = response.data.data.planlist;
          store.dispatch(SET_MONTH_PLAN_DATE(temp));
        } else {
          store.getState().planStore.monthPlanDates[planStore.nowPlanDate] =
            response.data.data.planlist;
        }
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
          setPlanList(response.data.data.planlist);
          store.getState().planStore.monthPlanDates[planStore.nowPlanDate] =
            response.data.data.planlist;
          store.dispatch(
            SET_MONTH_PLAN_DATE(store.getState().planStore.monthPlanDates)
          );
        }
      })
      .catch((error) => {
        // console.log(error);
      });
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
        setPlanList(response.data.data.planlist);
      })
      .catch((error) => {
        setPlanList([]);
      });
    // }, []);
  }, [planStore.nowPlanDate]);

  return (
    <Container hide={props.hide}>
      <Title>
        {planStore.nowPlanDate}
        <Button onClick={props.sideOpenToggleHandler}> X </Button>
      </Title>
      <PlanList>
        {planList.length !== 0 &&
          planList.map((el: any, index: number) => (
            <PlanItem
              key={index}
              el={el}
              date={planStore.nowPlanDate}
              updatePlanHandler={updatePlanHandler}
              deletePlanHandler={deletePlanHandler}
            />
          ))}
        <CF.RowDiv gap={10}>
          <Input
            placeholder="plan 내용 작성"
            border={`solid 1px ${theme.backgroundColors.fourth}`}
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
            onKeyPress={addPlan}
            value={content}
          />
          <CF.Img
            alt="right_arrow_icon"
            src="/img/ui-icon/right_arrow_icon.png"
            size="40px"
            backgroundColor={`${theme.backgroundColors.fourth}`}
            onClick={addPlan}
          />
        </CF.RowDiv>
      </PlanList>
    </Container>
  );
};
export default PlanSideContainer;

const Container = styled(CF.ColumnDiv)<{ hide: boolean }>`
  border: solid 1px black;
  gap: 10px;
  border-radius: 10px 10px 0px 0px;
  padding-bottom: 20px;
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
const PlanList = styled(CF.ColumnDiv)`
  gap: 10px;
  padding: 0px 4px;
  overflow-y: scroll;
`;

const Title = styled(CF.RowCenterDiv)`
  height: 60px;
  background-color: ${theme.backgroundColors.secondary};
  color: white;
  border-radius: 10px 10px 0px 0px;
  position: relative;

  & > button {
    position: absolute;
    right: 4px;
    width: 50px;
    height: 50px;
    aspect-ratio: 1;
  }
`;
