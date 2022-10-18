import { useState } from "react";
import styled, { css } from "styled-components";
import { CF } from "../../../styles/commonComponentStyle";

/**
 * Author : Sukyung Lee
 * FileName: PlanSelectBox.tsx
 * Date: 2022-10-17 00:05:10
 * Description :
 */

interface IPlanSelectBoxProps {
  value?: string;
  options?: any;
}

const PlanSelectBox = (props: IPlanSelectBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [background, setBackground] = useState("");

  const changeOptionHandler = (value: any, background: any) => {
    setValue(value);
    setIsOpen(false);
    setBackground(background);
  };

  return (
    <Container>
      <Option
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        style={{ background: background ? "white" : "#ffffff" }}
      >
        {value === "" ? "선택해주세요" : value}
        <OptionColor style={{ background: background || "#ffffff" }} />
      </Option>
      {isOpen && (
        <OptionList>
          {props.options?.map((el: any, index: number) => (
            <Option
              key={index}
              onClick={() => changeOptionHandler(el.value, el.background)}
            >
              {el.value}
              <OptionColor style={{ background: el.background }} />
            </Option>
          ))}
        </OptionList>
      )}
    </Container>
  );
};
export default PlanSelectBox;
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
const Option = styled(CF.RowDiv)<{ isOpen?: boolean }>`
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
