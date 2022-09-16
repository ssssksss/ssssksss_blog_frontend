import Input from "@/components/common/input/Input";
import { CF } from "@/styles/commonComponentStyle";
import theme from "@/styles/theme";
import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";

/**
 * Author : Sukyung Lee
 * FileName: TodoItem.tsx
 * Date: 2022-09-13 12:45:26
 * Description :
 */

interface ITodoItemProps {
  el: {
    id: number;
    content: string;
    indexNumber: number;
    isChecked: boolean;
  };
  updateTodoHandler: (el: any) => void;
  deleteTodoHandler: (el: any) => void;
  date: string;
}

const TodoItem = (props: ITodoItemProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState("");

  const updateContentHandler = (el: any, type: string) => {
    props.updateTodoHandler({
      id: el.id,
      content: type === "checkbox" ? el.content : content,
      indexNumber: el.indexNumber,
      isChecked: type === "checkbox" ? !el.isChecked : el.isChecked,
      date: props.date,
    });
    setIsEdit(false);
  };

  const editChangeHandler = () => {
    setContent(props.el.content);
    setIsEdit(true);
  };

  return (
    <Container>
      {isEdit ? (
        <>
          <Input
            onChange={(e: any) => setContent(e.target.value)}
            value={content}
            height={"100%"}
            onKeyPress={updateContentHandler(props.el, "")}
          />
          <CF.Img
            alt="submit_icon"
            src="/img/right_arrow_icon.png"
            size="30px"
            onClick={() => updateContentHandler(props.el, "")}
          />
          <CF.Img
            alt="edit_icon"
            src="/img/edit_icon.png"
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
          <TodoTextDiv
            width={
              props.el.isChecked ? "calc(100% - 70px)" : "calc(100% - 110px)"
            }
            checked={props.el.isChecked}
          >
            {props.el.content}
          </TodoTextDiv>
          {!props.el.isChecked && (
            <CF.Img
              alt="edit_icon"
              src="/img/edit_icon.png"
              size="30px"
              onClick={editChangeHandler}
            />
          )}
        </>
      )}
      <CF.Img
        alt="delete_icon"
        src="/img/delete_icon.png"
        size="30px"
        onClick={() => props.deleteTodoHandler(props.el)}
      />
    </Container>
  );
};
export default TodoItem;

const Container = styled(CF.RowDiv)`
  padding: 10px;
  align-items: center;
  background-color: ${theme.backgroundColors.fourth};
  gap: 10px;
  border-radius: 4px;
  width: 100%;
`;

const TodoTextDiv = styled(CF.Text)<{ checked: boolean }>`
  ${(props) =>
    props.checked &&
    css`
      opacity: 0.6;
      text-decoration: line-through;
      background-color: #999;
    `}
`;
