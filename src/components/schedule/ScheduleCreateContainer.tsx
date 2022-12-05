import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { CC } from "@/styles/commonComponentStyle";
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
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

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
  isEdit?: boolean;
  updateToScheduleState: {
    id: number;
    title: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
    categoryName: string;
    backgroundColor: string;
  };
}

const ScheduleCreateContainer = (props: IScheduleCreateContainerProps) => {
  const scheduleStore = useSelector((state: RootState) => state.scheduleStore);
  const [title, setTitle] = useState(
    props.isEdit ? props.updateToScheduleState?.title : ""
  );
  const [content, setContent] = useState(
    props.isEdit ? props.updateToScheduleState?.content : ""
  );
  const [isOpenAddCategoryModal, setIsOpenAddCategoryModal] = useState(false);
  const [categoryList, setCategoryList] = useState<any>([]);
  // 카테고리 추가할 하는 용도의 state
  const [addCategoryColor, setAddCategoryColor] = useState("#000000");
  const [addCategoryName, setAddCategoryName] = useState("");
  // API로 보낼때 사용하는 state
  const [categoryColor, setCategoryColor] = useState(
    props.isEdit ? props.updateToScheduleState?.backgroundColor : ""
  );
  const [categoryName, setCategoryName] = useState(
    props.isEdit ? props.updateToScheduleState?.categoryName : ""
  );
  const [startDateTime, setStartDateTime] = useState(
    props.isEdit
      ? dateFormat4y2m2d2h2m2s(props.updateToScheduleState?.startDateTime)
      : dateFormat4y2m2d2h2m2s(scheduleStore.currentScheduleDate)
  );
  const [endDateTime, setEndDateTime] = useState(
    props.isEdit
      ? dateFormat4y2m2d2h2m2s(props.updateToScheduleState?.endDateTime)
      : dateFormat4y2m2d2h2m2s(scheduleStore.currentScheduleDate)
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

  const updateSchedule = () => {
    if (content === "") {
      alert("내용을 입력해야 합니다.");
      return;
    } else if (categoryName === "") {
      alert("카테고리를 선택해야 합니다.");
      return;
    }
    AxiosInstance({
      url: "/api/schedule",
      method: "PUT",
      data: {
        id: props.updateToScheduleState?.id,
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
          SET_MONTH_SCHEDULE_DATA(
            scheduleStore.monthScheduleData.map((el: any) =>
              el.id === props.updateToScheduleState?.id
                ? {
                    id: props.updateToScheduleState?.id,
                    title,
                    content,
                    startDateTime: dateFormat4y2m2d2h2m2s(startDateTime),
                    endDateTime: dateFormat4y2m2d2h2m2s(endDateTime),
                    categoryName,
                    backgroundColor: categoryColor,
                  }
                : el
            )
          )
        );
        props.closeHandler();
      })
      .catch((error) => {
        console.log("ScheduleCreateContainer.tsx : ", "에러???");
      });
  };

  const createSchedule = () => {
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
          ] as any)
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
              <CC.ColumnCenterDiv gap={10}>
                <span>카테고리 추가하기</span>
              </CC.ColumnCenterDiv>
              <Button onClick={() => setIsOpenAddCategoryModal(false)}>
                X
              </Button>
            </Title>
            <CC.ColumnDiv padding={"10px 10px 0px"} gap={10}>
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
                <CC.RowRightDiv> {addCategoryColor} </CC.RowRightDiv>
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
            </CC.ColumnDiv>
          </AddCategoryContainer>
        </BasicCustomModal>
      )}
      {/* 카테고리 추가 모달창 */}
      <Title>
        <CC.ColumnCenterDiv gap={10}>
          <span>{scheduleStore.currentScheduleDate}</span>
          <span>일정 추가하기</span>
        </CC.ColumnCenterDiv>
        <Button onClick={props.closeHandler}> X </Button>
      </Title>
      <CC.ColumnDiv padding={"10px 10px 0px"} gap={10}>
        <Space title4="제목" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <Input
            placeholder="제목 입력"
            onChange={(e: any) => setTitle(e.target.value)}
            defaultValue={title}
          />
        </Space>
        <Space title4="내용" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CustomReactQuill setContent={setContent} defaultValue={content} />
        </Space>
        <Space title4="날짜" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CC.ColumnDiv gap={10}>
            <Input
              id="party"
              type="datetime-local"
              name="partydate"
              // max="2022-10-30T16:30" // 최대날짜
              defaultValue={startDateTime}
              onChange={(e: any) => setStartDateTime(e.target.value)}
            />
            <Input
              id="party"
              type="datetime-local"
              name="partydate"
              // min="2022-10-01T08:30" // 최소날짜
              defaultValue={endDateTime}
              onChange={(e: any) => setEndDateTime(e.target.value)}
            />
          </CC.ColumnDiv>
        </Space>
        <Space title4="구성" titleWidth="160px" bg={Schedule_ITEM_COLOR}>
          <CC.RowDiv gap={10} padding={"0px 4px 0px 0px"}>
            <ScheduleSelectBox
              options={categoryList}
              setSelect={setCategoryHandler}
              defaultValue={{ categoryName, categoryColor }}
            />
            <Button
              width={"100px"}
              onClick={() => setIsOpenAddCategoryModal(true)}
            >
              카테고리 추가
            </Button>
          </CC.RowDiv>
        </Space>
        <Button
          onClick={() => (props.isEdit ? updateSchedule() : createSchedule())}
        >
          {" "}
          {props.isEdit ? "수정" : "제출"}{" "}
        </Button>
      </CC.ColumnDiv>
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
const Title = styled(CC.RowCenterDiv)`
  height: 60px;
  background-color: ${theme.backgroundColors.purple};
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
const AddCategoryContainer = styled(CC.ColumnDiv)`
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
