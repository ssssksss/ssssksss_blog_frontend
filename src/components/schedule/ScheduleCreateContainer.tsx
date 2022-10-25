import styled, { css, keyframes } from "styled-components";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import { useEffect, useState } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";
import { store } from "@/redux/store";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import Space from "../common/space/Space";
import BasicCustomModal from "../Modal/BasicCustomModal";
import CustomReactQuill from "../common/editor/CustomReactQuill";
import ScheduleSelectBox from "./ScheduleSelectBox";
import {
  dateFormat4y2m2d2h2m,
  dateFormat4y2m2d2h2m2s,
} from "../../../utils/fucntion/dateFormat";
import { SET_MONTH_SCHEDULE_DATA } from "@/redux/store/schedule";
/**
 * Author : Sukyung Lee
 * FileName: ScheduleCreateContainer.tsx
 * Date: 2022-10-21 20:45:55
 * Description :
 */

const Schedule_ITEM_COLOR = "#eeeeee";
const addCategoryColorListExample = [
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

interface IScheduleCreateContainerProps {
  closeHandler: () => void;
  setScheduleHandler: (schedule: []) => void;
}

const ScheduleCreateContainer = (props: IScheduleCreateContainerProps) => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false);
  const [categoryList, setCategoryList] = useState<any>([]);
  // 카테고리 추가할 하는 용도의 state
  const [addCategoryColor, setAddCategoryColor] = useState("#000000");
  const [addCategoryName, setAddCategoryName] = useState("");
  // API로 보낼때 사용하는 state
  const [categoryColor, setCategoryColor] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [startDateTime, setStartDateTime] = useState(
    dateFormat4y2m2d2h2m2s(scheduleStore.currentScheduleDate)
  );
  const [endDateTime, setEndDateTime] = useState(
    dateFormat4y2m2d2h2m2s(scheduleStore.currentScheduleDate)
  );

  const onClickAddCategoryHandler = () => {
    if (addCategoryName !== "" && addCategoryColor !== "#000000") {
      setCategoryList([
        ...categoryList,
        { categoryName: addCategoryName, backgroundColor: addCategoryColor },
      ]);
      setAddCategoryName("");
      setAddCategoryColor("#000000");
      setIsOpenAddCategoryModal(false);
    } else {
      alert("색상이 검은색이거나 카테고리 이름이 입력되지 않았습니다.");
    }
  };

  const addSchedule = () => {
    if (content === "") {
      alert("내용을 입력해야 합니다.");
      return;
    } else if (categoryName === "") {
      alert("카테고리를 선택해야 합니다.");
      return;
    }
    AxiosInstance({
      url: "/api/schedule",
      method: "POST",
      data: {
        title,
        content,
        startDateTime: dateFormat4y2m2d2h2m2s(startDateTime),
        endDateTime: dateFormat4y2m2d2h2m2s(endDateTime),
        categoryName,
        backgroundColor: categoryColor,
      },
    })
      .then((response) => {
        setContent("");
        store.dispatch(
          SET_MONTH_SCHEDULE_DATA([
            ...scheduleStore.monthScheduleData,
            response.data.data.schedule,
          ])
        );
        props.closeHandler();
      })
      .catch((error) => {
        console.log("ScheduleCreateContainer.tsx : ", "에러???");
      });
  };

  const setCategoryHandler = (name: string, backgroundColor: string) => {
    setCategoryName(name);
    setCategoryColor(backgroundColor);
  };

  useEffect(() => {
    AxiosInstance({
      url: "/api/schedule-category",
      method: "GET",
    })
      .then((response) => {
        setCategoryList(response.data.data.scheduleCategories);
      })
      .catch((error) => {});
  }, []);

  return (
    <Container>
      {/* 카테고리 추가 모달창 */}
      {isOpenAddCategoryModal && (
        <BasicCustomModal toggleModal={() => setIsOpenAddCategoryModal(false)}>
          <AddCategoryContainer>
            <Title>
              <CF.ColumnCenterDiv gap={10}>
                <span>카테고리 추가하기</span>
              </CF.ColumnCenterDiv>
              <Button onClick={() => setIsOpenAddCategoryModal(false)}>
                X
              </Button>
            </Title>
            <CF.ColumnDiv padding={"10px 10px 0px"} gap={10}>
              <Space
                title4="카테고리명"
                titleWidth="160px"
                bg={Schedule_ITEM_COLOR}
              >
                <Input
                  placeholder="카테고리 이름을 입력하세요"
                  onChange={(e: any) => setAddCategoryName(e.target.value)}
                />
              </Space>
              <Space title4="색상" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
                <Input
                  type="color"
                  placeholder="카테고리 이름을 입력하세요"
                  onChange={(e: any) => setAddCategoryColor(e.target.value)}
                  padding="0px 10px"
                  value={addCategoryColor}
                />
                <CF.RowRightDiv> {addCategoryColor} </CF.RowRightDiv>
              </Space>
              <CategoryColorListContainer>
                {addCategoryColorListExample.map((el: any, index: number) => (
                  <CategoryColorButton
                    key={index}
                    onClick={() => setAddCategoryColor(el.color)}
                    backgroundColor={el.color}
                  ></CategoryColorButton>
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
      {/* 카테고리 추가 모달창 */}
      <Title>
        <CF.ColumnCenterDiv gap={10}>
          <span>{scheduleStore.currentScheduleDate}</span>
          <span>일정 추가하기</span>
        </CF.ColumnCenterDiv>
        <Button onClick={props.closeHandler}> X </Button>
      </Title>
      <CF.ColumnDiv padding={"10px 10px 0px"} gap={10}>
        <Space title4="제목" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <Input
            placeholder="제목 입력"
            onChange={(e: any) => setTitle(e.target.value)}
          />
        </Space>
        <Space title4="내용" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CustomReactQuill defaultValue="" setContent={setContent} />
        </Space>
        <Space title4="날짜" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CF.ColumnDiv gap={10}>
            <Input
              id="party"
              type="datetime-local"
              name="partydate"
              // max="2022-10-30T16:30" // 최대날짜
              defaultValue={dateFormat4y2m2d2h2m(
                scheduleStore.currentScheduleDate
              )}
              onChange={(e: any) => setStartDateTime(e.target.value)}
            />
            <Input
              id="party"
              type="datetime-local"
              name="partydate"
              // min="2022-10-01T08:30" // 최소날짜
              defaultValue={dateFormat4y2m2d2h2m(
                scheduleStore.currentScheduleDate
              )}
              onChange={(e: any) => setEndDateTime(e.target.value)}
            />
          </CF.ColumnDiv>
        </Space>
        <Space title4="구성" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CF.RowDiv gap={10} padding={"0px 4px 0px 0px"}>
            <ScheduleSelectBox
              options={categoryList}
              setSelect={setCategoryHandler}
            />
            <Button
              width={"100px"}
              onClick={() => setIsOpenAddCategoryModal(true)}
            >
              카테고리 추가
            </Button>
          </CF.RowDiv>
        </Space>
        {/* 알림 추가 기능 필요 */}
        {/* <Space title4="알림" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
              <Input />
            </Space>
            <Space title4="위치" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
              <Input placeholder={"카카오 지도 불러오기"} />
            </Space> */}
        <Button onClick={() => addSchedule()}> 제출 </Button>
      </CF.ColumnDiv>
    </Container>
  );
};
export default ScheduleCreateContainer;
const Container = styled.section`
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
