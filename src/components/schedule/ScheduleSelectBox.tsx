import { useState } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { CC } from "../../../styles/commonComponentStyle";
import { useEffect } from "react";
import AxiosInstance from "@/utils/axios/AxiosInstance";

/**
 * Author : Sukyung Lee
 * FileName: ScheduleSelectBox.tsx
 * Date: 2022-10-17 00:05:10
 * Description :
 */

interface IScheduleSelectBoxProps {
  categoryName?: string;
  options?: any;
  setSelect?: any;
  defaultValue?: {
    categoryName: string | undefined;
    categoryColor: string | undefined;
  };
}

const ScheduleSelectBox = (props: IScheduleSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categoryName, setCategoryName] = useState(
    props.defaultValue?.categoryName
  );
  const [backgroundColor, setBackgroundColor] = useState(
    props.defaultValue?.categoryColor
  );
  const [categoryList, setCategoryList] = useState<any>([]);

  const changeOptionHandler = (categoryName: any, backgroundColor: any) => {
    setCategoryName(categoryName);
    setBackgroundColor(backgroundColor);
    props.setSelect(categoryName, backgroundColor);
    setIsOpen(false);
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
      <Option
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: backgroundColor ? "white" : "#ffffff" }}
      >
        {categoryName === "" ? "선택해주세요" : categoryName}
        <OptionColor style={{ background: backgroundColor || "#ffffff" }} />
      </Option>
      {isOpen && (
        <OptionList>
          {props.options?.map((el: any, index: number) => (
            <Option
              key={index}
              onClick={() =>
                changeOptionHandler(el.categoryName, el.backgroundColor)
              }
            >
              {el.categoryName}
              <OptionColor style={{ background: el.backgroundColor }} />
            </Option>
          ))}
        </OptionList>
      )}
    </Container>
  );
};
export default ScheduleSelectBox;
const Container = styled.div`
  position: relative;
  width: 100%;
  & > div {
    border: solid 1px #acebe7;
    border-radius: 10px;
  }
`;
const OptionList = styled.div`
  position: absolute;
  width: 100%;
  background: white;
  z-index: 3;
`;
const Option = styled(CC.RowDiv)<{ isOpen?: boolean }>`
  height: 40px;
  padding: 4px;
  align-items: center;

  &:hover {
    outline: solid 3px black;
    z-index: 3;
  }

  ${(props) =>
    props.isOpen &&
    css`
      &:hover {
        outline: none;
      }
    `}
`;
const OptionColor = styled.div`
  position: absolute;
  right: 10px;
  width: 60px;
  height: 30px;
`;
