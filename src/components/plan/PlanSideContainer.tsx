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
import Space from "../common/space/Space";
import PlanSelectBox from "./PlanSelectBox";
import {
  dateFormat4y2m2d2h2m2s,
  dateFormat4y2m2d2h2m,
} from "../../../utils/fucntion/dateFormat";
import ReactQuill from "react-quill";
import BasicCustomModal from "../Modal/BasicCustomModal";
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

const PLAN_ITEM_COLOR = "#eeeeee";
const categoryColorListExample = [
  { color: "#eb5757", description: "Red" },
  { color: "#f2994a", description: "Orange" },
  { color: "#f2c94c", description: "Yellow" },
  { color: "#219653", description: "Green1" },
  { color: "#27ae60", description: "Green2" },
  { color: "#6fcf97", description: "Green3" },
  { color: "#2f80ed", description: "Blue1" },
  { color: "#2d9cdb", description: "Blue2" },
  { color: "#56ccf2", description: "Blue3" },
  { color: "#9b51e0", description: "Purple1" },
  { color: "#bb6bd9", description: "Purple2" },
  { color: "#b085f5", description: "Purple3" },
  { color: "#828282", description: "gray1" },
  { color: "#bdbdbd", description: "gray2" },
  { color: "#e0e0e0", description: "gray3" },
];

const PlanSideContainer = (props: IPlanSideContainerProps) => {
  const planStore = useSelector((state: RootState) => state.planStore);
  const [content, setContent] = useState("");
  const [planList, setPlanList] = useState([]);
  const [isOpenAddPlanScreen, setIsOpenAddPlanScreen] = useState(false);
  const [isOpenAddCategoryScreen, setIsOpenAddCategoryScreen] = useState(false);
  const [categoryColor, setCategoryColor] = useState("#000000");
  const [categoryName, setCategoryName] = useState("");
  const [categoryList, setCategoryList] = useState<any>([]);
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
      .catch((error) => {});
  };

  const onClickAddCategoryHandler = () => {
    if (categoryName !== "" && categoryColor !== "#000000") {
      setCategoryList([
        // ...categoryList,
        { value: categoryName, background: categoryColor },
      ]);
      setCategoryName("");
      setCategoryColor("#000000");
      setIsOpenAddCategoryScreen(false);
    } else {
      alert("색상이 검은색이거나 카테고리 이름이 입력되지 않았습니다.");
    }
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
  }, [planStore.nowPlanDate]);

  return (
    <Container hide={props.hide}>
      {isOpenAddPlanScreen && (
        <AddPlanScreen>
          {isOpenAddCategoryScreen && (
            <BasicCustomModal
              toggleModal={() => setIsOpenAddCategoryScreen(false)}
            >
              <AddCategoryContainer>
                <Title>
                  <CF.ColumnCenterDiv gap={10}>
                    <span>카테고리 추가하기</span>
                  </CF.ColumnCenterDiv>
                  <Button onClick={() => setIsOpenAddCategoryScreen(false)}>
                    X
                  </Button>
                </Title>
                <CF.ColumnDiv padding={"10px 10px 0px"} gap={10}>
                  <Space
                    title4="카테고리명"
                    titleWidth="160px"
                    bg={PLAN_ITEM_COLOR}
                  >
                    <Input
                      placeholder="카테고리 이름을 입력하세요"
                      onChange={(e: any) => setCategoryName(e.target.value)}
                    />
                  </Space>
                  <Space title4="색상" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
                    <Input
                      type="color"
                      placeholder="카테고리 이름을 입력하세요"
                      onChange={(e: any) => setCategoryColor(e.target.value)}
                      padding="0px 10px"
                      value={categoryColor}
                    />
                    <CF.RowRightDiv> {categoryColor} </CF.RowRightDiv>
                  </Space>
                  <CategoryColorListContainer>
                    {categoryColorListExample.map((el: any, index: number) => (
                      <CategoryColorButton
                        key={index}
                        onClick={() => setCategoryColor(el.color)}
                        backgroundColor={el.color}
                      >
                        {/* {el.description} */}
                      </CategoryColorButton>
                    ))}
                  </CategoryColorListContainer>
                  <Button
                    width="100%"
                    height="50px"
                    onClick={onClickAddCategoryHandler}
                  >
                    카테고리 생성
                  </Button>
                </CF.ColumnDiv>
              </AddCategoryContainer>
            </BasicCustomModal>
          )}
          <Title>
            <CF.ColumnCenterDiv gap={10}>
              <span>{planStore.nowPlanDate}</span>
              <span>일정 추가하기</span>
            </CF.ColumnCenterDiv>
            <Button onClick={() => setIsOpenAddPlanScreen(false)}> X </Button>
          </Title>
          <CF.ColumnDiv padding={"10px 10px 0px"} gap={10}>
            <Space title4="제목" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <Input placeholder="제목 입력" />
            </Space>
            <Space title4="내용" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <ReactQuill />
              {/* <Input placeholder="내용 입력" /> */}
            </Space>
            <Space title4="날짜" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <CF.ColumnDiv gap={10}>
                <Input
                  id="party"
                  type="datetime-local"
                  name="partydate"
                  max="2022-10-30T16:30" // 최대날짜
                  defaultValue={dateFormat4y2m2d2h2m(new Date())}
                  onChange={(e: any) => setStartDateTime(e.target.value)}
                />
                <Input
                  id="party"
                  type="datetime-local"
                  name="partydate"
                  min="2022-10-01T08:30" // 최소날짜
                  defaultValue={dateFormat4y2m2d2h2m(new Date())}
                  onChange={(e: any) => setEndDateTime(e.target.value)}
                />
              </CF.ColumnDiv>
            </Space>
            {/* 구성 추가 기능 필요 */}
            <Space title4="구성" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <CF.RowDiv gap={10} padding={"0px 4px 0px 0px"}>
                <PlanSelectBox options={categoryList} />
                <Button
                  width={"100px"}
                  onClick={() => setIsOpenAddCategoryScreen(true)}
                >
                  카테고리 추가
                </Button>
              </CF.RowDiv>
            </Space>
            {/* 알림 추가 기능 필요 */}
            {/* <Space title4="알림" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <Input />
            </Space>
            <Space title4="위치" titleWidth="160px" bg={PLAN_ITEM_COLOR}>
              <Input placeholder={"카카오 지도 불러오기"} />
            </Space> */}
          </CF.ColumnDiv>
        </AddPlanScreen>
      )}
      <Title>
        {planStore.nowPlanDate}
        <Button onClick={props.sideOpenToggleHandler}> X </Button>
      </Title>
      <PlanList>
        <Button
          width="100%"
          padding={"10px 0px"}
          color="white"
          onClick={() => setIsOpenAddPlanScreen(true)}
        >
          일정 추가
        </Button>
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
      </PlanList>
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
const AddPlanScreen = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  background: #f4f4f4;

  & > button {
    position: absolute;
    right: 10px;
    width: 36px;
    height: 36px;
    aspect-ratio: 1;
  }
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

const AddCategoryContainer = styled(CF.ColumnDiv)`
  background: white;
  width: 100%;
  min-height: 600px;
`;
const CategoryColorListContainer = styled.div`
  background: "#eeeeee";
  gap: 20px;
  display: flex;
  flex-flow: wrap row;
  justify-content: flex-start;
`;
const CategoryColorButton = styled.button<{ backgroundColor: string }>`
  outline: solid 2px black;
  border-radius: 50%;
  width: 40px;
  aspect-ratio: 1;
  background: ${(props) => props.backgroundColor};

  @media (max-width: 768px) {
    width: 30px;
  }
`;
