import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useState } from "react";
import styled, { css } from "styled-components";
import { animationKeyFrames } from "@/styles/animationKeyFrames";

/**
 * Author : Sukyung Lee
 * FileName: PlanItem.tsx
 * Date: 2022-09-13 12:45:26
 * Description :
 */

interface IPlanItemProps {
  el: {
    id: number;
    title: string;
    content: string;
    startDateTime: string;
    endDateTime: string;
    categoryName: string;
    backgroundColor: string;
  };
  updatePlanHandler: (el: any) => void;
  deletePlanHandler: (el: any) => void;
  date: string;
}

const OneDayPlanItem = (props: IPlanItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");

  // const updateContentHandler = (el: any, type: string) => {
  //   props.updatePlanHandler({
  //     id: el.id,
  //     content: type === "checkbox" ? el.content : content,
  //     indexNumber: el.indexNumber,
  //     isChecked: type === "checkbox" ? !el.isChecked : el.isChecked,
  //     date: props.date,
  //   });
  //   setIsEdit(false);
  // };

  // const editChangeHandler = () => {
  //   setContent(props.el.content);
  //   setIsEdit(true);
  // };
  const dateTimeStringConverter = (date: string) => {
    return date.slice(0, 10) + " " + date.slice(11, 16);
  };

  return (
    <Container>
      <OneDayMarkColor style={{ background: props.el.backgroundColor }} />
      <CF.ColumnDiv width="100%" gap={6}>
        <Title> 제목 : {props.el.title} </Title>
        <Content>
          <span> 내용 : </span>
          <span dangerouslySetInnerHTML={{ __html: props.el.content }} />
        </Content>
        <CF.RowBetweenDiv>
          <StartToEndDateTime>
            {dateTimeStringConverter(props.el.startDateTime) ===
            dateTimeStringConverter(props.el.endDateTime) ? (
              <span style={{ color: props.el.backgroundColor }}>
                기간 : {dateTimeStringConverter(props.el.startDateTime)}{" "}
              </span>
            ) : (
              <span style={{ color: props.el.backgroundColor }}>
                기간 : {dateTimeStringConverter(props.el.startDateTime)} ~
                {dateTimeStringConverter(props.el.endDateTime)}
              </span>
            )}
          </StartToEndDateTime>
          <CategoryName style={{ color: props.el.backgroundColor }}>
            {" "}
            분류 : {props.el.categoryName}{" "}
          </CategoryName>
        </CF.RowBetweenDiv>
      </CF.ColumnDiv>
      {/* {isEdit ? (
        <>
          <Input
            onChange={(e: any) => setContent(e.target.value)}
            value={content}
            height={"100%"}
            onKeyPress={() => updateContentHandler(props.el, "")}
            defaultValue={content}
          />
          <CF.Img
            alt="submit_icon"
            src="/img/ui-icon/right_arrow_icon.png"
            size="30px"
            onClick={() => updateContentHandler(props.el, "")}
          />
          <CF.Img
            alt="edit_icon"
            src="/img/ui-icon/edit_icon.png"
            size="30px"
            onClick={() => setIsEdit(false)}
          />
        </>
      ) : (
        <>
          <Input
            type="checkbox"
            width="20px"
            height="20px"
            onChange={() => updateContentHandler(props.el, "checkbox")}
            checked={props.el.isChecked}
          />
          <PlanTextDiv
            width={
              props.el.isChecked ? "calc(100% - 70px)" : "calc(100% - 110px)"
            }
            checked={props.el.isChecked}
          >
            {props.el.title}
          </PlanTextDiv>
          {!props.el.isChecked && (
            <CF.Img
              alt="edit_icon"
              src="/img/ui-icon/edit_icon.png"
              size="30px"
              onClick={() => setIsEdit(true)}
            />
          )}
        </>
      )}
      <CF.Img
        alt="delete_icon"
        src="/img/ui-icon/delete_icon.png"
        size="30px"
        onClick={() => props.deletePlanHandler(props.el)}
      /> */}
    </Container>
  );
};
export default OneDayPlanItem;

const Container = styled(CF.RowDiv)`
  padding: 6px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 6px;
  outline: #666666 solid 2px;

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
  /* background: ${theme.backgroundColors.googleCalendarGray}; */
  font-weight: 600;
`;
const CategoryName = styled.div`
  padding: 10px 6px 6px 6px;
  /* background: ${theme.backgroundColors.googleCalendarGray}; */
  font-weight: 600;
`;
const Title = styled.div`
  padding: 6px;
  font-size: 20px;
  background: ${theme.backgroundColors.googleCalendarGray};
`;
const Content = styled(CF.RowDiv)`
  padding: 6px;
  gap: 8px;
  font-size: 20px;
  background: ${theme.backgroundColors.googleCalendarGray};
`;
